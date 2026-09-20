---
id: ai.llm.scaling-laws.gopher-was-four-times-too-big
topic: ai.llm.scaling-laws
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, numbers]
tags: [chinchilla, compute-optimal, hoffmann-2022, tokens-per-parameter, gopher]
related: [ai.llm.scaling-laws.ten-times-the-compute-now-what]
hook: "For three years everybody built models too big and fed them too little. 400 experiments in 2022 showed the whole field the same mistake."
sources:
  - {title: "Training Compute-Optimal Large Language Models", author: "Jordan Hoffmann et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.15556"}
  - {title: "Scaling Laws for Neural Language Models", author: "Jared Kaplan, Sam McCandlish et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2001.08361"}
dates: {written: 2026-09-19, event: 2022-03-29}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Verified Table 3 (20.2 tokens/parameter at 1B, 20.5 at 10B) and MMLU 67.6% against Table 6; the abstract prints 67.5%. Both figures stand as written."}
---

# Everyone had been building the wrong shape

Look at the flagship models of 2020 and 2021 and one number never moves. Gopher: 280 billion parameters, 300 billion training tokens. GPT-3: 175 billion parameters, 300 billion tokens. Jurassic-1: 178 billion, 300 billion. Megatron-Turing NLG: 530 billion parameters — and 270 billion tokens. The models grew threefold and the diet stayed put.

Hoffmann and colleagues trained over 400 models, from 70 million to 16 billion parameters, on 5 to 500 billion tokens, and reported the correction: "for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled."

Then they proved it the expensive way. Same compute budget as Gopher, different shape: 70 billion parameters, 1.4 trillion tokens. Chinchilla beat Gopher, GPT-3, Jurassic-1 and Megatron-Turing across the board — 67.6% on MMLU against Gopher's 60.0% — at a quarter of the size, which also makes it four times cheaper to run forever after.

## Rigor

The standard accounting is that training costs about $C \approx 6ND$ floating-point operations for $N$ parameters and $D$ tokens. Minimising a loss surface $L(N,D)$ subject to $6ND = C$ gives $N \propto C^{a}$, $D \propto C^{b}$ with $a + b = 1$. Kaplan et al. had estimated $a \approx 0.73$: pour almost everything into parameters. Hoffmann et al. get $a \approx b \approx 0.5$ from three independent methods — fixing model size and varying data, fixing compute and varying the split, and fitting a parametric loss surface.

The consequence is arithmetic. With $a = b = 1/2$, multiplying compute by 10 means $\sqrt{10} \approx 3.2$ times the parameters and $3.2$ times the tokens, not 10 times either. Their projected budgets (Table 3) sit at roughly 20 tokens per parameter across sizes — 20.2 for a 1B model, 20.5 for 10B — a ratio the paper never names but which the table hands you.

Worth flagging: this optimises *training* cost. If a model will serve billions of queries, the optimum shifts further toward small models trained on even more data.

## Recall
type: mcq
Q: Under the Chinchilla result, what should you do with ten times more compute?
- [ ] Make the model ten times bigger and keep the data fixed — that is exactly the pre-2022 practice the paper corrected.
- [x] Multiply both parameters and tokens by about $\sqrt{10} \approx 3.2$. — compute goes as the product $ND$, and the two should grow in equal proportion.
- [ ] Keep the model and train ten times longer — data alone runs into its own power law with an exponent just as shallow.
