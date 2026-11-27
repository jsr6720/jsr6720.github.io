---
author: James Rowe
title: "SVN client/server version mismatch"
date: 2010-12-15 00:00:00 -0500
category: engineering
tags: ["2010", txcowboycoder, svn]
uid: 57569740-577a-4bb1-a776-9c9fa4dcbfa5
slug: svn-client-server-version-mismatch
---

## SVN client/server version mismatch

Not a huge deal, but I spent a while fighting with various svn errors and finally figured it out.

Unlike distributed VCS, svn relies on clients and a server repo to handle source code. So if a svn 1.3.1 client checks out code the .svn folders are created using that version.

When a 1.6.11 svn client comes a long and tries to do an update from a 1.6.11 server repo the svn client major differences can cause problems.

Such as:

* `log entry missing 'name' attribute`
* `svn: Error processing command 'rm'`

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Dec 15th, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/12/15/svn-clientserver-version-mismatch/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['SVN']

    Original Wordpress tags: "SVN"