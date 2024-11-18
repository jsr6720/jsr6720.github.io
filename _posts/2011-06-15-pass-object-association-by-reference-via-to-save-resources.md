---
layout: post
author: James Rowe
title:  "Pass object association by reference via & to save resources"
date:   "2011-06-15 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder php clean-code performance
uid: d4ca8905-7fab-443e-97b8-9873975dde9c
---


## Pass object association by reference via & to save resources


Not really a big deal, but could save resources on larger arrays. Is also a clean code practice to avoid awkward traversing array and assigning to ‘itself’ from what is essentially a sub routine.


Does it really matter? Likely not. Using the below script on my 2.66 Core i7 with 8gigs of ram passing by reference is roughly 3-4 times faster. At 100000 array key value pairs the difference is still in microseconds (less than half a millisecond).


More information here: <http://php.net/manual/en/language.references.pass.php>




| 123456789101112131415161718192021222324252627282930 | `<?php` `// want to loop over an array``$an_array` `=` `array``();` `// lets populate it with random values``for` `(``$i``=0;` `$i` `< 100000;` `$i``++) {` `$an_array``[``$i``] = md5(uniqid(uniqid(``""``,true),true));``}` `// start``var_dump(microtime(true));` `// now lets maniuplate the 'old' way``foreach` `(``$an_array` `as` `$key` `=>` `$value``) {``// this modifies the value at the index using the array and key``$an_array``[``$key``] =` `"ref original array and key"``;``}` `var_dump(microtime(true));` `// lets do it the 'new' way, notice we are passing &``foreach` `(``$an_array` `as` `$key` `=> &``$value``) {``// $value is a reference to the $an_array[$key]``$value` `=` `"changes source array"``;``}``// finish``var_dump(microtime(true));` `?>` |
| --- | --- |


### Sample Executions




| Object | Pass reference |
| --- | --- |
| 445 | 123 |
| 455 | 122 |
| 443 | 122 |
| 452 | 119 |
| 446 | 129 |


**\*Note\* times in microseconds**




---

## Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['PHP']

Original Wordpress tags: "PHP", "association", "clean code", "php", "resource management", "traverse array"

Original Wordpress comments: None

## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/06/15/pass-object-association-by-reference-via-to-save-resources/)

## EOF/Footnotes

