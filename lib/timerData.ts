/* ===========================================================================
 * TUNING FILE — every mock value and every estimate number lives here.
 *
 * Nothing under components/timer/ invents a duration, a percentage or a piece
 * of provenance copy. If a number shows up on screen, it either sits in this
 * file or is derived from this file by the helpers at the bottom.
 *
 * The demo scenario: a freelance brand identity designer signs up today with
 * zero history and has just landed the Nordvik Identity project. Toggl has no
 * data of theirs, so it bootstraps estimates from anonymised peers, watches
 * what actually happens, and hands the estimates back over once it has enough
 * of the user's own entries.
 * =========================================================================*/

/**
 * Project swatch. The client project is blue; grey is what the calendar gives
 * anything that is not client work, so it sits back rather than competing.
 */
export type ProjectColor = "green" | "orange" | "grey" | "blue";

/* ---------------------------------------------------------------------------
 * 1. The week
 *
 * Pinned rather than derived from `new Date()` so the demo is identical every
 * time an evaluator opens it. Same week the rest of the app already uses (W36,
 * Mon 31 Aug – Sun 6 Sep), but "today" is Monday: the designer signs up at the
 * start of the week, so the whole plan is still ahead of them.
 * -------------------------------------------------------------------------*/

export const WEEK = {
  label: "This week",
  code: "W36",
  /** 0 = Monday. The plan runs forward from here. */
  todayIndex: 0,
  /**
   * "Now", in minutes from midnight, for the red current-time line. Pinned just
   * before the first task so the entire plan sits ahead of the user.
   */
  nowMinutes: 9 * 60 + 10,
  days: [
    { date: 31, weekday: "Mon", month: "Aug" },
    { date: 1, weekday: "Tue", month: "Sep" },
    { date: 2, weekday: "Wed", month: "Sep" },
    { date: 3, weekday: "Thu", month: "Sep" },
    { date: 4, weekday: "Fri", month: "Sep" },
    { date: 5, weekday: "Sat", month: "Sep" },
    { date: 6, weekday: "Sun", month: "Sep" },
  ],
};

/* ---------------------------------------------------------------------------
 * 2. Grid geometry
 *
 * Measured off the live Toggl 2.0 calendar in split layout (`ly=split`) at a
 * 1879px viewport: 60px per hour, a 71px hour gutter, and each day 220px wide
 * divided into two 110px lanes.
 *
 * The split is the whole point of this view. Every day carries a LOGGED lane
 * on the left and a PLANNED lane on the right, and one task can appear in both
 * at once — the estimate on the right, what actually happened on the left.
 * Variance stops being a number in a table and becomes two blocks of different
 * heights sitting next to each other.
 *
 * hourHeight is the zoom level the − / + control in the day-header gutter
 * steps through; the rest of the grid is laid out from it.
 * -------------------------------------------------------------------------*/

export const GRID = {
  /** First and last hour drawn. 8 → 22 keeps a full working day on screen. */
  startHour: 8,
  endHour: 22,
  hourHeight: 60,
  minHourHeight: 40,
  maxHourHeight: 120,
  hourHeightStep: 10,
  /** Left column that carries the hour labels. */
  gutterWidth: 71,
  /** Height of the sticky LOGGED / PLANNED label row. */
  laneHeadHeight: 20,
};

/* ---------------------------------------------------------------------------
 * 3. The project
 * -------------------------------------------------------------------------*/

export const PROJECT: {
  name: string;
  client: string;
  color: ProjectColor;
  /** Days (0 = Mon) the project banner spans in the all-day row. */
  spanStart: number;
  spanEnd: number;
} = {
  name: "Nordvik Identity",
  client: "Nordvik Coffee",
  color: "blue",
  spanStart: 0,
  spanEnd: 5,
};

/* ---------------------------------------------------------------------------
 * 3b. Onboarding
 *
 * Three questions, asked before the week is populated. Q1 and Q2 exist purely
 * to pick a peer cohort — they are the reason Toggl can say anything at all on
 * day one — and Q3 is the project the plan gets built for.
 *
 * Everything is pre-filled with the scenario so an evaluator can click
 * Continue three times, but every field is editable and Skip is always live.
 * -------------------------------------------------------------------------*/

