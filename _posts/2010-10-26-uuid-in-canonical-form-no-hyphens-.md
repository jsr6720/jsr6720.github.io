---
layout: post
author: James Rowe
title: "UUID in canonical form (no hyphens)"
date: "2010-10-26 00:00:00 -0400"
tags: 2010 txcowboycoder 4D
uid: fd5cfb88-fea7-4a9b-a9ca-3a5b470fa8fa
---

### Feature Request: return UUID in canonical form (no hyphens)

4D v12 has a new function [Generate UUID](http://doc.4d.com/4D-Language-Reference-12/Tools/Generate-UUID.301-186324.en.html)[^1] This is a much welcome feature, but fails to return an UUID in canonical (with hyphens) form like everyone else[^2].

It would appear that 4D has UUIDs for everything it stores internally[^3]. 4D has no comment on why it has chosen to have `Generate UUID` return a UUID without hyphens.

Further, in v12 using the “UUID format” on an alpha field removes the capability to set the length of said field. If I copy a UUID with hyphens, it strips them out to save them to 32 length string.

4D says there is no benefit, other than convenience, from having an UUID field and a 36 char alpha field with a trigger that stores UUID via `Generate UUID` into it.

Finally, the documentation says to refer to the design reference manual for v12 for more information. Which isn’t out as of the time of this writing.

### A decade in reflection

**note:** revisiting this feature request nearly 15 years years later is surreal. Good news. `4D` now returns either in canonical and non-canonical forms.

The word of software has moved forward tremendously in 15 years and I think documentation and forums have benefitted the most? Maybe? I suppose "It'll go on the backlog.." has its own special place.

Don't worry `4D`, you still hold a special place in my heart.

---

### Significant Revisions

- {{ "2024-05-24 01:03:56 -0400" | date_to_string: "ordinal", "US" }} Picked this one post to modernize for funzies. One of my earliest aspirations was to influence the future of a major software product that I had to use everyday at work.
- {{ "2024-05-06 22:47:18 -0400" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/26/uuid-in-canonical-form/)[^draft]

### Footnotes

[^1]: New link [4Dv20R5 Generate UUID](https://doc.4d.com/4Dv20R5/4D/20-R5/Generate-UUID.301-6817829.en.html#186330)

[^2]: Ah yes. `Everyone` which I'm guessing I meant `PostgreSQL`?

[^3]: As identified by doing a `structure export as xml`

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "4D", "UUID"