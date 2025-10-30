---
layout: post
author: James Rowe
title: "AI and the Illusion of Mastery: Software Engineering Skills in the Age of LLMs"
date: 2025-02-27 22:14:50 -0500
category: ai
tags: 2025 
toc: true
uid: E8B59A12-DA73-4C5D-BF94-63A48D28DF32
---

    "The only true wisdom is in knowing you know nothing." –Socrates

## AI Can See the Past but You Build the Future

With generative AI’s ability to produce seemingly endless content on nearly all topics imaginable, it begs the question: “What software engineering skills are needed in the age of AI?” I think that AI provides sufficient general recall on common topics and can expose you to new ideas. AI can also help [onboard engineers](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#understand-unfamiliar-code) in new domain areas at a surface level, but you cannot offload comprehension and deep understanding to AI.[^skills]

Especially pertaining to building software, blindly accepting generative AI outputs is [increasing code churn](https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality) and reducing [critical thinking skills](https://www.microsoft.com/en-us/research/uploads/prod/2025/01/lee_2025_ai_critical_thinking_survey.pdf) of software engineers. No one learns by prompting “Fix this” over and over again.[^math]

I find generative AI most helpful in providing high-level overviews of new concepts and expanding my knowledge into domain-adjacent areas. In other areas where I have zero knowledge, I have no idea if the output is correct, and I revert to traditional means of acquiring knowledge: [RTFM](https://en.wikipedia.org/wiki/RTFM).

### Knowing Where to Tap

I admit that I have observed generative AI’s capability to generate reams of code with the click of a button with some trepidation, but having used it for quite some time now, I’ve come to appreciate its ability to [create initial drafts]({% post_url 2025-02-12-how-i-use-llm-ai-tools-everyday %}#application-development-using-ai-to-code) of solutions.

Formidable software experience comes from a deep expertise in a particular domain area and broad foundational knowledge in how to apply those skills within an ecosystem of tools. Writing code in an IDE is only one portion of our contributions as software engineers; [knowing where to tap](https://quoteinvestigator.com/2017/03/06/tap/)[^tap] is the secret to unlocking the assistive effects of LLMs.

AI can accelerate your prototyping and exploration of ideas by combining your knowledge of systems architecture, constraints of the world to the problem at hand, and ability to execute on that vision at least [20-30 percent](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566) more quickly. Dramatically driving down the “cost” of manually writing code will [increase demand](https://en.wikipedia.org/wiki/Jevons_paradox) for these same skills.

In every situation where I was amazed at what AI was able to produce, I recognized that I was the one with the foresight to frame the problem, prompt the LLM, identify a viable solution generated from the training data, and [change the world around me]({% post_url 2025-02-20-the-unreasonable-ones %}).

## The Illusion of Mastery: Overconfidence in the AI Age

The great seduction of using generative AI for solutions is amplifying the [Dunning-Kruger effect](https://en.wikipedia.org/wiki/Dunning–Kruger_effect) and [overconfidence bias](https://en.wikipedia.org/wiki/Overconfidence_effect). LLMs generate responses with confidence because, [at their core](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/), they **are** statistically correct. AI responses err on the side of optimism, appearing superficially correct. Without experience and understanding of the domain, it can be easy to say, “Good enough,” when in fact it is subtly wrong.
 
<figure>
    <img src="/assets/posts-images/AI-and-the-Dunning-Kruger-Effect-Over-Time.png" alt="Anthropic chart" class="center-img img-stylish"/>
    <figcaption>
        <strong>Note:</strong> I absolutely ADORE the misplacement of “Peak of AI Overconfidence.” <cite>Generated with AI.</cite>
    </figcaption>
</figure>

Using AI can delude you into a false sense of domain mastery. Not only are generative AI outputs constrained by solutions within their training data, outputs are also plagued by generative AI’s propensity to [confabulate (hallucinate)](https://thomasramsoy.com/index.php/2024/03/12/the-misunderstood-musings-of-ai-confabulation-not-hallucination/) said solutions.

It’s been my experience that leveraging AI slows me down in areas where I know exactly what to do, misleads me in areas where I have no knowledge, and provides utility in domains where I am working from some previous experience. Ultimately, true expertise comes from understanding that the more you know, the less you know. 

### The Socratic Engineer[^pragmatic]

The remedy to all of this is to engage in the [Socratic method](https://en.wikipedia.org/wiki/Socratic_method) with yourself and the models themselves. Here are some ways that I have improved my knowledge while leveraging generative AI.

* **Prompt AI to compare to something you know.** For example, when learning about GitHub actions, I prompted Claude to compare GitHub action workflows to Jenkins. I was able to map the build and deploy concepts from something I knew to something new.
* **Independently verify provided sources.** I find “Sources” and “Citations” to be accurate <33% of the time[^improving]. Often, I will check primary sources before proceeding on a particular path. 
* **Keep asking questions!** Sometimes I’ll simply ask, “Are there any other solutions I haven’t considered?” or “What are other ways to solve this problem?”[^planes]
* **Use AI for contrast.** AI is extremely useful in comparing approaches; prompting it to weigh two options is a context-aware extension of [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).

To tie all of these examples together: To [add prettyURLs]({% post_url 2024-07-19-aws-s3-website-pretty-urls %}) to this site, first I prompted AI for possible solutions. The LLM provided a solution leveraging a `Lambda@Edge` function. I didn’t want to do that, and prompting “how else can I do this” led to `CloudFront Functions` and the AI was able to provide a high-level overview comparison. I was then able to compare and contrast the two solutions before implementing a `CloudFront Function` that worked great for my needs.

## Conclusion

Software engineering is constantly evolving. In just a few decades, I’ve watched completely new technology stacks emerge every 10 years.[^lamp] In the past 50 years, we’ve gone from punch cards to “serverless” cloud-based systems. As noted by Tim O’Reilly, this is not the end of programming, but [the end of programming as we know it](https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/).

AI is changing the way we write code, but great engineering is about problem-solving, not code generation. The real skill isn’t prompting AI; it’s knowing when to accept it, when to ignore it, and when to think for yourself. Regardless of how AI evolves and its impact on software engineering, there will always be a need for someone to deploy, maintain, troubleshoot, and decide what’s next.

---

### Significant Revisions

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ " 2025-02-25 22:40:06 -0500" | date_to_string: "ordinal", "US" }} Draft created

### Footnotes

[^skills]: Often referred to as [T-shaped skills](https://en.wikipedia.org/wiki/T-shaped_skills), this is still an appropriate metaphor to evaluate your capabilities to contribute on an agile software development team.

[^math]: In my mind, this is like copying the answers from the back of the textbook to finish your math assignment. Sure it got you through the assignment, and seeing the answer might help you see your mistakes, but it won’t help you on the test if you don’t learn from the experience.

[^lamp]: When I started, `LAMP` was all the rage. Then it became `MEAN`, next `MERN`. Now its `PERN`, and I’m sure with AI tooling, we’ll see our first `Skynet` soon enough. 

[^tap]: In case of linkrot, “Knowing where to tap” is a business parable about a mechanic who fixes a broken machine in 10 minutes by tapping on it, charging $10,000. When the business owner demands an itemized bill, the mechanic sends two lines: “$1 fixing the problem, $9,999 knowing where to tap.”

[^pragmatic]: Shameless plug for one of the earliest books I read on the craft of software development, [*The Pragmatic Programmer*](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer). 

[^planes]: It’s not enough to evaluate what an LLM provides you—also probe for what it hasn’t provided you. I see this as a mild version of [survivorship bias](https://en.wikipedia.org/wiki/Survivorship_bias).

[^improving]: Just this month Anthropic released Claude 3.7 and OpenAI ChatGPT 4.5. With just a few prompts both already appear better at connecting generated content to cited sources.
