/**
 * Generates the two seasons the app can load in demo mode:
 *
 * - src/data/demo/fixtures/demo-season.json — THE league (scripts/league.ts):
 *   the real roster and every pick the commissioner has recorded.
 * - src/data/demo/fixtures/test-season.json — the made-up league the test
 *   suite runs against (scripts/test-league.ts), so a real pick never breaks
 *   a test.
 *
 * REAL in both: the NFL schedule, cached from ESPN by `npm run schedule:fetch`.
 * ABSENT in both: results. None are fabricated; the app fetches them live, and
 * the commissioner can enter or correct any of them by hand.
 *
 * Deterministic (seeded PRNG) so the app, the tests and the screenshots agree.
 *
 * Run: npm run fixtures:generate
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  SeasonSnapshotSchema,
  type LeagueMembership,
  type NFLGame,
  type NFLWeek,
  type Pick,
  type PlayerImage,
  type PlayerProfile,
  type SeasonSnapshot,
} from '../src/domain/models'
import { LEAGUE } from './league'
import type { LeagueDefinition } from './league-types'
import { TEST_LEAGUE } from './test-league'

const SEASON_YEAR = 2026
const LEAGUE_ID = 'demo-league'
const SEASON_ID = 'demo-2026'

// ---------------------------------------------------------------------------
// Deterministic randomness (derived pick timestamps only — nothing about the
// schedule or anyone's results is generated)
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---------------------------------------------------------------------------
// Schedule — the REAL fixture list, cached by `npm run schedule:fetch`
//
// Reading a committed cache (rather than calling ESPN here) keeps fixture
// generation deterministic and offline-capable. If the cache is missing the
// build fails loudly instead of quietly inventing matchups: a made-up schedule
// shown as real is exactly the failure this project must not have.
// ---------------------------------------------------------------------------
interface CachedSchedule {
  seasonYear: number
  source: string
  fetchedAt: string
  weeks: Array<{ week: NFLWeek; games: NFLGame[] }>
}

const schedulePath = resolve(process.cwd(), 'scripts/data', `nfl-${SEASON_YEAR}-schedule.json`)
if (!existsSync(schedulePath)) {
  console.error(`Missing ${schedulePath}. Run: npm run schedule:fetch`)
  process.exit(1)
}
const cached = JSON.parse(readFileSync(schedulePath, 'utf8')) as CachedSchedule

const games: NFLGame[] = []
const weeks: NFLWeek[] = []
for (const entry of cached.weeks) {
  weeks.push(entry.week)
  games.push(...entry.games)
}

/**
 * Real headshots, imported from the commissioner's photo folder by
 * `npm run headshots:import` (which writes public/headshots/manifest.json).
 * A player with no photo simply has no image record and falls back to the
 * default avatar — nothing stands in for a real person's face.
 */
interface ManifestEntry {
  contentType: PlayerImage['contentType']
  sizeBytes: number
  width: number
  height: number
  variants: { thumb: string; medium: string }
}
const manifestPath = resolve(process.cwd(), 'public/headshots/manifest.json')
const manifest: Record<string, ManifestEntry> = existsSync(manifestPath)
  ? (JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, ManifestEntry>)
  : {}

