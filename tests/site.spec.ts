import { test, expect, type Page } from '@playwright/test';
import redirects from './redirects.json';

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

// Search engines should only ever see this host, even on the GitHub Pages backup.
const CANONICAL_HOST = 'https://www.jsrowe.com';

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

test.describe('assembled pages: head, header, footer', () => {
  const pages = ['/', '/category/review/', ...Object.values(POSTS)];

  for (const url of pages) {
    test(`${url} has SEO tags pointing at ${CANONICAL_HOST}`, async ({ page }) => {
      await page.goto(url);
      const head = page.locator('head');
      await expect(head.locator('link[rel="canonical"]')).toHaveAttribute('href', CANONICAL_HOST + url);
      await expect(head.locator('meta[property="og:url"]')).toHaveAttribute('content', CANONICAL_HOST + url);
      await expect(head.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S/);
      await expect(head.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
      // Feed readers find the RSS feed through this tag.
      await expect(head.locator('link[rel="alternate"][type="application/atom+xml"]').first())
        .toHaveAttribute('href', /\/feed\.xml$/);
    });
  }

  test('post titles are used in the page title', async ({ page }) => {
    await page.goto(POSTS.personal);
    await expect(page).toHaveTitle(/Articles of Incorporation/);
  });

  test('header and footer links work', async ({ page, request }) => {
    await page.goto(POSTS.review);
    const internal = await page
      .locator('header a[href^="/"], footer.site-footer a[href^="/"]')
      .evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')!))]);
    expect(internal, 'header/footer links').toEqual(expect.arrayContaining(['/', '/about/', '/feed.xml']));
    for (const href of internal) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
  });

  test('footer shows the current license', async ({ page }) => {
    await page.goto('/');
    const license = page.locator('footer a[rel="license"]');
    await expect(license).toHaveText('CC BY-NC-ND 4.0');
    await expect(license).toHaveAttribute('href', 'https://creativecommons.org/licenses/by-nc-nd/4.0/');
  });
});

test.describe('error page', () => {
  test('missing pages return 404', async ({ request }) => {
    expect((await request.get('/this-page-does-not-exist/')).status()).toBe(404);
  });

  test('/404.html renders with a way back home', async ({ page, request }) => {
    const res = await page.goto('/404.html');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('a[href="/"]').first()).toBeVisible(); // header site title
    expect((await request.get('/')).status()).toBe(200);
  });
});

// Old URL -> new URL, one entry per moved page: [{ "from": "/old/", "to": "/new/" }]
test.describe('redirects', () => {
  for (const { from, to } of redirects as { from: string; to: string }[]) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from);
      await page.waitForURL((url) => url.pathname === to); // HTTP 301 or Hugo alias meta refresh
      await expect(page.locator('main')).not.toBeEmpty();
    });
  }
});

test.describe('Hugo templates', () => {
  const publishedAt = async (page: Page) =>
    new Date((await page.locator('time.dt-published').getAttribute('datetime'))!).getTime();

  test('"Previous" is the older post, "Next" the newer one', async ({ page }) => {
    await page.goto(POSTS.review);
    const current = await publishedAt(page);
    const prev = await page.locator('.post-nav-prev a').getAttribute('href');
    const next = await page.locator('.post-nav-next a').getAttribute('href');
    await page.goto(prev!);
    expect(await publishedAt(page), `previous ${prev}`).toBeLessThan(current);
    await page.goto(next!);
    expect(await publishedAt(page), `next ${next}`).toBeGreaterThan(current);
  });

  test('table of contents starts at h2 (no empty first bullet)', async ({ page }) => {
    await page.goto(POSTS.engineering);
    await expect(page.locator('#toc > nav > ul > li').first().locator('> a')).toHaveCount(1);
  });

  test('heading anchors link to their own heading', async ({ page }) => {
    await page.goto(POSTS.engineering);
    const anchors = page.locator('main h2 a.heading-anchor');
    expect(await anchors.count()).toBeGreaterThan(0);
    for (const a of await anchors.all()) {
      const id = await a.evaluate((el) => el.parentElement!.id);
      await expect(a).toHaveAttribute('href', `#${id}`);
      await expect(a).toHaveAttribute('aria-label', /\S/);
    }
  });

  test('share buttons are plain links with labels', async ({ page }) => {
    await page.goto(POSTS.personal);
    const links = page.locator('#share-buttons > a');
    expect(await links.count()).toBeGreaterThan(0);
    for (const a of await links.all()) {
      await expect(a).toHaveAttribute('href', /^https:\/\//);
      await expect(a).toHaveAttribute('aria-label', /\S/);
    }
  });

  test('stand-alone markdown images render as centered figures', async ({ page }) => {
    await page.goto(POSTS.review);
    const img = page.locator('main figure.post-image img').first();
    await expect(img).toBeVisible();
    const { left, right } = await img.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const p = el.closest('.post-content')!.getBoundingClientRect();
      return { left: r.left - p.left, right: p.right - r.right };
    });
    expect(Math.abs(left - right), 'image centered in the column').toBeLessThan(2);
  });

  test('tags page links to tag pages that list posts', async ({ page }) => {
    await page.goto('/tags/');
    const first = page.locator('a.tag-pill').first();
    const name = await first.evaluate((a) => a.firstChild!.textContent!.trim()); // pill text without the count
    await first.click();
    await expect(page.locator('main h3.post-title')).toHaveText(`Tag: ${name}`);
    expect(await page.locator('main .post-item').count()).toBeGreaterThan(0);
  });

  test('links in the writing and prev/next are underlined', async ({ page }) => {
    for (const [url, sel] of [['/bookshelf/', 'main .post-content li a'], [POSTS.review, 'nav.post-navigation a']]) {
      await page.goto(url);
      const style = await page.locator(sel).first().evaluate((a) => getComputedStyle(a).textDecorationLine);
      expect(style, `${sel} on ${url}`).toContain('underline');
    }
  });

  test('category pages keep their titles', async ({ page }) => {
    await page.goto('/category/review/');
    await expect(page.locator('main h3.post-title')).toHaveText('Category: Reviews');
  });
});
