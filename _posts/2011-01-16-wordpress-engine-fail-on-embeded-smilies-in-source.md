---
layout: post
author: James Rowe
title: "WordPress engine fail on embeded smilies in source"
date: "2011-01-16 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder wordpress
uid: 8fb511d4-1143-434f-86f7-fa9dd761a349
---

## WordPress engine fail on embeded smilies in source

So I went to post a source code snippet and kept getting this

```
<img src="http://s1.wp.com/wp-includes/images/smilies/icon_surprised.gif?m=1268811515g" alt=":o" class="wp-smiley">
```

Whenever I had `:o` in my examples. Say for a ruby on rails `:order` example.

Turns out [smilies](http://en.support.wordpress.com/smilies/)[^emojii] can be disabled blog wide. I would just expect wordpress to not parse ‘smilies’ in my `sourcecode` blocks.

---

### Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/16/wordpress-engine-fail-on-embeded-smilies-in-source/)

## Footnotes

[^emojii]: Showing my age here a little. `smilies` now redirects to [emoji](https://wordpress.com/support/emoji/). Also in revisiting this post just over 13 years ({{ "2024-05-13 01:32:08" | date_to_string: "ordinal", "US" }}) later I had forgotten emojis were once called "smilies"\[sic\].

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Misc']

    Original Wordpress tags: "Misc", "parse", "smilies", "wordpress engine"

    Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/01/16/wordpress-engine-fail-on-embeded-smilies-in-source/#comments">1 Comment</a>
