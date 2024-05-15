---
layout: post
author: James Rowe
title:  "Finding llm training data limits"
date: "2024-05-12 22:23:30 -04:00"
tags: 2024 technology chatgpt llm llama ai
uid: 8EBC48B5-9AC4-422D-98CF-60B315082BDC
---

## Probing conversational ai with publicly available dates

The large language models I'm working with include a disclaimer indicating date limits within its training data. One way I've found to directly assess these date ranges is by asking about specific versions of publicly published software packages.

I've been working with `ruby` recently and decided to ask both `llama` and `ChatGPT-4`:

> what is the latest ruby version on the 2.x series?[^1]

### Why is this important?

Small patch versions can contain critical security patches. In this example [`2.7.8`](https://www.ruby-lang.org/en/news/2023/03/30/ruby-2-7-8-released/) is the latest `2.x.x` release and contains two security fixes. It's important to check published first-hand resources and not rely on an llm for this specific of an answer.

Chat-GTP4 got the correct combination of release version and date. I'm not sure where llama got the March 21, 2023 date from. The only releases I see in GitHub from March 2023 are on March 30th. I'm sure I prefer outdated correct answers over false/fabricated assertions.

## Ruby maintainers - 2.7.8

Primary sources of truth indicate `2.7.8` and was released on March 30, 2023.

* https://github.com/ruby/ruby/releases/tag/v2_7_8
* https://www.ruby-lang.org/en/downloads/releases/

<a href="https://www.ruby-lang.org/en/downloads/releases/"><img src="/assets/posts-images/ruby-releases-by-date-truncated.png" alt="meta llama ruby 2 version" class="center-img img-stylish"/></a>

## llama - 2.7.7

> The latest version of Ruby 2 is Ruby 2.7.7, which was released on March 21, 2023

<img src="/assets/posts-images/meta-ai-ruby-2-version.jpg" alt="meta llama ruby 2 version" class="center-img img-stylish"/>

llama also has a `sources` link but in this example it linked to a bing search result. Everything your history and/or english teacher told you about citing primary sources is true.

## ChatGPT-4[^3] - 2.7.6

> The latest version of Ruby in the 2.x series is Ruby 2.7.6, which was released on April 12, 2022

<img src="/assets/posts-images/chatgpt4-ruby-2version.png" alt="chatgpt-4 ruby 2 version" class="center-img img-stylish"/>

---

##### Author's Note

It's very difficult for me to ascertain how large of a problem this is in the software field and beyond. Are the training sets going to be continuously updated? The biggest distinguishing mark from traditional search is the inclusion of publication dates from a variety of sites and publication sources.[^3] If I could wave a wand I would would get confidence and temperature settings back from the llm responses.

See below a "traditional search" result. Never mind that I had to do a full page scroll below the fold to go past Google's own "quick answers" section... and of course reddit for the win.

<img src="/assets/posts-images/traditional-google-search-ruby-2.png" alt="google search ruby 2 version" class="center-img img-stylish"/>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

##### EOF/Footnotes

[^1]: The original queries were placed within a few hours of each other on May 2nd 2024.
[^2]: I manually modified the screenshot from [ruby-lang releases](https://www.ruby-lang.org/en/downloads/releases/) page to focus on the named versions in this post.
[^3]: Citations are now available in both ChatGPT-4o and Alphabet Gemini as noted in [ChatGPT-4o Initial impressions on latest model (with citations)]({% post_url 2024-05-15-chatgpt-v4o-initial-impressions %}) Posted with direct answers to the open questions in `Author's note`.