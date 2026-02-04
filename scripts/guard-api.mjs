#!/usr/bin/env node
import http from 'node:http';
import { runWithGuard } from './guard-run.mjs';

const port = process.env.SYSTEM_GUARD_PORT ? Number(process.env.SYSTEM_GUARD_PORT) : 3001;

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, port }));
    return;
  }
  if (req.method === 'POST' && req.url === '/guard') {
    try {
      const body = await parseJsonBody(req);
      const { cmd, dryRun, assumeYes } = body || {};
      if (typeof cmd !== 'string' || !cmd.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'cmd is required' }));
        return;
      }
      try {
        const result = await runWithGuard(cmd, { dryRun: !!dryRun, assumeYes: !!assumeYes });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, stdout: result?.stdout ?? '', stderr: result?.stderr ?? '' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e instanceof Error ? e.message : String(e) }));
      }
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'invalid request' }));
    }
    return;
  }
  // fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not found' }));
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`System Guard API listening on port ${port}`);
});
