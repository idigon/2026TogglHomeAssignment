import { GRID } from "@/lib/timerData";

/**
 * Grid geometry. One place converts minutes-from-midnight into pixels, so the
 * hour rules, the entry blocks and the now-line can never drift apart.
 */
export function topFor(startMinutes: number, hourHeight: number) {
  return ((startMinutes - GRID.startHour * 60) / 60) * hourHeight;
}

export function heightFor(minutes: number, hourHeight: number) {
  return (minutes / 60) * hourHeight;
}

export type Placeable = { start: number; minutes: number };

/**
 * Side-by-side placement for entries that overlap WITHIN one lane. "Slot" here
 * is a sub-division of a lane, not to be confused with the LOGGED / PLANNED
 * lanes themselves.
 *
 * Needed because estimates change: a review that grows from 2h 30m to 3h 20m
 * can collide with whatever sits after it, and the block has to narrow rather
 * than cover it. Greedy first-fit, which is enough for a day that holds a
 * handful of entries.
 */
export function assignSlots<T extends Placeable>(
  entries: T[],
): { entry: T; slot: number; slots: number }[] {
  const sorted = [...entries].sort((a, b) => a.start - b.start);
  const laneEnds: number[] = [];
  const placed = sorted.map((entry) => {
    const end = entry.start + entry.minutes;
    let lane = laneEnds.findIndex((laneEnd) => laneEnd <= entry.start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(end);
    } else {
      laneEnds[lane] = end;
    }
    return { entry, lane, end };
  });

  // Everything that shares a cluster of overlap gets the same slot count, so
  // neighbouring blocks line up instead of each picking its own width.
  const result: { entry: T; slot: number; slots: number }[] = [];
  let cluster: typeof placed = [];
  let clusterEnd = -Infinity;

  const flush = () => {
    if (!cluster.length) return;
    const slots = Math.max(...cluster.map((p) => p.lane)) + 1;
    for (const p of cluster) result.push({ entry: p.entry, slot: p.lane, slots });
    cluster = [];
  };

  for (const p of placed) {
    if (p.entry.start >= clusterEnd) {
      flush();
      clusterEnd = p.end;
    } else {
      clusterEnd = Math.max(clusterEnd, p.end);
    }
    cluster.push(p);
  }
  flush();

  return result;
}