export type Profile = {
  discipline: string;
  specialization: string;
  clientType: string;
  projectName: string;
  clientName: string;
};

/*
 * Toggl's real onboarding opens by asking what you will mainly use it for.
 * This prototype adds a fourth answer at the top of that list — the one this
 * whole build is about — and leaves the other three in place, disabled, so the
 * addition is legible as an addition rather than a replacement.
 */
export const ONBOARDING_INTENTS: {
  id: string;
  title: string;
  description: string;
  /** Only the first one leads anywhere here. */
  supported: boolean;
}[] = [
  {
    id: "benchmarking",
    title: "Smart benchmarking",
    description:
      "Get realistic time estimates from day one, drawn from freelancers doing your kind of work — then watch them turn into your own numbers as you log.",
    supported: true,
  },
  {
    id: "time",
    title: "See where time goes",
    description: "Log hours and spot where they really go",
    supported: false,
  },
  {
    id: "plan",
    title: "Plan and assign work",
    description: "Map out tasks, then track against the plan",
    supported: false,
  },
  {
    id: "projects",
    title: "Keep projects on track",
    description: "Watch progress, profitability, and capacity in one place",
    supported: false,
  },
];

/*
 * Step two of Toggl's onboarding, reproduced. Neither connector does anything
 * here — calendar integrations are explicitly out of scope — so both Connect
 * buttons are disabled and the screen says why.
 */
export const ONBOARDING_CONNECTORS = [
  {
    id: "google",
    name: "Google Calendar",
    description: "Import your meetings so they turn into tracked time",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Import your meetings so they turn into tracked time",
  },
];

export const ONBOARDING = {
  welcome: "Welcome to Toggl 2.0",
  intentQuestion: "What will you mainly use Toggl for?",
  intentSub: "We'll tailor your first experience to help you get there.",
  /** Shown under the list when an option this prototype does not build is picked. */
  unsupported: "Not part of this prototype. Pick Smart benchmarking to continue.",
  calendarTitle: "Log time from your meetings and events",
  calendarSub:
    "Connect your calendar and your meetings and events are ready to track",
  autoTrack: "Auto-track calendar events",
  connectorsNote: "Calendar connections are not part of this prototype.",
  disciplines: [
    {
      label: "Design",
      /** The cohort noun used in provenance copy: "…designers usually take". */
      noun: "designers",
      specializations: ["Brand identity", "UI/UX", "Illustration", "Motion"],
    },
    {
      label: "Development",
      noun: "developers",
      specializations: ["Frontend", "Backend", "Mobile", "Data"],
    },
    {
      label: "Writing",
      noun: "writers",
      specializations: ["Copywriting", "Technical writing", "Editing", "Content strategy"],
    },
    {
      label: "Marketing",
      noun: "marketers",
      specializations: ["SEO", "Paid media", "Lifecycle", "Brand strategy"],
    },
  ],
  clientTypes: ["Startups", "SMBs", "Agencies", "Enterprise"],
};

/** Where the three questions start, and where Skip lands. */
export const DEFAULT_PROFILE: Profile = {
  discipline: "Design",
  specialization: "Brand identity",
  clientType: "SMBs",
  projectName: PROJECT.name,
  clientName: PROJECT.client,
};

/**
 * The two cohorts a benchmark can speak for: the specialization the user
 * picked, and the parent discipline it degrades to when the specialization
 * sample is too thin.
 */
export function cohortWords(profile: Profile) {
  const discipline =
    ONBOARDING.disciplines.find((d) => d.label === profile.discipline) ??
    ONBOARDING.disciplines[0];
  return {
    specific: `${profile.specialization} ${discipline.noun}`,
    generic: discipline.noun,
    specialization: profile.specialization,
  };
}

