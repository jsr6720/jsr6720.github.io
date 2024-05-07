---
layout: post
author: James Rowe
title:  "svn: Can’t move /.svn/tmp/entries: Operation not permitted"
date:   "2011-01-10 00:00:00 -0400"
tags: wordpress, txcowboycoder, "SVN", "commit failed", "svn commit", "svn terminal"
uid: e799d85e-4cee-4da2-a8f0-ad1f5caec477
---


## svn: Can’t move /.svn/tmp/entries: Operation not permitted


Another weird SVN error. I keep telling myself I need to re-checkout a clean version of the svn repository, or better yet export to code, or even better use git.


Regardless I found an obscure post with the solution. I had the problem again, couldn’t find the post so here we go again. May need `sudo` privileges


I’ve replaced directory path with {folder root} for generic purposes.


**Error**



```
$ svn commit -m "testing commit"
svn: Commit failed (details follow):
svn: Can't move '{folder root}/.svn/tmp/entries' to '{folder root}/.svn/entries': Operation not permitted

```

**Solution**



```
$ chflags -R nouchg ./

```

What does this magic do? This changes the immutable flag on the file that allows for editing of the hidden files. The commit should now work.


Unknown is how changing an immutable flag affects the windows system it runs on. I am using terminal to access a samba mounted drive on `/Volumes`.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['SVN']

Original Wordpress tags: "SVN", "commit failed", "svn commit", "svn terminal"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/10/svn-cant-move-svntmpentries-operation-not-permitted/)

##### EOF/Footnotes

