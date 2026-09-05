"use client";

import { useEffect, useState } from "react";
import {
  CalendarSm,
  Dollar,
  Folder,
  Kebab,
  Play,
  Stopwatch,
  ViewList,
  X,
} from "@/components/Icons";
import {
  COPY,
  formatClock,
  formatDayLabel,
  formatDuration,
  parseClock,
  parseDuration,
} from "@/lib/timerData";
import type { Entry, Lane } from "./types";

type Props = {
  entry: Entry;
  project: { name: string; client: string };
  /**
   * Commit the edited times. The lane says whether the PLAN or the LOGGED time
   * is being changed — they are separate values and never move together.
   */
  onSave: (id: string, lane: Lane, start: number, minutes: number) => void;
  onReject: (id: string, lane: Lane) => void;
  onClose: () => void;
};

/**
 * The entry details panel.
 *
 * Two jobs. For an accepted or logged entry it is Toggl's ordinary editor:
 * title, pills, and an editable start / end / duration.
 *
 * For a suggestion it is also where the estimate has to justify itself. The
 * user has three ways out of a proposed task — accept it from the block, edit
 * it here, or reject it — and only this one involves reading a number closely,
 * so the provenance is spelled out in full rather than abbreviated to fit a
 * 110px lane.
 *
 * The Task and Tags pills stay empty throughout: this prototype never sets
 * them, and only the project is known. Showing them filled would imply data
 * that does not exist.
 */
