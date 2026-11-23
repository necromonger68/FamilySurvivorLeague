import { weekSummary, type SeasonEvaluation } from '@/domain'
import { NOTES, type LeagueNote } from './notes'

/**
 * Which week's commissioner note the home page shows.
 *
 * Normally the current week's: the first week that is not final, so a recap
 * for week N+1 waits until every week N game is over, Monday night included.
 *
 * A note marked `postEarly` may go up sooner: once every pick in the current
 * week has a result (the engine's `settled`), the games still left are games
 * nobody picked, so nothing in the recap can change. The week must also have
 * locked, so no pick for it is still secret.
 */
export function noteWeekFor(
  evaluation: SeasonEvaluation,
  notes: Record<number, LeagueNote> = NOTES,
): number {
  const current = evaluation.currentWeek
  if (!notes[current + 1]?.postEarly) return current

  const week = weekSummary(evaluation, current)
  const locked = week?.phase === 'locked' || week?.phase === 'final'
  return week && locked && week.requiresPick && week.settled ? current + 1 : current
}
