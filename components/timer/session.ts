import type { EntryStatus } from "./types";
import type { Profile } from "@/lib/timerData";

/**
 * Where the prototype's state lives between route changes.
 *
 * Navigating to Projects and back used to remount TimerView and drop the user
 * at question 1 — losing a week they had just planned and logged. This is a
 * module-scope snapshot, so it survives client-side navigation for as long as
 * the tab is open.
 *
 * Not localStorage, and not a store library: the brief is React state only, and
 * a full reload resetting the demo is correct — "Restart demo" is the explicit
 * way to start over, and an evaluator opening a fresh tab should get a fresh
 * run.
 */
export type Session = {
  phase: "onboarding" | "empty" | "week";
  profile: Profile;
  hourHeight: number;
  statuses: Record<string, EntryStatus>;
  logs: Record<string, { minutes: number; start?: number }>;
  logOrder: string[];
  readIds: string[];
  rejected: string[];
  planEdits: Record<string, { start: number; minutes: number; kept?: boolean }>;
  resolvedChanges: Record<string, number>;
};

let snapshot: Session | null = null;

export function loadSession() {
  return snapshot;
}

export function saveSession(next: Session) {
  snapshot = next;
}

export function clearSession() {
  snapshot = null;
}

/** Sidebar collapse, kept here for the same reason: it should not reset on nav. */
let navCollapsed = false;

export function isNavCollapsed() {
  return navCollapsed;
}

export function setNavCollapsed(value: boolean) {
  navCollapsed = value;
}
