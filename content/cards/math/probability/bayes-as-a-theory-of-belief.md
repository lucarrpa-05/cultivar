---
id: math.probability.conditional-bayes.bayes-as-a-theory-of-belief
topic: math.probability.conditional-bayes
topics: [phil.epistemology.bayesian]
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, practical]
tags: [bayesian-epistemology, dutch-book, ramsey, de-finetti, credence]
hook: "The odds-multiplication you learned as arithmetic is, to philosophers, the definition of not being a fool."
callback: {from: math.probability.conditional-bayes, to: phil.epistemology.bayesian}
sources:
  - {title: "Bayesian Epistemology", type: encyclopedia, url: "https://plato.stanford.edu/entries/epistemology-bayesian/"}
  - {title: "Dutch book theorems", type: wiki, url: "https://en.wikipedia.org/wiki/Dutch_book"}
  - {title: "Frank Ramsey", type: wiki, url: "https://en.wikipedia.org/wiki/Frank_Ramsey_(mathematician)"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember multiplying odds? Philosophers made it a definition of rationality

You met Bayes as bookkeeping: new odds equal old odds times the strength of the evidence. A whole school of epistemology takes that line and reads it as a *norm*. Not "here is how to compute" but "here is what believing correctly means."

The claim has two halves. First, your confidence in a claim is a number between 0 and 1 — a credence — and coherence requires those numbers to obey the probability axioms. Second, when evidence arrives, the only legitimate move is to multiply by the likelihood ratio.

Why should anyone accept that? Ramsey in 1926 and de Finetti in 1931 gave the same startling answer: if your credences break the axioms, someone can offer you a set of bets you will each judge favourable and which together lose you money with certainty. Incoherence is not merely inelegant. It is exploitable.

The awkward part is the one the arithmetic already warned you about: the answer depends on where you started, and nobody agrees on where to start.

## Rigor

**Credences as betting prices.** Read $p(H)$ as the price you would pay for a ticket returning 1 if $H$ and 0 otherwise, and assume you will take any bet you price as fair or better.

**Dutch book theorem (Ramsey 1926, de Finetti 1931).** If your prices violate the Kolmogorov axioms, there is a finite set of bets, each acceptable to you, with a guaranteed net loss. Conversely, coherent prices are immune.

*One line of it.* Suppose $p(H)=0.6$ and $p(\neg H)=0.6$. Sell both tickets for $0.6$ each, taking in $1.2$; exactly one pays out $1$. You lose $0.2$ whatever happens. Additivity was not a taste.

**Conditionalisation.** The dynamic version (Lewis's diachronic Dutch book) says the update must be $p_{\text{new}}(H)=p(H\mid E)$ — which in odds form is precisely multiplication by the likelihood ratio you already know.

**Where it hurts.** The problem of the priors: coherence constrains relations between beliefs, never the starting point. Logical omniscience: a coherent agent assigns probability 1 to every theorem, including ones nobody has proved. And Glymour's old-evidence problem: if $E$ is already known, $P(E)=1$, so the likelihood ratio is 1 and confirmed old evidence confirms nothing — yet Mercury's perihelion did confirm general relativity.

## Recall
type: mcq
Q: What does a Dutch book argument establish?
- [x] That incoherent credences let someone construct bets you accept and are guaranteed to lose — coherence is enforced by money, not taste.
- [ ] That Bayesian updating always reaches the truth — convergence needs extra assumptions and can fail with a badly chosen prior.
- [ ] That every rational agent must share the same priors — the priors are exactly what the argument leaves free.
- [ ] That probabilities are frequencies in the long run — that is the frequentist reading the Dutch book argument was designed to avoid.
