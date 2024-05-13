---
layout: post
author: James Rowe
title:  "Using Redmine as a help desk"
date:   "2011-04-06 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder help-desk ticket-system redmine
uid: 8e771049-77d5-4aa9-a81a-26afd91dd3c8
---


## Using Redmine as a help desk


The primary purpose of [Redmine](http://www.redmine.org) is a project management tool.


However it can be used as a help desk solution with a little configuration.


The key is setting up Redmine to [receive e-mails](http://www.redmine.org/projects/redmine/wiki/RedmineReceivingEmails).


My personal approach is to set up the e-mail retrieval as IMAP. This way you could set up a new account `help@example.com` and any incoming messages are sent to a project of your designation.


See the documentation for the most up to date information. Now when a user or anyone sends an e-mail to `help@example.com` a new issue with a set status is created. Future correspondence via the issue are automatically added.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Misc']

Original Wordpress tags: "Misc", "help desk", "redmine"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/04/06/using-redmine-as-a-help-desk/#comments">3 Comments</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/04/06/using-redmine-as-a-help-desk/)

##### EOF/Footnotes

