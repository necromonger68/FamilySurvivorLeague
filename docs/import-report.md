# Spreadsheet import report

## Where the league data comes from

This league does not use a spreadsheet: picks arrive by text and are recorded in `scripts/league.ts` (see AGENTS.md → Commissioner tasks). The importer stays available in case a commissioner ever keeps a sheet:

```bash
npm run import:report -- path/to/sheet.csv --out report.md
```

A real sheet names real people, so keep it out of the repository (`data/import/league.csv` is gitignored for exactly that).

`data/import/sample-league.csv` is a format example with placeholder names, kept for documentation and covered by the `import-report-sample` registry entry.

## What the report flags

| Code | Severity | Meaning |
|------|----------|---------|
| `AMBIGUOUS_TEAM` | error | e.g. "Los Angeles" (LAC or LAR), "New York" (NYG or NYJ) — choose one. |
| `UNKNOWN_TEAM` | error | cell text is not a recognisable team. |
| `REUSED_TEAM` | error | same team in two weeks for one player. |
| `DUPLICATE_PLAYER`, `EMPTY_PLAYER_NAME`, `HEADER_MISSING`, `WEEK_COLUMN_UNRECOGNISED` | error/warning | structural problems. |
| `TEAM_ON_BYE` | error | team did not play that week (needs the schedule). |
| `MISSING_PICK` | warning | empty cell before the player's latest pick — counted as a miss. |
| `PICK_AFTER_ELIMINATION` | warning | picks recorded after a third miss. |
| `LOSS_MARKER_CONTRADICTS_RESULT` | warning | the sheet's red cell disagrees with the known result. |
| `RECORDED_LOSS` | info | red cell preserved where no result is available to verify. |
| `UNKNOWN_PLAYER` | error | (at commit) no league member matches the row name. |

## Sample run

`data/import/sample-report.md` is the report for the sample CSV against the demo schedule (one warning: a deliberately blank week-2 cell).
