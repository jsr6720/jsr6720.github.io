---
layout: post
author: James Rowe
title:  "Hello World, Jekyll"
date:   2024-03-31 19:46:48 -0400
tags: 2024 technology jekyll tools reviews
uid: EDD59760-5CD4-428F-A8F4-445D0F27DB1F
---

## Hello, world! Jekyll

In the spirit of a quick start, here is my `Hello World` page. A first post and some syntax code testing.

{% highlight ruby %}
puts "Hello world!"
{% endhighlight %}

## First Impressions

Having worked with this a few days over a week I'm pretty happy with the tooling. I fell into [jekyll](http://jekyllrb.com/) as it was the default template engine to render [GitHub Pages](https://pages.github.com).

I'm loosely familiar with ruby projects and I found the setup process straightforward. I especially like that it accomplished the following:

- Allowed me to write my content in markdown
- Most importantly directly leverage git for history/changes
- Preserve some basic 'blog'-y type functionality with categories/tags
- Scratch the engineer desire to create without being burdened by app lock-in, new UIs or subscription fees
- Allows me to pay hosting and serve content without ads, tracking or sign-in paywalls/soft-stops

## Why a Jekyll Site?

Having used WYSIWYG authoring platforms like Wordpress, Blogspot, and roll-your-own implementations of Drupal and Joomla, I grew tired of the bulky UIs and lack of version control work processes I was accustomed to with writing code. I just wanted to open a file, write my content, and see it on screen.

This, combined with lack of data transparency and other small friction points along the way, led me to revisit markdown to static site generators, and I found a lot of personal authoring and publishing satisfaction with GitHub Pages and Jekyll.

Having seen the web grow from the late 90s to the present, I really liked the idea of a writing-focused experience combined with a simple build process to publish static content with some basic functionality like an [atom feed](/feed.xml). This is my site; [there are many like it](/inspiration.md), but this one is mine.


## What's next?

Well I will start adding content but also migrate the other two primary sources of previously published material here

- [https://github.com/jsr6720/txcowboycoder](https://github.com/jsr6720/txcowboycoder) manual html scraping of old technology related posts
- [https://github.com/jsr6720/goodreads-csv-to-md](https://github.com/jsr6720/goodreads-csv-to-md) takes an export from [goodreads](http://goodreads.com/) and exports it to jekyll md post files

## Literally, no one

What are some blogging platforms I've used in the past you ask?

Probably the oldest still functioning would be [txcowboycoder](https://txcowboycoder.wordpress.com) which is somehow still hosted even though I've long lost login or any of the original email accounts.

In high school I first got into [GeoCities](https://archive.org/web/geocities.php) but I have no recollection of what I even posted there. I mostly just remember the html editor and the guy who showed GeoCities to me had this really cool wood paneled Jeep Wagoneer he wrote about.

When I attended [RIT](http://rit.edu/) students were all allocated space on what we would think of now as an S3 bucket. I used that for classwork and simple websites.

I've done setup on [Blogger](https://www.blogger.com/) and [Wordpress](http://wordpress.com/) and whatever one-click installs [cPanel](https://www.cpanel.net) had available 2004-2010. I'm recalling django, MyBB and other ruby on rails/php applications that were popular in that time.

---

## Author's Note


## Significant Revisions

tags: {{ page.tags | join: ", " }}

- {{ "2024-06-09 20:50:21 -0400" | date_to_string: "ordinal", "US" }} Moved "Why `Jekyll`" to this page from `about.md` and cleaned up text
- {{ "2024-04-08 21:18:23 -0400" | date_to_string: "ordinal", "US" }} Came in and added real content and impressions
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

## EOF/Footnotes
