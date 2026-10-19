import { describe, expect, it } from 'vitest'
import { evaluateSeason, findStanding, type PlayerStanding } from '@/domain'
import { kickoffFor, scenario } from '@/domain/testing/scenario'
import { EPITAPHS, epitaphFor, type Epitaph } from './epitaphs'

/** A recap carved for week 5, standing in for the commissioner's own. */
const CARVED: Record<string, Epitaph> = {
  'ned-archer': {
    recap: 'Ned picked with his heart, and his heart was wrong.',
    writtenAfterWeek: 5,
  },
}

const AFTER = kickoffFor(4, 48)

/** Ned Archer, buried by three losses in weeks 1–3 — two weeks before the week his recap was carved for. */
function nedOutInWeek3(): PlayerStanding {
  const snap = scenario()
    // A survivor, or a lone player going out would be crowned co-champion.
    .players('ned-archer', 'survivor')
    .game(1, 'LAC', 'ARI', { final: 'ARI', score: [14, 26] })
    .game(2, 'TB', 'CLE', { final: 'CLE', score: [19, 23] })
    .game(3, 'SF', 'ARI', { final: 'ARI', score: [30, 36] })
    .pick('ned-archer', 1, 'LAC')
    .pick('ned-archer', 2, 'TB')
    .pick('ned-archer', 3, 'SF')
    .pick('survivor', 1, 'ARI')
    .pick('survivor', 2, 'CLE')
    .pick('survivor', 3, 'ARI')
    .build()
  const s = findStanding(evaluateSeason(snap, { now: AFTER }), 'ned-archer')!
  expect(s.status).toBe('eliminated')
  expect(s.eliminatedWeek).toBe(3)
  return s
}

describe('epitaphFor', () => {
  it('is nothing for the living', () => {
    const snap = scenario()
      .players('ned-archer')
      .game(1, 'GB', 'CHI', { final: 'GB' })
      .pick('ned-archer', 1, 'GB')
      .build()
    const s = findStanding(evaluateSeason(snap, { now: AFTER }), 'ned-archer')!
    expect(epitaphFor('ned-archer', 'Ned Archer', s)).toBeNull()
  })

  it('shows the commissioner’s recap when the player went out in the week it was written for', () => {
    const s = { ...nedOutInWeek3(), eliminatedWeek: CARVED['ned-archer']!.writtenAfterWeek }
    expect(epitaphFor('ned-archer', 'Ned Archer', s, CARVED)).toBe(CARVED['ned-archer']!.recap)
  })

  it('falls back to the record when a corrected result moves the elimination week', () => {
    const text = epitaphFor('ned-archer', 'Ned Archer', nedOutInWeek3(), CARVED)!
    expect(text).not.toBe(CARVED['ned-archer']!.recap)
    expect(text).toContain('left it in week 3')
  })

  it('falls back to the record for a player with no recap yet', () => {
    const text = epitaphFor('nobody-yet', 'Ned Archer', nedOutInWeek3())!
    expect(text).toContain('Rest in peace, Ned')
  })

  it('carves nothing by default until the commissioner writes a recap', () => {
    // Every recap must be carved for the week its player actually went out.
    for (const [playerId, e] of Object.entries(EPITAPHS)) {
      expect(e.recap.length, playerId).toBeGreaterThan(0)
      expect(e.writtenAfterWeek, playerId).toBeGreaterThanOrEqual(1)
    }
    expect(epitaphFor('ned-archer', 'Ned Archer', nedOutInWeek3())).toContain('Rest in peace, Ned')
  })
})
