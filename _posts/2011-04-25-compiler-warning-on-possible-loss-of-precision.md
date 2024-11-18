---
layout: post
author: James Rowe
title:  "Compiler warning on possible loss of precision"
date:   "2011-04-25 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D wish-list data-types error-messages
uid: 276ac24a-6b38-40ae-810d-9199ad51c29e
---


## Compiler warning on possible loss of precision


Just a small wish that 4D compiler would detect and warn on possible losses of precision.


Right now 4D just truncates the decimal value without a peep.


### SQL Engine



```
Begin SQL
	UPDATE Table
	SET FieldInteger =CAST(1.4 as INT)
	WHERE id=29168
End SQL

```

### Native 4D code



```
// assume loadable record
LOAD RECORD([Table])
[Table]FieldInteger:=1.4
SAVE RECORD([Table])

```

Link to official [4D feature request](http://forums.4d.fr/Post//5588408/1/) (login required).




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D', 'Wish List']

Original Wordpress tags: "4D", "Wish List", "possible loss of precision", "real to integer"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/04/25/compiler-warning-on-possible-loss-of-precision/#comments">1 Comment</a>

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/04/25/compiler-warning-on-possible-loss-of-precision/)

## EOF/Footnotes

