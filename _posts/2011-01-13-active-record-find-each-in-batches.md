---
layout: post
author: James Rowe
title: "Active record find_each in batches"
date: "2011-01-13 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder ruby ruby-on-rails
uid: 643e2b2e-4bd5-44d6-ad31-08c62a959777
---

## Active record find_each in batches

I wanted to iterate over an active record in batches. Found a [great example](http://guides.rubyonrails.org/active_record_querying.html#retrieving-multiple-objects-in-batches) but for my needs I wanted to walk backwards over the batch.

Needless to say it’s not possible. I don’t mind `find_each` limited to the id field, but `DESC` would be nice.

```ruby
model.find_each(:batch_size => 200, :order => "DESC") do |instance|
  puts instance.inspect
end
# => You can't specify an order, it's forced to be model.id ASC
```

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/13/active-record-find_each-in-batches/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

  Original Wordpress categories: ['Ruby on Rails']

  Original Wordpress tags: "Ruby on Rails", "find each", "ruby active record"