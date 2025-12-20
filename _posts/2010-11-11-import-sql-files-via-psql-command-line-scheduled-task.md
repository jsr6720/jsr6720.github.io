---
layout: post
author: James Rowe
title: "Import SQL files via psql command line scheduled task"
date: "2010-11-11 00:00:00 -0400"
category: engineering
tags: 2010 txcowboycoder python
uid: c0db148d-196a-4370-83cd-4cf7516b5c7c
---

## Import SQL files via psql command line scheduled task

This script will monitor a hot folder, take it’s contents and execute the files against a postgres server.

Why post this? This python script in conjunction with a [parameter setting batch file](http://jsrowe.com/auto-execute-psql-commands-via-batch-file/index.html) can take SQL output and apply it to the postgres database. Originally I was searching how to do this via DOS when I realized I didn’t have all the error catching capability that I wanted.

Developing this came from trying to solve how to systematically apply changes from other systems to one database. This script does not make a distinction between files. So if one system outputs several files that need uploading and separate files target the same record, last loaded is last applied.

I’ve simplified the script a little for ease of posting, this does require system variable `PGPASSWORD` to run.

```python
import os, glob, shutil

# count
fileCount = 0

# ASSUMES this file is above INCOMING/ BAD/ and ARCHIVE/
filelist = glob.glob("INCOMING/*.sql")

for file in filelist:
    # take the file and thrown it against psql
    # read psql --help for details about options
    # setting ON_ERROR_STOP to nothing tells psql to pass back an error status code
    errorlevel = os.system("psql -X -U some_user -d database --variable=ON_ERROR_STOP= -1 -w -f "+file)

    # check for errors (thrown by psql)
    if errorlevel != 0:
        # error was thrown, lets report it and stash the file
        print errorlevel
        shutil.move(file,"BAD/")
    else:
        print file + " processed"
        shutil.move(file,"ARCHIVE/")
        fileCount += 1

print str(fileCount) + " files processed"

```

---

### Significant Revisions

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/11/import-sql-files-via-psql-comma/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Postgres']

    Original Wordpress tags: "Postgres", "psql", "Python", "scheduled task"