---
layout: post
author: James Rowe
title: "Return stack size information with PROCESS PROPERTIES"
date: "2011-03-21 00:00:00 -0400"
category: engineering
tags: 2011 txcowboycoder 4D
uid: 2bd5eb09-f82a-4cf0-b3ab-5e99e83b284e
---

## Return stack size information with PROCESS PROPERTIES

See my [official feature request](http://forums.4d.fr/Post//5368969/1/).

When executing processes that have the potential to use a large amount of memory 4D recommends “allocating enough stack size to the process” to be sufficient to do the job.

Well how would we know that?

I propose adding two additional return variables to [`PROCESS PROPERTIES`](http://doc.4d.com/4Dv11.6/help/command/en/page336.html). Stack Size and Stack Utilized.

This would allow me to get a point in time measurement of what I allocated to the process and how much the process is currently using of that allocated stack.

>Product :4D – 4D Server  
>4D : v11 SQL r8  
>OS : Mac OS 10.5.7 or Windows

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/21/return-stack-size-information-with-process-properties/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D', 'Wish List']

    Original Wordpress tags: "4D", "Wish List", "execute on server", "new process", "PROCESS PROPERTIES", "stack size"