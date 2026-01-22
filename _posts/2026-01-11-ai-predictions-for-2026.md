---
layout: post
author: James Rowe
title: "AI Predictions for 2026"
date: 2026-01-11 14:10:20 -0500
category: engineering
tags: ai, predictions
uid: 1E3F5F54-892B-448F-B80C-00043F851288
---

While writing my [2025 AI Wrapped]({% post_url 2026-01-19-ai-wrapped-series %}) series and reading [others’](https://www.wired.com/story/backchannel-2026-predictions-tech-robots-ai/), [AI](https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/) [predictions](https://garymarcus.substack.com/p/six-or-seven-predictions-for-ai-2026), I’m publishing some of my own.

### The Human Element

* The human touch is and will always be a paid premium service. Trust and complexity still require people, not prompts.
* Building software will remain a human-led team endeavor. [Writing code was never the limiting factor to shipping](https://ordep.dev/posts/writing-code-was-never-the-bottleneck).
* [Product managers](https://www.businessinsider.com/meta-vibe-coding-build-prototype-apps-mark-zuckerberg-2025-11) and [product-oriented engineers](https://jackcaldwell.dev/articles/the-product-minded-engineer) who build with AI as an accelerator will shine. Pitching prototypes will be more important than pitching decks—the world of “show me.”

### Governance & Accountability

* Accountability will remain with someone who knows how to verify and fix outputs. That won’t be AI; that will be a person. When the pipes leak, nobody asks the wrench; they call the plumber.
* Human domain expertise will become the validation layer to AI-generated outputs. AI is very good at generating plausible-sounding nonsense.
* Good corporate governance will demand data provenance and introspection capabilities for AI systems. Think Sarbanes-Oxley but for AI models. Companies need to know “how the sausage is made” and that they won’t violate any laws with AI solutions they’re implementing.[^lawsuits]
* Token consumption will become an established line item in engineering department budgets, just as SaaS subscriptions and AWS spend are broken down by resource types.

### Market Forces

* AI agents’ “memories” and personal contexts will become the moat. Just as it is the apps, not the hardware specs, that keep you from switching from iOS to Android, it is the historical context that companies have about you that will keep you from switching AI providers.[^privacy]
* VC subsidies will collapse and product enshittification will ensue. Companies have been focused on how to get LLMs working, not how to make them profitable. Ads are coming.[^ads]
* Frontier models (Claude Sonnet 4.5/Open AI GPT 5.1) are good enough for production use. Getting investment dollars to train a new models will become more difficult.[^investments]
* The rush to ink deals and outlay billions to build out datacenters will fail to materialize in 2026. Not only does physical construction and permitting take years, tech companies’ hubris has blinded them to the mounting resistance to data center expansion that has been [steamrolling local communities](https://www.economist.com/united-states/2025/10/30/the-data-centre-backlash-is-brewing-in-america).

---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2025-12-30 19:54:00 -0500" | date_to_string: "ordinal", "US" }} Draft Created. A little late on starting predictions.

### Footnotes

[^lawsuits]: I do think lawsuits will continue to be brought against AI companies for their scraping of data and fair use claims. But I don’t know enough about this topic to stake a claim on it.

[^privacy]: And probably another reason to delete your account from time to time.

[^investments]: The billions spent so far to build existing models will not be recovered.

[^ads]: That didn't take long. [OpenAI testing ads](https://x.com/OpenAI/status/2012223373489614951)