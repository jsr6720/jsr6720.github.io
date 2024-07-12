---
layout: page
title: All Posts
permalink: /all-posts/index.html
---

<div class="post-list">
{%- if site.posts.size > 0 -%}
  {%- for post in site.posts -%}
  <div class="post-item">
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <div class="post-flex-container">
      <div class="post-left">
        <div class="post-title">
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </div>
        <div class="post-tags">
          {% for tag in post.tags %}
            <span class="post-tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
      <div class="post-date">
        <span class="post-meta">{{ post.date | date: date_format }}</span>
      </div>
    </div>
    {%- if site.show_excerpts -%}
      {{ post.excerpt }}
    {%- endif -%}
  </div>
  {%- endfor -%}
{%- endif -%}
</div>