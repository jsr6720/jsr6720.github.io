---
author: James Rowe
title: "4D text interpolation"
date: 2011-03-11 00:00:00 -0500
category: engineering
tags: [txcowboycoder, 4D]
uid: d803522f-377e-4ade-8988-a2027f0a9da6
slug: 4d-text-interpolation
---

## 4D text interpolation

For text string building I am very fond of php’s interpolate feature:

```php
# my variable
$name = "Joe Bob";
# my command
$my_sentence = "Hello {$name}!";
```

In 4D the same can be accomplished with text objects.

```4d
`have a table [Table]full_name
` this is the typed string for the text
` notice the "<" and ">" enclosing the field reference
vt_object:="Hello <[Table]full_name>!"
` outputs "Hello Joe Bob!" assuming that was what was loaded in the record
```

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Mar 11th, 2011 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/03/11/4d-text-interpolation/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['4D']

    Original Wordpress tags: "4D", "4d text object", "interpolate", "tip"