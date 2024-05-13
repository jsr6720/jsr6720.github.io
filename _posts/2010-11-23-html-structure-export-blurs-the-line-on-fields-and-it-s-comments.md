---
layout: post
author: James Rowe
title:  "HTML Structure export blurs the line on fields and it’s comments"
date:   "2010-11-23 00:00:00 -0400"
tags: 2010 wordpress, txcowboycoder, "4D", "4D", "HTML", "structure export", "XML"
uid: ddbacb36-52df-46bc-981b-bbd7852a2b0a
---


## HTML Structure export blurs the line on fields and it’s comments


4D has a great feature to export structure information to HTML and XML files. Very handy for generating a data dictionary in a nice format to impress managers.


However, the structure export to HTML functionality appends the field name and it’s respective comments to make a runon of text.


More importantly since 4D supports spaces in field names, there is no way to easily tell where the field name stops and the comments begin.


Secondly, XML structure export shows the field comment as it’s own node in the tree. Why can’t HTML export have it’s own column for field comments; or at least put some type of indicator that a field name has ended and a field’s comments have started.


I’ve abbreviated the following examples. To see for yourself create a new database, one table, one field. Write comments in the inspector from the structure editor. In my case the table “Invoice” has one field “purchase\_order”.


Also, this is a standing [feature request](http://forums.4d.fr/Post/EN/4703688/) on 4D forums. 4D has confirmed it as a bug (ACI0068658). 


>Product :4D – 4D Server  

 >4D : v12 (and all previous)  

 >OS : Mac OS 10.5.7  

 >Theme : Structure


**This is what it looks like**  



[![Export run on](https://txcowboycoder.files.wordpress.com/2010/11/exportrunon.png?w=300&h=74 "ExportRunOn")](http://txcowboycoder.files.wordpress.com/2010/11/exportrunon.png)Notice field name and comments appended


**HTML Structure export**




| 1234567 | `<``table` `class``=``"table"` `cellspacing``=``"1"``>``<``tr``><``th` `class``=``"fieldName"``>Field name</``th``></``tr``>``<!-- field number, field name, field comments all concatenated -->``<``tr``><``td``>1. purchase_orderA purchase order number</``td``></``tr``>``</``table``>``<!-- table level comments -->``<``div` `class``=``"comments"``><``b``>Comments</``b``>: Holds the invoices for the system.</``div``>` |
| --- | --- |


**XML Structure export**




| 1234567891011 | `<!-- table is a node here not a <table> html dom element -->``<``table` `name``=``"Invoice"` `id``=``"1"``>``<``field` `name``=``"purchase_order"` `type``=``"4"` `id``=``"1"``>``<``field_extra``>``<``comment` `format``=``"text"``>A purchase order number</``comment``>``</``field_extra``>``</``field``>``<``table_extra``>``<``comment` `format``=``"text"``>Holds the invoices for the system.</``comment``>``</``table_extra``>``</``table``>` |
| --- | --- |




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4D", "HTML", "structure export", "XML"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2010/11/23/html-structure-export-blurs-the-line-on-fields-and-its-comments/#comments">1 Comment</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/23/html-structure-export-blurs-the-line-on-fields-and-its-comments/)

##### EOF/Footnotes

