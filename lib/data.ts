/* ---------------------------------------------------------------------------
 * Projects view
 * -------------------------------------------------------------------------*/

export type ProjectColor = "green" | "orange" | "blue";

export type Project = {
  name: string;
  color: ProjectColor;
  client: string | null;
  billable: boolean;
  /** Rendered right-aligned; `None` is shown literally by the real app. */
  rate: string | null;
  rateCurrency: string | null;
  dates: string | null;
  timeStatus: {
    /** e.g. "1.51 of 0.5 h" */
    label: string;
    /** e.g. "301%" */
    percent: string;
    /** Bar fill, 0–1. Over-budget bars clamp to 1 and turn salmon. */
    fill: number;
    over: boolean;
  } | null;
  fixedFee: string | null;
  variance: { text: string; positive: boolean } | null;
};

/** The three projects in the live workspace, in display order. */
export const projects: Project[] = [
  {
    name: "Cool feature",
    color: "green",
    client: "Tecno Corp",
    billable: false,
    rate: null,
    rateCurrency: null,
    dates: null,
    timeStatus: null,
    fixedFee: null,
    variance: null,
  },
  {
    name: "New AI project",
    color: "orange",
    client: null,
    billable: true,
    rate: "None",
    rateCurrency: null,
    dates: null,
    timeStatus: {
      label: "1.51 of 0.5 h",
      percent: "301%",
      fill: 1,
      over: true,
    },
    fixedFee: null,
    variance: { text: "-1h 26s", positive: false },
  },
  {
    name: "VIP project",
    color: "blue",
    client: "Tecno Corp",
    billable: true,
    rate: "27",
    rateCurrency: "USD",
    dates: "Sep 2",
    timeStatus: {
      label: "0.19 of 25 h",
      percent: "1%",
      fill: 0.0076,
      over: false,
    },
    fixedFee: null,
    variance: { text: "+24h 48m 42s", positive: true },
  },
];

/* ---------------------------------------------------------------------------
 * Reports → Summary (kept for the /reports route)
 * -------------------------------------------------------------------------*/

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
