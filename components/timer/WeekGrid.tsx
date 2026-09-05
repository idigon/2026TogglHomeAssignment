"use client";

import { useRef, useState } from "react";
import { CalendarSm, Minus, Plus, Stopwatch, X } from "@/components/Icons";
import { COPY, GRID, WEEK, formatDuration } from "@/lib/timerData";
import EntryBlock from "./EntryBlock";
import EntryDetails from "./EntryDetails";
import { assignSlots, topFor } from "./layout";
import type { Entry, Lane } from "./types";

type Props = {
  entries: Entry[];
  project: { name: string; client: string };
  hourHeight: number;
  /** Key of the entry whose details panel is open, if any. */
  openKey: string | null;
  onZoom: (delta: number) => void;
  onAccept: (id: string) => void;
  onReject: (id: string, lane: Lane) => void;
  onOpen: (key: string | null) => void;
  onSave: (id: string, lane: Lane, start: number, minutes: number) => void;
  onLog: (id: string) => void;
  onAcceptAll: () => void;
  onResolveChange: (id: string, action: "accept" | "reject") => void;
  onAcceptAllChanges: () => void;
};

const HOURS = Array.from(
  { length: GRID.endHour - GRID.startHour + 1 },
  (_, i) => GRID.startHour + i,
);

/** The two halves of every day, left to right, as the live app orders them. */
const LANES: Lane[] = ["logged", "planned"];

