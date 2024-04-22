---
layout: post
author: James Rowe
title:  "Goodreads reviews imported to posts"
date:   "2024-04-22 19:31:11"
tags: technology books review
uid: EF99CF29-D745-4AA4-BA64-DB12E7F7F361
---

## Goodreads content consolidation

I was using Goodreads for a number of years to track my literature consumption. But I didn't like that the review box was so small and I had to login every time to search books I've read. Todo: add some simple search feature using tags on jekyll.

They [citation needed](https://xkcd.com/285/) say the brain can't tell the difference between audio books and physical books. A majority of the imported reviews were consumed via audioCD during my commute to/from work.

## Export to _posts process

Had fun tracking my books at [goodreads.com](https://www.goodreads.com) but I wanted to consolidate my data to the one true overlord MSFT and use it as content on [jsr6720.github.io](https://github.com/jsr6720/jsr6720.github.io).

I had just about 245 reviews I wanted to convert to posts so of course I decided to trial ChatGPT 3.5 augmented programming. The bulk of which I documented here [goodreads-csv-to-markdown](https://github.com/jsr6720/goodreads-csv-to-md/tree/main)

## Goodreads account data

Copied from the account settings/profile page. I joined in May 2016. Prior to this I was tracking books on some now lost google sheet stored on an old google drive account.

232 ratings (3.88 avg) with 219 reviews. I guess maybe I don't like what I pick.

FAVORITE GENRES: Biography, Business, Classics, History, Non-fiction, Philosophy, and Psychology

These genres were converted to `tags` as part of this migration.

## Screenshot of stats

![good read stats from account overview page](/assets/posts-images/goodread-stats.png)

---

##### Author's Note



##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

##### EOF/Footnotes
