# Toggl — estimation intelligence in week one

Toggl's Projects list already shows **Time status** and **Variance**. It already
measures, precisely, how wrong every estimate was — and then does nothing with
it. The loop is measured but never closed.

This closes it, and bootstraps it from anonymised peer data so it works for a
freelancer with zero history, from minute one.

**The scenario:** a freelance brand identity designer signs up today and has just
landed a new client project. No history, no baseline, nothing for Toggl to
estimate from. Value has to land inside their first week.

---

## Where it lives

Everything is in **Timer** — the area Toggl serves at `/calendar` — rebuilt in
Toggl 2.0's split layout. Every day is two lanes: `LOGGED` on the left,
`PLANNED` on the right.

That split is doing the real work. One task holds a block in **both** lanes: the
estimate on the right, what actually happened on the left. An overrun stops
being a number in a table on another screen and becomes two blocks of different
heights, side by side, an inch apart.

```
   LOGGED   │  PLANNED
  ──────────┼──────────
   3h 20m   │  2h 30m     ← the same review, planned and lived
```

## The flow

**1. Onboarding, inside Toggl's own.** The live product opens by asking what you
will mainly use Toggl for, and tailors the first experience to the answer —
which is exactly the seam this feature belongs in. So rather than a separate
overlay, **Smart benchmarking** is added as a fourth answer at the top of that
list. The other three stay, and stay selectable, but disable Continue: leaving
them out would hide that this is one option among several, and greying them out
would hide what they are.

Choosing it continues through Toggl's calendar step — reproduced, with both
**Connect** buttons disabled, since calendar integrations are out of scope —
and then into three questions: discipline + specialization (dependent selects),
typical client type, and the project you are starting.

The whole flow lives at `/onboarding`, on its own route before the app shell,
as Toggl's does. `/calendar` bounces there until it has been answered.

Q1 and Q2 are the entire reason Toggl can say anything on day one: they pick a
peer cohort. Each question says what it buys rather than just asking. **Skip** is
always live and equally weighted, and skipping lands on an **empty calendar** —
no cohort, nothing to suggest — with a notification in the drawer saying what
that cost and how to undo it. That is the honest outcome, and it is the point
of asking.

**2. The week arrives.** Thirteen suggestions the instant Q3 is answered. No
loading state, no "setting things up".

Every suggestion shows an estimate as a **range**, never a bare number, and says
where it came from. Where the brand identity sample is too thin, the number
degrades to the parent Design cohort and admits it: *"Designers generally take
1h 45m ±30% · Not much brand identity data yet."*

**3. Accept, adjust or reject.** Per task from the block, or all at once from the
pill. Adjusting opens the details panel, where the estimate has to justify
itself before you commit to it, and where start, end and duration are editable.

**4. Log time.** Hover a planned block, hit the play button. One click, no live
timer. Then watch the loop close.

## The three beats

Four **design reviews** on four different deliverables, spread across the week at
four different times of day — project work, not a daily recurring task. Logging
them drives the progression.

Actuals are **sampled from this designer's real pace**, not scripted, so the
numbers differ every run. One example:

| Review | Estimate | Logged | What happens |
| --- | --- | --- | --- |
| 1 | 2h 30m (peer) | 3h 40m | Variance shown. **Nothing else moves.** *"One entry is not a pattern."* |
| 2 | 2h 30m (peer) | 3h 45m | **First adjustment.** Reviews 3 and 4 → 3h, highlighted on the blocks. |
| 3 | 3h (blended) | 3h 15m | **Switch to personal.** Review 4 → 3h 35m. *"You usually take…"* replaces *"designers usually take…"*. |

Every number follows from the logs: `150 × 0.6 + 222.5 × 0.4 = 179` → 3h on the
5-minute grid, then the mean of all three → 3h 35m. Retype any logged duration
and the whole model recomputes from it.

**Where each beat shows up:**

- **On the blocks that changed** — accent outline plus a `2h 30m → 3h` chip, with
  the same ✓ / ✕ a suggestion gets. An adjustment is a proposal too, so it uses
  the same affordances: accept it, decline it back to the old number, or take
  them all from the pill.
- **In the details panel** — click any adjusted block for the before → after and
  the reasoning behind it.
- **In the notification drawer** — the bell in the sidebar rail. Toggl already
  has a home for "the system concluded something"; a banner of its own would
  have been a second one competing with it.

Personalisation triggers on the **number of completed entries**, not elapsed
days. The UI says so out loud on every notification — `2 of 3 design reviews
logged` — because a user who is not told will assume it was time passing.

Toggl's **Get started** checklist in the sidebar tracks the same three beats, so
there is somewhere to look that says what to do next without a tour or a
tooltip. Items strike through as they are met — review the plan, log something,
log enough for the system to learn — and the panel folds itself away when the
third one completes, because that is the end of the demo.

**Restart demo** in the toolbar replays the whole thing from the first question.

---

## Running it

```bash
npm install
npm run dev
```

Then <http://localhost:3000/calendar>. `/` redirects there. Deploys to Vercel as
a stock Next.js App Router app — no config needed.

## Layout