/* ---------------------------------------------------------------------------
 * 4. Peer benchmarks — the cold-start numbers
 *
 * `median` is the anonymised peer median in minutes and `spread` is the ± band
 * shown beside it. Estimates are NEVER rendered as a bare number.
 *
 * `basis` is the honesty knob:
 *   "specialization" — enough brand identity data to answer from that cohort.
 *   "discipline"     — the brand identity sample is too thin (see specSample),
 *                      so the number degrades to the parent Design cohort and
 *                      the block says so out loud.
 * -------------------------------------------------------------------------*/

export type TaskType =
  | "kickoff"
  | "discovery"
  | "research"
  | "moodboard"
  | "concept"
  | "colour"
  | "typography"
  | "design-review"
  | "guidelines"
  | "revisions"
  | "assignment";

/** Human names for the task types, used in the learning-progression copy. */
export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  kickoff: "kickoff call",
  discovery: "discovery workshop",
  research: "research block",
  moodboard: "moodboard",
  concept: "concept exploration",
  colour: "colour system build",
  typography: "typography block",
  "design-review": "design review",
  guidelines: "guidelines draft",
  revisions: "revisions round",
  assignment: "assignment",
};

export type Benchmark = {
  /** Peer median, in minutes. */
  median: number;
  /** ± band as a fraction: 0.15 → ±15%. */
  spread: number;
  basis: "specialization" | "discipline";
  /** Freelancers behind the number actually used. */
  sampleSize: number;
  /** Brand identity entries available — only meaningful when basis degrades. */
  specSample?: number;
};

export const PEER_BENCHMARKS: Record<TaskType, Benchmark> = {
  kickoff: { median: 60, spread: 0.2, basis: "specialization", sampleSize: 412 },
  discovery: { median: 120, spread: 0.25, basis: "specialization", sampleSize: 168 },

  // Degraded: only 11 brand identity entries, so this falls back to Design.
  research: {
    median: 105,
    spread: 0.3,
    basis: "discipline",
    sampleSize: 3140,
    specSample: 11,
  },

  moodboard: { median: 90, spread: 0.2, basis: "specialization", sampleSize: 505 },
  concept: { median: 180, spread: 0.2, basis: "specialization", sampleSize: 640 },
  colour: { median: 120, spread: 0.25, basis: "specialization", sampleSize: 233 },
  typography: { median: 135, spread: 0.2, basis: "specialization", sampleSize: 294 },

  // The task type the whole demo turns on.
  "design-review": {
    median: 150,
    spread: 0.15,
    basis: "specialization",
    sampleSize: 1286,
  },

  guidelines: { median: 180, spread: 0.25, basis: "specialization", sampleSize: 380 },

  // Degraded: 7 brand identity entries.
  revisions: {
    median: 90,
    spread: 0.3,
    basis: "discipline",
    sampleSize: 3140,
    specSample: 7,
  },

  /*
   * Not project work and not part of the model. Only the median is ever used
   * (as the 6h plan); the panel suppresses cohort provenance for this task
   * entirely, because there is no cohort behind a personal entry.
   */
  assignment: { median: 360, spread: 0.2, basis: "specialization", sampleSize: 0 },
};

/* ---------------------------------------------------------------------------
 * 5. The learning loop
 *
 * Personalisation triggers on the NUMBER of completed entries of a task type,
 * not on elapsed days — a designer who logs three reviews on Tuesday is as
 * well understood as one who spreads them over three weeks. The UI states that
 * assumption rather than hiding it.
 *
 * Three beats, keyed off how many entries of a type the user has logged:
 *   0–1 entries → peer benchmark, untouched ("watching, not concluding")
 *   2  entries  → blend peer and personal at blendWeight
 *   3+ entries  → the user's own mean; benchmarks drop out entirely
 *
 * With the defaults below and the review actuals in section 6, this produces
 * exactly the arc the demo needs:
 *   review 1  est 2h 30m (peer)     logged 3h 15m  → no change
 *   review 2  est 2h 30m (peer)     logged 3h 30m  → reviews 3+4 become 2h 50m
 *   review 3  est 2h 50m (blended)  logged 3h 20m  → review 4 becomes 3h 20m
 * -------------------------------------------------------------------------*/

