# Family NFL Survivor League

One pick a week. Two lives. Last one standing wins.

The family survivor league, run by **Maya Israel** (commissioner, and playing). It starts in **week 7 of the 2026 NFL season**; weeks 1–6 never count.

## Running the league (for the commissioner)

Picks come in by text. The site is a read-only scoreboard for the family; the commissioner keeps it up to date by asking Claude to change this repository, then merging the pull request.

**Each week**

1. **Collect picks by text** before the lock — five minutes before the week's first kickoff (usually Thursday, 7:10 PM Central). A pick that arrives after the lock is a miss: by then the first result may already be known.
2. **Record them.** Open [Claude Code on the web](https://claude.ai/code), choose this repository, and say what came in, e.g. *"Record week 8 picks: Mom took the Chiefs (texted 6:02 PM Tuesday), Uncle Bob took the Jets."* Claude adds them to [scripts/league.ts](scripts/league.ts), regenerates the season, runs the tests and opens a pull request.
3. **Write the week's note.** *"Write a funny week 8 note: everyone on Kansas City, Bob on the Jets again."* Notes live in [src/features/league-home/notes.ts](src/features/league-home/notes.ts) and show on the league page. A note published before the lock never names that week's picks (they are hidden until then).
4. **Merge the pull request** on GitHub. The site updates itself a minute or two later.

**Scores** update on their own: everyone's browser fetches live NFL results while games are on. Nobody has to enter results unless the feed gets one wrong.

**Someone loses their last life?** They get a headstone and a funeral on the league page automatically. If you want, ask Claude to write their epitaph too — a funny, factual recap of their season.

**Adding someone** (before their first pick): *"Add Aunt Linda to the league."* For a photo, upload it on GitHub into a `photos/` folder, named after them (`AuntLinda.jpg`), and ask Claude to import headshots: it crops a square headshot and removes the original from the folder. Anyone without a photo gets the default avatar.

A responsive React + TypeScript survivor-pool app that replaces the commissioner's spreadsheet. The **frontend is a static site built for GitHub Pages** (repository subpath and all); an **optional AWS serverless backend** adds real multi-user persistence, sign-in, headshot uploads and automatic results.

| Mode | Hosting | Data | Who it's for |
|------|---------|------|--------------|
| **Published** (what visitors see) | GitHub Pages | read-only scoreboard: real schedule, live scores, picks the commissioner has published | the league, on their phones |
| **Demo / static** (default) | GitHub Pages only | real roster, real picks, the real NFL schedule, live scores from ESPN, localStorage overlay (this browser only, not shared) | running the league, sharing a link |
| **Connected** | GitHub Pages + AWS (API Gateway, Lambda, DynamoDB, S3, Cognito) | authoritative, multi-user, audited | the real league |

## What's in the box

- **League Home** — who's still standing at a glance: headshot grid, lives, the bubble, the graveyard, this week's slate with each game's point spread, countdown to the next kickoff.
- **Player Dashboard** — big headshot, *Still Alive / On the Bubble / Eliminated / Champion*, lives meter, current pick, countdown, mini leaderboard.
- **Weekly Pick** — polished team cards with real logos (opponent, home/away, kickoff, availability), explicit *"You are riding with Green Bay in week 1."* confirmation, changeable until the deadline, huge tap targets on phones.
- **Leaderboard** — survivors first, then the desaturated **Survivor Graveyard**; champion spotlight with confetti.
- **Season Grid** — the spreadsheet reborn: players × weeks, cells coloured by win/loss/tie/pending/no-pick, elimination markers, hidden picks as locks; expandable cards on mobile.
- **My Season** — available / used / unavailable teams, pick history with outcomes, strategy nudges.
- **Player Profile** — a sports card: headshot, nickname, status, weeks survived, teams remaining.
- **Headstones** — lose your last life and your headshot becomes a headstone engraved with your cause of death (*"Died of the Seahawks, week 3. Complications: the Chargers (wk 1)…"*). Fresh graves get a funeral on the league page (the face crumbles, the stone rises), and the profile carries a hand-written, fact-checked epitaph.
- **Commissioner** — players & headshots (drag-drop, crop, replace, remove), enter/correct any pick, correct any result, manual schedule entry, league rules, champion decisions, CSV import with a blocking report, full audit log — every change recorded.

Rules engine, import, API and UI are covered by 120+ unit/API tests and 51 Playwright critical-path tests (desktop + mobile), including axe WCAG A/AA checks on every screen.

## Local development

Requirements: Node ≥ 22 (`.nvmrc` says 26), `jq`. No AWS account needed for demo mode.

```bash
bash init.sh                 # npm ci, git hooks, dev server on http://localhost:5881/ (demo mode)
bash init.sh --with-pages    # + production build served exactly like GitHub Pages at http://localhost:5882/Survivor/
bash init.sh --stop
```

Running locally gives you the full commissioner experience: sign in as any league member (no passwords in demo mode), with **Maya Israel** as commissioner. The **published** build hides every write control — no sign-in, no Pick tab, no make/change-pick buttons — because in demo mode a visitor's pick would only ever reach their own browser, and offering the button would make people think they had entered when they had not. Connected mode is interactive everywhere, because picks really are shared. The clock runs on real time, because the schedule is real. The commissioner's Settings tab can pin it to watch a week play out, and *Reset demo data* wipes localStorage. The test suite runs against a separate, made-up league ([scripts/test-league.ts](scripts/test-league.ts)), so recording a real pick never breaks a test.

Headshots come from your own photos: drop one image per player into `photos/` (named after them) and run `npm run headshots:import`. The originals stay local (`photos/` is gitignored); only the cropped variants are committed.

Useful scripts (`npm run …`): `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `validate` (all of CI), `fixtures:generate`, `import:report`, `api:build`, `knip`.

## Deploying the frontend to GitHub Pages

1. Push to GitHub. In **Settings → Pages → Build and deployment** choose **GitHub Actions**.
2. Merge to `main`. `.github/workflows/deploy-pages.yml` lints, typechecks, tests, builds with the base path derived from the repository name (`owner/Survivor` → `/Survivor/`; `owner.github.io` → `/`), and deploys.
3. Open `https://<owner>.github.io/<repo>/`.

Deep links survive refreshes: routing is hash-based, and a build-time `404.html` rewrites clean URLs like `/Survivor/leaderboard` to `/Survivor/#/leaderboard`. Details: [docs/github-pages.md](docs/github-pages.md).

## Connected mode (AWS)

`infra/template.yaml` (AWS SAM) creates one DynamoDB table, one S3 bucket, a Cognito user pool (Authorization Code + PKCE), an HTTP API with a JWT authorizer and two Lambdas. Deploy, seed the league, set the repository *variables* (`VITE_DATA_MODE=connected`, `VITE_API_BASE_URL`, …) and redeploy the site. Step by step: [docs/aws-connected-mode.md](docs/aws-connected-mode.md). Cost for a small league: a few cents a month.

Every `VITE_*` value is compiled into the public bundle. **No secrets ever go there** — the NFL provider key (if any) lives in AWS.

## NFL data

The app ships the **real NFL schedule**, cached from ESPN's public scoreboard by `npm run schedule:fetch` so builds stay deterministic and offline-capable. **Live scores** refresh from the same feed straight in the browser (the endpoint is CORS-open, so this works on GitHub Pages with no backend): Commissioner → Results → *Refresh live scores*, and automatically once a game is in progress. Result processing is idempotent and versioned, a result the commissioner enters by hand is never overwritten, and the league keeps running if the feed is down. See [docs/nfl-provider.md](docs/nfl-provider.md).

## Migrating from the spreadsheet

Export the sheet as CSV (players as rows, `Week 1…Week 18` columns, `*` after a losing pick), then either paste it into **Commissioner → Import** or run `npm run import:report -- sheet.csv --out report.md`. The report lists ambiguous cells, unknown teams, reused teams, missing picks, bye conflicts and loss markers that contradict results. Nothing is guessed. See [docs/import-report.md](docs/import-report.md).

## Repository map

```
src/domain      pure rules engine, models (zod), CSV import      ← shared with Lambda
src/data        Services interfaces; demo + api adapters
src/app         router (HashRouter), providers, hooks, queries
src/features    the eight experiences
src/components  headshots, lives meter, team monograms, UI primitives
backend/        AWS Lambda API + results sync (esbuild bundles)
infra/          SAM template, seed example
scripts/        fixtures, headshots, static server, import CLI, hooks, guard
tests/          architecture rules, unit, guardrails, Playwright e2e
docs/           deep documentation
```

Agent-facing docs: [AGENTS.md](AGENTS.md).

## Licence / assets

Team logos are fetched from ESPN's public CDN by `npm run logos:fetch` and served from `public/team-logos/`; they are third-party marks used here for a private league's own scoreboard, so check your own position before publishing more widely. If a logo is missing the UI falls back to a team-coloured monogram. Player headshots are the commissioner's own photos, imported by `npm run headshots:import`.
