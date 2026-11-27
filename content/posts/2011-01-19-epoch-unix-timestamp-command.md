---
author: James Rowe
title: "Epoch/Unix timestamp command"
date: 2011-01-19 00:00:00 -0500
category: engineering
tags: [txcowboycoder, 4D]
uid: 44cef8cf-66ad-44fc-b99d-e34a80bde608
slug: epoch-unix-timestamp-command
---

## Epoch/Unix timestamp command

Would really like to have a timestamp command that could return the number of seconds elapsed since epoch.

4D commands `Milliseconds` and `Tickcount` return the time elapsed for the current process.

SQL functions `CURRENT_TIMESTAMP` and `CURTIME`return HH:MM:SS not seconds elapsed. (Never mind the apparent lack of a naming convention)

```
C_LONGINT($seconds_since_epoch)
` Time is currently a command that requires parameters
` lets change it so no params = unix timestamp
$seconds_since_epoch:=Time
```

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Jan 19th, 2011 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/19/epochunix-timestamp-command/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "epoch", "timestamp", "time_t"