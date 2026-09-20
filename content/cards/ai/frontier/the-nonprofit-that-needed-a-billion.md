---
id: ai.frontier.labs.the-nonprofit-that-needed-a-billion
topic: ai.frontier.labs
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, practical, numbers]
tags: [capped-profit, benefit-corporation, governance, fixed-costs, natural-monopoly]
hook: "A charity cannot raise a billion dollars for chips. A normal company cannot credibly promise to stop. Every lab is an attempt to be both."
sources:
  - {title: "OpenAI LP", author: "OpenAI", year: 2019, type: blog, url: "https://openai.com/index/openai-lp/"}
  - {title: "The Long-Term Benefit Trust", author: "Anthropic", year: 2023, type: blog, url: "https://www.anthropic.com/news/the-long-term-benefit-trust"}
  - {title: "OpenAI", type: wiki, url: "https://en.wikipedia.org/wiki/OpenAI"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why AI labs have such strange corporate structures

Every frontier lab is a contraption bolted together out of two incompatible needs, and the contraptions are worth reading as evidence rather than as public relations.

OpenAI began as a non-profit in 2015 and in March 2019 announced a "capped-profit" arm: investors' returns are capped — the first round at 100 times the investment — with anything above the cap flowing to the non-profit. Anthropic incorporated in Delaware as a public benefit corporation and in September 2023 described a Long-Term Benefit Trust, five financially disinterested trustees holding the right to elect a growing share of the board, reaching a majority within four years. DeepMind's 2014 sale came with an ethics board.

These specific arrangements change, and you should assume the ones above have been amended since. What does not change is the force producing them, and that force is arithmetic rather than ideology.

## Rigor

Model a lab's costs. A training run is a **fixed cost** $F$, paid in full before anyone knows whether the result is any good. Serving the trained model costs a **marginal** $c$ per query. Average cost over $N$ queries:
$$AC(N)=\frac{F}{N}+c.$$
With $F$ in the hundreds of millions and $c$ in fractions of a cent, $AC$ is dominated by the first term until $N$ reaches the billions.

Three consequences drop out, none of them about anyone's intentions.

1. **You need a mass product or a patron.** There is no viable middle: a lab serving a million queries pays roughly a thousand times more per query than one serving a billion.
2. **The industry concentrates.** $AC$ is strictly decreasing in $N$ — the textbook condition for natural monopoly, the same shape as a railway or a power grid.
3. **The capital comes first.** $F$ must be raised *before* the experiment, from people who want a claim on the upside. A charter that caps or redirects that claim is the only lever a founder has.

Note what the arithmetic does *not* say. Nothing here makes the frontier permanently closed: $F$ falls as algorithms improve, so this year's frontier run is next year's ordinary one.

## Recall
type: mcq
Q: Why does the economics of training runs push towards a few large labs?
- [ ] Because the research talent is scarce and clusters together — talent mobility matters, but it does not produce the cost structure.
- [x] Because the cost is mostly fixed and paid up front, so average cost falls with scale — the standard natural-monopoly shape.
- [ ] Because model weights are protected by patents — weights are generally not patented; exclusivity comes from cost, not law.
