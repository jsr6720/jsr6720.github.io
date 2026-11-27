# jsrowe.com — notes for agents

James Rowe's personal blog. Hugo, ~380 posts. Sister site: noted.jsrowe.com (also Hugo).

## The writing is mine

- Don't rewrite prose. Fix typos, links and formatting when asked; keep my voice, asides and footnotes.
- No bloviation: in posts, comments, commit messages or code.
- Alt text on every image is fine to write or improve.

## No tracking

The old web: a personal collection of links and writing. No analytics, pixels, tag managers, comment widgets, newsletter popups or third-party scripts. Don't add a third-party request to every page without asking.

Share buttons are plain `<a href>` links with an `aria-label`. Ad blockers like Brave Shields (which I use) hide them. That's the reader's choice: don't work around it (no `onclick` divs or obfuscated URLs), and don't treat it as a bug when testing in Brave.

## Use Hugo's built-ins

Prefer what Hugo ships over custom code: embedded templates (`opengraph.html`, `twitter_cards.html`, `schema.html`), `.ReadingTime`, `.TableOfContents`, taxonomies, aliases, archetypes, render hooks. No plugins, no theme from upstream. The only custom output is the Atom feed (`/feed.xml`, `/feed/{category}.xml`), kept so subscribers don't see a format change.

## Design

- Links in the writing (posts, pages, home intro) are obvious: blue and always underlined. Site chrome (header, nav, post lists, footer) stays ink.
- Images: see "Images" below.

## License

Writing is CC BY-NC-ND 4.0 (`LICENSE`); code samples are MIT (`CODE-LICENSE`). Don't change either.

## Deploy

Push to `main` deploys production. Open a PR; never push to `main`.

