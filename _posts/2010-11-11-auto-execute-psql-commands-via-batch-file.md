---
layout: post
author: James Rowe
title:  "Auto execute psql commands via batch file"
date:   "2010-11-11 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder shell-script batch-file psql postgreSQL
uid: de5b266d-8c38-48dd-a178-62346e13664f
---


## Auto execute psql commands via batch file


`psql` via command line does not have an option for password. To run a scheduled task using `psql` is pointless without full automation.


Warning postgres recommends against doing this, and instead use a [password file](http://www.postgresql.org/docs/8.4/interactive/libpq-pgpass.html).


I use this script to kick off the [psql command in python](http://txcowboycoder.wordpress.com/2010/11/11/import-sql-files-via-psql-comma/). But you can execute psql straight from the batch file, just check the `%ERRORLEVEL%` batch variable from the calling method.



```
@echo off

REM scheduled task point to .bat files
REM besides we need to make sure we have system variables in place

REM export a password for use with the system (no quotes)
SET PGHOST=host
SET PGDATABASE=database
SET PGUSER=user
SET PGPASSWORD=user

REM execute psql by file, even though echo is off, errors will still show
psql -X --variable=ON_ERROR_STOP= -1 -w -f filename.sql

```



---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['DOS']

Original Wordpress tags: "DOS", "bat file", "batch file", "DOS", "psql"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2010/11/11/auto-execute-psql-commands-via-batch-file/#comments">2 Comments</a>

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/11/auto-execute-psql-commands-via-batch-file/)

## EOF/Footnotes

