---
layout: default
title: "TAGS"
permalink: /tags/
---

<div class="tags-cloud">
  {% for tag in site.tags %}
    <a href="#{{ tag[0] }}" class="tag">{{ tag[0] }} ({{ tag[1].size }})</a>
  {% endfor %}
</div>

{% for tag in site.tags %}
  <h2 id="{{ tag[0] }}"># {{ tag[0] }}</h2>
  <ul class="entry-list">
    {% for post in tag[1] %}
      <li class="entry-item">
        <span class="entry-date">[{{ post.date | date: "%Y-%m-%d" }}]</span>
        <a href="{{ post.url | relative_url }}" class="entry-link">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
