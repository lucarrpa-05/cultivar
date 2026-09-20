---
id: ai.theory.lottery-ticket.throw-away-ninety-percent-and-rewind
topic: ai.theory.lottery-ticket
format: series
difficulty: 3
language: en
weight: medium
angles: [weird, paradox]
tags: [pruning, winning-ticket, initialization, frankle-carbin, sparsity]
hook: "The same sparse network trains well from its original random numbers and fails from fresh ones. Same shape, different luck."
series: {id: ai.theory.lottery-ticket-arc, index: 1, total: 3, title: "The lottery ticket"}
sources:
  - {title: "The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks", author: "Jonathan Frankle & Michael Carbin", year: 2019, type: paper, url: "https://arxiv.org/abs/1803.03635"}
  - {title: "ICLR 2019 Best Paper Awards", year: 2019, type: primary, url: "https://iclr.cc/Conferences/2019/Awards"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Dated the work 2018 (arXiv) with the ICLR 2019 best-paper award, instead of 2019."}
---

# Delete 90% of the network, rewind the survivors, and it still works

Pruning is old news: train a network, throw away the smallest weights, and the thing keeps working. Everyone knew that. Everyone also knew the obvious follow-up failed — take the small architecture that remains, initialise it fresh, train from scratch, and it trains badly. The sparse network seemed to need the dense one as scaffolding.

In 2018 Jonathan Frankle and Michael Carbin tried one more variation, and it took a best-paper award at ICLR 2019. Train the full network. Prune the smallest weights. Then, instead of reinitialising the survivors at random, *rewind them to the exact values they had at initialisation* — the numbers they were born with, in their original positions. Retrain. Repeat.

Out comes a subnetwork with 10–20% of the weights that trains on its own to the dense network's accuracy, often faster. Reinitialise that identical subnetwork with different random numbers and it does not.

So the winning ticket was never the shape. It was the shape *plus* the numbers it started with.

## Rigor

Iterative magnitude pruning, precisely. Let $f(x;\theta)$ be the network, $\theta_0$ its random initialisation.

1. Train to $\theta_T$.
2. Form a mask $m\in\{0,1\}^{|\theta|}$ zeroing the $p\%$ of coordinates with smallest $|\theta_T|$.
3. Reset the survivors to their *original* values: $\theta\leftarrow m\odot\theta_0$.
4. Repeat from 1 with the mask fixed, pruning a further $p\%$ each round.

**The lottery ticket hypothesis (Frankle & Carbin, 2019).** A randomly initialised dense network contains a subnetwork $(m,\theta_0)$ that, trained in isolation for at most the same number of iterations, matches the dense network's test accuracy. On MNIST and CIFAR-10 they consistently find such winning tickets at less than 10–20% of the original size, learning faster and reaching *higher* test accuracy than the dense network.

The control is what turns this into evidence. Keep the mask, redraw the initial values as $m\odot\theta_0'$, and accuracy collapses. The structure alone is not doing the work; the pair $(m,\theta_0)$ is.

Which is the uncomfortable part. If the useful subnetwork was already singled out at initialisation, training looks less like sculpting and more like *finding*.

Next: why this quietly failed on the networks people actually use.

## Recall
type: mcq
Q: What is the control experiment that makes a winning ticket "winning"?
- [x] Keep the same mask and redraw the initial weights — accuracy collapses, so the sparse structure alone is not what makes it trainable.
- [ ] Train the dense network for longer — the comparison is against the dense network's final accuracy, which the ticket already matches.
- [ ] Prune randomly instead of by magnitude — a useful control, but it tests the mask, not the role of the initial values.
