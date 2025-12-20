---
layout: post
author: James Rowe
title: "svn: Argument list too long"
date: "2010-11-29 00:00:00 -0400"
category: engineering
tags: 2010 txcowboycoder svn
uid: d68e181d-e47f-4a38-872e-720281b57ebf
---

## svn: Argument list too long

Recently I needed to add thousands of files to an existing repository, but every time I tried `svn add *` or the `svn import` functionality I got the error: 

`svn: Argument list too long`

I finally found help with [a post on how to add multiple files to subversion](https://web.archive.org/web/20101223190313/http://www.arraystudio.com/as-workshop/how-to-add-multiple-files-to-subversion.html) but it did not work with file names with spaces.

So below I take the substring of the output in spaces and ? from the whole line before adding the file.

```bash
svn status | grep "^?" | awk '{ print substr($0,9,length($0))}' | while read f; do svn add "$f"; done
```

I’m sure more can be done to make this better, but this did the job I needed. For example using `ls` to import to svn would be helpful. For now this only works when `svn status` can be executed.

I think `find` is the best way to do this, with regex support; but again I just hacked my way to the finish line.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/29/svn-argument-list-too-long/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['SVN']

    Original Wordpress tags: "SVN", "svn add", "terminal"