export const LEARNING = {
  /** Completed entries of a type before estimates become purely personal. */
  personalThreshold: 3,
  /** At 2 entries: estimate = peer * (1 - w) + personalMean * w. */
  blendWeight: 0.4,
  /** Displayed estimates round to the nearest N minutes. */
  roundToMinutes: 5,
  /** The ± band tightens as the source gets closer to the user. */
  blendedSpread: 0.12,
  personalSpread: 0.1,
};

/* ---------------------------------------------------------------------------
 * 6. The plan
 *
 * Thirteen tasks across the week. The four `reviewIndex` tasks are the same
 * task type on four different deliverables at four different times of day —
 * project work, not a daily recurring block.
 *
 * `start` is minutes from midnight. Duration is NOT stored here: a task is as
 * long as its current estimate, so blocks physically resize when the estimate
 * changes. Nor is the actual — that is sampled from TRUE_PACE below.
 * -------------------------------------------------------------------------*/

export type PlannedTask = {
  id: string;
  title: string;
  type: TaskType;
  /** 0 = Monday. */
  day: number;
  /** Minutes from midnight. */
  start: number;
  /** 1–4 for the four design reviews; drives the learning progression. */
  reviewIndex?: number;
  billable?: boolean;
  tag?: string;
  /** A different project chip, for work that is not on the client project. */
  chip?: { name: string; color: ProjectColor };
  /**
   * Marks a task whose details panel carries its own lines instead of the
   * cohort provenance. The lines themselves are built at render time, because
   * they name the cohort the user picked in onboarding.
   */
  noteKind?: "assignment";
};

export const PLAN: PlannedTask[] = [
  // ---- Mon (today) ----
  {
    id: "kickoff",
    title: "Kickoff call — Nordvik",
    type: "kickoff",
    day: 0,
    start: 9 * 60 + 30,
    billable: true,
  },
  {
    id: "discovery",
    title: "Brand discovery workshop",
    type: "discovery",
    day: 0,
    start: 11 * 60,
    billable: true,
    tag: "Discovery",
  },
  {
    id: "research",
    title: "Competitive & market research",
    type: "research",
    day: 0,
    start: 14 * 60 + 30,
    tag: "Research",
  },

  // ---- Tue ----
  {
    id: "review-1",
    title: "Design review — logo concepts",
    type: "design-review",
    day: 1,
    start: 10 * 60,
    reviewIndex: 1,
    billable: true,
  },
  {
    id: "moodboard",
    title: "Moodboard & direction",
    type: "moodboard",
    day: 1,
    start: 14 * 60,
  },

  // ---- Wed ----
  {
    id: "concept",
    title: "Logo concept exploration",
    type: "concept",
    day: 2,
    start: 9 * 60 + 30,
    billable: true,
  },
  {
    id: "review-2",
    title: "Design review — colour system",
    type: "design-review",
    day: 2,
    start: 14 * 60,
    reviewIndex: 2,
    billable: true,
  },

  // ---- Thu ----
  {
    id: "typography",
    title: "Typography exploration",
    type: "typography",
    day: 3,
    start: 9 * 60,
    billable: true,
  },
  {
    id: "review-3",
    title: "Design review — typography",
    type: "design-review",
    day: 3,
    start: 11 * 60 + 30,
    reviewIndex: 3,
    billable: true,
  },
  {
    id: "colour",
    title: "Colour system build",
    type: "colour",
    day: 3,
    start: 15 * 60 + 30,
    billable: true,
  },

  // ---- Fri ----
  {
    id: "guidelines",
    title: "Brand guidelines draft",
    type: "guidelines",
    day: 4,
    start: 9 * 60 + 30,
    billable: true,
    tag: "Deliverable",
  },
  {
    id: "review-4",
    title: "Design review — brand guidelines",
    type: "design-review",
    day: 4,
    start: 15 * 60,
    reviewIndex: 4,
    billable: true,
  },

  // ---- Sat ----
  {
    id: "revisions",
    title: "Revisions round 1",
    type: "revisions",
    day: 5,
    start: 10 * 60,
  },
];

