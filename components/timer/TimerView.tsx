"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarSm,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dollar,
  Gear,
  PanelRight,
  Play,
  Restart,
  ViewCalendar,
  ViewGrid,
  ViewList,
  ViewSplit,
} from "@/components/Icons";
import {
  COPY,
  DEFAULT_PROFILE,
  GRID,
  LEARNING,
  PEER_BENCHMARKS,
  PERSONAL_TASK,
  PLAN,
  PROJECT,
  TASK_TYPE_LABELS,
  WEEK,
  cohortWords,
  estimateFor,
  sampleLog,
  formatClock,
  formatDayLabel,
  formatDuration,
} from "@/lib/timerData";
import type { Profile, TaskType } from "@/lib/timerData";
import Sidebar from "@/components/Sidebar";
import AskToggl from "./AskToggl";
import NotificationDrawer from "./NotificationDrawer";
import { clearSession, loadSession, saveSession } from "./session";
import type { NotificationFilter } from "./NotificationDrawer";
import Onboarding from "./Onboarding";
import WeekGrid from "./WeekGrid";
import type { AppNotification, Entry, EntryStatus, Lane } from "./types";

/**
 * A logged entry. Its duration and start are the user's to edit, entirely
 * separately from the plan for the same task — changing one never moves the
 * other. The estimate it is measured against is derived in the entries memo,
 * so correcting an actual ripples forward correctly.
 */
type LogRecord = { minutes: number; start?: number };

/**
 * Three phases, and two of them show an empty calendar.
 *
 *   "onboarding" — three questions over a blank week. No entries, no project
 *                  banner, no all-day row, no totals. This user has zero
 *                  history and Toggl has not proposed anything yet.
 *   "empty"      — the user skipped the questions. Toggl has nothing to go on,
 *                  so it proposes nothing: the calendar stays empty. That is
 *                  the honest outcome, and it is the point of asking.
 *   "week"       — the plan arrives, all of it suggested, the instant Q3 is
 *                  answered. No loading state in between.
 */
type Phase = "onboarding" | "empty" | "week";

