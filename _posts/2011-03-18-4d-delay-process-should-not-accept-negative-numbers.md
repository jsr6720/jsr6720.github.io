---
layout: post
author: James Rowe
title: "4D Delay Process should not accept negative numbers"
date: "2011-03-18 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder 4D
uid: bb23408b-aac2-48f8-ae9c-c18e25348f84
---

## 4D Delay Process should not accept negative numbers

Working on a procedure that dynamically slows or speeds itself up based on demand.

I had wrongly assumed that [`Delay Process`](http://doc.4d.com/4Dv11.6/help/command/en/page323.html) would take a negative number and either throw an error or no longer delay the process.

Solution: check for negative numbers and pass a positive number into the `Delay Process` command.

```
` 4D Server v11.8 HF2
` Running on xserve 10.5.6
C_LONGINT($vl_ticks_to_wait;$vl_ticks_elapsed)

` our standard is to to wait 1 second
$vl_ticks_to_wait:=60

` but in this last cycle we took 2 seconds to execute so we don't want to
` pause just go into the next cycle
$vl_ticks_elapsed:=60*2

While (True)
  ` just go with the concept of a loop here
  ` I would think that this would wait a maximum of 60 ticks down to none at all
  ` but when asked to delay a negative number no error is thrown, the process
  ` just becomes permanently "Delayed"
  Delay Process(Current Process;$vl_ticks_to_wait-$vl_ticks_elapsed)
End While
```

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/18/4d-delay-process-should-not-accept-negative-numbers/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

  Original Wordpress categories: ['4D', 'Wish List']

  Original Wordpress tags: "4D", "Wish List", "4D", "delay process"