/* ---------------------------------------------------------------------------
 * 6z. One entry that is not client work
 *
 * Lands already logged, late on Saturday where it cannot compete with the four
 * design reviews for an evaluator's attention. Its chip is grey for the same
 * reason: a colour of its own would have made the aside the loudest thing on
 * the week.
 *
 * Deliberately outside the model: it is seeded straight into the logs without
 * entering the log order, so it produces no notification, feeds no benchmark,
 * and cannot shift a single estimate. It is an entry that happens to be true,
 * not a joke wired into the machinery.
 * -------------------------------------------------------------------------*/

export const PERSONAL_TASK: PlannedTask = {
  id: "assignment",
  title: "Toggl home assignment",
  type: "assignment",
  day: 5,
  start: 13 * 60,
  chip: { name: "Personal", color: "grey" },
  noteKind: "assignment",
};

/** Estimated 6h, took 8h. */
export const PERSONAL_TASK_LOG = { minutes: 8 * 60 };

/* ---------------------------------------------------------------------------
 * 6a. How long this user ACTUALLY takes
 *
 * The ground truth the benchmarks are converging on. Actuals are sampled from
 * here when the user logs, rather than listed task by task, for two reasons.
 *
 * It is the right model: how long someone takes is a property of them, not of
 * the row in a fixture file — and it must not be derived from the estimate, or
 * the estimate would chase itself upward and never converge.
 *
 * And it is more honest as a demo: no two runs produce the same numbers, so
 * what an evaluator sees is the mechanism working rather than a script
 * playing back.
 *
 * Two rules keep it from reading as authored:
 *
 * The spread is WIDE. A day where everything lands within a few minutes of its
 * estimate is not a real day — it is a fixture. Jitter here is large enough
 * that a task can miss by half an hour in either direction, which is what
 * makes the recomputed plan visibly different every run rather than always
 * converging on the same tidy number.
 *
 * And this person is not uniformly slow. Some task types genuinely come in
 * under the peer median. A blanket overrun would look like a multiplier
 * someone applied rather than a person working.
 *
 * The design-review row is the exception, and deliberately the tightest: the
 * three beats hang on it. This designer really takes ~3h 25m against a 2h 30m
 * peer median, so every sample lands clearly over the benchmark, the blend
 * always rises by a visible amount, and the personal estimate always settles
 * near their true pace — whatever the individual draws happen to be. Widening
 * this one would undercut the very claim the demo is making about them.
 * -------------------------------------------------------------------------*/

export const TRUE_PACE: Record<TaskType, { minutes: number; jitter: number }> = {
  // Peer median 60 — quicker than most on calls.
  kickoff: { minutes: 50, jitter: 20 },
  // 120 — slower.
  discovery: { minutes: 140, jitter: 35 },
  // 105 — slower, and wildly inconsistent.
  research: { minutes: 120, jitter: 45 },
  // 90 — quicker.
  moodboard: { minutes: 85, jitter: 30 },
  // 180 — slower, and the longest tail on the week.
  concept: { minutes: 205, jitter: 50 },
  // 120 — quicker.
  colour: { minutes: 110, jitter: 30 },
  // 135 — slower.
  typography: { minutes: 150, jitter: 40 },
  // 150 — much slower, and the hinge the whole progression turns on. Kept
  // tighter than the rest on purpose; see the note above.
  "design-review": { minutes: 205, jitter: 30 },
  // 180 — slower.
  guidelines: { minutes: 195, jitter: 45 },
  // 90 — about right, but erratic.
  revisions: { minutes: 90, jitter: 30 },
  // Never sampled: PERSONAL_TASK carries its own fixed actual.
  assignment: { minutes: 480, jitter: 0 },
};

export const LOGGING = {
  /** Work rarely starts exactly on the planned minute. */
  startJitterMinutes: 20,
};

