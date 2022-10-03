---
layout: default
eleventyNavigation:
  key: "{{ title | slugify }}"
  title: Home
  order: 1
---

# Welcome to Devkey's blog!

This is the place where I will document my journey as a software developer, designer and music producer.
And I hope you'll be able to learn something.

## Posts

{% for post in collections.posts %}

### [{{ post.data.title }}]({{ post.url }})

{{ post.data.desc }}

{% endfor %}
