---
author: James Rowe
title: "Merge command/control down key functions"
date: 2010-11-03 00:00:00 -0400
category: engineering
tags: [txcowboycoder, 4D]
uid: e4007da7-5a11-4aaa-922e-c95058a3d520
slug: merge-command-control-down-key-functions
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

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Nov 3rd, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/03/merge-commandcontrol-down-key-functions/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "4D", "control key", "key down"