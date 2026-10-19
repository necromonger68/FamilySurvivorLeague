import type { LeagueMembership, Pick } from '../src/domain/models'

/** One person in a league. */
export interface Person {
  id: string
  name: string
  /** Left unset unless the person asked for one: a nickname is theirs to choose. */
  nickname?: string
  tagline?: string
  role: LeagueMembership['role']
}

/**
 * `[team]` or `[team, receivedAt]`.
 *
 * `receivedAt` is the REAL moment the pick reached the commissioner (the text
 * message's timestamp), in UTC. Without it a plausible time before the week's
 * deadline is derived — fine for a backfilled week, wrong for a week whose
 * deadline has a real answer.
 */
export type PickEntry = [string] | [string, string]

/**
 * playerId → week → pick. `null` records "asked and silent by the deadline":
 * it adds no pick (the engine already counts a missing pick as a lost life),
 * but says on the page that the silence was noticed rather than overlooked.
 */
export type Picks = Record<string, Record<number, PickEntry | null>>

export interface LeagueDefinition {
  name: string
  tagline: string
  /** When the league was set up (UTC). Every membership joins at this moment. */
  createdAt: string
  /** Lives every player starts with. */
  lives: number
  /** The first NFL week that counts. Earlier weeks are never required. */
  startWeek: number
  /** Shown on the season, for whoever maintains the data. */
  seasonNotes: string
  people: Person[]
  picks: Picks
  /** Where a pick in a given week came from. */
  pickSource: (week: number) => Pick['source']
  /** Use the headshots listed in public/headshots/manifest.json. */
  useHeadshots: boolean
  /** Seeds the derived pick times, so every regeneration agrees. */
  seed: number
}
