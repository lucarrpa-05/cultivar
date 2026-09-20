---
id: css.llm-agents.memory-planning.three-numbers-decide-what-you-remember
topic: css.llm-agents.memory-planning
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, connection, numbers]
tags: [memory-stream, retrieval, reflection, planning, park-2023]
hook: "An agent that remembers everything is an agent that can act on nothing. The fix is three numbers."
sources:
  - {title: "Generative Agents: Interactive Simulacra of Human Behavior", author: "Park, O'Brien, Cai, Morris, Liang, Bernstein", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.03442"}
  - {title: "Generative Agents (code and data)", author: "Joon Sung Park", year: 2023, type: dataset, url: "https://github.com/joonspk-research/generative_agents"}
dates: {written: 2026-09-19, event: 2023-04-07}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# An agent that remembers everything can act on nothing

The context window is the whole problem. An agent living a simulated life accumulates thousands of observations — *the fridge is empty*, *Klaus is reading in the park*, *Isabella mentioned a party* — and only a handful fit in the prompt when it decides what to do next. Choosing which handful is not an engineering detail. It is the agent's personality.

Generative Agents solves it with a memory stream: every observation stored as a sentence with a timestamp, and a scoring function that retrieves the top few whenever the agent needs to act. Three terms decide. How recently did this happen? How significant is it? How related is it to what I am thinking about now?

On top of that sits reflection. Every so often the agent reads its own recent memories and asks the model what it can conclude — *Klaus is devoted to his research* — and files the conclusion back into the stream as a memory in its own right, available for retrieval like any other. Memories about memories, several layers deep.

Here is the actual scoring rule.

## Rigor

Each memory object carries a creation timestamp, a last-accessed timestamp, and a natural-language description. Retrieval scores every memory as
$$\text{score}=\alpha_{\text{rec}}\cdot\text{recency}+\alpha_{\text{imp}}\cdot\text{importance}+\alpha_{\text{rel}}\cdot\text{relevance},$$
each component min–max normalised to $[0,1]$, and in the released implementation all three $\alpha$ set to 1.

**Recency** is exponential decay with factor $0.995$ per sandbox game hour since last retrieval — so a memory not touched for a simulated day is down to about $0.89$, and the decay is on *access*, not creation, which makes recall self-reinforcing. **Importance** is the language model's own answer to "rate the poignancy of this memory from 1 to 10", where 1 is brushing your teeth and 10 is a break-up. **Relevance** is cosine similarity between the memory's embedding and an embedding of the current query.

Reflection fires when the summed importance of the newest memories crosses a threshold — 150 in the implementation, about two or three times a simulated day.

Notice what has been built: the model rates its own memories, retrieves by its own ratings, and reflects on what it retrieved. Every parameter here is a modelling assumption about human memory, and none of them was fitted to data.

## Recall
type: mcq
Q: What makes the retrieval function a substantive modelling assumption rather than plumbing?
- [x] It decides what the agent can act on — recency decay, an LLM-assigned importance score and embedding similarity together define the agent's effective personality, and none was fitted to human data.
- [ ] It controls how fast the simulation runs — speed is an implementation concern; the ablations show retrieval changes behaviour, not just cost.
- [ ] It determines the agent's factual accuracy — retrieval selects among the agent's own experiences; accuracy about the world is a different failure.
