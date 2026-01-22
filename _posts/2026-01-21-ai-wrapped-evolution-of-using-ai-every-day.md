---
layout: post
author: James Rowe
title: "2025 AI Wrapped: Evolution of Using AI Every Day"
date: 2026-01-21 06:01:00 -0500
category: engineering
tags: ai, programming
uid: A4DC88EC-35BC-420A-8834-0EB2F1F1AD66
image: /assets/posts-images/2025-ai-wrapped-series/github-profile-2025.png
---

*This is Part 1 of 5 of my [2025 AI Wrapped]({% post_url 2026-01-21-ai-wrapped-series %}) series. This post covers my evolution from “CHOP” programming to integrated CLI/Cursor workflows, why I now build prototypes instead of PowerPoints, and how AI makes it possible for engineering managers to stay technical without impeding their teams.*

AI makes programming viable for engineering managers again. I’ve been [building](https://lethain.com/writers-who-operate/) with AI this past year, and AI has evolved from a frustratingly limited chat bot (2023), to a useful but context-limited research assistant (2024), to something that actually completes complex programming tasks (2025).

The biggest evolution in my work: I can now validate ideas at the speed I used to pitch them. So instead of theorizing about how something might work, I’m validating that it **can** work. By building with AI, I’m “showing” proof of work instead of “telling.” 

Before AI, if I had an idea I wanted to explore, I would have to either interrupt my fellow engineers, spend hours muddling through a “hello world” setup, or worse, [be shut down on StackOverflow]({% post_url 2024-05-02-conversation-experience-chatgpt-vs-stack-overflow %}). Many ideas died before they could even be evaluated for feasibility.

Now, with AI, I build in the same timeframe I used to spend on PowerPoints and one-pagers. I’m fitting build iterations into gaps between meetings, validating ideas while protecting scarce engineering time. Organizational buy-in still matters, but now I show up to the meeting with working prototypes instead of just a PowerPoint.

Given the choice between building PowerPoints or prototypes, **I choose the prototype, every time.** 

## Evolution of AI Tools and my GitHub contributions

This shift didn’t happen overnight. [A year ago]({% post_url 2025-02-12-how-i-use-llm-ai-tools-everyday %}), I was using chat-based AI alongside my work, primarily brainstorming ideas and writing code using [“CHOP”](https://sourcegraph.com/blog/chat-oriented-programming-in-action)-style programming, i.e., copy/pasting code to/from a web chat agent. Results were so unreliable and inefficient that I would review every proposed changeset as if inspecting each widget coming off an assembly line. 

During 2025, AI has gone from “nice to have” to critical for collapsing the learning curve and navigating project domains. [My setup]({% post_url 2026-01-21-ai-wrapped-my-setup-for-programming %}) is Anthropic Claude Code, OpenAI Codex, and Cursor as an integrated workflow. In 2024, I used one chat window; now I run multiple AI agents concurrently—generating code, brainstorming next steps, and running terminal commands.

With the newest frontier models (GPT 5.1, Claude 4.5), 95 percent[^imperfect] of AI-generated code compiles and is useful enough to iterate upon. Now, instead of inspecting each unit of generated code, I’ll use GitHub Desktop to review the changeset, use more AI cycles to improve code quality, and finally push it for peer-review. 

My GitHub activity shows this evolution in three distinct phases.

2023: This was the “engineering managers don’t have time to code” phase. I did very little hands-on work, and me trying to code would just burden my team. The below contribution chart reflects the occasional PR review, and some prototype/hackathon work in October. Even with advancing releases of ChatGPT, it just wasn’t efficient to build with. Note: Zero weekend activity on personal projects.

![GitHub Contributions 2023](/assets/posts-images/2025-ai-wrapped-series/github-profile-2023.png){: style="border-radius: 4px;" }
 
2024: AI would frequently reach context limits and lose the plot when working with long conversations. AI was also unable to iterate on its own changes, often clobbering its previous work; most of these commits are in the CHOP style of programming. See also: Weekend work increasing because AI models are getting good enough to accelerate my personal projects.

![GitHub Contributions 2024](/assets/posts-images/2025-ai-wrapped-series/github-profile-2024.png){: style="border-radius: 4px;" }

2025: By early 2025, I had fully embraced a Cursor/Claude Code/Codex setup. I’m building real solutions and, frankly, *loving* programming again. AI helps me orient on a project, accomplish tasks, and have meaningful impact with tiny slices of time. 

![GitHub Contributions 2025](/assets/posts-images/2025-ai-wrapped-series/github-profile-2025.png){: style="border-radius: 4px;" }

The best engineering managers operate where they can multiply their team’s effectiveness. For years, this meant staying out of the code entirely and slowly losing their relatability with newer technologies. With AI, engineering leaders don't have to choose between staying technical and staying effective. AI has collapsed the cost of personal experimentation—and in doing so, it's evolving what the engineering manager role can be. 

During 2025, with the help of AI, I’ve [shipped]({% post_url 2026-01-21-ai-wrapped-what-ive-shipped-with-ai %}) 20+ software solutions that span personal projects, prototypes/PoCs, back-office tools, small feature work, and bug fixes. None of this was possible before AI.

---

**Significant Revisions**

- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [{{ site.url }}]({{ site.url }}) with uid {{ page.uid }}
- {{ "2025-12-15 20:13:00 -0500" | date_to_string: "ordinal", "US" }} Initial rough draft created.

**Footnotes**

[^imperfect]: This hasn’t been perfect. See [“What Hasn’t Worked”]({% post_url 2026-01-21-ai-wrapped-what-hasnt-worked %}) for the other 5%.