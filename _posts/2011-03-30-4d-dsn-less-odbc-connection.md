---
layout: post
author: James Rowe
title:  "4D DSN-less ODBC connection"
date:   "2011-03-30 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder 4D odbc dsn configuration
uid: dc30133e-b5d9-4632-a423-f75a984cebd5
---


## 4D DSN-less ODBC connection


Took me forever to figure this out because the docs out there for 4D are minimal.


Easy configuration of multiple data sources is crucial if you want to use CodeIgniter or any other framework that allows configuration files to control the deployment and connection to various databases.




| `// get the connection resource``$connect` `= odbc_connect(``'DRIVER={4D v11 ODBC Driver};SSL=false;SERVER=192.168.1.100;PORT=19812;UID=user;PWD=password'``,``""``,``""``);` |
| --- |


I played with various different ways of doing this connection string, and found the above the most straight forward. You can leave password blank if there isn’t one.


Now if only they would make a linux odbc driver…




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D ODBC driver", "DSN"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/03/30/4d-dsn-less-odbc-connection/#comments">7 Comments</a>

## Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/30/4d-dsn-less-odbc-connection/)

## EOF/Footnotes

