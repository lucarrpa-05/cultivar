---
id: ai.alignment.problem.you-cannot-write-down-what-you-want
topic: ai.alignment.problem
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, connection, practical]
tags: [alignment-problem, proxy-objective, optimizers-curse, outer-inner, specification]
hook: "The worry is not that a machine will disobey you. It is that it will obey, exactly, the thing you managed to write down."
sources:
  - {title: "Concrete Problems in AI Safety", author: "Amodei, Olah, Steinhardt, Christiano, Schulman & Mané", year: 2016, type: paper, url: "https://arxiv.org/abs/1606.06565"}
  - {title: "The Optimizer's Curse: Skepticism and Postdecision Surprise in Decision Analysis", author: "James E. Smith & Robert L. Winkler", year: 2006, type: paper, url: "https://doi.org/10.1287/mnsc.1050.0451"}
  - {title: "AI alignment", type: wiki, url: "https://en.wikipedia.org/wiki/AI_alignment"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You cannot write down what you want

State the alignment problem properly and it stops sounding like science fiction, which is a loss for the trailers and a gain for everyone else.

There is something you want. You cannot write it down — try turning "be helpful" or "drive well" into something a computer can score, and you get either a vague sentence or a checklist with holes. So you write a proxy: something measurable that tracks what you want across every case you have thought of.

Then you optimise against the proxy, hard.

Here is the trap, and it is statistical rather than psychological. Optimisation does not sample typical points. It hunts extremes, and the extremes of your proxy are exactly where proxy and reality have come apart — that is *what it means* for them to have come apart. So the harder you push, the more of your measured success is made of error.

Two versions get separate names. Maybe the objective you wrote is wrong. Or maybe the system learned some *other* goal that happened to score well in training. The second is worse, because nothing in the score reveals it.

## Rigor

Model the proxy as $\hat U = U + \varepsilon$ with independent $\varepsilon\sim\mathcal{N}(0,\sigma^2)$ and $U\sim\mathcal{N}(\mu,\sigma_U^2)$, over $n$ candidate options. Select $x^\star=\arg\max_x \hat U(x)$.

Conditioning shrinks the estimate towards the prior:
$$\mathbb{E}\big[U\mid \hat U=v\big]=\mu+\frac{\sigma_U^{2}}{\sigma_U^{2}+\sigma^{2}}\,(v-\mu),$$
so the value you actually get is always less than the score you measured. That is the **optimizer's curse** (Smith and Winkler, 2006).

Now add optimisation pressure. The maximum of $n$ draws sits about $\sqrt{2\ln n}$ standard deviations up: $\mathbb{E}[\hat U(x^\star)]\approx \mu+\sqrt{(\sigma_U^{2}+\sigma^{2})\,2\ln n}$. Combining the two,
$$\mathbb{E}\big[\hat U(x^\star)-U(x^\star)\big]\;\approx\;\frac{\sigma^{2}}{\sqrt{\sigma_U^{2}+\sigma^{2}}}\,\sqrt{2\ln n}.$$

Read the sign and the variables. The shortfall grows without bound in $n$ — the amount of searching — for *any* fixed proxy error $\sigma>0$. "Just optimise harder" is not a fix for a bad proxy. It is the mechanism.

## Recall
type: mcq
Q: Why does more optimisation make a proxy objective worse rather than better?
- [ ] Because more optimisation overfits the training data — overfitting is one instance; this happens even with a perfectly estimated proxy over new options.
- [x] Because search concentrates on extremes of the proxy — and the extremes are exactly where proxy and true objective disagree most.
- [ ] Because optimisers introduce their own noise into the objective — the noise is in the proxy's relationship to what you want, not in the optimiser.
