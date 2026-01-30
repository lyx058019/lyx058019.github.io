#!/usr/bin/env node
// Simple content meta validation for blog posts (no external deps)
import fs from 'fs';
import path from 'path';

const postsDir = path.resolve(process.cwd(), 'src/data/posts');
const mdFiles = (fs.readdirSync(postsDir) || [])
  .filter((f) => f.endsWith('.md'))
  .map((f) => path.join(postsDir, f));

let hasIssue = false;
for (const file of mdFiles) {
  const raw = fs.readFileSync(file, 'utf-8');
  // extract frontmatter between ---
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/m);
  const fmText = fmMatch ? fmMatch[1] : '';
  const missing = [];
  const hasTitle = /(^|\n)title\s*:/m.test(fmText);
  const hasDate = /(^|\n)date\s*:/m.test(fmText);
  const hasDesc = /(^|\n)description\s*:/m.test(fmText);
  const hasTags = /(^|\n)tags\s*:/m.test(fmText);
  if (!hasTitle) missing.push('title');
  if (!hasDate) missing.push('date');
  if (!hasDesc) missing.push('description');
  if (!hasTags) missing.push('tags');
  if (missing.length) {
    hasIssue = true;
    console.error(`Missing in ${path.basename(file)}: ${missing.join(', ')}`);
  }
}

if (hasIssue) {
  process.exit(1);
} else {
  console.log('All posts have required frontmatter.');
}
