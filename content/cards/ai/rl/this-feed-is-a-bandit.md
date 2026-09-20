---
id: ai.rl.bandits.this-feed-is-a-bandit
topic: ai.rl.bandits
format: idea
difficulty: 2
language: en
weight: medium
angles: [practical, tool, connection]
tags: [thompson-sampling, beta-distribution, conjugate-prior, exploration, this-app]
prerequisites: [math.probability.expectation-variance]
hook: "The card you are reading was chosen by a slot machine with one arm per topic. Here is the machine."
sources:
  - {title: "Thompson sampling", type: wiki, url: "https://en.wikipedia.org/wiki/Thompson_sampling"}
  - {title: "On the likelihood that one unknown probability exceeds another in view of the evidence of two samples", author: "William R. Thompson", year: 1933, type: paper, url: "https://doi.org/10.1093/biomet/25.3-4.285"}
  - {title: "Beta distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Beta_distribution"}
diagram: {file: ai/beta-posteriors.svg, caption: "Three arms with the same track record shape but different amounts of evidence: the less you have been tried, the wider you can dream.", alt: "Three overlaid beta density curves, one broad and low, one medium, one tall and narrow, over a horizontal axis from 0 to 1"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Checked against ENGINE.md 6: Beta(1,1) arms, a += r, kappa = 4, gamma = 0.985/day all correct. Added that the Thompson draw is one factor in the score, not the argmax."}
---

# This feed is running a bandit on you right now

Every card you see came out of a slot machine with one arm per topic, one per format, one per angle. For each arm the app keeps two numbers: how much you have liked it, and how much you have not.

To choose, it does *not* take the best average. It draws one random guess from each arm's belief and plays whichever guess came out highest. That is Thompson sampling, and the elegance is that the uncertainty does the exploring by itself. An arm you have touched twice has a wide, vague belief, so now and then it draws high and gets a turn. An arm you have rated forty times has a narrow belief and only wins when it deserves to. There is no exploration knob to tune, because a belief you are unsure about naturally gambles on its own behalf.

Then every day each arm decays a little towards where it started — half-life about 46 days. That is the app's way of letting an obsession cool off without erasing it.

The two numbers, and what they are, next.

## Rigor

Each arm holds a Beta posterior $\mathrm{Beta}(a,b)$ over a "you'll like this" probability, starting at $(1,1)$ — the uniform distribution, total ignorance. After a card with valence $r\in[0,1]$:
$$a \leftarrow a + r, \qquad b \leftarrow b + (1-r)$$
for the topic arm, at half weight for its area and a quarter for its domain. To choose, sample $\theta_i\sim\mathrm{Beta}(a_i,b_i)$ for every arm; the app multiplies that draw by the card's difficulty fit, novelty and rhythm before taking the argmax, so the sample sets the odds rather than the winner.

Beta is conjugate to Bernoulli, which is why the update is *addition* — cheap enough to run in a phone browser between cards. The posterior has mean $\mu = a/(a+b)$ and standard deviation
$$\sigma=\sqrt{\frac{\mu(1-\mu)}{a+b+1}},$$
so uncertainty shrinks like $1/\sqrt{n}$. Wide early, narrow later: exploration that switches itself off at the right rate, with no $\varepsilon$ anywhere.

One more wrinkle, because you have not touched most topics yet. Each topic is shrunk towards its area:
$$\theta_t\sim\mathrm{Beta}\big(a_t+\kappa\mu_{\text{area}},\; b_t+\kappa(1-\mu_{\text{area}})\big),\quad \kappa=4,$$
so an untouched topic inherits your taste for its neighbourhood instead of starting blind.

## Recall
type: mcq
Q: Why does Thompson sampling explore without an explicit exploration parameter?
- [ ] It picks a random arm a fixed fraction of the time — that is $\varepsilon$-greedy, which does need a parameter and ignores how uncertain each arm is.
- [x] It samples from each arm's posterior — arms with little evidence have wide posteriors and sometimes draw a high value.
- [ ] It always plays the arm with the highest posterior mean — that is pure exploitation and would lock onto whatever looked good first.
