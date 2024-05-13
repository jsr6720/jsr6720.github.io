---
layout: post
author: James Rowe
title:  "UUID in canonical form (no hyphens)"
date:   "2010-10-26 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder wish-list 4D uuid
uid: fd5cfb88-fea7-4a9b-a9ca-3a5b470fa8fa
---


## UUID in canonical form (no hyphens)


4D v12 has a new function `[Generate UUID](http://doc.4d.com/4D-Language-Reference-12/Tools/Generate-UUID.301-186324.en.html)`. This is a much welcome feature, but fails to return an UUID in canonical (with hyphens) form like everyone else.


It would appear that 4D has UUIDs for everything it stores internally (structure export as xml) without hyphens. 4D has no comment on why it has chosen to have `Generate UUID` return a UUID without hyphens.


Further, in v12 using the “UUID format” on an alpha field removes the capability to set the length of said field. If I copy a UUID with hyphens, it strips them out to save them to 32 length string.


4D says there is no benefit, other than convenience, from having an UUID field and a 36 char alpha field with a trigger that stores UUID via `Generate UUID` into it.


Finally, the documentation says to refer to the design reference manual for v12 for more information. Which isn’t out as of the time of this writing.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Wish List']

Original Wordpress tags: "Wish List", "4D", "UUID"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/26/uuid-in-canonical-form/)

##### EOF/Footnotes

