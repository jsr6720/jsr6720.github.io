---
layout: post
author: James Rowe
title:  "Merge command/control down key functions"
date:   "2010-11-03 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder wish-list 4D event-handling
uid: e4007da7-5a11-4aaa-922e-c95058a3d520
---


## Merge command/control down key functions


Key modifiers can mean lot for contextual clicks:


Want to know if the user has the shift key down: [`Shift down`](http://doc.4d.com/4D-Language-Reference-12/User-Interface/Shift-down.301-155206.en.html)


How about caps lock: [`Caps lock down`](http://doc.4d.com/4D-Language-Reference-12/User-Interface/Caps-lock-down.301-155202.en.html)


But want to know if a control key is down?


<http://doc.4d.com/4D-Language-Reference-12/User-Interface/Windows-Ctrl-down.301-155201.en.html> returns true for windows and the command ([`Macintosh command down`](http://doc.4d.com/4D-Language-Reference-12/User-Interface/Macintosh-command-down.301-155203.en.html)) key on mac


Is it just me or should anything with `Windows` in the command only return true for windows machines? I would like to either see a generic `Is command or control down` or split the functionality of os specific functions as to not cause confusion.


I feel the same way about [`Macintosh option down`](http://doc.4d.com/4D-Language-Reference-12/User-Interface/Macintosh-option-down.301-155204.en.html) and [`Windows alt down`](http://doc.4d.com/4D-Language-Reference-12/User-Interface/Windows-Alt-down.301-155200.en.html).




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Wish List']

Original Wordpress tags: "Wish List", "4D", "control key", "key down"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/03/merge-commandcontrol-down-key-functions/)

##### EOF/Footnotes

