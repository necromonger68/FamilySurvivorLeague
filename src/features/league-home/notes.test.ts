import { describe, expect, it } from 'vitest'
import { SeasonSnapshotSchema, evaluateSeason } from '@/domain'
// The test league under vitest. It shares the real league's schedule and lock
// rule (both are generated from the same cached NFL schedule), which is all
// these deadlines depend on.
import fixture from '@league-fixture'
import { NOTES } from './notes'

const snapshot = SeasonSnapshotSchema.parse(fixture)
const timeZone = snapshot.league.settings.displayTimeZone
// Evaluated past the end of the season so every week has its deadline.
const weeks = evaluateSeason(snapshot, { now: '2027-03-01T00:00:00.000Z' }).weeks

/** "Thursday" and "7:10 PM" for a week's lock, in the league's own time zone. */
function lockOf(week: number): { day: string; time: string } {
  const deadline = weeks.find((w) => w.week === week)?.deadlineAt
  if (!deadline) throw new Error(`week ${week} has no deadline`)
  const at = new Date(deadline)
  return {
    day: at.toLocaleDateString('en-US', { weekday: 'long', timeZone }),
    time: at.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone }),
  }
}

describe('commissioner notes', () => {
  it('belong to weeks the NFL season actually has', () => {
    for (const week of Object.keys(NOTES).map(Number)) {
      expect(
        weeks.some((w) => w.week === week),
        `a note for week ${week}`,
      ).toBe(true)
    }
  })

  /**
   * The callout is the one line that costs someone a life if it is wrong, so
   * its deadline is checked against the schedule rather than trusted: the right
   * week, the real lock day and time, where to send a pick, and what missing
   * costs.
   */
  it('give the real lock time, say to text the pick in, and say what missing costs', () => {
    for (const [weekKey, note] of Object.entries(NOTES)) {
      if (!note.callout) continue
      const week = Number(weekKey)
      const { day, time } = lockOf(week)
      expect(note.callout, `week ${week} callout`).toMatch(new RegExp(`week ${week} pick`, 'i'))
      expect(note.callout, `week ${week} locks ${day} ${time}`).toContain(time)
      expect(note.callout, `week ${week} locks ${day} ${time}`).toContain(day)
      expect(note.callout, `week ${week} callout`).toMatch(/\btext me\b/i)
      expect(note.callout, `week ${week} callout`).toMatch(/costs a life/i)
    }
  })

  it('has a welcome note for the first week, with the lock and the two-lives rule', () => {
    const welcome = NOTES[7]
    expect(welcome).toBeDefined()
    expect(welcome?.callout).toContain(lockOf(7).time)
    expect(welcome?.lines.join(' ')).toMatch(/two lives/i)
  })
})
