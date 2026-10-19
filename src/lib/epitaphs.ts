/**
 * Epitaphs for the fallen: a one-paragraph recap of the player's own season,
 * written when they lose their last life and shown on their profile under
 * their headstone.
 *
 * The house style: factually accurate, funny, a bit edgy — a season recap
 * read aloud at the funeral. Every pick, score and stat in it is real, drafted
 * from the player's pick history and the actual results, and reviewed by the
 * commissioner in a PR before it is carved. Past weeks are public, so it may
 * name picks freely. Edgy about the picks, never cruel about the person.
 *
 * Keyed by player id. An eliminated player with no entry yet gets an epitaph
 * written from their record (`autoEpitaph`) until the commissioner has found
 * the words — see `epitaphFor`.
 */
import type { PlayerStanding } from '@/domain'
import { autoEpitaph } from './copy'

export interface Epitaph {
  /** One paragraph: their season, start to finish. */
  recap: string
  /** The week whose result put them here — asserted to match the engine. */
  writtenAfterWeek: number
}

/**
 * Empty until someone goes out. When a week knocks a player out, the
 * commissioner may carve their recap here, keyed by player id:
 *
 *   'aunt-linda': { recap: '…', writtenAfterWeek: 9 },
 *
 * Until then (or if she never does) the profile shows `autoEpitaph`, written
 * from the player's own record.
 */
export const EPITAPHS: Record<string, Epitaph> = {}

/**
 * The epitaph a fallen player's profile shows: the commissioner's own words
 * when she has written them for the week this player actually went out, and
 * the record's otherwise. A corrected result can move someone's elimination
 * week, and a recap carved for the old one would then be false — so it waits
 * for the engine to agree with it again.
 */
export function epitaphFor(
  playerId: string,
  displayName: string,
  standing: PlayerStanding,
  epitaphs: Record<string, Epitaph> = EPITAPHS,
): string | null {
  if (standing.status !== 'eliminated') return null
  const carved = epitaphs[playerId]
  if (carved && carved.writtenAfterWeek === standing.eliminatedWeek) return carved.recap
  return autoEpitaph(displayName, standing)
}