export default function EntryDetails({
  entry,
  project,
  onSave,
  onReject,
  onClose,
}: Props) {
  const { task, status, estimate } = entry;
  const suggested = status === "suggested";
  const logged = status === "logged";

  // Local draft, so an abandoned edit changes nothing.
  const [start, setStart] = useState(entry.start);
  const [end, setEnd] = useState(entry.start + entry.minutes);
  const [startText, setStartText] = useState(formatClock(entry.start));
  const [endText, setEndText] = useState(formatClock(entry.start + entry.minutes));
  const [durText, setDurText] = useState(formatDuration(entry.minutes));

  const duration = Math.max(5, end - start);

  // Re-seed when the panel is pointed at a different entry.
  useEffect(() => {
    setStart(entry.start);
    setEnd(entry.start + entry.minutes);
    setStartText(formatClock(entry.start));
    setEndText(formatClock(entry.start + entry.minutes));
    setDurText(formatDuration(entry.minutes));
  }, [entry.key, entry.start, entry.minutes]);

  /*
   * Editing rules, chosen so nothing moves that the user did not touch:
   * changing start or end adjusts the duration, changing the duration moves
   * the end. Blur commits; a value that will not parse snaps back.
   */
  const commitStart = () => {
    const next = Math.min(parseClock(startText, start), end - 5);
    setStart(next);
    setStartText(formatClock(next));
    setDurText(formatDuration(end - next));
  };

  const commitEnd = () => {
    const next = Math.max(parseClock(endText, end), start + 5);
    setEnd(next);
    setEndText(formatClock(next));
    setDurText(formatDuration(next - start));
  };

  const commitDuration = () => {
    const mins = Math.max(5, parseDuration(durText, duration));
    setEnd(start + mins);
    setEndText(formatClock(start + mins));
    setDurText(formatDuration(mins));
  };

  const label = suggested ? "Suggested" : logged ? "Logged" : "Planned";

  return (
    <div className="ed-card" role="dialog" aria-label={`${label}: ${task.title}`}>
      <div className="ed-head">
        <span className="ed-kind">{label}</span>
        <div className="spacer" />
        <button className="ed-icon accent" aria-label="Start timer">
          <Play size={12} />
        </button>
        <button className="ed-icon" aria-label="Entry options">
          <ViewList size={14} />
        </button>
        <button className="ed-icon" aria-label="More">
          <Kebab size={14} />
        </button>
        <button className="ed-icon" aria-label="Close" onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <div className="ed-title">{task.title}</div>

      <div className="ed-pills">
        <button className="ed-pill empty">
          <kbd>@</kbd>
          Task
        </button>
        <button className={`ed-pill project${task.chip ? ` p-${task.chip.color}` : ""}`}>
          <Folder size={13} />
          {task.chip ? task.chip.name : project.name}
        </button>
        <button className="ed-pill empty">
          <kbd>#</kbd>
          Tags
        </button>
        <button className={`ed-pill money${task.billable ? " on" : ""}`} aria-label="Billable">
          <Dollar size={14} />
        </button>
      </div>

      <div className="ed-times">
        <span className="ed-date">{formatDayLabel(entry.day)}</span>

        <input
          className="ed-time"
          value={startText}
          aria-label="Start time"
          onChange={(e) => setStartText(e.target.value)}
          onBlur={commitStart}
          onKeyDown={(e) => e.key === "Enter" && commitStart()}
        />
        <span className="ed-arrow">→</span>
        <input
          className="ed-time"
          value={endText}
          aria-label="End time"
          onChange={(e) => setEndText(e.target.value)}
          onBlur={commitEnd}
          onKeyDown={(e) => e.key === "Enter" && commitEnd()}
        />

        <span className="ed-dur">
          {logged ? <Stopwatch size={12} /> : <CalendarSm size={12} />}
          <input
            className="ed-time dur"
            value={durText}
            aria-label="Duration"
            onChange={(e) => setDurText(e.target.value)}
            onBlur={commitDuration}
            onKeyDown={(e) => e.key === "Enter" && commitDuration()}
          />
        </span>
      </div>

      {/*
       * The estimate always explains itself here — while it is still a
       * proposal, when it has just moved (the "clickable to reveal the
       * reasoning" half of the learning loop), and equally when the user
       * declined an update and wants to know what they are now holding.
       * A logged block is the one case with nothing to justify.
       */}
      {!logged && !task.chip && (
        <div className="ed-why">
          {entry.changed && (
            <div className="ed-why-change">
              <span className="ed-why-from">{formatDuration(entry.changed.from)}</span>
              <span className="ed-why-to">
                → {formatDuration(entry.changed.to)}
              </span>
              <span className="ed-why-tag">updated from what you logged</span>
            </div>
          )}
          <div className="ed-why-head">
            {COPY.why.heading(formatDuration(estimate.minutes))}
          </div>
          <div className="ed-why-line">{estimate.sentence}</div>
          {/* Cohort and sample size only mean something when the model
           * produced the number. */}
          {!estimate.userSet && (
            <div className="ed-why-note">
              {estimate.source === "personal"
                ? COPY.why.personal(estimate.sampleOfMine)
                : estimate.source === "blended"
                  ? COPY.why.blended(estimate.sampleOfMine)
                  : COPY.why.peer(estimate.benchmark.sampleSize)}
            </div>
          )}
          {estimate.note && <div className="ed-why-degraded">{estimate.note}</div>}
        </div>
      )}

      {/*
       * The planned-vs-logged difference lives here and only here. On the
       * calendar the two blocks already sit side by side at their true
       * heights; a number stamped on top of them just adds noise.
       */}
      {/* A logged entry can carry its own lines. Same box the estimate uses. */}
      {entry.panelNote && (
        <div className="ed-why">
          {entry.panelNote.map((line, i) => (
            <div key={i} className={i === 0 ? "ed-why-head" : "ed-why-line"}>
              {line}
            </div>
          ))}
        </div>
      )}

      {logged && (
        <div className="ed-logged">
          <span className="ed-logged-label">Planned</span>
          <span className="ed-logged-value">{formatDuration(estimate.minutes)}</span>
          {entry.variance != null && entry.variance !== 0 && estimate.minutes > 0 && (
            <span className={`ed-var${entry.variance > 0 ? " over" : " under"}`}>
              {COPY.variance(entry.variance)}
              <span className="ed-var-pct">
                {entry.variance > 0 ? "+" : "−"}
                {Math.round((Math.abs(entry.variance) / estimate.minutes) * 100)}%
              </span>
            </span>
          )}
          {/* A task with its own note is not client work, so the cohort that
            * produced the project estimates has nothing to say about it. */}
          {!entry.panelNote && (
            <span className="ed-logged-basis">{estimate.basisLine.toLowerCase()}</span>
          )}
        </div>
      )}

      <div className="ed-foot">
        <button className="ed-reject" onClick={() => onReject(task.id, entry.lane)}>
          {suggested ? "Reject" : logged ? "Delete entry" : "Delete"}
        </button>
        <div className="spacer" />
        <button
          className="btn-primary ed-save"
          onClick={() => onSave(task.id, entry.lane, start, duration)}
        >
          {suggested ? "Accept" : "Save"}
          <kbd>↵</kbd>
        </button>
      </div>
    </div>
  );
}