- `hugo-check.yml` (PRs): build, Playwright tests, and a PR comment with the version merging will release.
- `deploy.yml` (push to `main`): one build (`baseURL` https://www.jsrowe.com/), tested, then deployed to S3 + CloudFront → https://www.jsrowe.com (canonical) and GitHub Pages → https://jsr6720.github.io (backup), then tagged and released.
- `aws-cloudfront-invalidations.yml`: manual cache invalidation.

Canonical, og:url, feeds and sitemap always point at www.jsrowe.com, on both. Hugo version is pinned in `.hugo-version`; CI reads it.

Versions (`scripts/next-version.py`, run on every merge): a post published since the last tag (new file or `draft` removed) = minor; anything else = patch; `major` label on the PR = major (my call: license change, rewrite).

## Build and check

```sh
hugo server -D --renderToMemory   # http://localhost:1313, includes drafts
hugo --gc --cleanDestinationDir   # production build into public/
```

Keep `--renderToMemory` on `hugo server`: without it, the dev server writes localhost URLs into `public/` and the tests fail. Check the built HTML in `public/`, not just the templates. Check CLI flags against `.hugo-version` before using them.

## Tests

Playwright smoke tests in `tests/` run against the built site in CI. They check top-level pages, every feed, previous/next links, table of contents, code blocks, images, header/footer links, SEO tags (canonical always www.jsrowe.com), redirects, the 404 page, and that nothing loads from third-party hosts. Sample posts are listed at the top of `tests/site.spec.ts`. `tests/build.spec.ts` scans every page in the build: no localhost URLs, no leftover Liquid, no hotlinked images, no images glued to text, every sitemap URL exists.

```sh
cd tests && npm ci && npx playwright install chromium
SITE_DIR=../public npx playwright test
```

Run them before opening a PR. If a test fails, fix the site, not the test.

When a page's URL changes, add `aliases: ["/old/"]` to its front matter and list it in `tests/redirects.json` (`{ "from": "/old/", "to": "/new/" }`).

## Layout

- `content/posts/`: posts. `content/about.md`, `content/bookshelf.md`: pages. `content/feed/`: per-category feed definitions.
- `themes/jsrowe/`: the design. `layouts/` (Hugo 0.146+ template names), `layouts/_markup/` (heading and image render hooks), `static/assets/` (CSS).
- `static/`: served as-is (images, favicons, `robots.txt`).
- `archetypes/posts.md`: new-post template.
- `hugo.yaml`: site config.

## Posts

- Start a post with `hugo new content content/posts/YYYY-MM-DD-slug.md`. It's created with `draft: true`, the date, slug, uid and a "Draft created" revision line. Remove `draft` to publish.
- Filename `YYYY-MM-DD-slug.md`; the URL is `/slug/` from the `slug:` front matter. Hugo strips `'` and `,` from URLs and lowercases them.
- Front matter: `author`, `title`, `date` (`date "+%Y-%m-%d %H:%M:%S %z"`), `category`, `tags` (a list), `uid`, `slug`. Optional: `toc: true`, `images: [...]` (social preview), `description`.
- `category` is one of `review` (books), `engineering`, `personal`.
- Book tags follow Goodreads shelves; see README.
- End with `### Significant Revisions` (newest first, e.g. `- Nov 26th, 2026 Originally published on [https://www.jsrowe.com](https://www.jsrowe.com) with uid …`) and `### Footnotes`. These are plain text; content files can't use template code.
- Book reviews: cover from `static/assets/posts-images/book-covers/`, citation line, `## My Review N/5`.
- Link other posts with a plain path: `[title](/slug/)`.

## Images

- Files go in `static/assets/posts-images/`, served at `/assets/posts-images/`. No hotlinking: a remote image is a third-party request. Download it and credit the source in the text under the image. Exception: xkcd comics in `my-favorite-xkcd-comics` (xkcd allows hotlinking; copying them here would be rehosting).
- Use standard markdown, on its own line with a blank line above and below: `![alt text](/assets/posts-images/file.png)`. An image touching text renders inline in that paragraph.
- No `<img>` tags, classes, inline styles or widths. `themes/jsrowe/layouts/_markup/render-image.html` centers every stand-alone image with rounded corners; CSS caps tall images.
- No drop shadows or borders. Many screenshots already have a macOS window shadow baked in.
- Caption: put it in the title, `![alt](src "caption")`. Raw `<figure>` HTML only when the caption needs links or citations.
- Credits and footnote markers go in the text after the image, not on the image line.

## Folders

- `_drafts/`: ideas and unfinished posts, not built. Older ones still contain Jekyll Liquid (`{{ page.date | date_to_string }}` etc.); replace it with plain text when moving one to `content/posts/`.
- `_archive/`: kept in the repo, not published (Hugo only builds `content/`). "Archived" means this.
- Don't add third-party PDFs or articles. The repo is public, so that's rehosting.

## History

Older posts came from Goodreads and txcowboycoder.wordpress.com (tag `txcowboycoder`). Keep their "Originally published on…" lines.

The site was Jekyll + minima (Ruby) until v4.0.0; Hugo starts at v5.0.0. If something looks odd in an old post, `git log --follow` it back through `_posts/` and compare with the `v4.0.0` tag. What the move changed:

- `scripts/jekyll-to-hugo.py` baked Liquid into plain text (revision dates, `site.url`, `uid`), turned `post_url`/`link` tags into `/slug/` paths, made tags lists, and wrote `slug:` from the filename.
- Revision dates use the date as written. Jekyll converted to local time, so ~120 old posts dated midnight `-0400` in winter showed the day before.
- Kramdown-only syntax was dropped: `{: style=…}` attributes, `{:target="_blank"}`, emoji shortcodes (the one `:warning:` became ⚠️). Raw `<img>` tags became markdown images.
- URLs that changed have aliases (see `tests/redirects.json`). `some-words-I-like` moved to `_archive/`.
- `themes/jsrowe/static/assets/main.css` is minima's compiled CSS, copied in; we own it now.
