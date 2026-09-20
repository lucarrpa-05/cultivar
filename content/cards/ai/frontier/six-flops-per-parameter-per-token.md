---
id: ai.frontier.compute-hardware.six-flops-per-parameter-per-token
topic: ai.frontier.compute-hardware
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, numbers, practical]
tags: [training-compute, flops, six-n-d, gpu-hours, energy]
hook: "Six operations per parameter per token. That single number turns any press release about a big model into a napkin calculation."
sources:
  - {title: "Scaling Laws for Neural Language Models", author: "Kaplan et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2001.08361"}
  - {title: "Training Compute-Optimal Large Language Models", author: "Hoffmann et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.15556"}
  - {title: "Carbon Emissions and Large Neural Network Training", author: "Patterson et al.", year: 2021, type: paper, url: "https://arxiv.org/abs/2104.10350"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Recall distractor claimed 2ND = 1.4e23; 2ND is 2.8e23. Fixed that and the second distractor's non-teaching reason."}
---

# The arithmetic behind every "we trained a big model"

Compute sounds like money. It is first a count, and the count is short enough to do in your head.

Training a transformer costs roughly six floating-point operations per parameter, per token of training text. Six: two going forwards, four coming back. Multiply by the parameters, multiply by the tokens, and you have the whole cost of the run as a single number.

That is enough to check anybody's claims. A data-centre accelerator manages a few hundred trillion operations a second on paper, and you actually get something like a third to a half of that. Divide, and a mid-sized model turns into thousands of chips running for weeks — which is why the list of organisations doing this is short, and why the shortness has nothing to do with secrecy.

So when you next read that a model is enormous, there are only two questions worth asking: how many parameters, and how many tokens?

## Rigor

$$C \approx 6ND \ \text{FLOP},$$
with $N$ non-embedding parameters and $D$ training tokens (Kaplan et al., 2020; used throughout Hoffmann et al., 2022). The forward pass is one multiply and one add per weight per token, $2N$; the backward pass computes gradients with respect to both activations and weights, about $4N$.

Worked example. $N=7\times10^{9}$, $D=2\times10^{12}$:
$$C = 6\cdot 7\times10^{9}\cdot 2\times10^{12}=8.4\times10^{22}\ \text{FLOP}.$$
At a *sustained* $1.6\times10^{14}$ FLOP/s per accelerator — 40% of a 400 TFLOP/s peak, a realistic utilisation — that is $5.25\times10^{8}$ accelerator-seconds, about 6,100 accelerator-days: a thousand chips for six days, or ten thousand for fifteen hours.

Energy follows from the same count. Patterson et al. (2021) estimate GPT-3's training at 1,287 MWh and 552 tonnes of CO₂-equivalent — roughly the annual electricity of 120 American households, for one run.

And remember what kind of cost this is. It is the fixed cost $F$: paid in full, up front, before anyone knows whether the model is any good.

## Recall
type: mcq
Q: A model has 70 billion parameters and was trained on 2 trillion tokens. Roughly what did the run cost in operations?
- [ ] About $2.8\times10^{23}$ — that is $2ND$, the forward pass only; training also pays for the backward pass.
- [x] About $8.4\times10^{23}$ — six operations per parameter per token, so $6\times 7\times10^{10}\times 2\times10^{12}$.
- [ ] About $1.4\times10^{11}$ — that is twice the parameter count with the tokens left out; compute scales with parameters times tokens, not parameters alone.
