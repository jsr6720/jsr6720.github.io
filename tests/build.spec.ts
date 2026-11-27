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

test('llms.txt lists every post and llms-full.txt has every post (https://llmstxt.org)', () => {
  const index = fs.readFileSync(path.join(siteDir, 'llms.txt'), 'utf8');
  const full = fs.readFileSync(path.join(siteDir, 'llms-full.txt'), 'utf8');
  const sitemapPosts = (fs.readFileSync(path.join(siteDir, 'sitemap.xml'), 'utf8').match(/<loc>[^<]*<\/loc>/g) ?? [])
    .map((l) => l.slice(5, -6).replace(/&apos;/g, "'"))
    .filter((u) => !/\/(tags|category|about|bookshelf)\/|\.com\/$/.test(u));
  const missing = sitemapPosts.filter((u) => !index.includes(`](${u})`) || !full.includes(`URL: ${u}\n`));
  expect(missing, 'posts missing from llms.txt / llms-full.txt').toEqual([]);
  expect(index.match(/&[#a-z0-9]+;/g) ?? [], 'HTML entities in llms.txt').toEqual([]);
  expect(index.match(/\w# /g) ?? [], 'heading "#" leaked into summaries').toEqual([]);
});

test('no third-party scripts (gist embeds etc.: paste the code into a fenced block instead)', () => {
  expect(offenders((h) => h.match(/<script[^>]+src="(https?:)?\/\/[^"]+"/g) ?? [])).toEqual([]);
});

// Text like <Latest> or List<T> outside backticks is read as an HTML tag and disappears.
const HTML_ELEMENTS = new Set(`a abbr article aside audio b blockquote body br button caption cite code col colgroup data dd del
  details dfn div dl dt em figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd
  label li link main mark meta nav noscript ol option p path picture pre q s samp script section select small source span
  strong style sub summary sup svg table tbody td template textarea tfoot th thead time title tr u ul var video wbr
  g circle rect line polyline polygon use defs symbol`.split(/\s+/));

test('no unknown HTML tags hiding text (escape it: \\<Latest\\> or `List<T>`)', () => {
  expect(
    offenders((h) => [...h.matchAll(/<([a-zA-Z][\w-]*)/g)].map((m) => m[1]).filter((t) => !HTML_ELEMENTS.has(t.toLowerCase())).map((t) => `<${t}>`)),
  ).toEqual([]);
});

test('no mixed content: nothing loads over http://', () => {
  expect(
    offenders((h) => h.match(/<(img|script|link|iframe|source|video|audio|embed|object)\b[^>]*\b(src|href|srcset)="http:\/\/[^"]*"/g) ?? []),
  ).toEqual([]);
});
