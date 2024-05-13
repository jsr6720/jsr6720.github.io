---
layout: post
author: James Rowe
title:  "Porting DATE_TO_CHAR function to PostgreSQL"
date:   "2011-07-11 00:00:00 -0400"
tags: 2011 wordpress, txcowboycoder, "4D", "Postgres", "4D SQL", "Postgres", "SQL function"
uid: 1e08d968-2bf0-4447-b115-825c7231f14e
---


## Porting DATE_TO_CHAR function to PostgreSQL


This allows multiple data stores but without rewriting all sql queries. Note you have to create two functions, one to accept dates, the other to accept times.


Specifically the 4D SQL function [`DATE_TO_CHAR`](http://doc.4d.com/4D-SQL-Reference-12.1/Functions/DATE-TO-CHAR.300-494541.en.html). Luckily PostgreSQL has the equivalent as a formatting function [`to_char`](http://www.postgresql.org/docs/8.4/static/functions-formatting.html).


For business reasons it’s not practical to replace all instances of `DATE_TO_CHAR` to `to_char`.


## Solution


Create a function in the postgresql data base that maps the `DATE_TO_CHAR` function to `to_char`. Luckily the formatting options I need are available.


Now `SELECT DATE_TO_CHAR(DateField1, "YYYY-MM-DD") FROM Table1` will return the correct value regardless of the database queried. It’s important to note this works great for getting integer values from dates and casting as date objects. If queries rely on returning non-iso formatting your mileage may vary.



```
-- Function: date_to_char(date, text)
CREATE OR REPLACE FUNCTION date_to_char(date, text)
  RETURNS text AS
$BODY$
  DECLARE
  BEGIN
       RETURN to_char($1,$2)::text;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION date_to_char(date, text) OWNER TO postgres;

```


```
-- Function: date_to_char(time without time zone, text)
CREATE OR REPLACE FUNCTION date_to_char(time without time zone, text)
  RETURNS text AS
$BODY$
  DECLARE
  BEGIN
       RETURN to_char($1,$2)::text;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION date_to_char(time without time zone, text) OWNER TO postgres;

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D', 'Postgres']

Original Wordpress tags: "4D", "Postgres", "4D SQL", "Postgres", "SQL function"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/07/11/porting-date_to_char-function-to-postgresql/)

##### EOF/Footnotes

