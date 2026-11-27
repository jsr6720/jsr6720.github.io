---
author: James Rowe
title: "Clear empty object methods to avoid developer confusion"
date: 2011-05-25 00:00:00 -0400
category: engineering
tags: [txcowboycoder, 4D]
uid: 21461fef-1de8-43e1-a9be-e1e0e9f4d8d9
slug: clear-empty-object-methods-to-avoid-developer-confusion
---

## Clear empty object methods to avoid developer confusion

Part of working with any code base is understanding what is already developed. Luckily [shields](http://kb.4d.com/search/assetid=37121) help show actions associated with objects in the form editor. However, an object method shield will show for empty (‘blank’) object methods. We should clear any empty object methods to avoid confusion and optimize the code base.

### Example

Two objects on a form, both with an object method shield indicating the presence of an object method.

![4D form with objects showing method shields](/assets/posts-images/4d-object_methods.png)

The last developer removed the object method content from the `variable` input area but did not explicitly clear the object method. This falsely indicates object method content, and worse yet 4D will execute the blank object method for [each event enabled](/toggle-off-4d-form-events-for-easier-debugging/ "Toggle off 4D form events for easier debugging")[^original-link] on that object.

The best approach is to [clear the object method](http://kb.4d.com/search/assetid=33479 "4D Tech Tip - Clear Object Method") so that no shield displays, and reduce the number of lines the 4D engine executes.

### Solution

![4D Object menu showing Clear Object Method option](/assets/posts-images/4d-object_menu_clear.png)

Select the object to clear the method from, then from the `Object` drop down menu select `Clear Object Method`

### Results

No misleading shields and no more tracing through empty object method.  

![4D form with method shield removed after clearing](/assets/posts-images/4d-object_cleared.png)

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- May 25th, 2011 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/05/25/clear-empty-object-methods-to-avoid-developer-confusion/)[^draft]

### Footnotes

[^original-link]: Originally cross linked in WordPress <http://txcowboycoder.wordpress.com/2011/05/02/toggle-off-4d-form-events-for-easier-debugging/>

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4D", "clean code", "object method", "optimization", "shield"
