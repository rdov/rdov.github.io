---
layout: default
title: Tutorials
permalink: /tutorial/
weight: 3
category: aggregator
---

## {{ page.title }}

{% for p in site.posts %}
  <div>
    <h3><a class="post-link" href="{{ p.url }}">{{ p.title }}</a></h3>
    <p>
    {% if p.content contains '<!-- excerpt.start -->' and p.content contains '<!-- excerpt.end -->' %}
      {{ ((p.content | split:'<!-- excerpt.start -->' | last) | split: '<!-- excerpt.end -->' | first) }}
    {% endif %}
    </p>
    <a href="{{ p.url }}">Read &rarr;</a>
  </div>
{% endfor %}
