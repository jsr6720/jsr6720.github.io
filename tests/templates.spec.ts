// One check per template in themes/jsrowe/layouts: the page it serves, and something only that template renders.
// Adding, renaming or deleting a template fails "every template has a test" until TEMPLATES is updated.
import { test, expect, type Page, type APIRequestContext } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const LAYOUTS = path.resolve(__dirname, '../themes/jsrowe/layouts');
const POSTS_DIR = path.resolve(__dirname, '../content/posts');
const POST = '/the-making-of-a-manager/'; // has an image and headings
const CATEGORIES = { engineering: 'Engineering', personal: 'Personal', review: 'Reviews' };

// Posts per category, straight from the markdown.
const postsIn = (category: string) =>
  fs.readdirSync(POSTS_DIR).filter((f) => {
    if (!/^\d{4}-.*\.md$/.test(f)) return false;
    const fm = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8').split('---\n')[1];
    return new RegExp(`^category:\\s*${category}\\s*$`, 'm').test(fm) && !/^draft:\s*true/m.test(fm);
  }).length;
const totalPosts = Object.keys(CATEGORIES).reduce((n, c) => n + postsIn(c), 0);

type Check = (args: { page: Page; request: APIRequestContext }) => Promise<void>;

const TEMPLATES: Record<string, Check> = {
  'baseof.html': async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header.site-header')).toHaveCount(1);
    await expect(page.locator('main.page-content')).toHaveCount(1);
    await expect(page.locator('footer.site-footer')).toHaveCount(1);
  },
  '_partials/head.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('head link[rel="stylesheet"][href="/assets/main.css"]')).toHaveCount(1);
    await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'article');
  },
  '_partials/header.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('header .site-title')).toHaveText("James' Thoughts");
    await expect(page.locator('header .trigger a')).toHaveText(['About', 'Bookshelf', 'Tags', /Feed/]);
  },
  '_partials/footer.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('footer a[rel="license"]')).toHaveText('CC BY-NC-ND 4.0');
  },
  'home.html': async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h2').first()).toHaveText(/You found me/);
    await expect(page.locator('.post-filter.is-active')).toHaveText('All');
    await expect(page.locator('.post-item')).toHaveCount(totalPosts);
  },
  '_partials/post-filters.html': async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.post-filters .post-filter')).toHaveText(['All', 'Engineering', 'Personal', 'Reviews']);
    await expect(page.locator('.post-filters a.post-filter-feed')).toHaveCount(3);
  },
  '_partials/post-list.html': async ({ page }) => {
    await page.goto('/');
    const first = page.locator('.post-item').first();
    await expect(first.locator('a.post-link')).toHaveAttribute('href', /^\/[a-z0-9-]+\/$/);
    await expect(first.locator('.post-date')).toHaveText(/^\s*[A-Z][a-z]{2} \d{1,2}, \d{4}\s*$/);
  },
  'term.html': async ({ page }) => {
    for (const [slug, title] of Object.entries(CATEGORIES)) {
      await page.goto(`/category/${slug}/`);
      await expect(page.locator('main h3.post-title'), slug).toHaveText(`Category: ${title}`);
      await expect(page.locator('.post-filter.is-active'), slug).toHaveText(title);
      await expect(page.locator('.post-item'), `${slug} post count`).toHaveCount(postsIn(slug));
    }
    await page.goto('/tags/book/');
    await expect(page.locator('main h3.post-title')).toHaveText('Tag: book');
    await expect(page.locator('.post-filters'), 'tag pages have no category filter').toHaveCount(0);
  },
  'taxonomy.html': async ({ page }) => {
    await page.goto('/tags/');
    await expect(page.locator('main h1')).toHaveText('Tags');
    expect(await page.locator('a.tag-pill').count()).toBeGreaterThan(50);
  },
  'posts/page.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('article.h-entry h1.p-name')).toHaveCount(1);
    await expect(page.locator('time.dt-published')).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}T/);
    await expect(page.locator('.reading-time')).toHaveText(/\d+ min read/);
    await expect(page.locator('nav.post-navigation')).toHaveCount(1);
  },
  '_partials/share-buttons.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('#share-buttons > a')).toHaveCount(2);
  },
  'page.html': async ({ page }) => {
    for (const url of ['/about/', '/bookshelf/']) {
      await page.goto(url);
      await expect(page.locator('article.post h1.post-title'), url).toHaveCount(1);
      await expect(page.locator('article.h-entry, #share-buttons, nav.post-navigation'), `${url} is not a post`).toHaveCount(0);
    }
  },
  '404.html': async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('main h1')).toHaveText('404');
  },
  '_markup/render-heading.html': async ({ page }) => {
    await page.goto(POST);
    const h2 = page.locator('main .post-content h2').first();
    await expect(h2.locator('a.heading-anchor')).toHaveAttribute('href', `#${await h2.getAttribute('id')}`);
  },
  '_markup/render-image.html': async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('main figure.post-image > img').first()).toHaveAttribute('alt', /\S/);
  },
  'home.atom.xml': async ({ request }) => {
    const xml = await (await request.get('/feed.xml')).text();
    expect(xml).toContain('<link href="https://www.jsrowe.com/feed.xml" rel="self"');
    expect(xml.match(/<entry>/g)?.length).toBe(10);
  },
  'category-feed.atom.xml': async ({ request }) => {
    for (const slug of Object.keys(CATEGORIES)) {
      const xml = await (await request.get(`/feed/${slug}.xml`)).text();
      const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
      expect(entries.length, slug).toBeGreaterThan(0);
      expect(entries.filter((e) => !e.includes(`<category term="${slug}" />`)), `${slug} feed has only ${slug} posts`).toEqual([]);
    }
  },
  '_partials/atom.xml': async ({ request }) => {
    const xml = await (await request.get('/feed.xml')).text();
    expect(xml).toMatch(/^<\?xml version="1.0" encoding="utf-8"\?>\s*<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/);
    expect(xml).toContain('<content type="html"');
  },
  'home.llms.txt': async ({ request }) => {
    const txt = await (await request.get('/llms.txt')).text();
    expect(txt).toMatch(/^# James' Thoughts\n\n> /);
    expect(txt).toContain('## Engineering');
  },
  'home.llmsfull.txt': async ({ request }) => {
    const txt = await (await request.get('/llms-full.txt')).text();
    expect(txt).toMatch(/^# James' Thoughts: full text/);
    expect(txt.match(/^URL: /gm)?.length).toBe(totalPosts);
  },
};

const templateFiles = (dir: string, base = dir): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? templateFiles(p, base) : [path.relative(base, p)];
  });

test('every template has a test, and every test has a template', () => {
  const files = templateFiles(LAYOUTS).sort();
  expect(files.filter((f) => !(f in TEMPLATES)), 'templates without a check in TEMPLATES').toEqual([]);
  expect(Object.keys(TEMPLATES).filter((t) => !files.includes(t)), 'checks for templates that no longer exist').toEqual([]);
});

for (const [template, check] of Object.entries(TEMPLATES)) {
  test(`template ${template}`, async ({ page, request }) => check({ page, request }));
}
