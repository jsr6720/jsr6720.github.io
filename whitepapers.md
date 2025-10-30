---
layout: page
title: Whitepapers Archive
permalink: /whitepapers/
exclude: true
---

## Whitepapers

These reference documents live in `/_whitepapers/` for easy access while I’m writing. Dates below come from the file modified times in the repository.

<table class="whitepapers-table">
  <thead>
    <tr>
      <th scope="col">Date Added</th>
      <th scope="col">Topic</th>
      <th scope="col">Document</th>
    </tr>
  </thead>
  <tbody>
  {%- assign whitepaper_files = site.static_files | where_exp: "file", "file.path contains '_whitepapers/'" -%}
  {%- assign pdfs = whitepaper_files | where_exp: "file", "file.extname == '.pdf'" -%}
  {%- assign sorted_pdfs = pdfs | sort: "modified_time" | reverse -%}
  {%- for file in sorted_pdfs -%}
    {%- assign segments = file.path | split: "/" -%}
    {%- assign topic = "" -%}
    {%- if segments.size > 2 -%}
      {%- assign topic = segments[2] -%}
    {%- endif -%}
    {%- if topic contains "." or topic == "_whitepapers" or topic == "" -%}
      {%- assign topic = "general" -%}
    {%- endif -%}
    {%- assign topic_display = topic | replace: "-", " " | replace: "_", " " | capitalize -%}
    {%- assign base_name = file.name | remove: file.extname -%}
    {%- assign display_name = base_name | replace: "-", " " | replace: "_", " " | strip | capitalize -%}
    <tr>
      <td>{{ file.modified_time | date: "%Y-%m-%d" }}</td>
      <td>{{ topic_display }}</td>
      <td><a href="{{ file.path | relative_url }}">{{ display_name }}</a></td>
    </tr>
  {%- endfor -%}
  </tbody>
</table>
