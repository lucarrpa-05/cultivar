---
id: ai.rl.bandits.the-doctor-who-must-experiment
topic: ai.rl.bandits
format: series
difficulty: 2
language: en
weight: medium
angles: [paradox, history, practical]
series: {id: ai.rl.trial-and-error, index: 1, total: 4, title: "Learning by trial and error"}
tags: [multi-armed-bandit, clinical-trials, thompson-1933, greedy-failure, regret]
prerequisites: [math.probability.expectation-variance]
hook: "Every patient you give the worse treatment to is a cost. Every patient you give the untested one to is information. You cannot have both."
sources:
  - {title: "Multi-armed bandit", type: wiki, url: "https://en.wikipedia.org/wiki/Multi-armed_bandit"}
  - {title: "On the likelihood that one unknown probability exceeds another in view of the evidence of two samples", author: "William R. Thompson", year: 1933, type: paper, url: "https://doi.org/10.1093/biomet/25.3-4.285"}
  - {title: "Some aspects of the sequential design of experiments", author: "Herbert Robbins", year: 1952, type: paper, url: "https://doi.org/10.1090/S0002-9904-1952-09620-8"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A doctor with two treatments and no way to be fair

You have two treatments and a queue of patients. Treatment A has worked 7 times out of 10. Treatment B you have tried twice, and it worked once. What do you give the next patient?

Give A and you are doing your best by the person in front of you. Give B and you are buying information with somebody's illness. There is no option that is purely ethical, because the patients after this one exist too.

This is the multi-armed bandit, and the name is literal: a row of slot machines, unknown payouts, finite coins. William Thompson wrote the first algorithm for it in *Biometrika* in 1933, motivated by exactly the clinical-trial problem, and the field ignored it for sixty years. Herbert Robbins re-opened the question in 1952.

The trap is subtler than "explore a bit". Always taking the best-so-far can fail permanently: one unlucky first result on the genuinely better treatment and you never try it again, and nothing in your future data will ever correct you. Being greedy is not just suboptimal — it is *uncorrectable*.

## Rigor

Arms $a=1..k$ with unknown means $\mu_a$; at each round $t$ you pull $a_t$ and see a random reward with that mean. Write $\mu^{*}=\max_a\mu_a$ and $\Delta_a=\mu^{*}-\mu_a$. The score is **regret**:
$$R_T=T\mu^{*}-\mathbb{E}\Big[\sum_{t=1}^{T}\mu_{a_t}\Big]=\sum_a\Delta_a\,\mathbb{E}[N_a(T)].$$
Notice the form: regret is the gap times the number of times you pull a bad arm. Good algorithms do not avoid bad arms — they pull them rarely.

Why pure greed fails, in one line. Two Bernoulli arms, $\mu_1=0.6$, $\mu_2=0.5$, one pull each to start. With probability $(1-0.6)\cdot 0.5=0.2$ arm 1 fails and arm 2 succeeds; greedy then plays arm 2 forever and never gathers a single further observation of arm 1. So $\mathbb{E}[N_1(T)]$ stays bounded, $R_T=\Theta(T)$, and the failure has probability at least $0.2$ *whatever* $T$ is. No amount of data fixes it, because greed stopped generating data.

So exploration is not politeness. It is the only thing that keeps the estimates alive.

But notice what this problem assumes. A slot machine has no memory: pull it, get paid, and the machine is exactly as it was. Real decisions change the situation you are in next. That is episode 2.

## Recall
type: mcq
Q: Why does always picking the best-performing arm so far fail badly?
- [ ] It converges too slowly to the best arm — it may never converge at all; the issue is not speed.
- [x] An early unlucky result on the best arm stops it ever being sampled again — and data you never collect cannot correct you.
- [ ] It ignores the reward magnitudes and only counts wins — greedy uses the estimated means; the problem is what it stops observing.
