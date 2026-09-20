---
id: ai.llm.agents-tools.a-calculator-is-just-more-tokens
topic: ai.llm.agents-tools
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, practical]
tags: [tool-use, agents, react, toolformer, error-compounding]
hook: "A 1974 pocket calculator multiplies better than any language model. Getting one into the model costs no new architecture at all."
sources:
  - {title: "Toolformer: Language Models Can Teach Themselves to Use Tools", author: "Timo Schick, Jane Dwivedi-Yu, Roberto Dessì et al.", year: 2023, type: paper, url: "https://arxiv.org/abs/2302.04761"}
  - {title: "ReAct: Synergizing Reasoning and Acting in Language Models", author: "Shunyu Yao, Jeffrey Zhao, Dian Yu et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2210.03629"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A calculator is just more tokens

Schick and colleagues put the paradox in their abstract: language models "struggle with basic functionality, such as arithmetic or factual lookup, where much simpler and smaller models excel." A calculator from 1974 beats them at multiplication.

Fixing it requires no new architecture. Teach the model to emit a particular string — a function name and its arguments — and have the ordinary program wrapped around the model watch the output stream for it. When it appears, the program stops generation, runs the function, and appends the result to the context. Generation resumes.

From the model's side, nothing strange has occurred. It predicted tokens, and then some tokens appeared that it did not write. That is the entire mechanism behind "agents". Toolformer showed a model can learn, in a self-supervised way, when to call which API; ReAct interleaves a thought and an action so lookups happen mid-reasoning.

Which is worth saying plainly: the loop lives outside the model, and so does the thing people call agency.

## Rigor

The loop is a deterministic program around a frozen policy. With state $s_0$ the prompt, repeat: sample $a_t \sim p_\theta(\cdot \mid s_t)$ until a stop string; if $a_t$ parses as a call, compute $o_t = f(a_t)$ in the environment; set $s_{t+1} = s_t \,\|\, a_t \,\|\, o_t$. That is a partially observed decision process whose policy is a language model and whose transition function is someone's Python.

The arithmetic that governs whether this works is not in the paper, it is in the exponent. If each step succeeds independently with probability $\rho$, an $n$-step task succeeds with $\rho^{n}$. At a very respectable $\rho = 0.95$, twenty steps give $0.95^{20} \approx 0.36$. At $\rho = 0.99$, twenty steps give $0.82$.

So long-horizon reliability is not won by making the model a bit better; it is won by shortening $n$, by making steps verifiable so failures are caught rather than compounded, or by letting the loop retry. The calculator was the easy part.

## Recall
type: mcq
Q: A tool-using model is 95% reliable per step. What is its chance of finishing a 20-step task?
- [ ] About 95%, since each step is independent — independence is what makes the errors multiply, not what protects you from them.
- [x] About 36%, because $0.95^{20} \approx 0.36$. — reliability compounds multiplicatively over a long horizon.
- [ ] About 0%, since errors always cascade — they compound, but a high enough per-step rate still finishes; at 99% the same task lands at 82%.
