---
layout: post
author: James Rowe
title:  "Creating fields via SQL vs creating fields via structure editor"
date:   "2011-06-08 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "4D", "null", "sql", "v11", "v12"
uid: ad4eb2d7-2abc-4ec5-a8ea-2f7722054fb4
---


## Creating fields via SQL vs creating fields via structure editor


Beware when creating fields via SQL engine with 4Dv12/v11. [Creating fields via SQL does not allow setting field property “Map NULL values to blank values”](http://kb.4d.com/search/assetid=76119). The suggested work around is to define the field with `NOT NULL` constraint.


The different outcomes of the two ways to create fields is terrible behavior because of [lack of support for null values in the 4DDB engine](http://txcowboycoder.wordpress.com/2011/06/07/allow-null-values-in-4db-engine/ "Allow NULL values in 4DB engine"). 4D seems to assume developers are either using 4D with all native code, or all SQL code, not hybrid solutions.


Ultimately the concern to the developer is having assumptions regarding the data respected. Coming from previous version of 4D all fields have the property checked for mapping null values to blank values. Legacy applications can have code reliant on the assumption of no null values.


From 4D Docs on [integrating 4D and the 4D SQL engine](http://doc.4d.com/4Dv11.4 /help/Title/en/page370.html):



> The NULL values are implemented in the 4D SQL language as well as in the 4D database engine. However, they are not supported in the 4D language


More red flags from the knowledge base:


[Sorting fields w/NULLS changes the current selection](http://kb.4d.com/search/assetid=75835)



> In version 11.4, if you have NULL values in any field and then do an ORDER BY on that field, any records that contain NULL values will be removed from the Current Selection.


Also [displaying](http://kb.4d.com/search/assetid=76069) and saving null values to the database is even more difficult.


### Create field via structure


By default the “Map NULL values to blank values” field property is enabled.  

[![](https://txcowboycoder.files.wordpress.com/2011/06/create_field_structure.png?w=174&h=300 "create_field_structure")](http://txcowboycoder.files.wordpress.com/2011/06/create_field_structure.png)


### Create field via SQL


This field was created with `NOT NULL` constraint.  

[![](https://txcowboycoder.files.wordpress.com/2011/06/create_field_sql.png?w=174&h=300 "create_field_sql")](http://txcowboycoder.files.wordpress.com/2011/06/create_field_sql.png)




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "null", "sql", "v11", "v12"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/06/08/creating-fields-via-sql-vs-creating-fields-via-structure-editor/)

##### EOF/Footnotes

