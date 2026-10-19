import type { LeagueDefinition } from './league-types'

/**
 * THE TEST LEAGUE — made up, and only ever seen by the test suite.
 *
 * The real league (scripts/league.ts) changes every week as picks come in, and
 * a test pinned to a real person's pick would break the week they changed it.
 * So the end-to-end tests and the data-layer unit tests run against this
 * league instead (`VITE_DEMO_FIXTURE=test`, set by playwright.config.ts), and
 * recording a real pick never touches a test.
 *
 * Every name here is invented. The picks are a real-looking season — thirty
 * players, weeks 1–6 against the real 2026 schedule, the crowd piling onto the
 * same favourites — so the tests exercise reveals, shared picks, misses and
 * a graveyard the way a real league produces them.
 *
 * Three lives, starting in week 1: the engine's defaults, which the specs were
 * written against. The real league's own settings (two lives, week 7) are
 * asserted by src/data/demo/fixtures.test.ts.
 *
 * Shape of note for the tests:
 * - Glen Porter and Hank Doyle are two of the six players on the Lions in week 1.
 * - Felix Grant named a team he had already used in week 4, so the
 *   commissioner ruled it a miss; Jonah Pike, Gwen Tally and Earl Thorne sent
 *   nothing in week 2.
 * - Morgan Reyes is the commissioner, and plays.
 */
