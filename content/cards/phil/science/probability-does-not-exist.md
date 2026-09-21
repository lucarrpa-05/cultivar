---
id: phil.science.probability.probability-does-not-exist
topic: phil.science.probability
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox, open-problem]
callback: {from: math.probability.lln, to: phil.science.probability}
tags: [frequentism, subjectivism, de-finetti, reference-class, dutch-book]
prerequisites: [math.probability.lln]
hook: "The law of large numbers tells you the average converges. It does not tell you what the thing it converges to is."
sources:
  - {title: "Interpretations of Probability", type: encyclopedia, url: "https://plato.stanford.edu/entries/probability-interpret/"}
  - {title: "Theory of Probability", author: "Bruno de Finetti", year: 1974, type: book, url: "https://onlinelibrary.wiley.com/doi/book/10.1002/9781119286387"}
  - {title: "Bruno de Finetti", type: wiki, url: "https://en.wikipedia.org/wiki/Bruno_de_Finetti"}
dates: {written: 2026-09-20}
author: author-phil-1
reviewed: {by: reviewer-philosophy-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Qualified convergence claim and checked de Finetti quote."}
---

# What does the law of large numbers converge to?

The **law of large numbers** says a sample average approaches a probability under its assumptions. What is that probability? A frequentist connects it to long-run frequencies, but a single event fits many possible reference classes. Bruno de Finetti opened his *Theory of Probability* with the provocation “PROBABILITY DOES NOT EXIST.” He rejected probability as a physical property waiting to be found; for him it expresses a person's coherent degree of belief. That sounds permissive until betting odds enter: inconsistent beliefs can make you accept a guaranteed loss. The mathematical law survives either interpretation. What changes is what you think its symbol $p$ means.

## Rigor

The subjectivist owes an account of why belief should obey Kolmogorov's axioms, and the **Dutch book theorem** supplies one. If your credences violate the probability calculus, there is a set of bets, each of which you are committed to regarding as fair, that guarantees you a loss however the world turns out; if they conform, no such book exists. Rationality here is not correspondence with a frequency — it is internal coherence.

That leaves an obvious objection: coherence lets you believe anything, as long as you believe it consistently. **De Finetti's representation theorem** is the reply. For an infinite exchangeable sequence — one whose joint distribution is invariant under permutation, so order carries no information — the distribution is a mixture of i.i.d. Bernoulli sequences:
$$P(X_1=x_1,\dots,X_n=x_n)=\int_0^1 \theta^{\,k}(1-\theta)^{\,n-k}\,d\mu(\theta),\qquad k=\textstyle\sum_i x_i .$$
The "objective chance" $\theta$ reappears — but as a *mathematical artefact of your own symmetry judgement*, not as a discovered fact. With suitable priors, updating on a long shared sequence can make different observers’ predictions converge. This is a conditional result, not a guarantee for arbitrary prior beliefs.

That convergence resembles a law-of-large-numbers result, now interpreted through beliefs about the sequence.

## Recall
type: mcq
Q: What is the reference-class problem for frequentism?
- [ ] Samples are never large enough for the frequency to stabilise — a practical worry; the objection here is conceptual and survives infinite data.
- [x] A single event belongs to many classes with different frequencies — and the mathematics does not say which class is the right one.
- [ ] Frequencies cannot be measured without assuming a probability model — measurement is not the issue; defining the target quantity is.
