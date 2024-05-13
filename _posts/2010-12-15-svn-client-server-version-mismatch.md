---
layout: post
author: James Rowe
title:  "SVN client/server version mismatch"
date:   "2010-12-15 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder svn gotchas
uid: 57569740-577a-4bb1-a776-9c9fa4dcbfa5
---


## SVN client/server version mismatch


Not a huge deal, but I spent a while fighting with various svn errors and finally figured it out.


Unlike distributed VCS, svn relies on clients and a server repo to handle source code. So if a svn 1.3.1 client checks out code the .svn folders are created using that version.


When a 1.6.11 svn client comes a long and tries to do an update from a 1.6.11 server repo the svn client major differences can cause problems.


Such as:


* `log entry missing 'name' attribute`
* `svn: Error processing command 'rm'`




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['SVN']

Original Wordpress tags: "SVN"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/12/15/svn-clientserver-version-mismatch/)

##### EOF/Footnotes

