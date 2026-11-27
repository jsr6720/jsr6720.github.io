{{- /* hugo new content content/posts/YYYY-MM-DD-slug.md */ -}}
{{- $slug := replaceRE `^\d{4}-\d{2}-\d{2}-` "" .File.ContentBaseName -}}
{{- $h := now.UnixNano | string | sha1 | upper -}}
{{- $d := now.Day -}}
{{- $suffix := cond (and (ge $d 11) (le $d 13)) "th" (index (dict "1" "st" "2" "nd" "3" "rd") (string (mod $d 10)) | default "th") -}}
---
author: James Rowe
title: "{{ $slug | humanize | title }}"
date: {{ now.Format "2006-01-02 15:04:05 -0700" }}
category: engineering # engineering, personal or review
tags: []
uid: {{ printf "%s-%s-%s-%s-%s" (substr $h 0 8) (substr $h 8 4) (substr $h 12 4) (substr $h 16 4) (substr $h 20 12) }}
slug: {{ $slug }}
draft: true
---

## Intro Heading

Content

---

### Significant Revisions

- {{ now.Format "Jan" }} {{ $d }}{{ $suffix }}, {{ now.Year }} Draft created

### Footnotes
