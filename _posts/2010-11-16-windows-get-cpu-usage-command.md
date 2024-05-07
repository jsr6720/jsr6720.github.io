---
layout: post
author: James Rowe
title:  "Windows get CPU usage command"
date:   "2010-11-16 00:00:00 -0400"
tags: wordpress, txcowboycoder, "DOS", "CPU", "DOS CPU usage", "utilization"
uid: 1d8dc9fa-bdb2-4de8-ae90-19927a7d8f4b
---


## Windows get CPU usage command


Searched high and low for a command to get CPU usage on the internet to no avail. From a DOS command prompt (Windows server 2003) CPU usage for all nodes:



```
WMIC CPU GET LoadPercentage

```

SNMP was my other alternative, but not all deployments would have this service.


This does not aggregate the values, nor does it easily feed into a batch file. For that I use a `FOR` loop.



```
FOR /F "delims= " %%i in ('WMIC CPU GET LoadPercentage') do @echo %%i

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['DOS']

Original Wordpress tags: "DOS", "CPU", "DOS CPU usage", "utilization"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/16/windows-get-cpu-usage-command/)

##### EOF/Footnotes

