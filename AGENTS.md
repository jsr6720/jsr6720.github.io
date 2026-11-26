# jsrowe.com — notes for agents

James Rowe's personal blog. Jekyll + minima, ~380 posts. Sister site: noted.jsrowe.com (Hugo). Plan is to move this one to Hugo too.

## The writing is mine

- Don't rewrite prose. Fix typos, links and formatting when asked; keep my voice, asides and footnotes.
- No bloviation: in posts, comments, commit messages or code.
- Alt text on every image is fine to write or improve.

## Deploy

Push to `main` deploys production. Open a PR; never push to `main`.

- `aws-deploy-jekyll-website.yml` → S3 + CloudFront → https://www.jsrowe.com (canonical)
- `jekyll-gh-pages.yml` → GitHub Pages backup → https://jsr6720.github.io, built with `--config _config.yml,_config.gh-pages.yml`
- `canonical_host` in `_config.yml` keeps canonical/og:url on the backup pointing at jsrowe.com. Don't remove it.
- CI is pinned to `ubuntu-24.04` because setup-ruby has no Ruby 3.3.1 build for 26.04.

## Build and check

```sh
JEKYLL_ENV=production bundle exec jekyll build                                       # AWS
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.gh-pages.yml  # GH Pages
```

Builds take a few minutes. Check the built HTML in `_site/`, not just the Liquid. Check CLI flags against the installed version before using them (html-proofer v5 uses `--checks`).

## Posts

- `_posts/YYYY-MM-DD-slug.md`, served at `/:title/`. Start from `_drafts/YYYY-MM-DD-title.md`.
- Front matter: `layout: post`, `author: James Rowe`, `title`, `date` (`date "+%Y-%m-%d %H:%M:%S %z"`), `category`, `tags`, `uid` (`uuidgen`).
- `category` is one of `review` (books), `engineering`, `personal`.
- `tags` are space-separated. Book tags follow Goodreads shelves; see README.
- End with `### Significant Revisions` (newest first) and `### Footnotes`.
- Book reviews: cover from `assets/posts-images/book-covers/`, citation line, `## My Review N/5`.
- Images go in `assets/posts-images/`.

## Folders

- `_drafts/`: templates and unfinished posts.
- `_archive/`: kept in the repo, not published (`output: false`). "Archived" means this.
- Don't add third-party PDFs or articles. The repo is public, so that's rehosting.

## History

Older posts came from Goodreads and txcowboycoder.wordpress.com (tag `txcowboycoder`). Keep their "Originally published on…" lines.