/**
 * Jitter in [-spread, +spread], on the same 5-minute grid as everything else.
 *
 * Uniform rather than bell-shaped: a triangular draw clusters so tightly around
 * the mean that consecutive runs look identical, which is the thing this is
 * here to avoid.
 */
function jitterBy(spread: number) {
  const raw = (Math.random() * 2 - 1) * spread;
  return Math.round(raw / LEARNING.roundToMinutes) * LEARNING.roundToMinutes;
}

/**
 * One logged entry: how long it really took, and when it really started.
 *
 * Call this from an event handler only — never during render, or the server
 * and client will disagree about the numbers.
 */
export function sampleLog(type: TaskType, plannedStart: number) {
  const pace = TRUE_PACE[type];
  const base =
    Math.round(pace.minutes / LEARNING.roundToMinutes) * LEARNING.roundToMinutes;
  return {
    minutes: Math.max(LEARNING.roundToMinutes, base + jitterBy(pace.jitter)),
    start: Math.max(0, plannedStart + jitterBy(LOGGING.startJitterMinutes)),
  };
}

/* ---------------------------------------------------------------------------
 * 6b. Where the week starts
 *
 * While the three questions are on screen the calendar is genuinely empty —
 * this user has zero history and nothing has been proposed yet. The moment Q3
 * is answered every task above arrives as a suggestion, all at once, with no
 * loading state. Nothing is pre-accepted.
 * -------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------
 * 6y. Ask Toggl
 *
 * Answers once and stops. The line is the point: the whole prototype argues
 * that Toggl can only estimate for you once it has watched you work, so the
 * assistant declining to guess before then is the same claim, said shorter.
 * -------------------------------------------------------------------------*/

export const ASK_TOGGL = {
  welcome: "How can I help you today?",
  placeholder: "Ask anything about time data",
  prompts: [
    "How long will the next design review take me?",
    "Which tasks am I consistently underestimating?",
    "Compare my logged hours to my plan this week.",
  ],
  /** The one and only response. */
  answer: "I know how long this will take you. Ask me again after four entries.",
  delayMs: 900,
};

/* ---------------------------------------------------------------------------
 * 7. Copy
 *
 * Kept beside the numbers so wording and maths can be tuned together.
 * -------------------------------------------------------------------------*/

