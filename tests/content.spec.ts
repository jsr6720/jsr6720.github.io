// Front matter rules for content/posts (AGENTS.md "Posts"). Reads the markdown, not the build.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.resolve(__dirname, '../content/posts');
const REQUIRED = ['author', 'title', 'date', 'category', 'tags', 'uid', 'slug'];
const OPTIONAL = ['aliases', 'toc', 'images', 'description', 'draft'];
const CATEGORIES = ['engineering', 'personal', 'review'];

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.md') && f !== '_index.md')
  .map((file) => {
    const fm = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8').split('---\n')[1] ?? '';
    const data: Record<string, string> = {};
    for (const line of fm.split('\n')) {
      const m = line.match(/^([A-Za-z_]+):\s*(.*?)\s*(#.*)?$/);
      if (m) data[m[1]] = m[2].replace(/^"(.*)"$/, '$1');
    }
    return { file, data };
  });

// Collect every problem so one run shows them all.
const problems = (check: (p: (typeof posts)[number]) => string | false) =>
  posts.flatMap((p) => {
    const msg = check(p);
    return msg ? [`${p.file}: ${msg}`] : [];
  });

test('posts exist', () => {
  expect(posts.length).toBeGreaterThan(300);
});

test('filenames are YYYY-MM-DD-slug.md', () => {
  expect(problems(({ file }) => !/^\d{4}-\d{2}-\d{2}-.+\.md$/.test(file) && 'bad filename')).toEqual([]);
});

test('required keys present, no unknown keys (catches typos)', () => {
  expect(
    problems(({ data }) => {
      const missing = REQUIRED.filter((k) => !data[k]);
      const unknown = Object.keys(data).filter((k) => !REQUIRED.includes(k) && !OPTIONAL.includes(k));
      return (missing.length || unknown.length) && `missing [${missing}] unknown [${unknown}]`;
    }),
  ).toEqual([]);
});

test('date is "YYYY-MM-DD HH:MM:SS -0400" and matches the filename', () => {
  expect(
    problems(({ file, data }) =>
      !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4}$/.test(data.date)
        ? `date ${JSON.stringify(data.date)} (use date "+%Y-%m-%d %H:%M:%S %z")`
        : data.date.slice(0, 10) !== file.slice(0, 10) && `date ${data.date.slice(0, 10)} but filename ${file.slice(0, 10)}`,
    ),
  ).toEqual([]);
});

test(`category is one of ${CATEGORIES.join(', ')}`, () => {
  expect(problems(({ data }) => !CATEGORIES.includes(data.category) && `category ${JSON.stringify(data.category)}`)).toEqual([]);
});

test('tags is a non-empty list', () => {
  expect(problems(({ data }) => !/^\[.*\S.*\]$/.test(data.tags ?? '') && `tags ${JSON.stringify(data.tags)}`)).toEqual([]);
});

test('uid is a UUID, unique across posts', () => {
  const seen = new Map<string, string>();
  expect(
    problems(({ file, data }) => {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.uid)) return `uid ${JSON.stringify(data.uid)}`;
      const dup = seen.get(data.uid.toUpperCase());
      seen.set(data.uid.toUpperCase(), file);
      return dup ? `uid also used by ${dup}` : false;
    }),
  ).toEqual([]);
});

test('slug is lowercase letters, digits and hyphens, unique across posts', () => {
  const seen = new Map<string, string>();
  expect(
    problems(({ file, data }) => {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.slug)) return `slug ${JSON.stringify(data.slug)}`;
      const dup = seen.get(data.slug);
      seen.set(data.slug, file);
      return dup ? `slug also used by ${dup}` : false;
    }),
  ).toEqual([]);
});
