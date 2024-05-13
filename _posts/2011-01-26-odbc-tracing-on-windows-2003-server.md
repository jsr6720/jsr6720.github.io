---
layout: post
author: James Rowe
title:  "ODBC Tracing on Windows 2003 server"
date:   "2011-01-26 00:00:00 -0400"
tags: 2011 wordpress, txcowboycoder, "Misc", "odbc", "odbc tracing", "windows server"
uid: 98ac9ef5-2024-4586-afe8-2c7bd203015a
---


## ODBC Tracing on Windows 2003 server


Trying to diagnose a connection rejection problem by using the [trace odbc](http://support.microsoft.com/kb/274551) call functionality in windows.


What they kb article doesn’t mention is that you have to restart the IIS Admin service to get it to start writing to the log file. Or restart the box. Also, make sure you have permissions to write to the target directory, and that the appropriate user is targeted that is connecting via ODBC.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Misc']

Original Wordpress tags: "Misc", "odbc", "odbc tracing", "windows server"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/26/odbc-tracing-on-windows-2003-server/)

##### EOF/Footnotes

