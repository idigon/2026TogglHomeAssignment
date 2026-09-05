import type { Estimate, PlannedTask } from "@/lib/timerData";

/**
 * Which half of a day a block sits in. Matches the live app's split layout:
 * LOGGED on the left, PLANNED on the right.
 */
export type Lane = "logged" | "planned";

/**
 * A task moves through three states:
 *
 *   suggested — Toggl proposed it. Dark indigo, dashed, accept / adjust / reject.
 *   planned   — the user accepted it. Project fill, calendar icon, estimate.
 *   logged    — time was recorded against it. Stopwatch icon, actual duration.
 *
 * Crucially "logged" does not replace "planned": once a task is logged it has a
 * block in BOTH lanes — the estimate stays on the right, the actual appears on
 * the left — so the overrun is visible as a difference in height.
 */
export type EntryStatus = "suggested" | "planned" | "logged";

/** One rendered block. A single task can produce two of these, one per lane. */
export type Entry = {
  /** Unique per block, since one task can appear in both lanes. */
  key: string;
  task: PlannedTask;
  lane: Lane;
  status: EntryStatus;
  /** The task's current estimate, recomputed from what has been logged. */
  estimate: Estimate;
  /** Minutes actually logged. Only set on a logged-lane block. */
  actual?: number;
  /** Minutes this block occupies. */
  minutes: number;
  start: number;
  day: number;
  /**
   * On a logged block: how far the actual ran from the estimate it was working
   * to, in minutes. Positive is over.
   */
  variance?: number;
  /**
   * Set on a still-unlogged block whose estimate moved as a result of the most
   * recent log. This is the "inline and highlighted on the affected blocks"
   * part of the learning loop — the change is shown where the change happened,
   * not announced in a corner.
   */
  changed?: { from: number; to: number };
  /**
   * Lines the details panel shows instead of cohort provenance. Only ever set
   * on a logged block — the plan for the same task has nothing to explain.
   */
  panelNote?: string[];
};

/**
 * One entry in Toggl's notification drawer. The learning progression speaks
 * through this rather than through a ribbon of its own — the platform already
 * has a place for "the system concluded something", and it is non-blocking by
 * construction.
 */
export type AppNotification = {
  /** Task id of the log that produced it, or a fixed id for standalone ones. */
  id: string;
  kind: "watching" | "adjusted" | "personal" | "skipped";
  headline: string;
  detail: string;
  /** Absent on notifications that are not about a run of logged entries. */
  progress?: string;
  time: string;
  read: boolean;
};
