---
author: James Rowe
title: "New 4D variable data type – float"
date: 2010-11-11 00:00:00 -0500
category: engineering
tags: [txcowboycoder, 4D]
uid: 9aa7add4-7702-4387-88a6-a79df11688d9
slug: new-4d-variable-data-type-float
---

## New 4D variable data type – float

Now that 4Dv11 SQL supports `float` data type; it would be nice to match that with a `C_FLOAT`. Using `C_REAL` throws an error for incompatible assignment at runtime.

I.e. if your database has a field with float data type don’t plan on using it with native 4D code, and don’t expect the complier to warn you. See my [feature request](http://forums.4d.fr/Post//4654031/) with 4D.

```4d
C_REAL($vr_test)
` throws error (from GET LAST ERROR STACK): 54 4DRT Argument types are incompatible.
$vr_test:=[Table]float_field

```

There is an `Is Float` constant to compare to `GET FIELD PROPERTIES` data type return longint.

And while we’re at it, why are [SQL data type values](http://kb.4d.com/search/assetid=48694) different from [`GET FIELD PROPERTIES` data type values](http://doc.4d.com/4D-Language-Reference-12/Structure-Access/GET-FIELD-PROPERTIES.301-155336.en.html).

---

### Significant Revisions

- May 6th, 2024 Converted to jekyll markdown format and copied to personal site
- Nov 11th, 2010 Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/11/11/new-4d-variable-data-type-float/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

    Original Wordpress categories: ['Wish List']

    Original Wordpress tags: "Wish List", "4D", "data types", "float", "sql"

    Original Wordpress comments: [1 Comment](https://txcowboycoder.wordpress.com/2010/11/11/new-4d-variable-data-type-float/#comments)