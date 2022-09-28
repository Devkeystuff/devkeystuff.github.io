---
layout: default
---

{% for post in collections.posts %}

<h2>{{ post.data.title }}</h2>

{% endfor %}
