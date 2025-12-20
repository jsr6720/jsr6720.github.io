---
layout: post
author: James Rowe
title: "Allow NULL values in 4DB engine"
date: "2011-06-07 00:00:00 -0400"
category: engineering
tags: 2011 txcowboycoder 4D
uid: 392ef8f3-499a-4b3c-b677-5628997f8e7f
---

## Allow NULL values in 4DB engine

Developers need to be able to use nulls if using SQL engine and 4DB engine in 4D. As of this writing the concepts of `NULL` values are very [loosely integrated with 4D](http://doc.4d.com/4Dv11.4 /help/Title/en/page370.html).

> NULL Values in 4D 
> 
> The NULL values are implemented in the 4D SQL language as well as in the 4D database engine. However, they are not supported in the 4D language. It is nevertheless possible to read and write NULL values in a 4D field using the Is field value Null and SET FIELD VALUE NULL commands.

Never mind the very logic of a null value is to indicate not set. Mapping null values to ‘blank’ values only mucks up the data. Does a widget inventory level of 0 indicate ‘not yet set’ or ‘depleted to zero’? Yes business logic will clear these things up, but integration of null values with the 4D native engine would be better. 

```
// http://doc.4d.com/4Dv11.6/help/command/en/page965.html
// This is a useless command, and is only used by the SQL kernal of 4D
SET FIELD VALUE NULL([Table_1]Field_1)

// having a null keyword would be useful
[Table_1]Field_1:=null
```

For example, you cannot search null values using the standard query window. Also, variables cannot accept null values. Null comparisons are limited to [`Is field value Null`](http://doc.4d.com/4Dv11.6/help/command/en/page964.html) which can only look at fields.

Seems as if 4D is not giving developers all the tools to make a hybrid deployable solution. Its been my experience to code solutions that either go 100% native 4D code or go 100% SQL engine, because integrating both together is a pain.

4D does annoying things like convert null values to blank values when trying to display them in an object, or puts into [object property definitions](http://kb.4d.com/search/assetid=75825) display attributes to control how null values are rendered.

See my comments on [float data types]({% post_url 2010-11-11-new-4d-variable-data-type-float %} "New 4D variable data type – float")[^original-link].

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/06/07/allow-null-values-in-4db-engine/)[^draft]

### Footnotes

[^original-link]: Originally cross linked in WordPress <http://txcowboycoder.wordpress.com/2010/11/11/new-4d-variable-data-type-float/>

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4D", "clean code", "null", "sql", "v11", "v12"

    Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2011/06/07/allow-null-values-in-4db-engine/#comments">1 Comment</a>
