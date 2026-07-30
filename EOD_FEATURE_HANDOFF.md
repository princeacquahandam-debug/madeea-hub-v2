# EOD Reports — feature handoff

A single, self-contained feature branch: the **EOD Reports** page for the MadeEA
Command Center. Branch: `feat/eod-reports`, based on `main` at commit `5fa1dc0`
("Add Command Center, follow-ups, SLA, meeting prep & voice features").

This is **only** the EOD feature. Nothing else from the author's working branch
(MFA, domain sign-up, password reset, security headers, etc.) is included — see
"Deliberately excluded" below.

> **Integration note (how this actually landed in `madeea-hub`).** The patch was
> cut against an older checkout and its three migrations (`0013_task_history_and_snoozes`,
> `0016_eod`, `0019_one_identity_per_account`) collided with — and in one case
> **regressed** — migrations that already exist here (this repo is at `0020`). They
> were replaced by a single **`0021_eod_reports.sql`** that adds only the
> genuinely-new EOD schema (task `blocked`/`blocker_note`, the `eod_reports` table,
> and the one-identity trigger). The branch's `0013` was dropped entirely: its
> task-history/snooze schema already exists here, and re-applying it would have
> restored a `for all` write policy on `task_events`, undoing the audit-trail
> lockdown from `0020`. **Apply `0021`, not `0013`/`0016`/`0019`.**

## What it adds

A new **EOD Reports** page at `/eod` (nav item under Operations):

- Your end-of-day report is **drafted from the Task Manager** — completed-today,
  blocked, and still-open tasks, pulled automatically. You review, add anything
  that isn't a task, and submit.
- **Task blockers**: mark a task blocked (with a reason); it shows on the board
  and rolls into the EOD by itself.
- **File for a past day** (date picker) and **delete** a report.
- Team view: submission compliance per person, every blocker, a coverage grid,
  and a searchable list of all reports.
- A self-serve guided tour on first visit.

## Files

**New**
- `src/pages/EodReports.tsx` — the page
- `src/lib/eodDraft.ts` — derive a draft from the board
- `src/data/eod.ts` — non-sensitive people/dates/coverage scaffold
- `src/data/eodImport.ts` — history adapter (empty by default; see seed note)
- `src/store/demoEod.ts` — demo-mode persistence
- `src/components/PageTour.tsx` — reusable per-page guided tour
- `scripts/` — regenerate `eod.ts` from the source sheet
- `supabase/migrations/0013_task_history_and_snoozes.sql` — task `completed_at`,
  `assignee_id`, `task_events`, `snoozes` (dependency of the draft logic)
- `supabase/migrations/0016_eod.sql` — `eod_reports` table + task `blocked` /
  `blocker_note`
- `supabase/migrations/0019_one_identity_per_account.sql` — a report is
  attributed to the owner's profile name, so one account can't fork into two
  identities across devices

**Modified (EOD-only edits)**
- `src/App.tsx` — the `/eod` route
- `src/lib/constants.ts` — the nav item
- `src/lib/guides.ts` — the page's "How this works" entry
- `src/data/hooks.ts` — `useEodReports` / `useSubmitEod` / `useDeleteEod`
- `src/types/db.ts` — `EodReport`, task `blocked` / `blocker_note`
- `src/pages/Tasks.tsx` — the "blocked, and why" field

## ⚠️ Merge notes (please read)

1. **Migration numbering.** Production is ahead of this repo's committed
   migrations. Confirm what's actually applied to the main database before
   running `0013` / `0016` / `0019`, and renumber if a `0013+` already exists.
   The SQL is written to be idempotent (`if not exists`, `create or replace`),
   but the filenames may still collide.

2. **`0013` is a dependency, not decoration.** The draft logic reads
   `tasks.completed_at` and `tasks.assignee_id`; `0016` adds them defensively but
   `0013` is where they properly belong along with `task_events` / `snoozes`.

3. **July history is NOT in this branch, on purpose.** The seed of the team's
   past reports contains security-sensitive text (a live vulnerability
   disclosure, a personal email). It must not live in a shared repo. Load it
   out-of-band if you want the history; the feature works without it (the page
   simply starts empty until people submit).

4. **No new npm dependencies.** The build passes as-is (`npm run build`).

## Deliberately excluded (available separately if wanted)

These shipped in the same session but are **not** part of this feature branch:
MFA, `@`-domain-restricted sign-up + the sign-up UI, password reset /
change-password, Content-Security-Policy + security headers, DOMPurify sanitising
of AI output, the sidebar version badge, and fail-closed auth. Ask the author for
the `eod-dashboard` branch if any of those are also wanted.