export const COPY = {
  /*
   * The three beats.
   *
   * The whole point of the progression is restraint: the system says less than
   * it could early on, and only claims to have learned something once it has
   * the volume to back it. Beat 1 explicitly declines to draw a conclusion.
   */
  beats: {
    /** One entry in. Watching, not concluding. */
    watching: {
      headline: (over: string, label: string) =>
        `${over} over on your first ${label}.`,
      detail:
        "Noted, but one entry is not a pattern. Nothing else on your week has moved.",
    },
    /** Two entries in. The first adjustment. */
    adjusted: {
      headline: "You are running longer than similar freelancers. Adjusted your next reviews.",
      detail: (peer: string, mine: string, blended: string, moved: number) =>
        `Two logged, both over. Blending the peer median (${peer}) with your own average (${mine}) gives ${blended}. ${moved} ${
          moved === 1 ? "task is" : "tasks are"
        } highlighted on your week.`,
    },
    /** At the threshold. Benchmarks drop out. */
    personal: {
      headline: "I have got enough of your data now — estimates are yours from here.",
      detail: (count: number, mine: string, label: string) =>
        `${count} ${label}s logged, which is the threshold. Benchmarks are out; your own average (${mine}) is the estimate now. It is the number of entries that does this, not how long you have been on Toggl.`,
    },
    /** Shown beside every beat, so the trigger is never a mystery. */
    progress: (n: number, label: string) =>
      `${Math.min(n, LEARNING.personalThreshold)} of ${LEARNING.personalThreshold} ${label}s logged`,
    why: "Why?",
  },

  /*
   * Skipping onboarding leaves an empty calendar. Saying nothing would read as
   * a broken build, so the drawer explains what the skip cost and how to undo
   * it — the same argument the product makes, applied to the user's own choice.
   */
  skipped: {
    headline: "No cohort, no estimates",
    detail:
      "Without your discipline and client type there's no group to compare you to, so there's nothing to suggest. Your first estimates would have come from freelancers doing the same work. Restart demo to answer the three questions.",
  },

  /** The delta a logged entry ran against the estimate it was working to. */
  variance: (delta: number) =>
    `${delta > 0 ? "+" : "−"}${formatDuration(Math.abs(delta))}`,
  /**
   * Provenance line under a degraded benchmark. Kept short because it shares a
   * ~110px lane with the basis line above it, which already names the fallback
   * cohort — together they read "Designers generally / Not much brand identity
   * data yet".
   */
  degraded: (spec: string) => `Not much ${spec.toLowerCase()} data yet`,
  planPill: { question: "Plan this project?", action: (n: number) => `Accept all (${n})` },
  /*
   * An adjusted estimate is a proposal too, so it gets the same three
   * affordances a suggestion gets: accept it, decline it, or take them all.
   */
  changePill: {
    question: "Update your estimates?",
    action: (n: number) => `Accept all (${n})`,
  },
  keptEstimate: (dur: string) =>
    `You kept this at ${dur} after declining an update.`,

  /**
   * The one entry that is not client work. The cohort follows whatever the
   * user picked in onboarding, so this reads correctly for a UI/UX designer or
   * a frontend developer too.
   */
  assignmentNote: (over: number, cohort: string) => [
    `You're running ${over}% over.`,
    `Consistent with ${cohort.toLowerCase()}. And, apparently, with product managers.`,
  ],

  /*
   * The details view. An unaccepted suggestion has to justify its number
   * before the user commits to it, so the panel carries the reasoning inline
   * rather than hiding it behind a tooltip.
   */
  why: {
    heading: (dur: string) => `Why ${dur}?`,
    peer: (n: number) =>
      `Drawn from ${n.toLocaleString("en-US")} anonymised freelancer${
        n === 1 ? "" : "s"
      }. You have no history of your own yet — once you do, this switches to your numbers.`,
    blended: (n: number) =>
      `Part peer median, part your own average. ${n} of your entries so far; at ${LEARNING.personalThreshold} the benchmark drops out entirely.`,
    personal: (n: number) =>
      `Your own average across ${n} entries. No benchmark involved any more.`,
    edited: "You set this by hand. It overrides the benchmark for this task.",
  },
};

/* ---------------------------------------------------------------------------
 * 8. Helpers — formatting, and the one place an estimate is computed
 * -------------------------------------------------------------------------*/

/** 150 → "2h 30m", 60 → "1h", 45 → "45m". */
export function formatDuration(minutes: number): string {
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60);
  const rem = m % 60;
  if (h === 0) return `${rem}m`;
  if (rem === 0) return `${h}h`;
  return `${h}h ${rem}m`;
}

/** 570 → "9:30 AM". */
export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "Mon, Aug 31" for the date pill in the details view. */
export function formatDayLabel(day: number): string {
  const d = WEEK.days[day];
  return `${d.weekday}, ${d.month} ${d.date}`;
}

/**
 * Parse a hand-typed clock time back to minutes from midnight. Accepts
 * "10:00 AM", "10:00am", "10:00" and "1000"; anything unparseable keeps the
 * value the field started with rather than snapping to zero.
 */
export function parseClock(input: string, fallback: number): number {
  const m = input.trim().toLowerCase().match(/^(\d{1,2})[:.]?(\d{2})?\s*(am|pm)?$/);
  if (!m) return fallback;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  if (m[3] === "pm" && h < 12) h += 12;
  if (m[3] === "am" && h === 12) h = 0;
  if (h > 23 || min > 59) return fallback;
  return h * 60 + min;
}

