---
id: phil.epistemology.bayesian.the-bet-you-cannot-win
topic: phil.epistemology.bayesian
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, connection]
tags: [bayesian, dutch-book, ramsey, de-finetti, credence]
hook: "If your degrees of belief break the probability axioms, a stranger can sell you bets you each call fair and still take your money."
sources:
  - {title: "Bayesian Epistemology", type: encyclopedia, url: "https://plato.stanford.edu/entries/epistemology-bayesian/"}
  - {title: "Truth and Probability", author: "Frank P. Ramsey", year: 1926, type: paper, url: "https://en.wikipedia.org/wiki/Frank_Ramsey_(mathematician)"}
  - {title: "Dutch book", type: wiki, url: "https://en.wikipedia.org/wiki/Dutch_book"}
dates: {written: 2026-09-19}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Opened on a definition; reordered so the Dutch book exploit leads and the credence framing follows."}
---

# The bet you are guaranteed to lose

Suppose you would take a fair bet at 0.6 that it rains tomorrow, and also a fair bet at 0.6 that it does not. Both feel reasonable in isolation. Sell me both and I pay you two stakes worth 1.2, collect one back whatever happens, and you have lost 0.2 with certainty. No forecast was needed. Only your arithmetic was wrong.

The trick works because Bayesian epistemology measures belief in exactly that currency: belief is not on or off, it comes in degrees, and your degree of belief in a claim is revealed by the odds at which you would bet on it either way. Once that is the unit, being incoherent stops being a vague failing and becomes a hole in your wallet.

That is a **Dutch book**, and Frank Ramsey in 1926 and Bruno de Finetti in 1937 showed the general result: you are immune to it exactly when your degrees of belief satisfy the probability axioms. Rationality, on this view, is not about being right. It is about not being exploitable.

Then the second question: what should belief do when evidence arrives?

## Rigor

Let $\mathrm{Cr}$ be your credence function over an algebra of propositions, and treat $\mathrm{Cr}(A)$ as the price you consider fair for a ticket paying $1$ if $A$ and $0$ otherwise.

**Synchronic Dutch book theorem (Ramsey, de Finetti).** There exists a finite set of bets, each acceptable at your prices, with a guaranteed net loss, if and only if $\mathrm{Cr}$ violates non-negativity, normalisation, or finite additivity. The rain example is the additivity failure with $A$ and $\neg A$.

**Conditionalisation.** On learning $E$ and nothing stronger, set
$$\mathrm{Cr}_{\text{new}}(H) \;=\; \mathrm{Cr}(H \mid E) \;=\; \frac{\mathrm{Cr}(E \mid H)\,\mathrm{Cr}(H)}{\mathrm{Cr}(E)}.$$
David Lewis's diachronic Dutch book argument, published by Teller in 1973, extends the exploitation result: announce in advance any updating rule other than conditionalisation and a bookmaker can construct a package of bets, some placed before the evidence and some after, that loses you money for sure.

The honest limits are two. Where the prior $\mathrm{Cr}(H)$ comes from is unanswered — coherence constrains it barely at all. And convergence theorems saying disagreeing agents are eventually driven together by data assume everyone gives the truth a non-zero prior, which is precisely what a dogmatist refuses.

## Recall
type: mcq
Q: What does a Dutch book argument actually establish about incoherent credences?
- [ ] That they will make you wrong more often — incoherence is a structural defect, not a track record.
- [x] That a set of bets exists which you call fair one by one and which loses you money whatever happens — no prediction required.
- [ ] That they violate the laws of logic — probability axioms are stronger than consistency; you can be logically consistent and still incoherent.
