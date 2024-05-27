---
layout: post
author: James Rowe
title:  "My favorite xkcd comics"
date:  2024-04-16 00:58:06 -0400
tags: 2024 personal
uid: E0211686-944D-4F71-85FA-72E436805577
---

## xkcd humor

I wish I had written down the first time I encountered [xkcd](https://www.xkcd.com)[^1] but I speculate it was college as the oldest comics I recall are from ~2007.

This is a silly list of my favorites that apply to many situations. I admit that waiting for [explainxkcd](https://www.explainxkcd.com) updates to understand the joke is painful...

I share these at least once a month. Thank you [Randall](https://xkcd.com/about/).

![1683: perfect digitial copy](/assets/posts-images/xkcd-1683-digitial-degradation.png)

## Serious business

I do think tools like GitHub Copilot and other LLM have dramatically improved success rate of automating small tasks. What might've taken a few hours to research and write can be done in less than one.

I have at various times in my career printed a copy of this and pinned it to my wall. Remember this is no greater waste of time than automating something that ought not be done at all.[^2]

![1205: is it worth the time](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)

Another favorite, technology is ulimately a tool, what you build with it might not apply to complex human systems.

![1831: here to help](https://imgs.xkcd.com/comics/here_to_help.png)

## Programming

This is the earliest comic I remembered, and ironically my first job was primarily PHP, so no compiling until Java later.

![303: compiling](https://imgs.xkcd.com/comics/compiling.png)

Another favoite of mine which pairs nicely with [435: purity](https://xkcd.com/435) and never ceases to amaze me everyone's unique setup. From DVORAK and mechanical keyboards. Personal prefernces on monitors and mice, editors and terminal environments. Everyone has a preference of setup.

![378: Real Programmers](https://imgs.xkcd.com/comics/real_programmers.png)

## Open source

All software is running on a computer soemwhere. No matter how many abstractions are added at some point a cpu cycle is burned and that dependency from 1982 written in C chugs away.

![2347: dependency](https://imgs.xkcd.com/comics/dependency.png)

Just a box in a room. Don't trip on the wire.

![908: the cloud](https://imgs.xkcd.com/comics/the_cloud.png)

## Troubleshooting

I once found a bug in an machine-hours caculation. It was over 4 years old and I patched it and shipped it. The next day the head operator came to tell me that the formula was broken. When I excitedly told him I had found the error and fixed it, they had known all along and worked around it...

![1172: workflow](https://imgs.xkcd.com/comics/workflow.png)

Honestly one of the biggest inspirations for starting this site and the various places I've left answers and tried to contirbute to the knoweldge base of society is the number of times I've been frustrated by reading "nevermind I figured it out..."

![979: wisdom of the ancients](https://imgs.xkcd.com/comics/wisdom_of_the_ancients.png)

If I had $1 for every ```datetime``` bug. I mean I couldn't retire, but I'd have many dollars. And I of course commit this very sin on [search safari history by timestamp](/articles/search-safari-history-by-timestamp)

![2867: datetime](https://imgs.xkcd.com/comics/datetime.png)

With both homes and applications, you can drill enough holes that cause catistrophic failure. Go forth and conquor.

![905: homeownership](https://imgs.xkcd.com/comics/homeownership.png)

## Honorable Mention

Funny, but just not the same level of share as the others.

I feel like this one comic did more to raise awareness about SQL injection than any other OWASP training ever did.

![327: exploits of a mom](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)

I've been working with git for quite some time now, but when it first came out I definately did this several times when working with it.

![159: git](https://imgs.xkcd.com/comics/git.png)

Sometimes I wonder about my old code. My professional career all my code changes are locked up behind login portals. One of the objectives with writing on a blog and sharing code via GitHub is to stretch into the future as far as I can. Somewhere out there someone is looking at their Taxes and Withholdings and it might be my code... running on someone elses' computer.

![2730: code lifespan](https://imgs.xkcd.com/comics/code_lifespan.png)

---

## Author's Note

Not my most original contribution. But it brought me joy to revisit and reminisce.

## Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}

## EOF/Footnotes

[^1]: [xkcd wikipedia](https://en.wikipedia.org/wiki/Xkcd)

[^2]: [Elon Musk 5 engineering philosophy](https://web.archive.org/web/20240416045402/https://mondaynote.com/what-makes-elon-musk-move-so-fast-8e7c91820923?gi=a7102ded87ed)