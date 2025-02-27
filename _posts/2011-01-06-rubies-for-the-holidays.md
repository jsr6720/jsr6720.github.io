---
layout: post
author: James Rowe
title: "Rubies for the holidays"
date: "2011-01-06 00:00:00 -0400"
category: software
tags: 2011 txcowboycoder ruby
uid: a4dd9a60-403b-40d0-a55f-a87aa4dca387
---

## Rubies for the holidays

Over the last two weeks I have been taking vacation and diving head first into my [first major ruby language project](http://jsrowe.com/request-tracker-to-redmine-migration/index.html).

Having never programed ruby before my gut reaction to the language is one word: awesome.

The only drawback to it is my own misunderstanding of the limits to the ‘magic’ of ruby. I definitely fell prey to some PHP-esque syntax that is no longer necessary.

My favorite so far: whatever is at the end of the action is returned.


```ruby
# never mind that this is built it
def even (number)
  number % 2
end

@attr = even(2) {|r| r ? r : nil}

```

Biggest suprise: `nil` is an object and `nil.id` is `4`

At any rate, programming a rake task in a ror application ([Redmine](http://www.redmine.org)) has been a fun and interesting challenge. I look forward to using ruby more in my problem solving and application building experiences.

---

### Significant Revisions

- {{ "2024-05-06 22:47:17" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2011/01/06/rubies-for-the-holidays/)[^draft]

### Footnotes

[^draft]: Initial `md` Generated using <https://github.com/jsr6720/wordpress-html-scraper-to-md>

  Original Wordpress categories: ['Personal Musings']

  Original Wordpress tags: "Personal Musings", "ror", "ruby"