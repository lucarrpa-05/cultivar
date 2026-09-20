---
id: math.probability.random-variables.death-by-horse-kick
topic: math.probability.random-variables
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, tool, history]
tags: [poisson, rare-events, bortkiewicz, law-of-small-numbers]
hook: "Prussian cavalry deaths by horse kick, 1875–1894. The most famous dataset in statistics is 196 unlucky soldiers."
sources:
  - {title: "Ladislaus Bortkiewicz", type: wiki, url: "https://en.wikipedia.org/wiki/Ladislaus_Bortkiewicz"}
  - {title: "Poisson distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Poisson_distribution"}
dates: {written: 2026-09-19, event: 1898-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Death by horse kick, and the shape of rare things

In 1898 Ladislaus Bortkiewicz published a book with a title that sounds like a joke, *The Law of Small Numbers*, built on the least promising data imaginable: how many Prussian soldiers were killed by horse kicks, corps by corps, year by year, across two decades.

Fourteen cavalry corps, twenty years, 280 corps-years, 196 deaths. Most corps-years had none. Some had one. A few had four.

The counts land almost exactly on a curve with a single knob — the average, 0.7 — and no other input. That is the point of the example. When something has many chances to happen and almost never does, the number of times it happens has a *shape*, and the shape is fixed by the mean alone.

This is why the Poisson distribution turns up everywhere rare things are counted: goals in a football match, mutations per genome, requests hitting a server, particles from a decaying sample. The horses were just the cleanest data anyone had.

## Rigor

**Poisson law.** $X\sim\mathrm{Pois}(\lambda)$ when $P(X=k)=e^{-\lambda}\lambda^{k}/k!$, with $\mathbb{E}X=\mathrm{Var}(X)=\lambda$. Mean equals variance is the fingerprint: if your count data has variance much larger than its mean, it is not Poisson and you are missing a source of clustering.

**Where it comes from.** Take $n$ independent trials with success probability $p=\lambda/n$. Then
$$\binom{n}{k}p^{k}(1-p)^{n-k}=\frac{n(n-1)\cdots(n-k+1)}{n^{k}}\cdot\frac{\lambda^{k}}{k!}\left(1-\frac{\lambda}{n}\right)^{n-k}\xrightarrow[n\to\infty]{}\frac{\lambda^{k}}{k!}e^{-\lambda}.$$
Many chances, each tiny, product fixed: Poisson. The soldier-days are the trials.

**The fit.** With $\lambda=196/280=0.7$, over 280 corps-years:

| deaths | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| observed | 144 | 91 | 32 | 11 | 2 |
| Poisson | 139.0 | 97.3 | 34.1 | 8.0 | 1.4 |

One parameter, estimated from the data, and no further tuning.

**Careful.** Independence is a real assumption. A horse in a bad mood kicks twice; a contagious disease is not Poisson at all. The fit above is evidence that Prussian horses behaved independently, which is itself a finding.

## Recall
type: mcq
Q: You count events and find the variance is four times the mean. What does that tell you?
- [x] The events are not independent — Poisson forces variance equal to mean, so clustering or a varying rate is at work.
- [ ] The mean was estimated badly — overdispersion is a property of the data, not an artefact of estimating $\lambda$.
- [ ] The data is Poisson with $\lambda$ four times larger — a larger $\lambda$ raises mean and variance together; the ratio stays 1.
- [ ] Nothing, since variance and mean are unrelated — for a Poisson variable they are equal, which is exactly what makes the check useful.
