export type DayBar = {
  label: string;
  date: string;
  billableMinutes: number;
};

export type BreakdownRow = {
  member: string;
  entryCount: number;
  project: string;
  client: string;
  loggedTime: string;
  estimated: string;
  amount: string;
  cost: string;
  billableTime: string;
  billablePercent: string;
};

/** Week 36 summary, matching the live Toggl report. */
export const summary = {
  loggedTime: "1h 42m",
  billableTime: "1h 41m 44s",
  billablePercent: "100%",
  amount: "39.75",
  currency: "USD",
  averageDailyHours: "1h 42m",
};

export const week = {
  label: "This week",
  code: "W36",
};

/** Y axis tops out at 2h 30m, drawn every 30 minutes. */
export const chartMaxMinutes = 150;
export const chartTicks = ["2h 30m", "2h", "1h 30m", "1h", "30m", "0h"];

export const days: DayBar[] = [
  { label: "Mon", date: "8/31", billableMinutes: 0 },
  { label: "Tue", date: "9/1", billableMinutes: 0 },
  { label: "Wed", date: "9/2", billableMinutes: 102 },
  { label: "Thu", date: "9/3", billableMinutes: 0 },
  { label: "Fri", date: "9/4", billableMinutes: 0 },
];

export const rows: BreakdownRow[] = [
  {
    member: "Ignacio",
    entryCount: 2,
    project: "",
    client: "",
    loggedTime: "1h 41m 44s",
    estimated: "11h 30m",
    amount: "39.75",
    cost: "33.42",
    billableTime: "1h 41m 44s",
    billablePercent: "100%",
  },
];

export const getStarted = {
  done: 2,
  total: 3,
  steps: [
    { title: "Start your first timer", note: "", complete: true },
    { title: "Track 1h", note: "Reports unlocked", complete: true },
    { title: "Create a new project or task", note: "Unlocks Tasks", complete: false },
  ],
};