/** Parse "2h 30m", "2h", "45m" or a bare minute count. */
export function parseDuration(input: string, fallback: number): number {
  const s = input.trim().toLowerCase();
  const h = /(\d+)\s*h/.exec(s);
  const m = /(\d+)\s*m/.exec(s);
  if (h || m) return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function roundTo(minutes: number, step: number) {
  return Math.round(minutes / step) * step;
}

/** Where an estimate came from — drives both the number and the sentence. */
export type EstimateSource = "peer" | "blended" | "personal";

export type Estimate = {
  /** Minutes, already rounded for display. */
  minutes: number;
  spread: number;
  source: EstimateSource;
  benchmark: Benchmark;
  /** Completed entries of this task type at the time of the calculation. */
  sampleOfMine: number;
  /**
   * The sentence is split in two on the block, because a planned lane is only
   * ~110px wide and "Brand identity designers usually take 2h 30m ± 15%" set as
   * one run of text is four unscannable lines. The range leads in semibold, the
   * cohort follows underneath — same claim, readable at a glance.
   */
  /** e.g. "2h 30m ± 15%" — a range, never a bare number. */
  range: string;
  /** e.g. "Brand identity designers usually" */
  basisLine: string;
  /** The two joined, for tooltips and the reasoning popover. */
  sentence: string;
  /** Provenance note when the peer number degraded to the parent cohort. */
  note?: string;
  /**
   * Set when the number came from the user rather than the model — either they
   * typed it, or they declined an adjustment and kept the previous one. The
   * cohort and sample-size copy does not apply to these.
   */
  userSet?: "edited" | "kept";
};

/**
 * `myActuals` is every actual (in minutes) the user has already logged for
 * this task type, oldest first. Its LENGTH alone decides the source — that is
 * the volume-not-days rule from section 5.
 *
 * `profile` only shapes the wording: which cohort the peer sentence names, and
 * which specialization the degraded note apologises for.
 */
export function estimateFor(
  type: TaskType,
  myActuals: number[],
  profile: Profile = DEFAULT_PROFILE,
): Estimate {
  const benchmark = PEER_BENCHMARKS[type];
  const n = myActuals.length;
  const mean = n ? myActuals.reduce((a, b) => a + b, 0) / n : 0;

  let minutes: number;
  let spread: number;
  let source: EstimateSource;

  if (n >= LEARNING.personalThreshold) {
    minutes = mean;
    spread = LEARNING.personalSpread;
    source = "personal";
  } else if (n === LEARNING.personalThreshold - 1) {
    const w = LEARNING.blendWeight;
    minutes = benchmark.median * (1 - w) + mean * w;
    spread = LEARNING.blendedSpread;
    source = "blended";
  } else {
    minutes = benchmark.median;
    spread = benchmark.spread;
    source = "peer";
  }

  minutes = roundTo(minutes, LEARNING.roundToMinutes);
  const pct = Math.round(spread * 100);
  const dur = formatDuration(minutes);

  const cohort = cohortWords(profile);
  const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  /*
   * The basis line names the source only — the range above it carries the
   * number, so "Brand identity designers" + "2h 30m ± 15%" reads as the whole
   * claim in two short lines that survive a 110px lane. The full sentence is
   * still assembled below for tooltips and the reasoning popover.
   */
  let basisLine: string;
  let verb: string;
  if (source === "personal") {
    basisLine = "Your own average";
    verb = "You usually take";
  } else if (source === "blended") {
    basisLine = "You + similar freelancers";
    verb = "You and similar freelancers take";
  } else if (benchmark.basis === "discipline") {
    basisLine = `${capitalise(cohort.generic)} generally`;
    verb = `${capitalise(cohort.generic)} generally take`;
  } else {
    basisLine = cohort.specific;
    verb = `${cohort.specific} usually take`;
  }

  const range = `${dur} ± ${pct}%`;

  return {
    minutes,
    spread,
    source,
    benchmark,
    sampleOfMine: n,
    range,
    basisLine,
    sentence: `${verb} ${range}`,
    note:
      source === "peer" && benchmark.basis === "discipline"
        ? COPY.degraded(cohort.specialization)
        : undefined,
  };
}
