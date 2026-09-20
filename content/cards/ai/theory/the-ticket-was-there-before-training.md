---
id: ai.theory.lottery-ticket.the-ticket-was-there-before-training
topic: ai.theory.lottery-ticket
format: series
difficulty: 4
language: en
weight: heavy
angles: [beautiful, paradox]
tags: [strong-lottery-ticket, malach-2020, existence-proof, mask-only-training, overparameterization]
hook: "Not 'a subnetwork that trains well' — a subnetwork that is already the answer, at its random initial weights."
series: {id: ai.theory.lottery-ticket-arc, index: 3, total: 3, title: "The lottery ticket"}
related: [ai.theory.lottery-ticket.throw-away-ninety-percent-and-rewind]
sources:
  - {title: "Proving the Lottery Ticket Hypothesis: Pruning is All You Need", author: "Malach, Yehudai, Shalev-Shwartz & Shamir", year: 2020, type: paper, url: "https://arxiv.org/abs/2002.00585"}
  - {title: "What's Hidden in a Randomly Weighted Neural Network?", author: "Ramanujan, Wortsman, Kembhavi, Farhadi & Rastegari", year: 2020, type: paper, url: "https://arxiv.org/abs/1911.13299"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A random network already contains the network you were going to train

The strongest form of the lottery ticket idea drops the training entirely. Not "there is a subnetwork that trains well", but: there is a subnetwork that is *already* the answer, with the random weights it was born with, before a single gradient step.

That sounds absurd, and it is a theorem. Malach, Yehudai, Shalev-Shwartz and Shamir proved it in 2020, following a conjecture by Ramanujan and colleagues — who had already gone looking experimentally, training only a mask and never once updating a weight, and found subnetworks of random networks that classify well.

The statement: for any target network of bounded size and bounded weights, a random network polynomially larger contains a subnetwork approximating it to any accuracy you like. No training. Only deletion. The randomness supplies the raw material and pruning does all of the learning.

Episode one ended on an uncomfortable thought: if the useful subnetwork is singled out before training, training looks less like sculpting and more like finding. This is that thought, proved.

## Rigor

**Theorem (Malach et al., 2020, informally).** Let $F$ be a ReLU network of depth $\ell$ and width $d$, weights bounded by 1, inputs in the unit ball. For every $\varepsilon,\delta>0$, a randomly initialised ReLU network $G$ of depth $2\ell$ and width $\mathrm{poly}(d,\ell,1/\varepsilon,\log(1/\delta))$ contains, with probability at least $1-\delta$, a subnetwork $\tilde G$ obtained by zeroing weights only, with

$$\sup_{\|x\|\le1}\big|\tilde G(x)-F(x)\big|\ \le\ \varepsilon .$$

The mechanism explains the polynomial blow-up: each weight of the target is approximated by *selecting* one of many random candidates that happens to land near it, each target neuron is reproduced by a small gadget of random units, and a union bound over the target's weights fixes the required width.

Two honest caveats. This is existence, not an algorithm — it does not say magnitude pruning will find $\tilde G$. And the polynomial overhead is large enough that nobody is proposing pruning as a replacement for training.

Still, it closes the loop opened in episode one, where the same shape of network trained well from its original numbers and failed from fresh ones. Capacity is not an embarrassment to be explained away. It is the *supply* from which a selection is made — and training, whether by gradient descent or by a mask, is how you point at the one you want.

## Recall
type: mcq
Q: What does the strong lottery ticket theorem actually claim?
- [x] A sufficiently over-parameterized random network already contains a subnetwork approximating any bounded target — pruning alone, with no weight updates, is enough.
- [ ] That iterative magnitude pruning provably finds winning tickets — the theorem is pure existence and names no algorithm.
- [ ] That most random subnetworks perform well — almost all are useless; the claim is that one good one exists among exponentially many.
