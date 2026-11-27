// Scans every HTML page in the build, not just the sample posts in site.spec.ts.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { siteDir } from './playwright.config';

// Hotlinked images allowed by AGENTS.md ("Images").
const ALLOWED_IMAGE_HOSTS = ['imgs.xkcd.com'];

function htmlFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith('.html') ? [p] : [];
  });
}

const pages = htmlFiles(siteDir).map((file) => ({
  url: '/' + path.relative(siteDir, file).replace(/index\.html$/, ''),
  // code samples may legitimately contain anything; drop them before scanning
  html: fs.readFileSync(file, 'utf8').replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, ''),
}));

const offenders = (match: (html: string) => string[]) =>
  pages.flatMap(({ url, html }) => match(html).map((m) => `${url}: ${m}`));

test('the build has pages', () => {
  expect(pages.length).toBeGreaterThan(300);
});

test('no localhost URLs (hugo server writes them into public/ without --renderToMemory)', () => {
  expect(offenders((h) => h.match(/https?:\/\/localhost[^"'\s<]*/g) ?? [])).toEqual([]);
});

test('no leftover Jekyll Liquid', () => {
  expect(offenders((h) => h.match(/\{\{\s*(page|site)\.[^}]*\}\}|\{%[^%]*%\}|date_to_string/g) ?? [])).toEqual([]);
});

test('no hotlinked images', () => {
  expect(
    offenders((h) =>
      [...h.matchAll(/<img[^>]+src="(https?:\/\/[^"]+)"/g)]
        .map((m) => m[1])
        .filter((src) => !ALLOWED_IMAGE_HOSTS.includes(new URL(src).hostname)),
    ),
  ).toEqual([]);
});

test('no images glued into a paragraph of text (needs a blank line around it)', () => {
  expect(
    offenders((h) =>
      [...h.matchAll(/<p>((?:(?!<\/p>)[\s\S])*?<img[\s\S]*?)<\/p>/g)]
        .map((m) => m[1])
        .filter((p) => p.replace(/<[^>]+>/g, '').trim().length > 40) // an image inside a sentence is fine
        .map((p) => p.replace(/\s+/g, ' ').slice(0, 100)),
    ),
  ).toEqual([]);
});

test('every sitemap URL exists in the build', () => {
  const sitemap = fs.readFileSync(path.join(siteDir, 'sitemap.xml'), 'utf8');
  const missing = [...sitemap.matchAll(/<loc>https:\/\/www\.jsrowe\.com(\/[^<]*)<\/loc>/g)]
    .map((m) => decodeURIComponent(m[1]).replace(/&apos;/g, "'"))
    .filter((url) => !fs.existsSync(path.join(siteDir, url, url.endsWith('/') ? 'index.html' : '')));
  expect(missing).toEqual([]);
});