export default function TimerView() {
  const router = useRouter();
  // Resume whatever the user had going before they navigated away.
  const prior = loadSession();

  const [phase, setPhase] = useState<Phase>(prior?.phase ?? "onboarding");
  const [profile, setProfile] = useState<Profile>(prior?.profile ?? DEFAULT_PROFILE);
  const [hourHeight, setHourHeight] = useState(prior?.hourHeight ?? GRID.hourHeight);
  const [statuses, setStatuses] = useState<Record<string, EntryStatus>>(
    prior?.statuses ?? {},
  );
  const [logs, setLogs] = useState<Record<string, LogRecord>>(prior?.logs ?? {});
  /**
   * Task ids in the order they were logged. The learning progression needs to
   * know which log was the most recent one, so it can show what THAT log
   * changed rather than everything that has ever changed.
   */
  const [logOrder, setLogOrder] = useState<string[]>(prior?.logOrder ?? []);
  /** Notification ids the user has marked read. */
  const [readIds, setReadIds] = useState<string[]>(prior?.readIds ?? []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<NotificationFilter>("Unread");
  const [rejected, setRejected] = useState<string[]>(prior?.rejected ?? []);
  /**
   * Hand-edited PLANS, by task id — start and duration the user saved from the
   * details panel for a planned block. Kept strictly apart from `logs`, which
   * holds the same two fields for the logged block: editing the plan must not
   * move the actual, and editing the actual must not move the plan.
   */
  const [planEdits, setPlanEdits] = useState<
    Record<string, { start: number; minutes: number; kept?: boolean }>
  >(prior?.planEdits ?? {});
  /**
   * Adjustments the user has already decided on, keyed by task id and holding
   * the value they accepted. An estimate that moves again later will not match
   * what is stored here, so it becomes a fresh proposal — decisions apply to
   * the change that was on offer, not to the task forever.
   */
  const [resolvedChanges, setResolvedChanges] = useState<Record<string, number>>(
    prior?.resolvedChanges ?? {},
  );
  /** Key of the entry whose details panel is open. */
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [askOpen, setAskOpen] = useState(false);

  // Snapshot on every change, so leaving and coming back resumes rather than restarts.
  useEffect(() => {
    saveSession({
      phase,
      profile,
      hourHeight,
      statuses,
      logs,
      logOrder,
      readIds,
      rejected,
      planEdits,
      resolvedChanges,
    });
  }, [
    phase,
    profile,
    hourHeight,
    statuses,
    logs,
    logOrder,
    readIds,
    rejected,
    planEdits,
    resolvedChanges,
  ]);

  const hasPlan = phase === "week";
  const needsOnboarding = phase === "onboarding";

  /* No answers yet: onboarding owns its own route. */
  useEffect(() => {
    if (needsOnboarding) router.replace("/onboarding");
  }, [needsOnboarding, router]);

  /* Ctrl/Cmd+K, but never over the onboarding questions. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!needsOnboarding) setAskOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [needsOnboarding]);

  const project = {
    name: profile.projectName || PROJECT.name,
    client: profile.clientName || PROJECT.client,
  };

  /**
   * Entries are derived, never stored. An estimate is a function of what has
   * been logged so far, so accepting or logging anything recomputes the whole
   * week — which is what makes the learning loop visible rather than scripted.
   *
   * One task can produce two blocks. The estimate always sits in the PLANNED
   * lane; once time is logged, a second block appears in the LOGGED lane at the
   * actual duration. Neither replaces the other, so the overrun reads as a
   * difference in height between two blocks side by side.
   */
  const entries = useMemo<Entry[]>(() => {
    if (!hasPlan) return [];

    const tasks = [...PLAN, PERSONAL_TASK];

    /*
     * Walk the logs in the order they happened, accumulating actuals per task
     * type. At each step we capture the estimate as it stood BEFORE that log —
     * which is what that task was working to.
     *
     * This is derived rather than frozen at log time on purpose: correcting an
     * earlier actual has to ripple forward through every estimate that came
     * after it. The user can retype any logged duration and the whole model
     * recomputes, instead of being stuck with whatever the demo suggested.
     */
    const lastId = logOrder[logOrder.length - 1];
    const priorEstimate: Record<string, ReturnType<typeof estimateFor>> = {};
    const actualsByType: Partial<Record<TaskType, number[]>> = {};
    const actualsBefore: Partial<Record<TaskType, number[]>> = {};

    for (const id of logOrder) {
      const task = PLAN.find((t) => t.id === id);
      const log = logs[id];
      if (!task || !log) continue;
      priorEstimate[id] = estimateFor(task.type, actualsByType[task.type] ?? [], profile);
      (actualsByType[task.type] ||= []).push(log.minutes);
      if (id !== lastId) (actualsBefore[task.type] ||= []).push(log.minutes);
    }

    const out: Entry[] = [];
    for (const task of tasks) {
      if (rejected.includes(task.id)) continue;

      const live = estimateFor(task.type, actualsByType[task.type] ?? [], profile);
      const planEdit = planEdits[task.id];
      const log = logs[task.id];

      /*
       * THE PLAN. A hand-edited plan wins outright. Otherwise a task that has
       * been logged keeps the estimate it was working to, so later logs cannot
       * rewrite what this one was planned at. Only unlogged tasks track live.
       */
      const estimate =
        planEdit != null
          ? {
              ...live,
              minutes: planEdit.minutes,
              range: formatDuration(planEdit.minutes),
              basisLine: planEdit.kept ? "Kept by you" : "You set this",
              sentence: planEdit.kept
                ? COPY.keptEstimate(formatDuration(planEdit.minutes))
                : `You set this to ${formatDuration(planEdit.minutes)}`,
              note: undefined,
              userSet: planEdit.kept ? ("kept" as const) : ("edited" as const),
            }
          : (priorEstimate[task.id] ?? live);

      const status = statuses[task.id] ?? "suggested";
      const plannedStart = planEdit?.start ?? task.start;

      /*
       * Did the last log move this task's estimate? Only unlogged tasks can
       * move — a logged one is history — and a hand-edited one is pinned to
       * whatever the user set.
       */
      let changed: { from: number; to: number } | undefined;
      if (!log && !planEdit && lastId) {
        const was = estimateFor(task.type, actualsBefore[task.type] ?? [], profile);
        const decided = resolvedChanges[task.id] === estimate.minutes;
        if (was.minutes !== estimate.minutes && !decided) {
          changed = { from: was.minutes, to: estimate.minutes };
        }
      }

      out.push({
        key: `${task.id}:planned`,
        task,
        lane: "planned",
        status,
        estimate,
        minutes: estimate.minutes,
        start: plannedStart,
        day: task.day,
        changed,
      });

      if (log) {
        /*
         * THE ACTUAL, edited independently of the plan. Its start and duration
         * live on the log record, so retyping one never moves the other.
         */
        out.push({
          key: `${task.id}:logged`,
          task,
          lane: "logged",
          status: "logged",
          estimate,
          actual: log.minutes,
          minutes: log.minutes,
          start: log.start ?? plannedStart,
          day: task.day,
          // Against the plan, whatever the plan currently is.
          variance: log.minutes - estimate.minutes,
          panelNote:
            task.noteKind === "assignment" && estimate.minutes > 0
              ? COPY.assignmentNote(
                  Math.round(((log.minutes - estimate.minutes) / estimate.minutes) * 100),
                  cohortWords(profile).specific,
                )
              : undefined,
        });
      }
    }
    return out;
  }, [hasPlan, statuses, logs, logOrder, rejected, profile, planEdits, resolvedChanges]);

  const loggedTotal = entries
    .filter((e) => e.lane === "logged")
    .reduce((sum, e) => sum + (e.actual ?? 0), 0);
  const plannedTotal = entries
    .filter((e) => e.lane === "planned" && e.status === "planned")
    .reduce((sum, e) => sum + e.estimate.minutes, 0);

  /**
   * The learning progression, as a notification feed.
   *
   * One notification per logged entry, derived by replaying the logs in order
   * and asking what each one concluded. Derived rather than stored so that
   * correcting an actual rewrites the conclusion it produced, instead of
   * leaving a stale claim sitting in the drawer.
   *
   * The trigger is the COUNT of completed entries of that task type — not how
   * many days have passed — so every notification states the count out loud.
   */
  const notifications = useMemo<AppNotification[]>(() => {
    const acc: Partial<Record<TaskType, number[]>> = {};
    const out: AppNotification[] = [];

    // Skipping the questions leaves nothing to suggest. Say why.
    if (phase === "empty") {
      out.push({
        id: "skipped",
        kind: "skipped",
        headline: COPY.skipped.headline,
        detail: COPY.skipped.detail,
        time: `${formatDayLabel(WEEK.todayIndex)}, ${formatClock(WEEK.nowMinutes)}`,
        read: readIds.includes("skipped"),
      });
    }

    for (let i = 0; i < logOrder.length; i++) {
      const id = logOrder[i];
      const task = PLAN.find((t) => t.id === id);
      const log = logs[id];
      if (!task || !log) continue;

      const before = acc[task.type] ?? [];
      const prior = estimateFor(task.type, before, profile);
      const mine = [...before, log.minutes];
      acc[task.type] = mine;

      const count = mine.length;
      const label = TASK_TYPE_LABELS[task.type];
      const progress = COPY.beats.progress(count, label);
      const rawMean = mine.reduce((a, b) => a + b, 0) / count;
      // Same 5-minute display grid as every other duration on screen.
      const mineAvg = formatDuration(
        Math.round(rawMean / LEARNING.roundToMinutes) * LEARNING.roundToMinutes,
      );
      const time = `${formatDayLabel(task.day)}, ${formatClock(
        (log.start ?? planEdits[id]?.start ?? task.start) + log.minutes,
      )}`;
      const base = { id, progress, time, read: readIds.includes(id) };

      if (count === 1) {
        out.push({
          ...base,
          kind: "watching",
          headline: COPY.beats.watching.headline(
            COPY.variance(log.minutes - prior.minutes),
            label,
          ),
          detail: COPY.beats.watching.detail,
        });
      } else if (count < LEARNING.personalThreshold) {
        const blended = estimateFor(task.type, mine, profile);
        /*
         * How many tasks this log moved AT THE TIME — anything of the same
         * type not yet logged at that point in the replay. Counting against
         * today's state would shrink as later tasks get logged, and the
         * notification would start contradicting what the user saw.
         */
        const loggedByThen = new Set(logOrder.slice(0, i + 1));
        const moved = PLAN.filter(
          (t) =>
            t.type === task.type && !loggedByThen.has(t.id) && !rejected.includes(t.id),
        ).length;
        out.push({
          ...base,
          kind: "adjusted",
          headline: COPY.beats.adjusted.headline,
          detail: COPY.beats.adjusted.detail(
            formatDuration(PEER_BENCHMARKS[task.type].median),
            mineAvg,
            formatDuration(blended.minutes),
            moved,
          ),
        });
      } else {
        out.push({
          ...base,
          kind: "personal",
          headline: COPY.beats.personal.headline,
          detail: COPY.beats.personal.detail(count, mineAvg, label),
        });
      }
    }

    // Newest first, as the drawer shows them.
    return out.reverse();
  }, [phase, logOrder, logs, profile, readIds, rejected, planEdits]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const accept = useCallback((id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "planned" }));
  }, []);

  /**
   * Save from the details panel. The lane decides what is being edited: the
   * plan, or the time actually logged. On a suggestion, saving the plan is
   * also the accept — editing a proposal and confirming it are one gesture.
   */
  const save = useCallback((id: string, lane: Lane, start: number, minutes: number) => {
    if (lane === "logged") {
      setLogs((prev) => ({ ...prev, [id]: { ...prev[id], minutes, start } }));
      // The conclusion may have changed, so surface it again.
      setReadIds((prev) => prev.filter((x) => x !== id));
    } else {
      setPlanEdits((prev) => ({ ...prev, [id]: { start, minutes } }));
      setStatuses((prev) => ({ ...prev, [id]: prev[id] ?? "planned" }));
    }
    setOpenKey(null);
  }, []);

  /**
   * An adjusted estimate gets the same three answers a suggestion gets.
   * Accepting lets it stand and stay live; declining pins the task at the
   * number it had before, which also takes it out of the model's reach.
   */
  const resolveChange = useCallback(
    (id: string, action: "accept" | "reject") => {
      const entry = entries.find((e) => e.key === `${id}:planned`);
      if (!entry?.changed) return;
      if (action === "accept") {
        setResolvedChanges((prev) => ({ ...prev, [id]: entry.changed!.to }));
      } else {
        setPlanEdits((prev) => ({
          ...prev,
          [id]: { start: entry.start, minutes: entry.changed!.from, kept: true },
        }));
      }
    },
    [entries],
  );

  const acceptAllChanges = useCallback(() => {
    setResolvedChanges((prev) => {
      const next = { ...prev };
      for (const e of entries) {
        if (e.lane === "planned" && e.changed) next[e.task.id] = e.changed.to;
      }
      return next;
    });
  }, [entries]);

  const acceptAll = useCallback(() => {
    setStatuses((prev) => {
      const next = { ...prev };
      for (const task of PLAN) next[task.id] = "planned";
      return next;
    });
  }, []);

  /**
   * The play button on a planned block logs it at its pre-filled actual.
   *
   * The estimate is frozen at the moment of logging, computed from only the
   * entries that existed BEFORE this one, so the variance a task reports is
   * the one the user was actually working to rather than a number that shifts
   * underneath them as later logs arrive.
   */
  const logById = useCallback(
    (id: string) => {
      const task = PLAN.find((t) => t.id === id);
      if (!task) return;
      // Sampled here, in the handler, so the numbers differ run to run without
      // the server and client disagreeing during render.
      const sampled = sampleLog(task.type, planEdits[id]?.start ?? task.start);
      setLogs((prev) => (prev[id] ? prev : { ...prev, [id]: sampled }));
      setLogOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [planEdits],
  );

  /**
   * Deleting a logged block removes just that time entry, leaving the plan.
   * Rejecting a plan removes the task from the week entirely.
   */
  const reject = useCallback((id: string, lane: Lane) => {
    if (lane === "logged") {
      setLogs((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setLogOrder((prev) => prev.filter((x) => x !== id));
    } else {
      setRejected((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
    setOpenKey(null);
  }, []);

  const restart = useCallback(() => {
    clearSession();
    router.push("/onboarding");
    setPhase("onboarding");
    setProfile(DEFAULT_PROFILE);
    setStatuses({});
    setLogs({});
    setLogOrder([]);
    setReadIds([]);
    setDrawerOpen(false);
    setNotifFilter("Unread");
    setRejected([]);
    setPlanEdits({});
    setResolvedChanges({});
    setOpenKey(null);
    setHourHeight(GRID.hourHeight);
  }, [router]);

  const zoom = useCallback((delta: number) => {
    setHourHeight((h) =>
      Math.min(
        GRID.maxHourHeight,
        Math.max(GRID.minHourHeight, h + delta * GRID.hourHeightStep),
      ),
    );
  }, []);

  // Both summary bars share a scale, so their lengths are comparable.
  const barMax = Math.max(loggedTotal, plannedTotal, 1);

  // Nothing to show while the redirect to /onboarding is in flight.
  if (needsOnboarding) return null;

  return (
    <div className="app app-fixed">
      <Sidebar
        active="timer"
        unread={unreadCount}
        notificationsOpen={drawerOpen}
        onToggleNotifications={() => setDrawerOpen((v) => !v)}
        onAskToggl={() => setAskOpen(true)}
      />

      {/*
       * Rendered beside the sidebar, not inside it: .side clips its overflow so
       * the nav can slide away on collapse, which was cutting the drawer off.
       */}
      {drawerOpen && (
        <NotificationDrawer
          notifications={notifications}
          filter={notifFilter}
          onFilter={setNotifFilter}
          onMarkRead={(id) =>
            setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
          onMarkAllRead={() => setReadIds(notifications.map((n) => n.id))}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      <main className="main main-timer">
      {/*
       * Running-timer header.
       *
       * These three pills describe the entry the RUNNING TIMER would create —
       * not what is on the calendar. Nothing is ever running in this prototype
       * (time is logged from the block's own play button), so they stay in
       * their empty state throughout, which is what the live app does too: a
       * week full of logged and planned entries still shows @ Task / + Project
       * / # Tags up here. The glyphs are kbd chips, not icons.
       */}
      <header className="tv-head">
        <div className="tv-entry-name">What are you working on?</div>

        <div className="tv-head-right">
          <button className="tv-pill">
            <kbd>@</kbd>
            <span>Task</span>
          </button>

          <button className="tv-pill">
            <kbd>+</kbd>
            <span>Project</span>
          </button>

          <button className="tv-pill">
            <kbd>#</kbd>
            <span>Tags</span>
          </button>

          <button className="icon-btn" aria-label="Billable">
            <Dollar size={16} />
          </button>

          <div className="tv-timer">0:00:00</div>
          <button className="tv-start" aria-label="Start timer">
            <Play size={16} />
          </button>
        </div>
      </header>

      {/* ---- week navigation and view controls ---- */}
      <div className="tv-nav">
        <div className="date-group">
          <button className="arrow" aria-label="Previous period">
            <ChevronLeft size={16} />
          </button>
          <span className="date-label">
            <CalendarSm size={14} />
            {WEEK.label} <span className="muted">• {WEEK.code}</span>
          </span>
          <button className="arrow" aria-label="Next period">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="spacer" />

        <button className="control ghost tv-restart" onClick={restart}>
          <Restart size={15} />
          Restart demo
        </button>

        <button className="control">
          Week
          <ChevronDown size={16} />
        </button>

        <div className="tv-views">
          <button className="icon-btn" aria-label="Calendar view">
            <ViewCalendar />
          </button>
          <button className="icon-btn is-active" aria-label="Split view">
            <ViewSplit />
          </button>
          <button className="icon-btn" aria-label="List view">
            <ViewList />
          </button>
          <button className="icon-btn" aria-label="Grid view">
            <ViewGrid />
          </button>
        </div>

        <button className="icon-btn" aria-label="Calendar settings">
          <Gear />
        </button>
        <button className="icon-btn" aria-label="Toggle side panel">
          <PanelRight />
        </button>
      </div>

      {/* ---- logged / planned summary ---- */}
      <div className="tv-summary">
        <span className="tv-sum-label">Logged</span>
        <span className="tv-sum-track">
          <span
            className={`tv-sum-fill c-${PROJECT.color}`}
            style={{ width: `${(loggedTotal / barMax) * 100}%` }}
          />
        </span>
        <span className="tv-sum-value">
          {loggedTotal ? formatDuration(loggedTotal) : "–"}
        </span>

        <span className="tv-sum-label">Planned</span>
        <span className="tv-sum-track">
          <span
            className={`tv-sum-fill c-${PROJECT.color}`}
            style={{ width: `${(plannedTotal / barMax) * 100}%` }}
          />
        </span>
        <span className="tv-sum-value">
          {plannedTotal ? formatDuration(plannedTotal) : "–"}
        </span>

        <button className="tv-sum-link">
          View reports
          <ChevronRight size={14} />
        </button>
      </div>

      <WeekGrid
        entries={entries}
        project={project}
        hourHeight={hourHeight}
        openKey={openKey}
        onZoom={zoom}
        onAccept={accept}
        onReject={reject}
        onOpen={setOpenKey}
        onSave={save}
        onLog={logById}
        onAcceptAll={acceptAll}
        onResolveChange={resolveChange}
        onAcceptAllChanges={acceptAllChanges}
      />

      </main>

      <AskToggl open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
