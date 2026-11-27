---
author: James Rowe
title: "Windows get CPU usage command"
date: 2010-11-16 00:00:00 -0500
category: engineering
tags: ["2010", txcowboycoder, batch]
uid: 1d8dc9fa-bdb2-4de8-ae90-19927a7d8f4b
slug: windows-get-cpu-usage-command
---

## Windows get CPU usage command

Searched high and low for a command to get CPU usage on the internet to no avail. From a DOS command prompt (Windows server 2003) CPU usage for all nodes:

```batch
WMIC CPU GET LoadPercentage
```

`SNMP` was my other alternative, but not all deployments would have this service.

This does not aggregate the values, nor does it easily feed into a batch file. For that I use a `FOR` loop.


```batch
FOR /F "delims= " %%i in ('WMIC CPU GET LoadPercentage') do @echo %%i
```

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Nov 16th, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/16/windows-get-cpu-usage-command/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['DOS']

    Original Wordpress tags: "DOS", "CPU", "DOS CPU usage", "utilization"