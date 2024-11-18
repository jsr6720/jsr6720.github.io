---
layout: post
author: James Rowe
title:  "Get last month’s date range in PHP"
date:   "2011-02-10 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder php date-ranges
uid: bf4aac5b-8551-411c-b158-bfc6b57643a9
---


## Get last month’s date range in PHP


I needed to get last month’s valid date range in php for running reports. A quick google search showed the top results for accomplishing this used `for` loops that subtracted/added days from now until casting as a date object returned false.


Needless to say, no way am I doing that. So below I have a code snippet that returns the valid start and end date of the previous month. This could be modified in a variety of ways to suit your needs. Needless to say I was disappointed that `strtotime` did not accept “First day of last month”.




| 12345678910 | `// this returns a date string which I need, but removing the casting as a date``// returns a unix timestamp value more useful for calculations``$first_of_last_month` `=` `date``(``'m/d/y'``,``mktime``(0,0,0,``date``(``'m'``)-1,1,``date``(``'y'``)));``$end_of_last_month` `=` `date``(``'m/d/y'``,``mktime``(0,0,0,``date``(``'m'``),0,``date``(``'y'``)));` `// if run on 03/01/11``var_dump(``$first_of_last_month``,` `$end_of_last_month``);``// outputs``// string(8) "02/01/11"``// string(8) "02/28/11"` |
| --- | --- |




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['PHP']

Original Wordpress tags: "PHP", "date", "monthly date range", "php"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/02/10/get-last-months-date-range-in-php/#comments">2 Comments</a>

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/02/10/get-last-months-date-range-in-php/)

## EOF/Footnotes