export const TEST_LEAGUE: LeagueDefinition = {
  name: 'The Test League',
  tagline: 'One pick. Three lives. Nobody here is real.',
  createdAt: '2026-08-15T14:00:00.000Z',
  lives: 3,
  startWeek: 1,
  seasonNotes: 'Invented roster and picks over the real 2026 schedule, for the test suite only.',
  people: [
    { id: 'robin-hayes', name: 'Robin Hayes', role: 'player' },
    { id: 'sam-ortiz', name: 'Sam Ortiz', role: 'player' },
    { id: 'glen-porter', name: 'Glen Porter', role: 'player' },
    { id: 'hank-doyle', name: 'Hank Doyle', role: 'player' },
    { id: 'ned-archer', name: 'Ned Archer', role: 'player' },
    { id: 'lena-vasquez', name: 'Lena Vasquez', role: 'player' },
    { id: 'mabel-quist', name: 'Mabel Quist', role: 'player' },
    { id: 'felix-grant', name: 'Felix Grant', role: 'player' },
    { id: 'tess-morgan', name: 'Tess Morgan', role: 'player' },
    { id: 'brent-lowry', name: 'Brent Lowry', role: 'player' },
    { id: 'celia-brandt', name: 'Celia Brandt', role: 'player' },
    { id: 'jonah-pike', name: 'Jonah Pike', role: 'player' },
    { id: 'otto-kowalski', name: 'Otto Kowalski', role: 'player' },
    { id: 'curtis-bell', name: 'Curtis Bell', role: 'player' },
    { id: 'nina-fischer', name: 'Nina Fischer', role: 'player' },
    { id: 'wade-larkin', name: 'Wade Larkin', role: 'player' },
    { id: 'roy-hensley', name: 'Roy Hensley', role: 'player' },
    { id: 'gus-whitman', name: 'Gus Whitman', role: 'player' },
    { id: 'jj-barlow', name: 'JJ Barlow', role: 'player' },
    { id: 'leon-park', name: 'Leon Park', role: 'player' },
    { id: 'vince-carr', name: 'Vince Carr', role: 'player' },
    { id: 'hazel-reed', name: 'Hazel Reed', role: 'player' },
    { id: 'ivy-sutton', name: 'Ivy Sutton', role: 'player' },
    { id: 'walt-becker', name: 'Walt Becker', role: 'player' },
    { id: 'rosa-delgado', name: 'Rosa Delgado', role: 'player' },
    { id: 'edna-fairley', name: 'Edna Fairley', role: 'player' },
    { id: 'clyde-mercer', name: 'Clyde Mercer', role: 'player' },
    { id: 'gwen-tally', name: 'Gwen Tally', role: 'player' },
    { id: 'earl-thorne', name: 'Earl Thorne', role: 'player' },
    { id: 'morgan-reyes', name: 'Morgan Reyes', role: 'commissioner' },
  ],
  picks: {
    'robin-hayes': {
      1: ['JAX'],
      2: ['BAL', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-22T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-07T03:22:35.000Z'],
      6: ['NE', '2026-10-14T12:55:49.000Z'],
    },
    'sam-ortiz': {
      1: ['BAL'],
      2: ['SF', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T19:57:23.000Z'],
      6: ['LAR', '2026-10-15T18:41:12.000Z'],
    },
    'glen-porter': {
      1: ['DET'],
      2: ['BAL', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['CHI', '2026-10-01T15:00:00.000Z'],
      5: ['CIN', '2026-10-08T15:55:13.000Z'],
      6: ['IND', '2026-10-15T17:22:41.000Z'],
    },
    'hank-doyle': {
      1: ['DET'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['SEA', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T22:41:20.000Z'],
      6: ['LAR', '2026-10-15T14:06:42.000Z'],
    },
    'ned-archer': {
      1: ['LAC'],
      2: ['TB', '2026-09-15T15:00:00.000Z'],
      3: ['SF', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T19:36:53.000Z'],
    },
    'lena-vasquez': {
      1: ['LAC'],
      2: ['SF', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-22T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-06T14:20:38.000Z'],
      6: ['LAR', '2026-10-14T15:46:07.000Z'],
    },
    'mabel-quist': {
      1: ['SEA'],
      2: ['TB', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T13:33:36.000Z'],
      6: ['LAR', '2026-10-15T16:06:59.000Z'],
    },
    'felix-grant': {
      1: ['BAL'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: null,
      5: ['DAL', '2026-10-06T14:23:12.000Z'],
      6: ['NE', '2026-10-15T12:10:48.000Z'],
    },
    'tess-morgan': {
      1: ['SEA'],
      2: ['SF', '2026-09-16T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-05T15:00:00.000Z'],
      6: ['LAR', '2026-10-15T19:02:25.000Z'],
    },
    'brent-lowry': {
      1: ['DET'],
      2: ['CHI', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-22T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-05T13:04:46.000Z'],
      6: ['SF', '2026-10-13T12:03:18.000Z'],
    },
    'celia-brandt': {
      1: ['JAX'],
      2: ['TB', '2026-09-16T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T15:14:19.000Z'],
      6: ['IND', '2026-10-15T16:27:58.000Z'],
    },
    'jonah-pike': {
      1: ['LAC'],
      2: null,
      3: ['BUF', '2026-09-22T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T15:00:27.000Z'],
    },
    'otto-kowalski': {
      1: ['JAX'],
      2: ['TB', '2026-09-17T15:00:00.000Z'],
      3: ['PHI', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T20:07:38.000Z'],
    },
    'curtis-bell': {
      1: ['PIT'],
      2: ['TB', '2026-09-17T15:00:00.000Z'],
      3: ['SEA', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['HOU', '2026-10-08T19:43:01.000Z'],
      6: ['IND', '2026-10-15T22:02:57.000Z'],
    },
    'nina-fischer': {
      1: ['LAC'],
      2: ['PHI', '2026-09-17T15:00:00.000Z'],
      3: ['SF', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['CIN', '2026-10-08T19:39:50.000Z'],
      6: ['NE', '2026-10-14T20:08:53.000Z'],
    },
    'wade-larkin': {
      1: ['JAX'],
      2: ['SF', '2026-09-15T15:00:00.000Z'],
      3: ['DET', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T19:59:20.000Z'],
      6: ['LAR', '2026-10-15T18:42:04.000Z'],
    },
    'roy-hensley': {
      1: ['GB'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T15:52:57.000Z'],
      6: ['LAR', '2026-10-15T15:13:32.000Z'],
    },
    'gus-whitman': {
      1: ['SEA'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T17:45:05.000Z'],
      6: ['LAR', '2026-10-15T18:44:29.000Z'],
    },
    'jj-barlow': {
      1: ['JAX'],
      2: ['TB', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-22T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T22:19:50.000Z'],
      6: ['LAR', '2026-10-14T12:48:38.000Z'],
    },
    'leon-park': {
      1: ['JAX'],
      2: ['TB', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['WAS', '2026-10-08T00:30:34.000Z'],
      6: ['LAR', '2026-10-15T14:03:10.000Z'],
    },
    'vince-carr': {
      1: ['LAC'],
      2: ['CLE', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-06T14:17:53.000Z'],
      6: ['LAR', '2026-10-13T13:56:00.000Z'],
    },
    'hazel-reed': {
      1: ['DAL'],
      2: ['BUF', '2026-09-17T15:00:00.000Z'],
      3: ['SEA', '2026-09-23T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['HOU', '2026-10-08T18:54:51.000Z'],
      6: ['IND', '2026-10-14T13:33:18.000Z'],
    },
    'ivy-sutton': {
      1: ['DET'],
      2: ['BUF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['CIN', '2026-10-08T21:49:26.000Z'],
      6: ['IND', '2026-10-15T20:12:07.000Z'],
    },
    'walt-becker': {
      1: ['PIT'],
      2: ['BAL', '2026-09-15T15:00:00.000Z'],
      3: ['SEA', '2026-09-24T15:00:00.000Z'],
      4: ['DET', '2026-10-01T15:00:00.000Z'],
    },
    'rosa-delgado': {
      1: ['JAX'],
      2: ['SF', '2026-09-15T15:00:00.000Z'],
      3: ['KC', '2026-09-23T15:00:00.000Z'],
      4: ['MIN', '2026-10-01T15:00:00.000Z'],
      5: ['CIN', '2026-10-07T20:13:08.000Z'],
      6: ['NE', '2026-10-15T13:49:22.000Z'],
    },
    'edna-fairley': {
      1: ['SEA'],
      2: ['BUF', '2026-09-17T15:00:00.000Z'],
      3: ['GB', '2026-09-24T15:00:00.000Z'],
      4: ['PIT', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T22:22:13.000Z'],
    },
    'clyde-mercer': {
      1: ['DET'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-08T19:38:22.000Z'],
    },
    'gwen-tally': {
      1: ['DET'],
      2: null,
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BUF', '2026-10-01T15:00:00.000Z'],
      5: ['NE', '2026-10-08T22:06:29.000Z'],
      6: ['LAR', '2026-10-15T21:40:19.000Z'],
    },
    'earl-thorne': {
      1: ['LAC'],
      2: null,
      3: ['KC', '2026-09-22T15:00:00.000Z'],
      4: ['CHI', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-05T13:34:26.000Z'],
    },
    'morgan-reyes': {
      1: ['LAC'],
      2: ['SF', '2026-09-17T15:00:00.000Z'],
      3: ['KC', '2026-09-24T15:00:00.000Z'],
      4: ['BAL', '2026-10-01T15:00:00.000Z'],
      5: ['DAL', '2026-10-07T11:34:29.000Z'],
      6: ['LAR', '2026-10-15T12:17:31.000Z'],
    },
  },
  // Week 1 arrived as a spreadsheet import; later weeks were relayed to the commissioner.
  pickSource: (week) => (week === 1 ? 'import' : 'commissioner'),
  useHeadshots: false,
  seed: 20260910,
}
