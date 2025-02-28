---
layout: post
author: James Rowe
title: "A Crowded LLM Field: Making Sense of AI Tooling"
date: 2025-02-27 22:14:50 -0500
category: technology
tags: 2025 ai llm
uid: 607E5E21-4FC8-4C8B-82C4-D9665373B6B4
toc: true
---

> **Note:** This originated as an appendix to [How I Use AI Tools Every Day]({% post_url 2025-02-12-how-i-use-llm-ai-tools-everyday %}); I decided to expand on what was originally a landscape analysis condensed to footnote form.

## Generative AI Product Landscape

The most relevant memory I can compare to the current rapidly evolving AI product landscape is the [constantly shifting JavaScript frameworks](https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/) I encountered while I was doing primarily front-end development from 2015-2020. But even this technology churn only narrowly impacts front-end engineers and does not have the pervasive reach that generative AI tooling [will have on all knowledge work](https://www.anthropic.com/news/the-anthropic-economic-index).

Having experimented with chat-based LLMs for a couple of years, it’s overwhelming to have so many options to choose from when evaluating which tool is best for the job. In my [original post]({% post_url 2025-02-12-how-i-use-llm-ai-tools-everyday %}), I had focused primarily on Claude Sonnet and ChatGPT-4o, comparing and contrasting how I leveraged them on a day-to-day basis.

I chose ChatGPT because I’ve been a subscribing member for nearly a year and they are the pioneers in the space, and Claude because of its performance on [SWE-bench](https://www.anthropic.com/research/swe-bench-sonnet), its positioning as the best coding LLM, and as an ethical[^ethics] [offshoot of OpenAI](https://en.wikipedia.org/wiki/Anthropic#Motives). But there are oh so many more to choose from; here are my criteria for selection and a breakdown of all the tools on my radar at the time of publication.

## Criteria for Evaluating

I think AI companies offer a public chat interface as an easy way for consumers to explore and experiment with LLMs (and to deliver that precious training data). In your own experimentation, think about how much time you spend copy/pasting content to/from the chat window. Wouldn’t that be better applied within the context of your existing program of choice?[^agents]

### Indemnification and Copyright Protection

Yes, this is first. If you take nothing else from this post, please know that LLMs are built on a very generous interpretation by AI companies of what constitutes [fair use](http://texaslawreview.org/fair-learning/). There are [many](https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html), [many](https://www.courtlistener.com/docket/66788385/getty-images-us-inc-v-stability-ai-inc/), [many](https://www.theverge.com/2024/8/13/24219520/stability-midjourney-artist-lawsuit-copyright-trademark-claims-approved) legal challenges to how AI companies have acquired their underlying training data. If you’re wondering why your workplace has blocked AI, the risk of [being sued](https://www.wired.com/story/thomson-reuters-ai-copyright-lawsuit/) is the answer.

So my first criterion is being able to pay for a version of the tool that allows me to opt out of my prompts and responses being used as training data for others. Also, being a paying (business) customer is generally the only way to be protected by these companies’ indemnification policies.[^ibm] As the saying goes, if you’re not the customer, you’re the product. 

### Working with Software

The second core criterion is an understanding of application development. Working with software is my core profession, and I review and write code every single day.[^lethain] [SWE-bench](https://www.swebench.com/#verified) provides something of a leaderboard[^python] that gave me a starting point for understanding the landscape of LLM software capabilities. Working with software also includes quality-of-life experiences like CLI capabilities, IDE extensions, and prompt responses complementary to the iterative nature of software development.

It's important to note that many tools in the market are providing a product that integrates via API to a well-known LLM. This doesn’t disqualify the product as unimaginative; these [wrappers](https://x.com/Hesamation/status/1887693215706370388) generally seed additional context or prompt framework to give you more relevant results.

## Generative AI Products

Because I have previously covered Claude and ChatGPT in [my original post](https://www.jsrowe.com/how-i-use-llm-ai-tools-everyday/index.html), here is the list of the other AI products I considered or at least had awareness of.

### Gemini Chat

I know that Google had much of the original insight and probably a good research lead on LLMs, but they didn’t put that into product form until after I’d gotten used to working with ChatGPT and Claude. This is particularly interesting to me because <https://lmarena.ai/?leaderboard>, at time of this writing, had Gemini in the top two positions. Nevertheless, I hadn’t used it at all except for the one time it failed to generate the code I asked for, so I moved on. I think [Gemini](https://support.google.com/docs/answer/14355406?hl=en) is being released to Google Docs/Gmail, but again, I don’t find generative AI useful within the context of my workspace.

<img src="/assets/posts-images/2025-02-15-how-i-use-llm-ai-tools-everyday/gemini-no-code.png" alt="Gemini Chat can't write code" class="center-img img-stylish"/>

### GitHub Copilot

I didn’t mind so much the IntelliSense that Copilot offers, but I did *not* like the prompt and response within the text editor. This broke my flow state and concentration, and would often litter my working file with dozens if not a hundred lines of unwanted code.

<img src="/assets/posts-images/2025-02-15-how-i-use-llm-ai-tools-everyday/github-copilot.png" alt="GitHub Copilot inline additions" class="center-img img-stylish"/>

### Amazon Q

[Amazon Q]( https://aws.amazon.com/q/) recently started getting pushed in my AWS login, I was aware of this product when it was “CodeWhisperer” and had not heard anything positive. But with its new advertised capabilities, it’s worth another look.

### Apple Intelligence

At the time of launch, Apple Intelligence just appeared to me to be a [wrapper to OpenAI’s ChatGPT](https://support.apple.com/guide/mac-help/use-chatgpt-with-apple-intelligence-mchlfc5cf131/mac). Now, when Apple moves to AI processing on-chip, I will definitely take another look.

### Grok

[Points for creative naming](https://en.wikipedia.org/wiki/Grok), but no, I have not used this at all.

### Llama Running Locally

After all the time spent with Claude and ChatGPT, this is next on my list to run an LLM on a local machine, especially for generic brainstorming non-coding tasks. Looks like the most recent version (Llama 3.3) was released December 7, 2024.

### Perplexity.ai

<https://www.perplexity.ai> I mean, you can’t catch them all. I have not used this personally.

### DeepSeek.com

<http://deepseek.com/> As I was wrapping up my notes on this post, [this model dropped](https://arxiv.org/abs/2412.19437) and made a big splash for its alleged drastic decrease in training costs and the fact that it originated in China. I was able to try out its reasoning capabilities, but the slow speed at which it performs this work reminded me of ChatGPT2.5. It’s on my list to spend more time with now that it’s on [Azure Foundry](https://azure.microsoft.com/en-us/blog/deepseek-r1-is-now-available-on-azure-ai-foundry-and-github/).


---

## Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2025-02-17 21:19:20 -0500" | date_to_string: "ordinal", "US" }} Draft created


## Footnotes

[^ethics]: Even though Anthropic was founded as a Public Benefit Company, I believe a company’s operations are only as ethical as the humans in charge. We shall see.

[^ibm]: I was first educated on the word “indemnification” by a mentor who highlighted [IBM’s](https://www.nytimes.com/2023/09/28/business/ibm-ai-data.html) announcement. Other companies have since followed suit: see [Amazon Q Developer Pro—IP indemnity](https://aws.amazon.com/q/developer/pricing/) and [GitHub Copilot](https://resources.github.com/learn/pathways/copilot/essentials/establishing-trust-in-using-github-copilot/).

[^lethain]: I’m a strong believer that [writers who operate](https://lethain.com/writers-who-operate/) gain both the source material and the observations to write credibly on any given topic.

[^python]: The caveat to SWE-bench is that it’s based on GitHub Issue-Pull request pairs from 12 popular Python repositories. I have my thoughts on compiled vs. interpreted languages that I’ll save for another post.

[^agents]: I’m bearish on so-called [“autonomous agents,”]( https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/why-agents-are-the-next-frontier-of-generative-ai) more due to [government regulations](https://www.gao.gov/products/gao-21-519sp) and [societal norms](https://www.wired.com/story/the-prompt-ai-agents-how-much-should-we-let-them-do/) than [*algorithims*](https://xkcd.com/1831/).
