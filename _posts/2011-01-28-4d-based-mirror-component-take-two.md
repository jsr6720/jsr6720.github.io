---
layout: post
author: James Rowe
title: "4D based mirror component – take two"
date: "2011-01-28 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder 4D
uid: 1f50818d-77a7-4a2f-ba57-35b5a1c28f79
---

## 4D based mirror component – take two

My first attempt to [mirror data](https://txcowboycoder.wordpress.com/2010/10/20/mirroring-data-to-another-database/) from 4D to another database didn’t work. So, I’m taking another crack at it with lessons learned from my previous attempt.

My aim now is to make a component that will be transaction safe, and model itself after the 4D KB article published about [Synchronization and Replication in v12](http://kb.4d.com/search/assetid=76224) (4D partner login required). Since I am still using v11 and a v12 upgrade is not on the horizon, I am taking my own approach.

**Component**

Allow definition of multiple ‘mirror preferences’. Each of these linkages would define:

tables and fields to mirror  

 -> table pk field name  

 -> table last updated date/time field names  

 -> boolean field name to escape mirroring (so you can accept changes to the mirrored database and write them back without mirroring them out again)  

 interval to execute at  

 service to utilize (soap, file, sql, plugin)  

 last run date/time

@todo build synchronization of table/field names via alter table

**Process**

On the defined interval, or manually, the server process would spawn processes to look at target tables for updated/new records (making it transaction safe) and then of the records that were updated send over the target data.

Feel free to take it and run with it. Feedback and your thoughts welcome. 

Say is there a market for companies that want to have their data available in a SQL database of repute?

More post to follow.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/28/4d-based-mirror-component-take-two/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4d component", "mirroring", "v11"