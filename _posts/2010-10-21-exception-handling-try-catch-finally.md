---
layout: post
author: James Rowe
title:  "Exception handling – try/catch/finally"
date:   "2010-10-21 00:00:00 -0400"
tags: 2010 wordpress txcowboycoder 4D control-structure
uid: a1f6ae08-5be2-47b1-a9f2-a074cd9dc5eb
---


## Exception handling – try/catch/finally


I know there is the `ON ERR CALL` but personally I think that fragments the code into separate methods. Having a concept of `THROWS` would be icing on the cake.


I’m not advocating the removal of `ON ERR CALL` but I would love to just do something like below for simple try/catch concepts.


I suppose this type of concept is available with 4Dv12 and PHP, but not natively.



```
` this is my method that is called when ANY error is thrown
ON ERR CALL("catch error")

` throws error which goes into "catch error" method call
$result:=Create document($1) ` none specified

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Wish List']

Original Wordpress tags: "Wish List", "4D", "programming structure", "try catch"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/10/21/exception-handling-trycatchfinally/)

##### EOF/Footnotes

