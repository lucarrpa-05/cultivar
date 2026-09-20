---
id: ai.alignment.reward-hacking.a-central-banker-named-it
topic: ai.alignment.reward-hacking
topics: [econ.macro.central-banks]
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, history, practical]
callback: {from: econ.macro.central-banks, to: ai.alignment.reward-hacking}
tags: [goodharts-law, monetary-targets, strathern, campbells-law, proxy-failure]
hook: "The law that explains why your reward function breaks was written about the Bank of England's money-supply targets in 1975."
sources:
  - {title: "Goodhart's law", type: wiki, url: "https://en.wikipedia.org/wiki/Goodhart%27s_law"}
  - {title: "Categorizing Variants of Goodhart's Law", author: "David Manheim & Scott Garrabrant", year: 2018, type: paper, url: "https://arxiv.org/abs/1803.04585"}
  - {title: "'Improving ratings': audit in the British University system", author: "Marilyn Strathern", year: 1997, type: paper, url: "https://doi.org/10.1002/(SICI)1234-981X(199707)5:3%3C305::AID-EURO184%3E3.0.CO;2-4"}
dates: {written: 2026-09-19, event: 1975-01-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Credited Keith Hoskin for the 'when a measure becomes a target' phrasing that Strathern's 1997 paper carries."}
---

# A Bank of England adviser named your AI's failure mode

Remember central banks and the business of hitting a target? In the 1970s the Bank of England tried to control inflation by steering a measure of the money supply, on the strength of a relationship between money and prices that had held for decades. The relationship stopped holding almost as soon as policy leaned on it.

Charles Goodhart, then an adviser at the Bank, wrote the sentence in 1975:

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.

Marilyn Strathern's 1997 paper carries the version you have heard — when a measure becomes a target, it ceases to be a good measure — a phrasing she credits to Keith Hoskin.

This is not an analogy for what happens to a reward function. It is the same statement. A proxy is a correlation. Correlations hold in the regime where they were measured. Optimising against one drags you out of that regime by construction — which is why the boat spun in circles, and why Goodhart's economists lost their money-demand equation.

## Rigor

Manheim and Garrabrant (2018) separate at least four mechanisms, and they fail differently, so it is worth keeping them apart. Write the proxy as a measurement $M$ of a goal $G$.

**Regressional.** $M=G+\varepsilon$. Selecting the top of $M$ selects partly for $\varepsilon$, so $\mathbb{E}[G\mid M \text{ large}] < M$. Unavoidable whenever measurement is noisy; it gets worse as you search harder.

**Extremal.** $M\approx G$ was fitted on the observed range. Push into the tail and the functional relationship itself changes — the fit was never meant to extrapolate.

**Causal.** $M$ correlates with $G$ through a shared cause, or because $G$ causes $M$. Then *intervening* on $M$ does not move $G$ at all. This is Goodhart's own case: money and prices moved together, but forcing the aggregate did not force the prices.

**Adversarial.** A second agent, who benefits from your decision, optimises $M$ deliberately once you commit to it.

Only the first is a statistical nuisance. The causal one is fatal: no amount of extra data on $M$ and $G$ can tell you whether the link survives an intervention. That is the same gap that separates prediction from causation everywhere else in your studies.

## Recall
type: mcq
Q: Which flavour of Goodhart's law cannot be fixed with more data on the proxy?
- [ ] Regressional Goodhart — more data shrinks the noise and softens the regression effect, even if it never disappears.
- [x] Causal Goodhart — if the proxy only correlates through a shared cause, no amount of observational data tells you whether intervening on it moves the goal.
- [ ] Adversarial Goodhart — a real problem, but it is about a second agent's incentives, not about how much you know.
