---
layout: post
author: James Rowe
title: "<<title-similar-to-filename>>"
date: date "+%Y-%m-%d %H:%M:%S %z"
category: template
tags: YYYY whitespace delimitated tags
uid: uuidgen
---

## Intro Heading

Content

---

## Author's Note



## Significant Revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

## EOF/Footnotes
