import { test, expect, type Page } from '@playwright/test';

// One sample of each kind of post. Swap these if a post moves or gets renamed.
const POSTS = {
  engineering: '/hosting-writebook-on-aws/', // table of contents, code, images
  oldImport: '/keep-code-base-clean-avoid-unnecessary-variable-assignments/', // 2011 txcowboycoder post with code
  review: '/the-making-of-a-manager/', // book cover
  personal: '/articles-of-incorporation/', // inline image
};

const TOP_LEVEL_PAGES = [
  '/',
  '/about/',
  '/bookshelf/',
  '/tags/',
  '/category/engineering/',
  '/category/review/',
  '/category/personal/',
];

const FEEDS = ['/feed.xml', '/feed/engineering.xml', '/feed/review.xml', '/feed/personal.xml'];

// The only hosts a page may load from besides this site (see AGENTS.md "No tracking").
const ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'fonts.googleapis.com', 'fonts.gstatic.com'];

const toPath = (url: string) => new URL(url, 'http://localhost').pathname;

async function expectImagesLoaded(page: Page) {
  const broken = await page.locator('main img').evaluateAll((imgs) =>
    imgs
      .map((img) => img as HTMLImageElement)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute('src')),
  );
  expect(broken, 'images that failed to load').toEqual([]);
}

test.describe('top-level pages', () => {
  for (const url of TOP_LEVEL_PAGES) {
    test(`${url} loads`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(/\S/);
      await expect(page.locator('main')).not.toBeEmpty();
      await expectImagesLoaded(page);
    });
  }
});

test.describe('RSS feeds', () => {
  for (const url of FEEDS) {
    test(`${url} has entries that link to real pages`, async ({ request }) => {
      const res = await request.get(url);
      expect(res.status()).toBe(200);
      const xml = await res.text();
      const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
      expect(entries.length, 'feed entries').toBeGreaterThan(0);

      const first = entries[0].match(/<link[^>]*href="([^"]+)"/)?.[1];
      expect(first, 'first entry link').toBeTruthy();
      expect((await request.get(toPath(first!))).status()).toBe(200);
    });
  }
});

test.describe('posts', () => {
  for (const [kind, url] of Object.entries(POSTS)) {
    test(`${kind} post: images load, no third-party requests`, async ({ page }) => {
      const hosts = new Set<string>();
      page.on('request', (req) => hosts.add(new URL(req.url()).hostname));

      const res = await page.goto(url, { waitUntil: 'networkidle' });
      expect(res?.status()).toBe(200);
      await expectImagesLoaded(page);

      const unexpected = [...hosts].filter((h) => !ALLOWED_HOSTS.includes(h));
      expect(unexpected, 'third-party hosts').toEqual([]);
    });

    test(`${kind} post: previous/next links work`, async ({ page, request }) => {
      await page.goto(url);
      const links = page.locator('nav.post-navigation a');
      expect(await links.count(), 'prev/next links').toBeGreaterThan(0);
      for (const href of await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) {
        expect((await request.get(toPath(href))).status(), href).toBe(200);
      }
    });
  }

  test('table of contents links to headings on the page', async ({ page }) => {
    await page.goto(POSTS.engineering);
    const toc = page.locator('#toc a[href^="#"]');
    expect(await toc.count(), 'TOC links').toBeGreaterThan(1);
    for (const href of await toc.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) {
      const id = decodeURIComponent(href.slice(1));
      await expect(page.locator(`[id="${id}"]`), `TOC target ${href}`).toHaveCount(1);
    }
  });

  for (const url of [POSTS.engineering, POSTS.oldImport]) {
    test(`code blocks render on ${url}`, async ({ page }) => {
      await page.goto(url);
      const code = page.locator('main pre code');
      expect(await code.count(), 'code blocks').toBeGreaterThan(0);
      await expect(code.first()).toBeVisible();
      await expect(code.first()).not.toBeEmpty();
    });
  }
});
