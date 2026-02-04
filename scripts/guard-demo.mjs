#!/usr/bin/env node
import runWithGuard from './guard-run.mjs'

(async () => {
  // Safe command
  try {
    const res = await runWithGuard('echo hello');
    console.log('Safe command output:', res.stdout);
  } catch (e) {
    console.error('Safe command blocked unexpectedly:', e && e.message);
  }

  // Dangerous command (by default, guard blocks)
  try {
    await runWithGuard('git push --force');
  } catch (e) {
    console.error('Guard blocked dangerous command as expected:', e && e.message);
  }
})();
