---
id: ai.llm.rlhf-alignment-training.a-1952-model-of-paired-comparisons
topic: ai.llm.rlhf-alignment-training
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, origin]
tags: [bradley-terry, reward-model, preference-learning, logistic, identifiability]
hook: "The statistical core of modern preference training is a 1952 Biometrika paper on ranking things from incomplete tournaments."
sources:
  - {title: "Bradley–Terry model", type: wiki, url: "https://en.wikipedia.org/wiki/Bradley%E2%80%93Terry_model"}
  - {title: "Training language models to follow instructions with human feedback", author: "Long Ouyang et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.02155"}
  - {title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", author: "Rafael Rafailov et al.", year: 2023, type: paper, url: "https://arxiv.org/abs/2305.18290"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 4 to 3: Bradley-Terry by maximum likelihood sits inside this reader's econometrics, not above it."}
---

# The reward model is a 1952 paper about paired comparisons

The hard part of learning from human feedback is not the reinforcement learning. It is turning "I like this one better" into a number, when nobody can reliably say whether an answer is a 7 or an 8 out of 10 but everybody can point at the better of two.

Ralph Bradley and Milton Terry published the answer in *Biometrika* in 1952, for ranking treatments from incomplete round-robin experiments — Ernst Zermelo had the same model in 1929 for scoring tournaments. Give each item a positive worth $p_i$ and declare

$$\Pr(i \text{ beats } j) = \frac{p_i}{p_i + p_j}.$$

Fit the worths by maximum likelihood on whatever comparisons you happened to collect. That is the whole reward model: a neural network whose output is the log-worth of an answer, trained by logistic regression on pairs. The same skeleton is under Elo ratings.

The consequences of that innocent formula are worth spelling out.

## Rigor

Write $p_i = e^{r_i}$. Then

$$\Pr(i \succ j) = \frac{e^{r_i}}{e^{r_i}+e^{r_j}} = \sigma(r_i - r_j),$$

and the negative log-likelihood of a preference dataset is $-\sum \log \sigma\big(r_\phi(x,y_w) - r_\phi(x,y_l)\big)$ — exactly the loss Ouyang et al. use.

Three things follow. **Identifiability:** $r$ and $r + c$ give identical likelihoods, so a reward model's absolute output is meaningless; only differences are estimated. **Transitivity:** a single scalar per item forces $\Pr(i\succ j), \Pr(j\succ k)$ to determine $\Pr(i \succ k)$. Real annotators produce cycles, and multi-dimensional quality (helpful versus harmless) genuinely cannot be collapsed onto one axis — so the model is misspecified by construction, and the fitted $r$ is a projection of human judgement onto a line. **Closed form:** Rafailov et al. (2023) noticed that the optimal KL-regularised policy for a given $r$ can be inverted, letting you write $r$ in terms of the policy and fit the preferences directly, with "only a simple classification loss" and no reinforcement learning at all.

## Recall
type: mcq
Q: A reward model outputs $-3.2$ for an answer. What does that number mean?
- [ ] The answer is bad, since the score is negative — the zero point is arbitrary; a shift by any constant is the same model.
- [x] On its own, nothing. Only differences between scores are identified by the Bradley–Terry likelihood. — the fit depends on $r_i - r_j$, so $r$ and $r+c$ are indistinguishable.
- [ ] It is the log-probability that a human prefers this answer — that would require a second answer to compare against; a single score is not a probability.
