---
layout: post
author: James Rowe
title: "Key Insights: “Which Economic Tasks Are Performed with AI?”"
date: 2025-02-24 19:17:41 -0500
categories: whitepaper
tags: 2025 ai claude anthropic
uid: 2D86F16C-F228-47C2-8AD2-7D6CA6A1CD94
---

Anthropic has released [The Anthropic Economic Index](https://www.anthropic.com/news/the-anthropic-economic-index), which provides insights into how users are leveraging its online chat tool.

[The WEF](https://www3.weforum.org/docs/WEF_Jobs_of_Tomorrow_Generative_AI_2023.pdf), [WIRED](https://www.wired.com/story/ai-impact-on-work-mary-daly-interview/), [NYT](https://www.nytimes.com/2023/06/10/business/ai-jobs-work.html), and a host of [AI media coverage](https://www.sciencedirect.com/science/article/abs/pii/S0736585320300927) have published observations and opinions from pundits on the potential economic impact of AI tools.

In short, it seems that [globalization](https://www.jstor.org/stable/2601301) is still the primary driver of economic changes, more so than the [adoption of AI tools in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work). But don’t sleep on LLMs; understanding how the market is using these tools and for what tasks can prepare you for the future.

## Key Insights

### Knowledge Work Dominates AI Usage

Using Clio, this study classified interactions with Claude into broad categories, with Critical Thinking, Writing, Systems Analysis, and Complex Problem-Solving in the top percentage of total interactions. I have personally found [brainstorming (complex problem-solving?)]({% post_url 2025-02-12-how-i-use-llm-ai-tools-everyday %}#using-generative-ai-to-brainstorm) to be the most powerful feature of LLMs—it’s not so much that it can DO the task as it can help think through problems and explore topics from various angles.

<img src="/assets/posts-images/anthropic-claude-economic-chart-top-ten.png" alt="Chart showing top ten economic tasks performed with Claude according to Anthropic Economic Index" class="center-img img-stylish"/>

### Automation vs. Augmentation Workflows

This paper does a great job attempting to distinguish between AI-automation and AI-augmentation. It also provides a chart showing that very few occupations (~4 percent) have 75 percent or more of daily tasks that can be automated. [The death of the radiologist](https://newrepublic.com/article/187203/ai-radiology-geoffrey-hinton-nobel-prediction) has not happened; the truth is there is much more to any profession than the handful of automatable tasks an LLM can assist with.
 
<figure>
    <img src="/assets/posts-images/2025-02-15-how-i-use-llm-ai-tools-everyday/anthropic-study.png" alt="automative behaviors vs. augmentative behaviors">
    <figcaption>
        Table from whitepaper showing Automative Behaviors and Augmentative Behaviors. <cite>Source: Economic Tasks AI Paper. Anthropic.</cite>
    </figcaption>
</figure>

Even in the case of high automation, LLMs are a string-based nondeterministic statistical model and should not be relied on to complete tasks [just because they can](https://samim.io/p/2022-01-24-a-computer-can-never-be-held-accountable-an-ibm-slid/). 
 
Ideation and critical thinking are complex multistep processes that LLMs are [poorly equipped](https://www.quantamagazine.org/chatbot-software-begins-to-face-fundamental-limitations-20250131/) to manage even with “reasoning” prompt stacking. Further, this whitepaper acknowledges that the analysis is limited to only <http://claude.ai/> chat interactions. It excluded API and Business Users from the dataset. So take with a grain of salt Anthropic’s attempts to classify workflows as either fully automated or augmentations of another process.

### Citation

Handa, Kumal, Alex Tamkin, Miles McCain, et al. 2025. “Which Economic Tasks Are Performed with AI? Evidence from Millions of Claude Conversations.” White Paper. Anthropic. <https://assets.anthropic.com/m/2e23255f1e84ca97/original/Economic_Tasks_AI_Paper.pdf>

---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2025-02-15 16:46:42 -0500" | date_to_string: "ordinal", "US" }} Draft created