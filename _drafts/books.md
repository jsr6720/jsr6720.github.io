---
layout: page
title: Books
tags: book reviews
permalink: /books/index.html
---

## Book thoughts

[`Detect Thoughts`](https://www.dndbeyond.com/spells/detect-thoughts) I thought was a clever way of reimaging "thoughts on" but perhaps I'll revisit it one day.

I indicate format in the rview: audio CD, hardcover, paperback and maybe a few large print.

**Please** Consider visiting your [library](https://www.nypl.org) or supporting a [local bookstore](https://www.liftbridgebooks.com).

<!-- chatGPT 4.0 beat the top google search.. BUT I was faster at modifying date and DOM structure. -->
## Last 5 books read

<ul>
  {% for post in site.tags.book limit:5 %}
    <li>
      <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }} posted {{ post.date | date_to_string: "ordinal", "US" }}</a>
    </li>
  {% endfor %}
</ul>

## Tier List

A fun take on a [tier list](https://en.wikipedia.org/wiki/Tier_list) for books.

Originally I was just going to import my 5/5 rated books, but that's too many so I give you my all time favorites by category. todo-enhance

## Biographies / History

Both auto-biographical and historical non-fiction

## Management / Leadership

Books I've read that helped me learn skills to transisiton from an engineer to a leader

## Childhood favorites

A little peek behind my treasured books of childhood.

### Chronicles of Narnia 

link

### Calvin and Hobbes by Bill Waterson

All https://en.wikipedia.org/wiki/Calvin_and_Hobbes

### Redwall series by Brian Jaques

https://en.wikipedia.org/wiki/Brian_Jacques

### The Belgariad and The Elenium by David Eddings

https://en.wikipedia.org/wiki/David_Eddings

### Farside

https://en.wikipedia.org/wiki/The_Far_Side


### Honorable Mentions

- James and the Giant Peach
- The Phantom Tollboth
- The Golden Compass by Philip Pullman
- https://sarahjmaas.com (?)
