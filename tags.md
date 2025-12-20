---
layout: page
title: Tags
permalink: /tags/
---

Click on a tag to see related posts.

{% assign sorted_tags = site.tags | sort %}

<p>
{% for tag in sorted_tags %}
  <span>
    <a class="tag-pill" href="#{{ tag[0] | slugify }}" onclick="showTagged('{{ tag[0] | slugify }}')">
      {{ tag[0] }} <span class="tag-count">({{ tag[1].size }})</span>
    </a>
  </span>
{% endfor %}
</p>

<script>
function showTagged(tag) {
  document.querySelectorAll('.tagged-posts').forEach(el => el.style.display = 'none');
  document.getElementById(tag).style.display = 'block';
}
</script>

{% for tag in sorted_tags %}
<div id="{{ tag[0] | slugify }}" class="tagged-posts" style="display:none;">
  <h2>Posts tagged with {{ tag[0] }}</h2>
  <div class="tagged-posts-list">
    {% for post in tag[1] %}
    <div class="tagged-post-item">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="tagged-post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}
