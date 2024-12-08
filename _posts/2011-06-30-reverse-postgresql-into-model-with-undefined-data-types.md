---
layout: post
author: James Rowe
title:  "Reverse PostgreSQL into model with undefined data types"
date:   "2011-06-30 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder odi oracle-data-integrator data-types postgreSQL
uid: 21ed9d3b-72dd-4c5e-8847-d8e3f4da19d0
---


## Reverse PostgreSQL into model with undefined data types


Recently while importing a new physical schema from PostgreSQL 8.4 into Oracle Data Integrator(ODI) via JDBC driver all of the tables were reversing into the model without data types defined for text, double precision, smallint, integer and boolean.


If one or two fields are missing it’s easy enough to set the data type manually for the column, but for a whole mess of tables and thousands of fields it’s unrealistic.


The solution is to define the proper data types using the physical architecture tab with PostgreSQL internal names for the data types. Even though by default there is one for integer, looking at the [data type definitions](http://www.postgresql.org/docs/8.2/static/datatype.html#DATATYPE-TABLE) smallint maps to int2, integer maps to int4, double precision maps to float8, boolean maps to bool.


Using these aliases which are used internally by PostgreSQL for historical reasons in the ODI Physical Architecture will fix the missing data types during the reverse process.




---

## Author's Note

Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

Original Wordpress categories: ['Oracle Data Integrator']

Original Wordpress tags: "Oracle Data Integrator", "data types", "ODI", "PostgreSQL", "reverse"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/06/30/reverse-postgresql-into-model-with-undefined-data-types/)

## EOF/Footnotes

