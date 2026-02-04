import { test, expect } from 'vitest'

test('guard-run: blocks dangerous command by default (dryRun=false)', async () => {
  const mod = await import('../scripts/guard-run.mjs')
  const run = mod?.default ?? mod?.runWithGuard
  await expect(run('git push --force', { dryRun: false, assumeYes: false })).rejects.toBeInstanceOf(Error)
})

test('guard-run: allows safe command in dryRun', async () => {
  const mod = await import('../scripts/guard-run.mjs')
  const run = mod?.default ?? mod?.runWithGuard
  const res = await run('echo hello', { dryRun: true })
  expect(res).toBeDefined()
})

test('guard-run: allows dangerous command when assumeYes and dryRun', async () => {
  const mod = await import('../scripts/guard-run.mjs')
  const run = mod?.default ?? mod?.runWithGuard
  const res = await run('git push --force', { dryRun: true, assumeYes: true })
  expect(res).toBeDefined()
})
