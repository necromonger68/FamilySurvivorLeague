import { describe, expect, it } from 'vitest'
import type { UserConfig } from 'vite'
import viteConfig from '../../vite.config'

/**
 * The app imports its season from `@league-fixture`. A normal build (the one
 * GitHub Pages publishes) must resolve it to the REAL league; only a build with
 * DEMO_FIXTURE=test — the one Playwright makes — may swap in the made-up test
 * league. Getting this backwards would publish thirty invented people as the
 * family's league, or quietly test the wrong data.
 */
function aliasFor(env: Record<string, string | undefined>): string {
  const saved = process.env.DEMO_FIXTURE
  if (env.DEMO_FIXTURE === undefined) delete process.env.DEMO_FIXTURE
  else process.env.DEMO_FIXTURE = env.DEMO_FIXTURE
  try {
    const config = (viteConfig as unknown as (e: { mode: string; command: string }) => UserConfig)({
      mode: 'production',
      command: 'build',
    })
    const alias = config.resolve?.alias as Record<string, string>
    return alias['@league-fixture'] ?? ''
  } finally {
    if (saved === undefined) delete process.env.DEMO_FIXTURE
    else process.env.DEMO_FIXTURE = saved
  }
}

describe('which league a build carries', () => {
  it('is the real league in a normal build', () => {
    expect(aliasFor({})).toMatch(/fixtures\/demo-season\.json$/)
  })

  it('is the made-up test league only when DEMO_FIXTURE=test', () => {
    expect(aliasFor({ DEMO_FIXTURE: 'test' })).toMatch(/fixtures\/test-season\.json$/)
    expect(aliasFor({ DEMO_FIXTURE: 'anything-else' })).toMatch(/fixtures\/demo-season\.json$/)
  })
})
