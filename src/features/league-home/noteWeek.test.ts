import { describe, expect, it } from 'vitest'
import type { SeasonEvaluation, WeekSummary } from '@/domain'
import type { LeagueNote } from './notes'
import { noteWeekFor } from './noteWeek'

const note = (extra: Partial<LeagueNote> = {}): LeagueNote => ({
  heading: 'Word from the commissioner',
  lines: ['A note.'],
  ...extra,
})

/** Just enough of an evaluation for noteWeekFor: the current week and its summary. */
function evaluationAt(week: Partial<WeekSummary>): SeasonEvaluation {
  const summary = {
    week: 11,
    phase: 'locked',
    isCurrent: true,
    requiresPick: true,
    settled: true,
    ...week,
  } as WeekSummary
  return { currentWeek: 11, weeks: [summary] } as SeasonEvaluation
}

describe('noteWeekFor', () => {
  it('shows the current week’s note by default, even once every pick is decided', () => {
    const notes = { 11: note(), 12: note() }
    expect(noteWeekFor(evaluationAt({ settled: true }), notes)).toBe(11)
  })

  it('posts an early note once every pick in the current week has a result', () => {
    const notes = { 11: note(), 12: note({ postEarly: true }) }
    expect(noteWeekFor(evaluationAt({ settled: true }), notes)).toBe(12)
  })

  it('holds an early note while any pick is still being played', () => {
    const notes = { 12: note({ postEarly: true }) }
    expect(noteWeekFor(evaluationAt({ settled: false }), notes)).toBe(11)
  })

  it('holds an early note until the week has locked', () => {
    const notes = { 12: note({ postEarly: true }) }
    expect(noteWeekFor(evaluationAt({ phase: 'open', settled: true }), notes)).toBe(11)
    expect(noteWeekFor(evaluationAt({ phase: 'no-data', settled: false }), notes)).toBe(11)
  })

  it('holds an early note when the week had nothing to pick', () => {
    const notes = { 12: note({ postEarly: true }) }
    expect(noteWeekFor(evaluationAt({ requiresPick: false }), notes)).toBe(11)
  })

  it('does nothing when there is no next note', () => {
    expect(noteWeekFor(evaluationAt({ settled: true }), { 11: note() })).toBe(11)
  })
})
