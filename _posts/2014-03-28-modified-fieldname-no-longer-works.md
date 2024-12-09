---
layout: post
author: James Rowe
title:  "Modified({fieldname}) no longer works"
date:   "2014-03-28 00:00:00 -0400"
category: software
tags: 2014 txcowboycoder 4D
uid: edb36778-ffa9-4a5d-af4b-c0c5c5f0db75
---

## Modified({fieldname}) no longer works

4D finally did away with the Modified({fieldname}) command.

I’ve replaced it in our code base with

Old({fieldname})#fieldname

4D recommends using the Form Event and On Data Change event.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2014/03/28/modifiedfieldname-no-longer-works/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Misc']

    Original Wordpress tags: "Misc", "4D"