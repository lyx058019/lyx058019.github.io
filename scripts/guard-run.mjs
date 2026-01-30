#!/usr/bin/env node
"use strict";
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

// Dangerous command patterns to guard
const dangerous = [
  /git\s+push\s+--force/,
  /git\s+reset\s+--hard/,
  /rm\s+-rf/,
  /dd\s+/ // placeholder for destructive operations
];

export async function runWithGuard(cmd, options = {}) {
  const isDanger = dangerous.some((r) => r.test(cmd));
  const assumeYes = !!options.assumeYes;
  if (isDanger && !assumeYes) {
    const err = new Error("Dangerous command blocked by system guard. Confirm required or use a safer alternative.");
    console.error(err.message);
    console.info("Command blocked: " + cmd);
    console.info("Safer alternatives: for git, use --force-with-lease; for deletions, confirm paths and consider dry-run.");
    throw err;
  }
  const dryRun = !!options.dryRun;
  if (dryRun) {
    console.log(`Dry run: would execute: ${cmd}`);
    return { stdout: '', stderr: '' };
  }
  const { stdout, stderr } = await execPromise(cmd);
  return { stdout, stderr };
}

export default runWithGuard; // convenience
