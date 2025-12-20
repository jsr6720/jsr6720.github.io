---
layout: post
author: James Rowe
title: "What's in your software product?"
date: 2024-04-09 15:44:12 -0400
category: engineering
tags: open-source business
uid: 79572015-1F10-435E-B5D4-5BEB959EBD6C
---

> **:warning:** A small corporate softball piece originally posted on [LinkedIn](https://www.linkedin.com/pulse/whats-your-software-product-james-rowe/). Republished here for posterity(?). Note to self, hire an editor.

## What's in your software product?

Today's software ecosystem is built on widely available free open source software (FOSS) stored for consumption at sites like GitHub.com, Bitbucket, StackOverflow and a wide variety of package managers. Startups and Fortune 100 enterprises alike have benefited tremendously from this arrangement; new projects can focus on the value-add proposition and not re-inventing the wheel.

This explosion of open source packages has introduced a new problem: "what is being bundled into my software products?". Like any port of entry, consuming these 3rd party software packages require an inspection of goods. For more details on the perils of trusting the internet look no further than this study recently published by the [Core Infrastructure Initiative](https://www.coreinfrastructure.org/programs/census-program-ii/). It identified that 'Seven of the top ten most used software packages were hosted under individual accounts.' If this sounds at all familiar, look no further than the [2016 "left-pad"](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm) package that 'broke' the internet.

Even the simplest [Angular.io hero application](https://angular.io/tutorial) requires 12 core dependencies and results in ~870 installed node module packages! Any team could spend its [entire time worrying about publicly hosted packages](https://hbswk.hbs.edu/item/the-hidden-vulnerabilities-of-open-source-software), or it could implement a few simple steps to mitigate this risk.

Fork the target open source project and maintain a sync version. Stay current and update the forked repository after confirming the latest code is what it purports to be.
Leverage an open source scanning solution like [Black Duck](https://www.blackducksoftware.com/) or [CheckMarx](https://www.checkmarx.com/products/open-source-analysis) to systematically review and mitigate the risk of open source software defects.
Form an Open Source stewardship committee to oversee the consumption and contribution back to Open Source Software. All contributions count! Even bug reports, documentation contributions and issue triage.
Taking these three simple steps has improved cross-team communication, innovation and security at Paychex. Learn more about our open source contributions at [https://github.com/Paychex](https://github.com/Paychex)

*Opinions expressed are solely my own and do not express the views or opinions of my employer.*

---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Re-published on [{{ site.url }}]({{ site.url }}) via jekyll with uid {{ page.uid }}
- {{ "2020-04-28 14:38:00 -0400" | date_to_string: "ordinal", "US" }} Originally published to LinkedIn articles at [https://www.linkedin.com/pulse/whats-your-software-product-james-rowe/](https://www.linkedin.com/pulse/whats-your-software-product-james-rowe/)
- {{ "2020-02-26 16:47:00 -0400" | date_to_string: "ordinal", "US" }} LinkedIn draft created