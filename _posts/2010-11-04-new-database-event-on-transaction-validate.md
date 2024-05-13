---
layout: post
author: James Rowe
title:  "New Database event – On Transaction Validate"
date:   "2010-11-04 00:00:00 -0400"
tags: 2010 wordpress, txcowboycoder, "Wish List", "4D", "database event", "transaction"
uid: 5fb22543-48fc-4acf-b39f-6f8b28159707
---


## New Database event – On Transaction Validate


Right now there is no event thrown for VALIDATE/CANCEL transaction. I would like Database event to also return “On validate transaction” and “On cancel transaction”. 


Why you ask? Because triggers are executed inside a transaction block, but if I want to know when the transaction ended I have to write application layer code for something 4D should know when it ended


So even though you can tell if you are in a transaction and what level the transaction is at, you can never tell when that transaction has completed in a trigger.


Vote for the [feature request here](http://forums.4d.fr/Post/EN/4622327/1/4622328).




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Wish List']

Original Wordpress tags: "Wish List", "4D", "database event", "transaction"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/04/new-database-event-on-transaction-validate/)

##### EOF/Footnotes