/** 8 → "8:00 AM". Hour labels only ever land on the hour. */
function hourLabel(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

export default function WeekGrid({
  entries,
  project,
  hourHeight,
  openKey,
  onZoom,
  onAccept,
  onReject,
  onOpen,
  onSave,
  onLog,
  onAcceptAll,
  onResolveChange,
  onAcceptAllChanges,
}: Props) {
  /*
   * Lane labels are hover-scoped in the live app: point at a day and only that
   * day names its two halves. They stay out of the way the rest of the time.
   */
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  /* The details panel floats above the scroller, so it has to know how far the
   * grid has scrolled to stay anchored to its entry. */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const gridHeight = (GRID.endHour - GRID.startHour) * hourHeight;

  const cell = (day: number, lane: Lane) =>
    entries.filter((e) => e.day === day && e.lane === lane);

  const dayTotals = WEEK.days.map((_, day) => ({
    logged: cell(day, "logged").reduce((sum, e) => sum + (e.actual ?? 0), 0),
    planned: cell(day, "planned")
      .filter((e) => e.status === "planned")
      .reduce((sum, e) => sum + e.estimate.minutes, 0),
  }));

  const suggestions = entries.filter((e) => e.status === "suggested");
  const pendingChanges = entries.filter((e) => e.lane === "planned" && e.changed);
  const openEntry = entries.find((e) => e.key === openKey) ?? null;

  /*
   * The pill offers whatever is outstanding. Adjustments win when both exist:
   * they are the newer event, and the plan they would change is already on
   * the week.
   */
  const proposals = pendingChanges.length ? pendingChanges : suggestions;
  const isChange = pendingChanges.length > 0;
  const loggedIds = new Set(entries.filter((e) => e.lane === "logged").map((e) => e.task.id));

  /**
   * The pill sits at the top of the grid, centred over the columns the
   * suggestions actually occupy — the same anchoring as the live app, where a
   * single Saturday suggestion puts the pill over Saturday.
   */
  const centre = proposals.length
    ? proposals.reduce((sum, e) => sum + e.day, 0) / proposals.length + 0.5
    : 3.5;
  const pillFraction = centre / WEEK.days.length;

  return (
    <div className="tv-cal">
      {/* ---- day headers ---- */}
      <div className="tv-row tv-dayhead">
        <div className="tv-gutter tv-zoom">
          <button aria-label="Zoom out" onClick={() => onZoom(-1)}>
            <Minus size={14} />
          </button>
          <button aria-label="Zoom in" onClick={() => onZoom(1)}>
            <Plus size={14} />
          </button>
        </div>

        {WEEK.days.map((day, i) => (
          <div key={day.weekday} className="tv-day">
            <span className={`tv-day-date${i === WEEK.todayIndex ? " today" : ""}`}>
              {day.date}
            </span>
            <span className="tv-day-text">
              <span className="tv-day-name">{day.weekday}</span>
              <span className="tv-day-totals">
                {/* Logged is the accent colour, planned is muted — as in the
                 * live app, where what happened outranks what was intended. */}
                <span className={dayTotals[i].logged ? "logged" : undefined}>
                  {dayTotals[i].logged ? formatDuration(dayTotals[i].logged) : "–"}
                </span>
                {" / "}
                {dayTotals[i].planned ? formatDuration(dayTotals[i].planned) : "–"}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/*
        The all-day row. Empty on purpose: Toggl puts real all-day entries here,
        and this prototype has none. A project banner across it was an invention
        that does not exist in the product.
      */}
      <div className="tv-row tv-allday">
        <div className="tv-gutter">
          <button className="tv-allday-close" aria-label="Hide all-day row">
            <X size={14} />
          </button>
        </div>
        <div className="tv-allday-lanes" />
      </div>

      {/* ---- hourly grid ---- */}
      <div className="tv-scroll-wrap">
        <div
          className="tv-scroll"
          ref={scrollRef}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          {/* Sticky lane labels — only for the day under the cursor. */}
          <div className="tv-row tv-lanehead">
            <div className="tv-gutter" />
            {WEEK.days.map((day, i) => (
              <div key={day.weekday} className="tv-lanehead-day">
                {hoverDay === i &&
                  LANES.map((lane) => (
                    <span key={lane} className="tv-lanehead-cell" aria-hidden>
                      {lane === "logged" ? (
                        <Stopwatch size={11} />
                      ) : (
                        <CalendarSm size={11} />
                      )}
                      {lane}
                    </span>
                  ))}
              </div>
            ))}
          </div>

          <div className="tv-row tv-grid" style={{ height: gridHeight }}>
            <div className="tv-gutter tv-hours">
              {HOURS.map((hour, i) => (
                <span
                  key={hour}
                  /* The first label has no rule above it to centre on, so it
                   * sits flush with the top instead of half off it. */
                  className={`tv-hour${i === 0 ? " first" : ""}`}
                  style={{ top: i * hourHeight }}
                >
                  {hourLabel(hour)}
                </span>
              ))}
            </div>

            <div className="tv-cols">
              {HOURS.map((hour, i) => (
                <div key={hour} className="tv-hline" style={{ top: i * hourHeight }} />
              ))}

              {WEEK.days.map((day, dayIndex) => (
                <div
                  key={day.weekday}
                  className="tv-day-col"
                  onMouseEnter={() => setHoverDay(dayIndex)}
                  onMouseLeave={() =>
                    setHoverDay((cur) => (cur === dayIndex ? null : cur))
                  }
                >
                  {LANES.map((lane) => (
                    <div key={lane} className={`tv-lane tv-lane-${lane}`}>
                      {assignSlots(cell(dayIndex, lane)).map(
                        ({ entry, slot, slots }) => (
                          <EntryBlock
                            key={entry.key}
                            entry={entry}
                            project={project}
                            hourHeight={hourHeight}
                            slot={slot}
                            slots={slots}
                            open={openKey === entry.key}
                            hasLog={loggedIds.has(entry.task.id)}
                            flipControls={dayIndex === WEEK.days.length - 1}
                            onAccept={onAccept}
                            onReject={onReject}
                            onOpen={onOpen}
                            onLog={onLog}
                            onResolveChange={onResolveChange}
                          />
                        ),
                      )}
                    </div>
                  ))}

                  {dayIndex === WEEK.todayIndex && (
                    <div
                      className="tv-now"
                      style={{ top: topFor(WEEK.nowMinutes, hourHeight) }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {openEntry && (
          <div
            className="tv-details"
            style={{
              /* Sit beside the entry's day, flipping to the left for the last
               * columns so a 470px panel never runs off the edge. */
              [openEntry.day >= 4 ? "right" : "left"]:
                openEntry.day >= 4
                  ? `calc((100% - var(--gutter-w)) * ${(6 - openEntry.day + 1) / 7})`
                  : `calc(var(--gutter-w) + (100% - var(--gutter-w)) * ${
                      (openEntry.day + 1) / 7
                    })`,
              top: Math.max(
                8,
                Math.min(
                  topFor(openEntry.start, hourHeight) - scrollTop + GRID.laneHeadHeight,
                  Math.max(8, (scrollRef.current?.clientHeight ?? 600) - 300),
                ),
              ),
            }}
          >
            <EntryDetails
              entry={openEntry}
              project={project}
              onSave={onSave}
              onReject={onReject}
              onClose={() => onOpen(null)}
            />
          </div>
        )}

        {proposals.length > 0 && (
          <button
            className={`tv-plan-pill${isChange ? " change" : ""}`}
            style={{
              left: `calc(var(--gutter-w) + (100% - var(--gutter-w)) * ${pillFraction})`,
            }}
            onClick={isChange ? onAcceptAllChanges : onAcceptAll}
          >
            <strong>
              {isChange ? COPY.changePill.question : COPY.planPill.question}
            </strong>
            <span>
              {isChange
                ? COPY.changePill.action(proposals.length)
                : COPY.planPill.action(proposals.length)}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
