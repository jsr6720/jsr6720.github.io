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

- Fewest overrides that keep the look and feel. `themes/jsrowe/static/assets/main.css` is minima's base, left as shipped; changes go in `css/main-overrides.css`. Before adding a rule, check whether an existing one can change instead; delete rules that no longer match anything.
- Links in the writing (posts, pages, home intro, prev/next) are obvious: blue and always underlined. Site chrome (header, nav, post lists, footer) stays ink.
- Images: see "Images" below.

## License

Writing is CC BY-NC-ND 4.0 (`LICENSE`); code samples are MIT (`CODE-LICENSE`). Don't change either.

## Deploy

Push to `main` deploys production. Open a PR; never push to `main`.

- `hugo-check.yml` (PRs): build, Playwright tests, and a PR comment with the version merging will release.
- `deploy.yml` (push to `main`): one build (`baseURL` https://www.jsrowe.com/), tested, then deployed to S3 + CloudFront → https://www.jsrowe.com (canonical) and GitHub Pages → https://jsr6720.github.io (backup), then tagged and released.
- `aws-cloudfront-invalidations.yml`: manual cache invalidation.

Canonical, og:url, feeds and sitemap always point at www.jsrowe.com, on both. `/llms.txt` (index of posts) and `/llms-full.txt` (every post's markdown) follow https://llmstxt.org; they're built from `themes/jsrowe/layouts/home.llms*.txt`. Hugo version is pinned in `.hugo-version`; CI reads it.

After a deploy, check the live site, not just the run: fetch every URL in https://www.jsrowe.com/sitemap.xml and every `from` in `tests/redirects.json`, and compare the page `<title>`, not only the status. CloudFront answers missing pages with the homepage and a 200 (soft 404), so a status check passes for a file that never reached S3.

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

- `tests/templates.spec.ts` has one check per template in `themes/jsrowe/layouts`. Adding, renaming or deleting a template fails the suite until `TEMPLATES` there is updated, so a new template ships with its test.
- `tests/content.spec.ts` checks post front matter.

Run them before opening a PR. If a test fails, fix the site, not the test.

When a page's URL changes, add `aliases: ["/old/"]` to its front matter and list it in `tests/redirects.json` (`{ "from": "/old/", "to": "/new/" }`).

## Layout

- `content/posts/`: posts. `content/about.md`, `content/bookshelf.md`: pages. `content/feed/`: per-category feed definitions.
- `themes/jsrowe/`: the design. `layouts/` (Hugo 0.146+ template names; `posts/page.html` is the post template, `page.html` the plain one for About/Bookshelf), `layouts/_markup/` (heading and image render hooks), `static/assets/` (CSS).
- `static/`: served as-is (images, favicons, `robots.txt`).
- `archetypes/posts.md`: new-post template.
- `hugo.yaml`: site config.

## Posts

- Start a post with `hugo new content content/posts/YYYY-MM-DD-slug.md`. It's created with `draft: true`, the date, slug, uid and a "Draft created" revision line. Remove `draft` to publish.
- Filename `YYYY-MM-DD-slug.md`; the URL is `/slug/` from the `slug:` front matter. Hugo strips `'` and `,` from URLs and lowercases them.
- Front matter: `author`, `title`, `date` (`date "+%Y-%m-%d %H:%M:%S %z"`), `category`, `tags` (a list), `uid`, `slug`. Optional: `toc: true`, `images: [...]` (social preview), `description`, `aliases`, `draft`. No `layout`. `tests/content.spec.ts` enforces this, including typo'd keys.
- The filename date must match `date:`. When publishing a draft on a later day, update both.
- All dates are US Eastern (`timeZone: America/New_York`): `-0400` in summer, `-0500` in winter. `date "+%Y-%m-%d %H:%M:%S %z"` on my machine gets it right; the test checks.
- `category` is one of `review` (books), `engineering`, `personal`.
- Book tags follow Goodreads shelves; see README. No year tags: the date already says when.
- End with `### Significant Revisions` (newest first, e.g. `- Nov 26th, 2026 Originally published on [https://www.jsrowe.com](https://www.jsrowe.com) with uid …`) and `### Footnotes`. These are plain text; content files can't use template code.
- Book reviews: cover from `static/assets/posts-images/book-covers/`, citation line, `## My Review N/5`.
- Link other posts with a plain path: `[title](/slug/)`.
- No embeds (gists, tweets, videos): they're third-party requests. Paste the code into a fenced block and link the source under it.
- Angle brackets in prose (`<Latest>`, `List<T>`) are read as HTML tags and vanish. Use backticks or `\<Latest\>`; `build.spec.ts` checks.
- Code blocks name their language (```` ```php ````); Hugo's built-in Chroma highlights them with minima's colors. Terminal sessions are `console`, error output and non-code are `text`. `4d` has no highlighter and renders plain.

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

## Gotchas (learned the hard way)

- Hugo 0.146+ template lookup: `page.html` outranks `single.html`, so the post template is `posts/page.html`. `tests/templates.spec.ts` catches a page landing on the wrong template.
- `capitalizeListTitles: false` keeps tag names as written, but also lowercases titles Hugo generates (`/tags/`, `/category/…/`). Title those with an `_index.md`.
- `actions/upload-artifact` skips dot-files and dot-folders unless `include-hidden-files: true`. An alias folder starting with `.` once went missing from S3 this way while GitHub Pages (a different upload) had it.
- `ubuntu-latest` moves. When Playwright can't install Chromium in CI, upgrade `@playwright/test` (pinned exactly in `tests/package.json`) to a release a few weeks old, run the tests locally, then push.
- Fix content with a script over all posts, then prove it with a test that fails on the old content. Every cleanup in the Hugo move (time zones, year tags, code fence languages, hidden `<tag>` text) works this way, and each one found more than the first grep did.

## History

Older posts came from Goodreads and txcowboycoder.wordpress.com (tag `txcowboycoder`). Keep their "Originally published on…" lines.

The site was Jekyll + minima (Ruby) until v4.0.0; Hugo starts at v5.0.0. If something looks odd in an old post, `git log --follow` it back through `_posts/` and compare with the `v4.0.0` tag. What the move changed:

- `scripts/jekyll-to-hugo.py` baked Liquid into plain text (revision dates, `site.url`, `uid`), turned `post_url`/`link` tags into `/slug/` paths, made tags lists, and wrote `slug:` from the filename.
- Revision dates use the date as written. Jekyll converted to local time, so ~120 old posts dated midnight `-0400` in winter showed the day before.
- Kramdown-only syntax was dropped: `{: style=…}` attributes, `{:target="_blank"}`, emoji shortcodes (the one `:warning:` became ⚠️). Raw `<img>` tags became markdown images.
- URLs that changed have aliases (see `tests/redirects.json`). `some-words-I-like` moved to `_archive/`.
- `themes/jsrowe/static/assets/main.css` is minima's compiled CSS, copied in; we own it now.
