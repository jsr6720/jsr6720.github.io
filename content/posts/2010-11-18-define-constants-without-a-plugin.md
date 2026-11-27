---
author: James Rowe
title: "Define constants without a plugin"
date: 2010-11-18 00:00:00 -0500
category: engineering
tags: [txcowboycoder, 4D]
uid: 4449bff8-af9c-487a-bf26-dae642b49018
slug: define-constants-without-a-plugin
---

## Define constants without a plugin

Would be nice if there were a way to define constants for use in 4D without creating a plugin. There is an [outstanding feature request](http://forums.4d.fr/Post//1470873/1/4687683) for this already. 

Logically I would think defining them in the `On Server Startup` database method would be a good place for them. Or having it as part of the explorer menu options.

Code could look like this if defined programatically:


```4d
` we want a constant for use throughout 4D
C_{datatype}_CONSTANT("Constant name";value)

```

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Nov 18th, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/18/define-constants-without-a-plugin/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "4D constants", "plugin"