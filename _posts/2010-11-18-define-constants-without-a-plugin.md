---
layout: post
author: James Rowe
title:  "Define constants without a plugin"
date:   "2010-11-18 00:00:00 -0400"
tags: wordpress, txcowboycoder, "Wish List", "4D constants", "plugin"
uid: 4449bff8-af9c-487a-bf26-dae642b49018
---


## Define constants without a plugin


Would be nice if there were a way to define constants for use in 4D without creating a plugin. There is an [outstanding feature request](http://forums.4d.fr/Post//1470873/1/4687683) for this already. 


Logically I would think defining them in the `On Server Startup` database method would be a good place for them. Or having it as part of the explorer menu options.


Code could look like this if defined programatically:



```
` we want a constant for use throughout 4D
C_{datatype}_CONSTANT("Constant name";value)

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Wish List']

Original Wordpress tags: "Wish List", "4D constants", "plugin"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/18/define-constants-without-a-plugin/)

##### EOF/Footnotes

