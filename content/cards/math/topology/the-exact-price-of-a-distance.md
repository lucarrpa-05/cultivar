---
id: math.topology.metrization.the-exact-price-of-a-distance
topic: math.topology.metrization
format: idea
difficulty: 5
language: en
weight: heavy
angles: [history, beautiful]
tags: [nagata-smirnov, bing-metrization, locally-finite, paracompactness]
hook: "Three mathematicians on three continents settled the exact condition for a topology to come from a distance, inside two years."
sources:
  - {title: "Nagata–Smirnov metrization theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Nagata%E2%80%93Smirnov_metrization_theorem"}
  - {title: "Bing metrization theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Bing_metrization_theorem"}
  - {title: "Topology, 2nd ed., §40–41", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Hook said eighteen months; Nagata 1950, Smirnov 1951 and Bing 1951 are only pinned to the year, so it now says inside two years."}
---

# The exact price of a distance function

Urysohn's theorem only points one way. Regular plus second countable gives you a metric, but plenty of metric spaces have no countable basis — take any uncountable set with the discrete metric. So the condition is sufficient and badly not necessary, and for twenty-five years nobody knew the right one.

Then it arrived three times. Jun-iti Nagata published in Osaka in 1950. Yuri Smirnov published in Moscow in 1951. R. H. Bing, in Wisconsin, published his own version in 1951 with a slightly different condition that turns out to be equivalent. None of them was reading the others.

The answer replaces "countable basis" with something stranger: a basis you can slice into countably many layers, each of which is locally finite — around every point, only finitely many sets from that layer show up. Countability is not abandoned; it is moved one level up, from the sets to the layers.

That is the exact price of a distance function, and the reason it is the right price is a theorem about metric spaces you may not have met.

## Rigor

A family $\mathcal{A}$ is **locally finite** if every point has a neighbourhood meeting only finitely many members; $\sigma$-locally finite means $\mathcal{A}=\bigcup_{n}\mathcal{A}_n$ with each $\mathcal{A}_n$ locally finite.

**Nagata–Smirnov.** $X$ is metrizable iff $X$ is regular and has a $\sigma$-locally finite basis. **Bing.** Iff $X$ is regular and has a $\sigma$-discrete basis.

*Necessity* is where metric spaces reveal themselves: by A. H. Stone's theorem (1948) every metric space is paracompact, so for each $n$ the cover by balls of radius $1/n$ has a locally finite open refinement $\mathcal{A}_n$. Then $\bigcup_n \mathcal{A}_n$ is a $\sigma$-locally finite basis.

*Sufficiency* runs the Urysohn strategy without the countability: regular + $\sigma$-locally finite basis implies normal, then one builds countably many continuous functions from each layer and embeds $X$ into $\mathbb{R}^{J}$ with the uniform metric rather than into the Hilbert cube.

The local finiteness is what makes infinite sums of bump functions well defined at every point — the same reason partitions of unity need it.

## Recall
type: mcq
Q: Why is "second countable" the wrong condition for a full characterisation of metrizability?
- [x] It is not necessary — an uncountable discrete metric space has a metric but no countable basis, so the condition must be loosened.
- [ ] It is not sufficient — with regularity it is perfectly sufficient; that is exactly Urysohn's metrization theorem.
- [ ] It implies compactness — it does not; $\mathbb{R}$ is second countable and famously non-compact.