| Path | Purpose |
| --- | --- |
| `lib/timerData.ts` | **The tuning file.** Every mock value and every estimate number. |
| `app/calendar/page.tsx` | The one real view |
| `app/onboarding/page.tsx` | The onboarding route; hands the calendar a seeded session |
| `components/timer/TimerView.tsx` | All state, and the derivation of entries and notifications |
| `components/timer/WeekGrid.tsx` | Day headers, all-day row, the two-lane grid |
| `components/timer/EntryBlock.tsx` | One block, in either lane |
| `components/timer/EntryDetails.tsx` | Details panel: times, and why the number is what it is |
| `components/timer/NotificationDrawer.tsx` | The bell drawer, where the progression speaks |
| `components/timer/Onboarding.tsx` | Toggl's intent screen plus the three questions |
| `components/timer/GetStarted.tsx` | The sidebar checklist |
| `components/timer/AskToggl.tsx` | The Ask Toggl side panel |
| `components/timer/session.ts` | Module-scope state, and the seed onboarding hands over |
| `components/timer/layout.ts` | Minutes → pixels, and within-lane overlap |
| `components/timer/types.ts` | Entry, lane, beat, notification |
| `components/Sidebar.tsx` | Toggl shell nav, collapse, and the notification bell |
| `components/OutOfScope.tsx` | Where every other sidebar destination lands |
| `components/Icons.tsx` | Icon set, mostly Toggl's own SVG paths |
| `app/globals.css` | Design tokens and all component styles |
| `app/icon.svg` | Toggl's own favicon (the inactive variant — nothing is ever running) |

Every sidebar destination other than Timer is a **real route** rendering
`OutOfScope`, not a 404. That matters: a 404 forces a hard navigation, which
would wipe the week you just planned. `app/not-found.tsx` still catches
genuinely unknown URLs.

## Tuning it

`lib/timerData.ts` holds the week, grid geometry, project, onboarding options,
peer benchmarks, learning constants, the thirteen-task plan, this designer's
true pace, and all the copy. Nothing under `components/timer/` invents a
duration or a percentage.

Two tables do the work, and they must stay separate:

- **`PEER_BENCHMARKS`** — what Toggl believes before it knows you. `median`,
  `spread`, `sampleSize`, and a `basis` flag that decides whether the number can
  speak for the specialization or has to degrade to the parent discipline.
- **`TRUE_PACE`** — how long this person actually takes. Actuals are sampled
  from here when they log. Deriving an actual from an estimate would make the
  estimate chase itself and never converge.

The constants that shape the progression:

```ts
personalThreshold: 3   // completed entries before estimates go fully personal
blendWeight: 0.4       // at 2 entries: peer * 0.6 + yours * 0.4
roundToMinutes: 5      // display grid for every duration on screen
```

`TRUE_PACE` deliberately puts this designer **under** the peer median on some
task types (kickoffs, moodboards, colour work) and over on others — a blanket
overrun reads as a multiplier someone applied rather than a person working. It
also sharpens the claim: the system did not inflate everything, it learned
something specific about design reviews. That row carries the tightest spread of
the ten, because the three beats hang on it being reliably long.

## Design decisions worth knowing

- **The plan and the log are separate values.** Editing a planned duration
  changes the plan; editing a logged duration changes the actual. Neither moves
  the other. A logged task keeps the estimate it was working to, so later logs
  cannot rewrite what it was planned at.
- **Correcting an actual ripples forward.** Each log's reference estimate is
  derived by replaying the log order, not frozen at log time — so retyping a
  duration recomputes every estimate after it, and rewrites the notification it
  produced.
- **Variance lives in the popover, not on the calendar.** The two blocks already
  sit side by side at their true heights; a number stamped on top is noise.
- **The header pills never fill.** `@ Task` / `+ Project` / `# Tags` describe the
  entry a *running timer* would create. Nothing ever runs here, so they stay in
  their empty state — which is what the live app does too.
- **State survives navigation, not reload.** Module-scope, no localStorage. A
  fresh tab gets a fresh run, and **Restart demo** is the explicit reset.

## Measurements

Values were read out of the live Toggl 2.0 app with `getComputedStyle` rather
than eyeballed:

- 60px per hour, a 71px hour gutter, days 220px wide split into two 110px lanes
- Blocks `#9494f9` with a `0.667px #2727a5` outline at 8px radius, text `#131213`
- Day headers: date 22px/400, logged total in `#c282b9` against a muted planned
  total, today badge a 36px circle of accent-at-10%
- Sidebar collapse: `0.15s cubic-bezier(.4, 0, .2, 1)`, rail stays 48px
- Notification drawer, entry details panel and Ask Toggl panel geometry
- Toolbar and calendar icons lifted from the app's own SVG paths

## Notes

- React state only. No localStorage, no backend, no API calls.
- The week is pinned to W36 2026 (Mon 31 Aug – Sun 6 Sep) with "today" on
  Monday, so the plan always sits ahead of the user. The week is fixed; the
  numbers logged into it are not.
- `AGENTS.md` and `CLAUDE.md` are generated by Next.js 16 on first run.

<details>
<summary>One thing you might not notice</summary>

**Ask Toggl answers once.** The sidebar bar, or Ctrl/Cmd+K, once you are past
onboarding. It has exactly one thing to say, which is the same argument the rest
of the prototype makes, said shorter. It is additive, appears only after the
populated week, and touches nothing in the core flow.

</details>
