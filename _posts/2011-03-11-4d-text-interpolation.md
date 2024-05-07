---
layout: post
author: James Rowe
title:  "4D text interpolation"
date:   "2011-03-11 00:00:00 -0400"
tags: wordpress, txcowboycoder, "4D", "4d text object", "interpolate", "tip"
uid: d803522f-377e-4ade-8988-a2027f0a9da6
---


## 4D text interpolation


For text string building I am very fond of php’s interpolate feature:




| 1234 | `# my variable``$name` `=` `"Joe Bob"``;``# my command``$my_sentence` `=` `"Hello {$name}!"``;` |
| --- | --- |


In 4D the same can be accomplished with text objects.



```
`have a table [Table]full_name
` this is the typed string for the text
` notice the "<" and ">" enclosing the field reference
vt_object:="Hello <[Table]full_name>!"
` outputs "Hello Joe Bob!" assuming that was what was loaded in the record

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['4D']

Original Wordpress tags: "4D", "4d text object", "interpolate", "tip"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/11/4d-text-interpolation/)

##### EOF/Footnotes

