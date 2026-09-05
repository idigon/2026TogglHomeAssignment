"use client";

import {
  CalendarSm,
  Check,
  Dollar,
  Play,
  Stopwatch,
  Tag,
  X,
} from "@/components/Icons";
import { formatClock, formatDuration } from "@/lib/timerData";
import { heightFor, topFor } from "./layout";
import type { Entry, Lane } from "./types";

type Props = {
  entry: Entry;
  /** Name and client come from onboarding Q3, not from the constant. */
  project: { name: string; client: string };
  hourHeight: number;
  slot: number;
  slots: number;
  /** True while this entry's details panel is open. */
  open: boolean;
  /** True once this task has a block in the logged lane. */
  hasLog: boolean;
  /**
   * Suggestion controls hang off the block's right edge, into the next day's
   * (empty) logged lane. On the last column there is no next day, so they flip
   * to the left instead of running off the grid.
   */
  flipControls: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string, lane: Lane) => void;
  /**
   * Open the details panel — the "adjust" arm of accept / adjust / reject.
   * Clicking anywhere on the block does this; there is no separate edit button.
   */
  onOpen: (key: string | null) => void;
  onLog: (id: string) => void;
  /** Accept or decline an adjusted estimate — the same gesture as a suggestion. */
  onResolveChange: (id: string, action: "accept" | "reject") => void;
};

export default function EntryBlock({
  entry,
  project,
  hourHeight,
  slot,
  slots,
  open,
  hasLog,
  flipControls,
  onAccept,
  onReject,
  onOpen,
  onLog,
  onResolveChange,
}: Props) {
  const { task, status, estimate } = entry;
  const height = heightFor(entry.minutes, hourHeight);
  const suggested = status === "suggested";
  const logged = status === "logged";
  const trackable = status === "planned" && !hasLog;

  /*
   * What fits, in priority order. On a suggestion the estimate outranks the
   * project line — every task here belongs to the same project, and the whole
   * point of the block is the number and where it came from. The lane is only
   * ~110px wide, so short blocks also clamp the title to one line rather than
   * letting it push the range out.
   */
  const tight = height < 78;
  const showMeta = !suggested && height >= 44;
  const showRange = suggested && height >= 50;
  const showBasis = suggested && height >= 72;
  const showNote = suggested && height >= 100;

  const shownMinutes = logged ? (entry.actual ?? 0) : estimate.minutes;

  return (
    <div
      className={`tv-block tv-${status}${tight ? " tight" : ""}${open ? " open" : ""}${
        entry.changed ? " changed" : ""
      }${task.chip ? ` p-${task.chip.color}` : ""}`}
      onClick={() => onOpen(open ? null : entry.key)}
      style={{
        top: topFor(entry.start, hourHeight),
        height: Math.max(height - 2, 16),
        left: `${(slot / slots) * 100}%`,
        width: `calc(${(1 / slots) * 100}% - 10px)`,
      }}
    >
      {/* The estimate moved because of the last log. Shown here, on the block
       * that changed, rather than announced somewhere else on the page. */}
      {entry.changed && (
        <span className="tv-changed" title="Estimate updated — click to see why">
          {formatDuration(entry.changed.from)} → {formatDuration(entry.changed.to)}
        </span>
      )}

      <div className="tv-block-body">
        <div className="tv-block-title">{task.title}</div>

        {showMeta && (
          <div className="tv-block-meta">
            {task.chip ? task.chip.name : `${project.name} · ${project.client}`}
          </div>
        )}

        {showRange && (
          <div className="tv-est" title={estimate.sentence}>
            <div className="tv-est-range">{estimate.range}</div>
            {showBasis && <div className="tv-est-basis">{estimate.basisLine}</div>}
            {showNote && estimate.note && (
              <div className="tv-est-note">{estimate.note}</div>
            )}
          </div>
        )}
      </div>

      <div className="tv-block-foot">
        <span className="tv-block-dur">
          {logged ? <Stopwatch size={11} /> : <CalendarSm size={11} />}
          {suggested
            ? `${formatClock(entry.start)} · ${formatDuration(shownMinutes)}`
            : formatDuration(shownMinutes)}
        </span>

        <span className="tv-block-icons">
          {task.billable && <Dollar size={13} />}
          {task.tag && <Tag size={12} />}
        </span>

        {trackable && (
          <button
            className="tv-play"
            aria-label={`Start ${task.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onLog(task.id);
            }}
          >
            <Play size={12} />
          </button>
        )}
      </div>

      {/*
       * One control pair, two proposals. A suggestion is accepted into the
       * week or rejected out of it; an adjusted estimate is accepted as the
       * new number or declined back to the old one. Same gesture either way —
       * there is no reason for the user to learn two.
       */}
      {(suggested || entry.changed) && (
        <div className={`tv-sugg-controls${flipControls ? " flip" : ""}`}>
          <button
            className="tv-sugg-btn accept"
            aria-label={
              suggested
                ? `Accept ${task.title}`
                : `Accept the updated estimate for ${task.title}`
            }
            onClick={(e) => {
              e.stopPropagation();
              if (suggested) onAccept(task.id);
              else onResolveChange(task.id, "accept");
            }}
          >
            <Check size={15} />
          </button>
          {/* No edit button: clicking the block itself opens the details. */}
          <button
            className="tv-sugg-btn reject"
            aria-label={
              suggested
                ? `Reject ${task.title}`
                : `Keep the previous estimate for ${task.title}`
            }
            onClick={(e) => {
              e.stopPropagation();
              if (suggested) onReject(task.id, entry.lane);
              else onResolveChange(task.id, "reject");
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
