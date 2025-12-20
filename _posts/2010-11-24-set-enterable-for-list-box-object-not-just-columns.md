---
layout: post
author: James Rowe
title: "Set enterable for list box object not just columns"
date: "2010-11-24 00:00:00 -0400"
category: engineering
tags: 2010 txcowboycoder 4D
uid: f8afa7e4-f965-4df1-bc85-3ec869ba79c7
---

## Set enterable for list box object not just columns

Title says it all, I can set individual columns of a list box to be enterable false using the property inspector, but I can’t do this for the overall listbox.

I have to either set each column to enterable false, or execute `SET ENTERABLE(objName;False)` at `On Load` event.

Forum based [feature request](http://forums.4d.fr/Post/EN/4708782/) with 4D.


---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/24/set-enterable-for-list-box-not-just-columns/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "list box", "set enterable"