function buildSeason(def: LeagueDefinition): SeasonSnapshot {
  const rand = mulberry32(def.seed)
  const between = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1))
  const known = new Set(def.people.map((p) => p.id))

  const memberships: LeagueMembership[] = def.people.map((p) => ({
    id: `m-${p.id}`,
    leagueId: LEAGUE_ID,
    seasonId: SEASON_ID,
    playerId: p.id,
    role: p.role,
    status: 'active',
    joinedAt: def.createdAt,
  }))

  const images: PlayerImage[] = def.useHeadshots
    ? def.people.flatMap((p) => {
        const entry = manifest[p.id]
        if (!entry) return []
        return [
          {
            id: `img-${p.id}`,
            playerId: p.id,
            contentType: entry.contentType,
            sizeBytes: entry.sizeBytes,
            width: entry.width,
            height: entry.height,
            variants: entry.variants,
            createdAt: def.createdAt,
          },
        ]
      })
    : []
  const withPhoto = new Set(images.map((i) => i.playerId))

  const profiles: PlayerProfile[] = def.people.map((p) => ({
    playerId: p.id,
    displayName: p.name,
    nickname: p.nickname,
    tagline: p.tagline,
    imageId: withPhoto.has(p.id) ? `img-${p.id}` : null,
  }))

  const picks: Pick[] = []
  for (const [playerId, byWeek] of Object.entries(def.picks)) {
    if (!known.has(playerId)) {
      throw new Error(`A pick is recorded for ${playerId}, who is not in the league's people list.`)
    }
    for (const [weekStr, entry] of Object.entries(byWeek)) {
      if (!entry) continue
      const week = Number(weekStr)
      if (week < def.startWeek) {
        throw new Error(
          `${playerId} has a week ${week} pick, but the league starts in week ${def.startWeek}.`,
        )
      }
      const [teamId, receivedAt] = entry
      const game = games.find(
        (g) => g.week === week && (g.homeTeamId === teamId || g.awayTeamId === teamId),
      )
      if (!game) {
        throw new Error(
          `${playerId} picked ${teamId} in week ${week}, but that team has no game in the real schedule. ` +
            'Check the pick, or refresh the cache with: npm run schedule:fetch',
        )
      }
      // Use the real arrival time where it is known. Otherwise derive a
      // deterministic one, anchored on the week's FIRST kickoff rather than this
      // game's: the deadline is shared by the whole week, so anchoring on a late
      // Sunday or Monday game invents picks submitted after it had passed.
      const weekOpensAt = Math.min(
        ...games.filter((g) => g.week === week).map((g) => new Date(g.kickoffAt).getTime()),
      )
      const submittedAt =
        receivedAt ?? new Date(weekOpensAt - (6 + between(1, 66)) * 3_600_000).toISOString()
      picks.push({
        id: `pick-${playerId}-${week}`,
        leagueId: LEAGUE_ID,
        seasonId: SEASON_ID,
        playerId,
        week,
        teamId,
        gameId: game.id,
        submittedAt,
        updatedAt: submittedAt,
        version: 1,
        source: def.pickSource(week),
      })
    }
  }

  return SeasonSnapshotSchema.parse({
    league: {
      id: LEAGUE_ID,
      name: def.name,
      tagline: def.tagline,
      createdAt: def.createdAt,
      settings: {
        defaultLives: def.lives,
        tieCountsAsMiss: true,
        missingPickCountsAsMiss: true,
        cancelledGamePolicy: 'void',
        simultaneousEliminationPolicy: 'co-champions',
        hidePicksUntilLocked: true,
        displayTimeZone: 'America/Chicago',
      },
      currentSeasonId: SEASON_ID,
    },
    season: {
      id: SEASON_ID,
      leagueId: LEAGUE_ID,
      year: SEASON_YEAR,
      label: '2026 Season',
      startWeek: def.startWeek,
      endWeek: 18,
      status: 'active',
      isSynthetic: false,
      notes: `${def.seasonNotes} Schedule: ${cached.source}, cached ${cached.fetchedAt}.`,
    },
    memberships,
    profiles,
    images,
    picks,
    games,
    weeks,
    gameOverrides: [],
    decision: null,
  })
}

const out = resolve(process.cwd(), 'src/data/demo/fixtures')
mkdirSync(out, { recursive: true })
for (const [file, def] of [
  ['demo-season.json', LEAGUE],
  ['test-season.json', TEST_LEAGUE],
] as const) {
  const snapshot = buildSeason(def)
  writeFileSync(resolve(out, file), JSON.stringify(snapshot, null, 2) + '\n')
  console.log(
    `wrote ${file}: ${snapshot.games.length} games, ${snapshot.picks.length} picks, ${snapshot.profiles.length} players`,
  )
}
