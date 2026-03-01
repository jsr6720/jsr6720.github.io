---
layout: post
author: James Rowe
title: "The Ownership Cost of AI Clones"
date: 2026-03-01 14:25:33 -0500
category: engineering
tags: ai, programming
uid: BB50DCC1-F53F-4CB4-AC1F-1C5CBFD2F2E8
toc: true
---

Twenty-five years ago, Joel Spolsky wrote that the single worst strategic mistake any software company can make is [rewriting the product from scratch](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/). Now, with AI, the prevailing opinion is that companies will clone SaaS products internally, displacing the market.

But cloning functionality is the easy part. Ownership is not. Even if the cost of generating entire products goes to zero, the ownership cost doesn't. Cloning with AI is only a good deal if you've budgeted for what comes next.

Regardless of *how* functionality is acquired, whether we build or buy, the question is the same: "Do we have time to own this?"

## The Grand Rewrite, Now with AI

I tested the hypothesis that AI-generated clones of existing software have lower total cost of ownership by cloning the functionality of and adding features to `rtCamp/action-slack-notify`.

*Total time spent: ~2 weeks*[^models]

I started with the prompt "I want to build a GitHub action that can be used to send messages to Slack replicating the functionality of `rtCamp/action-slack-notify`." I then spent approximately 20-30 hours iterating and "copying" the *already built solution* with small value-added customizations.

The plan:

1. Replace multiple in-use patterns with one tool.
2. Tackle a small-ish utility. Larger than, say, `left-pad`, but smaller than a ticket system.
3. Add some small enhancements.
   * Default to Slack app instead of Webhooks (deprecated).
   * `dry-run` and `debug` modes that would be specific to our Slack instance.
   * Custom template for our release notices.
   * New feature: Single-step definition with dual channel and success/failure message.

Not only did AI take almost a week to successfully replicate, but in typical AI fashion, it created huge mega-files that were totally indecipherable by humans. Once I got the basic functionality in place and added in the new features, I then had to test it and iron out all the bugs.

Now I have a "product" that is completely divorced from any OSS improvements or visibility and which transfers the burden of ownership internally. The question was never whether AI could generate it—it's whether I could afford to own it. Cloning was faster than before AI, but it came nowhere close to just forking and configuring.

## The Costs of "Just Clone It with AI"

> The idea that new code is better than old is patently absurd. Old code has been used. It has been tested. Lots of bugs have been found, and they've been fixed. –Joel Spolsky

The irony in this specific example is that AI *still* recommends `rtCamp/action-slack-notify` when discussing implementing Slack notifications via GitHub actions. So, to use AI to create an internal solution is to fully embrace the worst forms of "not invented here" syndrome.

### The Opportunity Cost

The biggest downside of this entire experiment was feeling "What else could I be building?" Frankly, cloning means always being one step behind the competition. The time spent building and maintaining a clone is time missed on building differentiating features or expanding distribution. Plus, with a clone, I now have to convince teams to slow down their actual work to adopt this for their respective domain areas.

### The Review and Maintenance Tax

The resulting code is not trivial. It is roughly a few thousand lines of code with unit tests split across 4-5 core files. This is a repo that had to be set up, configured, and evangelized. While the concept is sound and people could appreciate the additional flexibility and tight integration with our Slack instance, it was again time spent reviewing code that could've been better spent elsewhere.

Even if, in the future, time to generate clones of libraries approaches zero, you're transferring the maintenance and ownership internally without benefiting from the classic advantages of an OSS ecosystem. Case in point, I missed one edge case on text parsing. Guess who got asked to fix it. That's right: me. When employing OSS/vendor solutions, the limitations of the software are accepted or a source ticket is opened.

We've seen this before: the sprawl of Access databases across the enterprise. Teams couldn't get allocated engineering hours so some clever analyst built a mission-critical process based on an Access database sitting on a shared drive. AI products are the latest version of this pattern.

AI-generated clones are genuinely useful for validating a hypothesis. The mistake is letting the prototype become the product. The moment you're the one pulling the levers every week, you've become that Access database—everyone knows it's "not great," but nobody wants to touch it.

### Security Theater

One of the objectives of this experiment was to stop "passing" our Slack bot token to a third-party solution. I do think there are serious discussions to be had about a [software bill of materials](https://www.jsrowe.com/linkedin-article-whats-in-your-software/), but any compromise of `rtCamp/action-slack-notify` is already circumvented by our use of pinned versions and the eyeballs of everyone else who uses the product. Also, our configuration of the Slack app/webhooks is another layer of defense—that is, rewriting the connection utility is not the weakest link of this software. The security argument for bringing software internal is real, but often overstated.

## When Cloning Might Make Sense

To be clear, the problem is using AI to build the wrong thing. While doing this work, I did think of a couple of use cases where cloning with AI might make sense:

1. Language ports where the utility doesn't exist in the target language. Cloning libraries from Scala->Kotlin for example.
2. Throwaway proof of concepts/prototype work, where the value is in validating ideas, not generating code.

Generating code is the easy part. What comes with it is the ownership.

## Differentiation Is Still the Game

Nobody opens a burger joint to out-McDonald's the Big Mac. They open it because they have something different to say about burgers. Execution and implementation hours are still scarce resources. Every sprint spent maintaining an untested, unproven AI clone is a sprint not spent on what grows your business.

Chances are cloning software doesn't address your core KPIs/OKRs. Growing companies don't ask, "What can we copy?" They ask, "What do we need to build to grow our top line?" Use AI to accelerate the projects that move your business forward, not to catch up to what your competitors buy off the shelf.

Nobody raises a series B on a cost-cutting strategy. AI doesn't change the build vs. buy calculus; it just makes it easier to fool yourself into thinking the constraint was writing code. It wasn't. It was always about picking the right thing to build and having the discipline to say no to everything else.

---

**Significant Revisions**

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2025-12-21 22:10:00 -0500" | date_to_string: "ordinal", "US" }} Initial draft created.

**Footnotes**

[^models]: This clone was built using Cursor, OpenAI GPT5.1, and Claude Sonnet 4.5.