---
layout: post
author: James Rowe
title:  "4D Execute on sever command vs method checkbox differences"
date:   "2011-01-31 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D execute-on-server stored-procedure
uid: 130d1c80-00e5-4be4-9a8d-d451755c7fd9
---


## 4D Execute on sever command vs method checkbox differences


I was troubleshooting some long executing code when I discovered the difference between `Execute on server` command and it’s sibling checkbox in the method properties.


What you need to know:


**Use checkbox** if you care about the results of the executed code, you want the server to handle the processing and don’t care that the client waits for the response.


**Use command** to detach the wait from the client and process the code asynchronously.


I won’t go into much detail as it is well documented, but if you do some deep reading.


**Tim Penner on “Command vs. Property”**



> One important difference is that the ***Execute on Server*** command always creates a new process, whether it is called in Client/Server mode or in single-user mode; the ***Execute on Server*** command still creates a new process. 
> 
> 
> In contrast the *Execute on Server* method attribute will not create a new process on the server, but will instead use a “twin” process of the client process that requested the execution. In Single-user mode, this method property has no affect and the method runs in the same process that requested its execution.


**More Information**  

 Execute on Server attribute:  

<http://www.4d.com/docs/CMU/CMU40945.HTM>  

 Execute on Server command:  

<http://www.4d.com/docs/CMU/CMU00373.HTM>  

 Stored Procedures:  

<http://www.4d.com/docs/CMU/CMU40975.HTM> 




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "execute on server", "stored procedure"

Original Wordpress comments: None

## Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/31/4d-execute-on-sever-command-vs-method-checkbox-differences/)

## EOF/Footnotes

