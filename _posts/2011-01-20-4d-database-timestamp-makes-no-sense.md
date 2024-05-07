---
layout: post
author: James Rowe
title:  "4D Database timestamp makes no sense"
date:   "2011-01-20 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "datetime", "odbc", "time"
uid: f54ffbc1-6807-4e74-a212-9554aac8d4ca
---


## 4D Database timestamp makes no sense


As part of the 4Dv11 upgrade timestamps were supposed to be included.


However once again 4D shows no developer sense in this feature:



> When pull[ing] data from a 4D data source over ODBC … be aware that when accessed via ODBC or SQL, the DATE field is treated as a SQL Timestamp field.


Really? So what should I do with my existing ODBC web code? Oh no problem, just change your SQL statement to include `DATE_TO_CHAR(my_field, "MM/DD/YY")` commands. Or write a function that strips the time away from the data field.


Want to use that stored timestamp value in 4D? Forget it. No variable type of `C_TIMESTAMP` is available. Once again the features of the SQL engine cause developers headache on the pure 4D side.


Maybe someday in the future 4D engineering will get the features in both engines synchronized and making sense.




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "datetime", "odbc", "time"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/20/4d-database-timestamp-makes-no-sense/)

##### EOF/Footnotes

