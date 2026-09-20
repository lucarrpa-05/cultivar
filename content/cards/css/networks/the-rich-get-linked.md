---
id: css.networks.scale-free.the-rich-get-linked
topic: css.networks.scale-free
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers, beautiful]
tags: [preferential-attachment, barabasi-albert, hubs, growth, power-law]
hook: "Random graphs have no hubs. Real ones are full of them, and one extra ingredient explains why."
sources:
  - {title: "Emergence of Scaling in Random Networks", author: "Albert-László Barabási and Réka Albert", year: 1999, type: paper, url: "https://doi.org/10.1126/science.286.5439.509"}
  - {title: "Barabási–Albert model", type: wiki, url: "https://en.wikipedia.org/wiki/Barab%C3%A1si%E2%80%93Albert_model"}
  - {title: "Preferential attachment", type: wiki, url: "https://en.wikipedia.org/wiki/Preferential_attachment"}
dates: {written: 2026-09-19, event: 1999-10-15}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Two ingredients, and hubs appear out of nowhere

An Erdős–Rényi graph has a Poisson degree distribution, which means it has a scale: almost everybody sits near the average, and someone with a thousand times the average number of links is effectively impossible. The web is not like that. Neither are citations, airports, or who gets followed.

Barabási and Albert pointed at two things the random model leaves out, both embarrassingly obvious once said. Real networks **grow** — nodes arrive over time rather than existing all at once. And new arrivals **do not choose uniformly**: a new page links to pages it has heard of, and it has heard of the ones everybody links to.

Put those together and you get the rich getting richer, with a precise exponent. The nodes that arrived early accumulate links, which makes them more likely to accumulate more. No node is special; being early is.

The model is simple enough to solve on a page, which is exactly what made it so influential — and, later, so over-applied.

## Rigor

Start with a small seed graph. At each step add one node with $m$ edges, attaching to existing node $i$ with probability proportional to its current degree:
$$\Pi(k_i)=\frac{k_i}{\sum_j k_j}.$$

Treat $k_i$ as continuous. After $t$ steps there are $t$ nodes and $mt$ edges, so $\sum_j k_j = 2mt$ and
$$\frac{\partial k_i}{\partial t}=m\,\frac{k_i}{2mt}=\frac{k_i}{2t}
\quad\Longrightarrow\quad
k_i(t)=m\left(\frac{t}{t_i}\right)^{1/2},$$
where $t_i$ is when node $i$ arrived. Degree grows like the square root of age, which is the "first-mover advantage" made quantitative.

For the distribution: $P(k_i(t)<k)=P\big(t_i> m^2t/k^2\big)=1-\frac{m^2}{k^2}$ for uniformly arriving nodes, and differentiating gives
$$P(k)\propto k^{-3}.$$

Exponent three, independent of $m$. Two consequences worth carrying: with $\gamma=3$ the variance diverges as $n$ grows, so "average degree" stops being a useful summary; and both growth *and* preferential attachment are needed — growth with uniform attachment gives an exponential tail, preferential attachment without growth saturates.

## Recall
type: mcq
Q: In the Barabási–Albert model, what determines how many links a node ends up with?
- [x] When it arrived — degree grows as the square root of a node's age, so early arrival is the entire advantage.
- [ ] Its intrinsic quality or fitness — the base model gives every node identical rules; fitness is a later extension.
- [ ] The number of edges $m$ each new node brings — $m$ scales degrees but drops out of the exponent, which is 3 regardless.
