---
layout: post
author: James Rowe
title:  "Keep code base clean – avoid unnecessary variable assignments"
date:   "2011-07-14 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder clean-code programming technology
uid: 9d8cfa52-f8f0-418e-b704-a978d1401aea
---


## Keep code base clean – avoid unnecessary variable assignments


Can’t tell you how frustrating it is to find the context of a variable stripped away by a [meaningless re-assgiment](http://my.safaribooksonline.com/book/software-engineering-and-development/agile-development/9780136083238/meaningful-names/18) (login required).


From Clean Code: A Handbook of Agile Software Craftsmanship:



> The name of a variable, function, or class, should answer all the big questions. It  
> 
>  should tell you why it exists, what it does, and how it is used




| 123456 | `// doing this totally strips away any meaningful context``$my_temp_variable` `=` `$employee_salaries``[``$an_employee_name``];``$gross_salary` `=` `$bonus_factor` `*` `$my_temp_variable``;` `// hopefully the language constructs allow full variable interaction``$gross_salary` `=` `$bonus_factor` `*` `$employee_salaries``[``"Fred"``]` |
| --- | --- |


Advertisement 

---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['Clean Code']

Original Wordpress tags: "Clean Code", "clean code", "temp variables"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/07/14/keep-code-base-clean-avoid-unnecessary-variable-assignments/)

## EOF/Footnotes

