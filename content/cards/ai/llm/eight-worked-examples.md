---
id: ai.llm.reasoning-cot.eight-worked-examples
topic: ai.llm.reasoning-cot
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, numbers]
tags: [chain-of-thought, gsm8k, prompting, serial-computation, wei-2022]
hook: "Same model, same eight example problems. Show the working in the examples and the score goes from 18% to 57%."
sources:
  - {title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", author: "Jason Wei et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2201.11903"}
  - {title: "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems", author: "Zhiyuan Li, Hong Liu, Denny Zhou & Tengyu Ma", year: 2024, type: paper, url: "https://arxiv.org/abs/2402.12875"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Eight worked examples took it from 18% to 57%

GSM8K is a pile of grade-school word problems. Roger has five tennis balls, buys two cans of three, how many now. PaLM with 540 billion parameters, prompted the ordinary way with eight solved examples, scored 17.9%.

Then Wei and colleagues changed one thing. The eight examples now showed their working — "Roger started with 5. Two cans of 3 tennis balls each is 6. 5 + 6 = 11." — before giving the answer. Score: 56.9%. For comparison, the previous best on that benchmark was 55%, from a GPT-3 specially fine-tuned with a separate verifier rating its attempts.

No training. No new data. The prompt's *shape* changed, and the model started writing its own working before answering. Their abstract claims these abilities "emerge naturally in sufficiently large language models" under this prompting.

The mechanism is not psychological. It is about where a transformer has room to compute.

## Rigor

A decoder-only transformer applies a fixed number of layers, $L$, to produce one token. Within a single forward pass the serial depth is capped at $L$ — anything requiring a longer chain of dependent steps simply cannot happen there, no matter how wide the model is.

Generating intermediate tokens moves the computation into the sequence dimension. Each emitted token is a fresh forward pass that can attend to everything already written, so $T$ tokens of scratch work give roughly $T \cdot L$ serial steps instead of $L$. The page becomes the tape.

Li, Liu, Zhou and Ma (2024) make this an expressiveness theorem: constant-depth transformers with constant-bit precision can only solve problems in $\mathsf{AC}^0$, but "with $T$ steps of CoT, constant-depth transformers using constant-bit precision and $O(\log n)$ embedding size can solve any problem solvable by boolean circuits of size $T$."

So the working shown on the page is not a report about the computation. It *is* part of the computation — which is exactly why a model asked for the answer alone does worse than the same model allowed to ramble first.

## Recall
type: mcq
Q: Why does letting a model write intermediate steps help on multi-step problems?
- [x] A single forward pass has a fixed serial depth; emitted tokens add more passes, so the context becomes working memory. — the chain buys serial computation the architecture cannot otherwise perform.
- [ ] Writing steps makes the model more careful, the way it does for people — there is no self-monitoring mechanism; the gain is computational.
- [ ] The extra tokens increase the model's parameter count for that query — parameters are fixed; only the number of forward passes changes.
