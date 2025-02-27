---
layout: post
author: James Rowe
title: "Clear empty object methods to avoid developer confusion"
date: "2011-05-25 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder 4D
uid: 21461fef-1de8-43e1-a9be-e1e0e9f4d8d9
---

## Clear empty object methods to avoid developer confusion

Part of working with any code base is understanding what is already developed. Luckily [shields](http://kb.4d.com/search/assetid=37121) help show actions associated with objects in the form editor. However, an object method shield will show for empty (‘blank’) object methods. We should clear any empty object methods to avoid confusion and optimize the code base.

### Example

Two objects on a form, both with an object method shield indicating the presence of an object method.

<img src="/assets/posts-images/4d-object_methods.png" alt="4D form with objects showing method shields" class=""/>

The last developer removed the object method content from the `variable` input area but did not explicitly clear the object method. This falsely indicates object method content, and worse yet 4D will execute the blank object method for [each event enabled](http://txcowboycoder.wordpress.com/2011/05/02/toggle-off-4d-form-events-for-easier-debugging/ "Toggle off 4D form events for easier debugging") on that object.

The best approach is to [clear the object method](http://kb.4d.com/search/assetid=33479 "4D Tech Tip - Clear Object Method") so that no shield displays, and reduce the number of lines the 4D engine executes.

### Solution

<img src="/assets/posts-images/4d-object_menu_clear.png" alt="4D Object menu showing Clear Object Method option" class=""/>

Select the object to clear the method from, then from the `Object` drop down menu select `Clear Object Method`

### Results

No misleading shields and no more tracing through empty object method.  

<img src="/assets/posts-images/4d-object_cleared.png" alt="4D form with method shield removed after clearing" class=""/>

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/25/clear-empty-object-methods-to-avoid-developer-confusion/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4D", "clean code", "object method", "optimization", "shield"