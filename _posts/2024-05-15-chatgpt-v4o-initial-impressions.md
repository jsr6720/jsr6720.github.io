---
layout: post
author: James Rowe
title: "ChatGPT-4o Initial impressions on latest model (with citations)"
date: "2024-05-15 00:48:56 -0400"
tags: 2024 technology llm chatgpt
uid: F3A05744-A899-4349-AB7F-121CE6A970BE
---

## ChatGPT-4o released today

My immediate impressions after spending a few hours with ChatGPT-v4o include speed improvements, result accuracy and finally **citations**! ChatGPT-v4o appears to have dramatic improvements in both time to response and time to render a full response.

I was able to get it to follow some online web links and parse larger PDF files than before. The launch video indicated there were UI improvements which I noted as inline feedback comments like `scanning document` or `searching sites`.

Over the past 6 months, I have been switching between v3.5 and v4 models depending on speed of response and perceived accuracy of results. To validate accuracy, as the disclaimers suggest, I've also spent time reviewing responses with traditional web searches and reading source materials.

## My thoughts yesterday

> Are the training sets going to be continuously updated? The biggest distinguishing mark from traditional search is the inclusion of publication dates from a variety of sites and publication sources.[^1]

Its hard to stress how astonished I was to have my wish granted for citations the next day after publishing [my thoughts on finding llm training data limits]({% post_url 2024-05-12-finding-llm-training-data-limits %}). Since large language models generate responses based on patterns learned from vast amounts of data, it's important to verify the sources of the information they provide. Sadly, even with this version I was able to get ChatGPT-4o to hallucinate case law.

## Update on ruby 2.x.x latest version probe

### ChatGPT-4o `2.7.8`

Given the same question ChatGPT-4o indicated it searched four sites and returned a correct answer including the detail about it being a security branch.

> what is the latest version of ruby 2.x branch?

<img src="/assets/posts-images/chat-gpt4o-ruby-2.png" alt="chatgpt-4o ruby 2 version" class="center-img img-stylish"/>

### Gemini Basic `2.7`

I realized in hindsight that Google I/O is ongoing and had released changes to Gemini which seem promising as well.[^subscription] Gemini did much better this time with identifying the `2.7` version but did not cite `2.7.8` even though it was able to cite `3.3.1` as latest minor version.

<img src="/assets/posts-images/google-gemini-ruby-2-version.png" alt="google gemini ruby 2 version" class="center-img img-stylish"/>

In reviewing these two examples I think ChatGPT-4o has the better UI experience for citations. Further I'm skeptical on Gemini's approach to highlighting content "double checked" with Google search. I also find ChatGPT naming of its model versions and switch-able nature of them better for comparison

<img src="/assets/posts-images/alphabet-gemini-google-search-disclaimer.png" alt="alphabet gemini disclaimer" class="center-img img-stylish"/>

---

##### Author's Note

[^subscription]: I subscribe to `ChatGPT Pro` but I do not subscribe to `Gemini Advance`

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

##### EOF/Footnotes

[^1]: [Finding llm training data limits]({% post_url 2024-05-12-finding-llm-training-data-limits %})