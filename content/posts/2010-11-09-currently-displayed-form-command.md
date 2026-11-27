---
author: James Rowe
title: "Currently displayed form command"
date: 2010-11-09 00:00:00 -0500
category: engineering
tags: ["2010", txcowboycoder, 4D]
uid: 5fa5be7b-6e29-44a5-93f9-2da3057b1ea9
slug: currently-displayed-form-command
---

## Currently displayed form command

A command `Currently displayed form` would return a text string of whatever form is set by `INPUT FORM` or `DIALOG` and is currently displayed.

[4D feature request](http://forums.4d.fr/Post//4641149/1/)

This would help determine what the user is looking at during troubleshooting. Also the table name and form name could be passed to `GET FORM PROPERTIES` for even more information.

But without knowing which form (project or table) the user has up issue triage generally involves asking the user ‘what were you doing at the time of error?’. 

Yes I am aware of `WINDOW LIST` and `Current form table` commands, neither gets the answer of what table or project form is currently displayed.

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Nov 9th, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/09/currently-displayed-form-command/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "4D", "command"