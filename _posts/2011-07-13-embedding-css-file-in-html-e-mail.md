---
layout: post
author: James Rowe
title:  "Embedding CSS file in html e-mail"
date:   "2011-07-13 00:00:00 -0400"
tags: 2011 wordpress txcowboycoder php clean-code css email
uid: 78ab8410-e4b4-4c00-992e-225f525bda70
---


## Embedding CSS file in html e-mail


Sending html e-mails opens a whole can of worms on the many [ways e-mail can be viewed](http://www.alistapart.com/articles/cssemail/). There is also no guarantee your e-mail will look as intended.


Instead of linking to a remote css file that may be blocked, or prompt the user with a scary ‘prevented external content to load’ error message, we can use PHP to pull the file directly. This adheres to the DRY principle and keeps the code base clean.


Use the [file\_get\_contents](http://php.net/file_get_contents) function in place of linking a style sheet via an html `style` element.


I would also recommend a try/catch block in case the `file_get_contents` command fails.


## Solution


In head section:




| 12345 | `<``style` `type``=``"text/css"` `media``=``"screen"``>``<!-- we do this to embed the file contents into the e-mail.``<?php echo file_get_contents("../common/css/blueprint/screen.css"); ?>``-->``</``style``>` |
| --- | --- |




---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['PHP']

Original Wordpress tags: "PHP", "clean code", "CSS", "email", "embed", "php"

Original Wordpress comments: None

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/07/13/embedding-css-file-in-html-e-mail/)

##### EOF/Footnotes

