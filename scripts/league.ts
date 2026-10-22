import type { LeagueDefinition } from './league-types'

/**
 * THE LEAGUE — who is in it, and every pick they have sent.
 *
 * This is the file that changes each week. The family texts their picks to
 * Maya, the commissioner; each one is recorded here, then
 * `npm run fixtures:generate` rebuilds the season the site loads
 * (src/data/demo/fixtures/demo-season.json).
 *
 * Recording a pick:
 *   - Add it under the player and the week: `7: ['KC', '2026-10-21T23:14:00.000Z']`
 *     — the team's abbreviation, and when the text arrived, in UTC.
 *   - The team must have a game that week; the generator refuses one that does
 *     not, and src/data/demo/fixtures.test.ts refuses a team the player has
 *     already used, or a pick that arrived after the week locked.
 *   - A pick that arrives after the lock is not recorded: by then the early
 *     result may be known. Write `7: null` so the miss is on the record.
 *
 * Adding a person: one line in `people`. The id is their name in lower-case
 * kebab (`aunt-linda`), and it never changes once they have a pick. A photo in
 * photos/ named after them, then `npm run headshots:import`, gives them a face.
 *
 * Nothing here is invented: a person or a pick appears only once the
 * commissioner has supplied it.
 */
export const LEAGUE: LeagueDefinition = {
  name: 'Family NFL Survivor League',
  tagline: 'One pick. Two lives. No mercy for family.',
  createdAt: '2026-10-19T15:00:00.000Z',
  lives: 2,
  // The league starts in the middle of the NFL season: weeks 1–6 never count.
  startWeek: 7,
  seasonNotes:
    'Real roster, picks as texted to the commissioner, and the real NFL schedule. ' +
    'Results come from the live score feed; the commissioner can always enter or correct one by hand.',
  people: [
    // Commissioner: runs the league, writes the notes, and plays.
    { id: 'maya-israel', name: 'Maya Israel', role: 'commissioner' },
    { id: 'eden-katz', name: 'Eden Katz', role: 'player' },
    { id: 'steve-harkov', name: 'Steve Harkov', role: 'player' },
    { id: 'michele-harkov', name: 'Michele Harkov', role: 'player' },
    { id: 'jordan-harkov', name: 'Jordan Harkov', role: 'player' },
    { id: 'aaron-harkov', name: 'Aaron Harkov', role: 'player' },
    { id: 'eli-harkov', name: 'Eli Harkov', role: 'player' },
    { id: 'eyal-israel', name: 'Eyal Israel', role: 'player' },
    { id: 'orit-israel', name: 'Orit Israel', role: 'player' },
    { id: 'karin-israel', name: 'Karin Israel', role: 'player' },
    { id: 'robin-herman', name: 'Robin Herman', role: 'player' },
    { id: 'tzvi-herman', name: 'Tzvi Herman', role: 'player' },
  ],
  picks: {
    'karin-israel': { 7: ['MIN', '2026-10-21T01:50:00.000Z'] },
    'maya-israel': { 7: ['HOU', '2026-10-21T03:26:00.000Z'] },
    'steve-harkov': { 7: ['PIT', '2026-10-21T16:47:00.000Z'] },
    'eyal-israel': { 7: ['CAR', '2026-10-21T18:07:00.000Z'] },
    'aaron-harkov': { 7: ['NYJ', '2026-10-22T19:07:00.000Z'] },
  },
  pickSource: () => 'commissioner',
  useHeadshots: true,
  seed: 20261022,
}
