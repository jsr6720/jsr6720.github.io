---
layout: post
author: James Rowe
title:  "This month’s date range"
date:   "2011-04-01 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder php date-ranges php-v5.3
uid: 1a21734e-7cf3-4385-81f4-1794f26b33d4
---


## This month’s date range


I noticed that many people search for ‘this month’s date range’. The trick lies in knowing which month you want to go to and that [mktime](http://us.php.net/mktime) can automatically find the end of the month by passing 0 into the day field.


Well in no short order here it is:




| 123456789 | `// casting as date object, otherwise it returns a unix timestamp``$first_of_this_month` `=` `date``(``'m/d/y'``,``mktime``(0,0,0,``date``(``'m'``),1,``date``(``'y'``)));``$end_of_this_month` `=` `date``(``'m/d/y'``,``mktime``(0,0,0,``date``(``'m'``)+1,0,``date``(``'y'``)));` `// if run on 4/01/11``var_dump(``$first_of_this_month``,``$end_of_this_month``);``// outputs``// string(8) "04/01/11"``// string(8) "04/30/11"` |
| --- | --- |




---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['PHP']

Original Wordpress tags: "PHP", "date range", "php 5.3"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/04/01/this-months-date-range/)

## EOF/Footnotes

