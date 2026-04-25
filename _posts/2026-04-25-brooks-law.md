---
layout: post
author: James Rowe
title: "Why AI Won’t Break Brooks’s Law"
date: 2026-04-25 16:09:51 -0400
category: engineering
tags: ai, programming
uid: 85BE426C-893F-4F96-A02B-43B4EE566A4E
toc: true
---

[Fifty years ago](https://kieranpotts.com/mythical-man-month-50), Fred Brooks wrote about the challenges of building large, complex software projects; his most famous assertion: “Adding engineers to a late software project makes it later.”

AI hype promises to deliver a world without software engineers; this is a false narrative. AI automates writing code *with* the direction of an experienced team. The laws of software development haven’t changed; we’ve just automated more of the process of writing code, [which was never the bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck) to delivering software. 

AI doesn’t end programing, it merely [changes programming as we know it](https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/). Brooks’s Law holds 50 years later: You can’t add people (or infinite AI agents) to a late project and get it done faster.

## No Silver Bullet: [Brooks’s Law](https://en.wikipedia.org/wiki/No_Silver_Bullet)

Brooks identified pure programming as only one sixth of the total project’s timeline. As scope and team size grows, the expenses of integration, communication, and collaboration far outweigh the time to write code. This distinction is between the [essential](https://plato.stanford.edu/entries/essential-accidental/) complexity of software (people) and nonessential complexity of building software (code). People complexity is not solved by AI. 

No amount of AI will get the heads of Sales, Customer Service, Engineering, and Marketing to unanimously agree on a focused course of action; all product roadmaps are strategic bets with accepted risks, assumptions, and trade-offs.[^ai]

AI excels at automating the nonessential (accidental) complexities of building software—language syntax, lambda expressions, system configuration, DTO mappings, API endpoints, documentation—in ways that primarily target the developer experience. Building with AI is just the next frontier of building software in the same way better IDEs, open-source software, and cloud technologies were frontiers that preceded it. 

**AI generates one sixth; you own the other five sixths.**

Brooks identified this pattern in 1975: Programming is one sixth of the project. Even as AI eats that sixth, the other five sixths remain stubbornly human: deciding what to build, cross-team coordination, project integrations, system observability, and those customers—always demanding more.

## A Look at Previous Accelerants

Any system output can only move as fast as its slowest step. Even if AI writes 100 percent of the code in 1 percent of the time, someone still has to verify the outputs to ensure they meet the requirements, correct any mistakes, and accept accountability for production. 

This “automation of writing code” has played out multiple times in the past 30 years in a clear pattern: We keep optimizing code production while ignoring that code production was never the limiting factor. Every single one of these evolutions made writing code faster. None broke Brooks’s law.

### IDE Evolution (1990s)

It’s hard to explain what programming with VIM and Notepad++ without source control was like. Every line of code was written like a memo in text editor. No syntax highlighting, no tab auto complete and definitely no tabs. And after all that deploying via [putty]( https://www.chiark.greenend.org.uk/~sgtatham/putty/).

IDEs have transformed and improved developer quality of life over the past 30 years. Code quality improved. Feature velocity barely budged.

### FOSS Revolution (2000s)

Before Linux and huge swaths of open-source software, every project rebuilt all functionality from zero. This was the world of the dedicated hardware/software solutions like Brooks writes about in The Mythical Man-Month. The early promise of FOSS was that there would be an import for everything.

We stopped rebuilding wheels, but now projects contend with complex software supply chains.[^xkcd] The time gained from importing code was eaten by higher expectations from customers for software differentiation. Starting a project got easier; delivery timelines didn’t.

### Cloud/Infra as a Service (2010s)

Servers in minutes, not months! But this did not meaningfully shrink time to market. You still had to provision and build software that scaled in these systems, only now with operational spend instead of a one-time expense.

Are you able to experiment more when the cost of provisioning new hardware is pennies instead of a capital investment? Of course. Deploying code to a “server” can now happen instantly, but you’re still doing operational reviews and scaling studies to make sure you’ve correctly provisioned the hardware. Infrastructure provisioning went from months to days. Time-to-market stayed measured in quarters.

### We’ll Rebuild It Faster with the "Latest" Framework!

I’ve watched this play out repeatedly, and it’s proof that faster tooling does not equal better execution. The most seductive technical argument that is [entirely false](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/) is that a new tech stack will not only solve all the previous system’s woes but also be faster to build with. There will be reasons to move to a new tech stack, but finishing projects faster is rarely one of them.

---

**Significant Revisions**

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2026-01-05 21:41:00 -0400" | date_to_string: "ordinal", "US" }} Initial draft created.

**Footnotes**

[^ai]: If your response is “it’s AI agents all the way down!” my question is, “Who programs the agents?”

[^xkcd]: Obligatory [XKCD](https://xkcd.com/2347/).