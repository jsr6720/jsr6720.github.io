---
layout: page
title: Tags
permalink: /tags/index.html
---

{% assign sorted_tags = site.tags | sort %}

<p>
{% for tag in sorted_tags %}
  <span>
    <a href="#{{ tag[0] | slugify }}" onclick="showTagged('{{ tag[0] | slugify }}')">{{ tag[0] }}</a> | 
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
  <ul>
    {% for post in tag[1] %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</div>
{% endfor %}