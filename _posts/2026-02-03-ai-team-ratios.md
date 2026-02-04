---
layout: post
author: James Rowe
title: "Why AI Demands New Engineering Ratios"
date: 2026-02-03 21:46:48 -0500
category: engineering
tags: ai, programming
uid: 2E131853-3267-481B-A377-FA08B9C9FA08
image: /assets/posts-images/limiting-constraint.png
toc: true
---

The two-pizza team isn’t dead—it just needs different toppings. AI breaks previous staffing assumptions by collapsing the time it takes to write code. Engineers equipped with AI can transition coding tasks from *ready for dev* to *ready for test* in hours, not days. So how best to leverage this new capacity?

In chemistry, when you increase one reagent without rebalancing others, you don’t get more product: You get waste. 

Without new team ratios to capture the efficiencies in writing code with AI, teams waste capacity on low-complexity work—solutions that AI is quite efficient with—when the real opportunity is in rebalancing towards high-impact projects instead of chasing the long tail of backlog items.

## The Discipline Problem: Parkinson's Law Meets the 80/20 Rule

Engineering organizations have evolved each time the *way* software is built changes. It’s happening again with AI. Here’s the lesson: When you can build faster, product discipline and business domain expertise become the critical differentiators to organizational execution.

Parkinson’s Law dictates that the work will expand to fill the time. The 80/20 rule teaches us that 80 percent of results are achieved by 20 percent of inputs. The added capacity from faster code generation must be intentionally reallocated to the 20 percent that delivers results for the organization. 

The limiting reagent problem isn’t just about chemistry—it’s a strategic choice. Will you rebalance your teams to reflect the new tools of building software, or will inertia redirect freed capacity toward work that’s on the backlog but not good enough to have been staffed?

## The Waste: Coding Faster, Delivering Less

![Capacity constraint](/assets/posts-images/limiting-constraint.png){: style="border-radius: 4px; display: block; margin: 0 auto;" }

Engineers are coding faster with AI, but team capacity constraints are shifting to the other parts of the SDLC: discovery, design, testing, and release activities.

Who cares if AI can autonomously clear all your to-do items? They were sitting on your backlog and weren’t important enough to prioritize before AI. The organizations that win with AI won’t be the ones writing code the fastest—they’ll be the ones finding the right code to write.

## Eras of Engineering Org Charts

Understanding why AI demands new team ratios requires understanding how engineering org structures have always been a function of how code gets written. Each approach below was optimized for its era’s respective limiting reagent, from teams of technical experts in the Waterfall era, to cross-functional teams in the Agile era, and now to business domain expertise in the AI era.

### Waterfall Era: Pre-Agile Manifesto (1990s-2010s)

Staffing in this era was optimized for technical experts in syntax and technologies. Systems were often monoliths a single engineer could fully comprehend. Long, detailed requirements docs were thrown over the wall to teams of programmers who then threw solutions over the wall to testing in a waterfall fashion. Teams of this era were organized as clusters of titles (developer, tester, analysts, et cetera).

### Agile Era: The Cross-Functional Team (2010s-2020s)

Rigid years-long project planning gave way to iterative sprints, siloed specialists gave way to cross-functional teams of “generalizing specialists,”[^generalizing] and a magic “two-pizza team” ratio emerged: 5-7 engineers, 1-2 QEs, 1 PM.

*Ready for dev* to *ready for test* could take 5-8 business days of a two-week sprint. Much of that time was consumed by the mechanical work of implementing solutions in code—a process that AI is dramatically accelerating.

Was writing code *the* bottleneck? Not for every team, but it was a bottleneck significant enough to justify staffing 5-7 engineers per product manager. If writing code wasn’t a bottleneck, why was it staffed so heavily here?

### AI Era: The Post-Agile Rebalancing (2026+)

AI is increasing the availability of “code” the way a catalyst changes reaction speed, shifting the limiting reagent of software teams to defining and shipping the *right* work. Software teams need systems experts who understand the business objectives as deeply as they do products and operations.

Ideal product-engineering-testing ratios are actively being reconfigured in our industry. What’s clear to me is the Agile-era assumptions about team composition no longer hold when writing code collapses from days to hours. 


---

**Significant Revisions**

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2026-01-07 00:54:00 -0500" | date_to_string: "ordinal", "US" }} Initial draft created.

**Footnotes**

[^generalizing]: In practice, deep expertise in one area consistently outperforms rapid context switching between domains and tech stacks. As *validation* of AI outputs becomes critical, so too does deep domain knowledge. 

[^productivity]: Even the most modest studies have shown a 5 percent productivity improvement with AI; other studies have shown 10-20 percent SWE role improvement, with almost full automation of certain job tasks like coding.
