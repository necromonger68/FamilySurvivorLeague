import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import { COMMISSIONER, resetDemo, setDemoClock, signInAs } from './helpers'
import { FINALS, season } from '../unit/seasonFacts'

/**
 * The commissioner's note sits between the scoreboard and the standings, so it
 * is read before anyone scrolls to see who is still alive. It belongs to the
 * LIVE week: the page shows the note keyed to the week being played.
 *
 * Notes are rewritten every week (src/features/league-home/notes.ts), so these
 * specs read which weeks have one instead of naming a joke. What a note SAYS —
 * the deadline, where to send a pick, what missing costs — is checked against
 * the schedule by notes.test.ts.
 */
const note = (page: Page) => page.locator('section[aria-labelledby="league-message-title"]')

/** The latest week with a note, read from the notes file itself. */
function latestNotedWeek(): number {
  const src = readFileSync(
    new URL('../../src/features/league-home/notes.ts', import.meta.url),
    'utf8',
  )
  const block = src.slice(src.indexOf('export const NOTES'))
  const weeks = [...block.matchAll(/^\s+(\d+):/gm)].map((m) => Number(m[1]))
  if (weeks.length === 0) throw new Error('notes.ts has no notes')
  return Math.max(...weeks)
}

/**
 * Plays the test league forward until `week` is the live one: every earlier
 * game is served as final (the real results where they are pinned, otherwise
 * the home side by a field goal), and the clock is set six hours before that
 * week's first kickoff. Each settled week lets the next one sync.
 */
async function makeWeekLive(page: Page, week: number) {
  await resetDemo(page)
  await signInAs(page, COMMISSIONER)
  const firstKickoff = season.games
    .filter((g) => g.week === week)
    .map((g) => new Date(g.kickoffAt).getTime())
    .sort((a, b) => a - b)[0]!
  await setDemoClock(page, new Date(firstKickoff - 6 * 3_600_000).toISOString().slice(0, 16))
  await page.route('**/site.api.espn.com/**', (route) => {
    const asked = Number(new URL(route.request().url()).searchParams.get('week'))
    const events = season.games
      .filter((g) => g.week === asked && asked < week)
      .map((g) => {
        const [away, home] = FINALS[g.id] ?? [17, 20]
        return {
          date: g.kickoffAt,
          competitions: [
            {
              date: g.kickoffAt,
              status: { type: { name: 'STATUS_FINAL', shortDetail: 'Final' } },
              competitors: [
                {
                  homeAway: 'home',
                  score: String(home),
                  winner: home > away,
                  team: { abbreviation: g.homeTeamId },
                },
                {
                  homeAway: 'away',
                  score: String(away),
                  winner: away > home,
                  team: { abbreviation: g.awayTeamId },
                },
              ],
            },
          ],
        }
      })
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ season: { year: 2026, type: 2 }, week: { number: asked }, events }),
    })
  })
  await page.goto('./#/')
  await expect(page.locator('#hero-title')).toHaveText(`Week ${week}`, { timeout: 30_000 })
}

test.describe('word from the commissioner', () => {
  test('appears in its week, between the scoreboard and the standings', async ({ page }) => {
    await makeWeekLive(page, latestNotedWeek())
    await expect(note(page)).toBeVisible()
    await expect(note(page)).toContainText(/word from the commissioner/i)
    // Body, not just a heading.
    await expect(note(page).locator('p')).not.toHaveCount(0)

    // Order on the page: hero, then the note, then Still standing. Measured
    // through locators so the spec needs no DOM types.
    const topOf = async (id: string) => {
      const box = await page.locator(`#${id}`).boundingBox()
      if (!box) throw new Error(`#${id} is not on the page`)
      return box.y
    }
    const hero = await topOf('hero-title')
    const message = await topOf('league-message-title')
    const standing = await topOf('alive-title')
    expect(hero).toBeLessThan(message)
    expect(message).toBeLessThan(standing)
  })

  test('a week nobody has written for shows no note at all', async ({ page }) => {
    // The league begins in week 7, so nobody ever writes for week 1 — the
    // test league's live week under the pinned clock.
    await resetDemo(page)
    await expect(page.locator('#hero-title')).toHaveText('Week 1')
    await expect(note(page)).toHaveCount(0)
  })

  test('reads on a phone too, and is announced as a section', async ({ page }) => {
    await makeWeekLive(page, latestNotedWeek())
    await expect(page.getByRole('heading', { name: /word from the commissioner/i })).toBeVisible()
  })
})
