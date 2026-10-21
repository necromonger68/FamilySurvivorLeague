import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

/**
 * Runs the real headshot importer against a throwaway league folder. The
 * script resolves photos/, scripts/league.ts and public/headshots/ from its
 * working directory, so nothing in the repo is touched.
 */
const SCRIPT = join(import.meta.dirname, '..', '..', 'scripts', 'import-headshots.mjs')

interface Entry {
  from: string
  width: number
  height: number
  variants: { thumb: string; medium: string }
}

let dir: string
const out = () => join(dir, 'public', 'headshots')

function writeRoster(people: [id: string, name: string][]) {
  const lines = people.map(([id, name]) => `    { id: '${id}', name: '${name}', role: 'player' },`)
  writeFileSync(
    join(dir, 'scripts', 'league.ts'),
    `export const LEAGUE = {\n  people: [\n${lines.join('\n')}\n  ],\n  picks: {},\n}\n`,
  )
}

async function writePhoto(file: string, width: number, height: number) {
  await sharp({ create: { width, height, channels: 3, background: '#7a5c3e' } })
    .jpeg()
    .toFile(join(dir, 'photos', file))
}

function runImport() {
  const r = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout }
}

const manifest = (): Record<string, Entry> =>
  JSON.parse(readFileSync(join(out(), 'manifest.json'), 'utf8')) as Record<string, Entry>

// Read through a buffer: sharp holds an open handle on a path it was given,
// and Windows then refuses to delete the temp folder.
const size = async (file: string) => {
  const m = await sharp(readFileSync(join(out(), file))).metadata()
  return [m.width, m.height]
}

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'headshots-'))
  mkdirSync(join(dir, 'scripts'))
  mkdirSync(join(dir, 'photos'))
  writeRoster([
    ['ada-lane', 'Ada Lane'],
    ['bo-reyes', 'Bo Reyes'],
  ])
})

afterEach(() => rmSync(dir, { recursive: true, force: true }))

describe('import-headshots', () => {
  it('makes every variant square, even from an original smaller than 512px', async () => {
    await writePhoto('Ada Lane.jpg', 300, 420)
    await writePhoto('Bo Reyes.jpg', 900, 640)
    expect(runImport().status).toBe(0)

    expect(await size('ada-lane-medium.webp')).toEqual([300, 300])
    expect(await size('ada-lane-thumb.webp')).toEqual([128, 128])
    expect(await size('bo-reyes-medium.webp')).toEqual([512, 512])
    expect(manifest()['ada-lane']).toMatchObject({ width: 300, height: 300 })
  })

  it("keeps a player's headshot when their original is no longer in the folder", async () => {
    await writePhoto('Ada Lane.jpg', 600, 600)
    await writePhoto('Bo Reyes.jpg', 600, 600)
    expect(runImport().status).toBe(0)

    unlinkSync(join(dir, 'photos', 'Bo Reyes.jpg'))
    const { status, stdout } = runImport()

    expect(status).toBe(0)
    expect(Object.keys(manifest())).toEqual(['ada-lane', 'bo-reyes'])
    expect(manifest()['bo-reyes']?.from).toBe('Bo Reyes.jpg')
    expect(stdout).toContain('Kept from the manifest (no original in the folder): Bo Reyes.')
  })

  it('a new original replaces the kept headshot', async () => {
    await writePhoto('Ada Lane.jpg', 600, 600)
    expect(runImport().status).toBe(0)

    unlinkSync(join(dir, 'photos', 'Ada Lane.jpg'))
    await writePhoto('ada-lane.png', 400, 400)
    expect(runImport().status).toBe(0)

    expect(manifest()['ada-lane']).toMatchObject({ from: 'ada-lane.png', width: 400 })
  })

  it('drops an entry for someone who has left the roster', async () => {
    await writePhoto('Ada Lane.jpg', 600, 600)
    await writePhoto('Bo Reyes.jpg', 600, 600)
    expect(runImport().status).toBe(0)

    unlinkSync(join(dir, 'photos', 'Bo Reyes.jpg'))
    writeRoster([['ada-lane', 'Ada Lane']])
    expect(runImport().status).toBe(0)

    expect(Object.keys(manifest())).toEqual(['ada-lane'])
  })

  /**
   * The site loads these paths. A hand-edited manifest must not be able to
   * point a player at a file outside public/headshots/ or at someone else.
   */
  it('never keeps an entry whose paths are not the ones it writes for that player', async () => {
    await writePhoto('Ada Lane.jpg', 600, 600)
    await writePhoto('Bo Reyes.jpg', 600, 600)
    expect(runImport().status).toBe(0)
    unlinkSync(join(dir, 'photos', 'Bo Reyes.jpg'))

    const tampered = manifest()
    tampered['bo-reyes'] = {
      ...tampered['bo-reyes']!,
      variants: { thumb: '../../secrets.webp', medium: 'headshots/ada-lane-medium.webp' },
    }
    writeFileSync(join(out(), 'manifest.json'), JSON.stringify(tampered))
    expect(runImport().status).toBe(0)

    expect(Object.keys(manifest())).toEqual(['ada-lane'])
  })

  it('does not keep an entry whose image files are gone', async () => {
    await writePhoto('Ada Lane.jpg', 600, 600)
    await writePhoto('Bo Reyes.jpg', 600, 600)
    expect(runImport().status).toBe(0)

    unlinkSync(join(dir, 'photos', 'Bo Reyes.jpg'))
    unlinkSync(join(out(), 'bo-reyes-medium.webp'))
    expect(runImport().status).toBe(0)

    expect(Object.keys(manifest())).toEqual(['ada-lane'])
  })
})
