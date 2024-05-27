---
layout: post
author: James Rowe
title:  "Hello World, Jekyll"
date:   2024-03-31 19:46:48 -0400
tags: 2024 technology jekyll tools reviews
uid: EDD59760-5CD4-428F-A8F4-445D0F27DB1F
---

## Hello, world! Jekyll

In the spirit of true engineering, a first post and some code testing.

{% highlight ruby %}
puts "Hello world!"
{% endhighlight %}

### First Impressions

Having worked with this a few days over a week I'm pretty happy with the tooling. I fell into [jekyll](http://jekyllrb.com/) as it was the default template engine to render [GitHub Pages](https://pages.github.com).

Having worked with ruby projects before I found the gem process straightforward and I especially like that it accomplished the following:

- Allowed me to write my content in markdown
- Most importantly directly leverage git for history/changes
- Preserve some basic 'blog'-y type functionality with categories/tags
- Sctach the engineer itch to create without being burdened by app lock-in, new UIs or subscription fees
- Allows me to pay hosting and serve content without ads, tracking or sign-in paywalls/soft-stops

### What's next?

Well I will start adding content but also migrate the other two primary sources of previously published material here

- [https://github.com/jsr6720/txcowboycoder](https://github.com/jsr6720/txcowboycoder) manual html scraping of old technology related posts
- [https://github.com/jsr6720/goodreads-csv-to-md](https://github.com/jsr6720/goodreads-csv-to-md) takes an export from [goodreads](http://goodreads.com/) and exports it to jekyll md post files

### Literally, no one

What are some blogging platforms I've used in the past you ask?

Probably the oldest still functioning would be [txcowboycoder](https://txcowboycoder.wordpress.com) which is somehow still running even though I've long lost login and associated e-mail accounts.

I've written some for internal company communication channels that are locked up and probably archived at this point. In high school I first got into [GeoCities](https://archive.org/web/geocities.php) but I have no recollation of what I even posted there. I mostly just remember the html editor.

When I attended [RIT](http://rit.edu/) students were all allocated space on what we would think of now as an S3 bucket. I used that for classwork and simple websites.

I've done setup on [Blogger](https://www.blogger.com/) and [Wordpress](http://wordpress.com/) and whatever one-click installs [cPanel](https://www.cpanel.net) had available 2004-2010. Think Django, MyBB and other ruby on rails/php applications that were popular in that time.

---

## Significant revisions

tags: {{ page.tags | join: ", " }}

- {{ "2024-04-08 21:18:23 -0400" | date_to_string: "ordinal", "US" }} Came in and added real content and impressions
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}