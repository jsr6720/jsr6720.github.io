---
layout: post
author: James Rowe
title:  "4D Log Event command and log level importance"
date:   "2011-03-08 00:00:00 -0400"
tags: 2011 wordpress, txcowboycoder, "4D", "console", "log event", "mac console"
uid: 19636f63-63fc-4d92-b336-0fe3530a3b2c
---


## 4D Log Event command and log level importance


I began experimenting with the 4D command [`LOG EVENT`](http://doc.4d.com/4D-Language-Reference-12.1/System-Environment/LOG-EVENT.301-479440.en.html).


The documentation states the third parameter, importance, is optional. I’ve never used console before, but I had to assign the importance parameter to `Error Message` for it to show in my console. 


`Information Message` (default) and `Warning Message` did not show.



```
` this works
LOG EVENT(Into 4D Debug Message ;"My message";Error Message )

` using the default does not
LOG EVENT(Into 4D Debug Message ;"Does not work" )

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "console", "log event", "mac console"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/08/4d-log-event-command-and-log-level-importance/)

##### EOF/Footnotes

