---
layout: post
author: James Rowe
title:  "<<title-similiar-to-filename>>"
date:   date "+%Y-%m-%d %H:%M:%S"
tags: technology
uid: uuidgen
---

## Intro Heading

Content

---

##### Author's Note



##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

##### EOF/Footnotes
