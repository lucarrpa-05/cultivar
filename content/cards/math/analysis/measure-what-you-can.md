---
id: math.analysis.measure-lebesgue.measure-what-you-can
topic: math.analysis.measure-lebesgue
format: series
difficulty: 3
language: en
weight: medium
angles: [beautiful, tool]
tags: [lebesgue-integral, measure, level-sets, simple-functions, coins]
hook: "Lebesgue's fix was not a better limit theorem. It was cutting the picture the other way."
series: {id: math.analysis.riemann-to-lebesgue, index: 2, total: 4, title: "From Riemann to Lebesgue"}
sources:
  - {title: "Lebesgue integration (with Lebesgue's own coin analogy)", type: wiki, url: "https://en.wikipedia.org/wiki/Lebesgue_integration"}
  - {title: "Henri Lebesgue", type: wiki, url: "https://en.wikipedia.org/wiki/Henri_Lebesgue"}
  - {title: "Measure (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Measure_(mathematics)"}
dates: {written: 2026-09-19, event: 1902-01-01}
diagram: {file: math/riemann-vs-lebesgue-slicing.svg, caption: "The same function, cut into columns over the domain and into bands across the range.", alt: "Left: a curve with vertical rectangles under it. Right: the same curve with horizontal bands, and below the axis the set of points landing in each band, drawn as disconnected segments."}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Measure what you can, then integrate

Lebesgue explained it with money. Riemann pays a debt by taking coins out of his pocket in whatever order they come and adding as he goes. Lebesgue empties the pocket first, sorts the coins into piles by denomination, counts each pile, and multiplies.

Same total, different order of operations — and the second one does not care how the coins came out.

That is the whole idea. Riemann cuts the *domain* into thin columns and needs the function to be roughly constant on each one, which is why wild functions defeat him. Lebesgue cuts the *range* into thin bands, and for each band asks a different question: how big is the set of points where the function lands in this band? Multiply the height of the band by the size of that set, add up.

The set can be as shredded as it likes. It can be the rationals. It only has to have a size.

Which is exactly the catch, and it is a real one. "How big is that set?" turns out not to have an answer for every set.

## Rigor

For $f\ge 0$ measurable, define the integral through simple functions $\varphi=\sum_{k}c_k\mathbf{1}_{A_k}$ with $\mu(A_k)$ defined:
$$\int \varphi\,d\mu=\sum_k c_k\,\mu(A_k),\qquad \int f\,d\mu=\sup\left\{\int\varphi\,d\mu\ :\ 0\le\varphi\le f,\ \varphi\ \text{simple}\right\}.$$

Equivalently, band by band: $\int f\,d\mu=\lim_{n}\sum_{k}\frac{k}{2^{n}}\,\mu\!\left(\left\{x:\tfrac{k}{2^{n}}\le f(x)<\tfrac{k+1}{2^{n}}\right\}\right)$ — the piles of coins.

Return to the villain of episode 1. $\mathbf{1}_{\mathbb{Q}}$ is already simple: it takes two values, $1$ on $\mathbb{Q}\cap[0,1]$ and $0$ elsewhere. $\mathbb{Q}$ is countable and each point has measure $0$, so $\mu(\mathbb{Q}\cap[0,1])=0$ and
$$\int_0^1\mathbf{1}_{\mathbb{Q}}\,d\mu=1\cdot 0+0\cdot 1=0 .$$
No partition refinement, no upper and lower sums that refuse to meet. One line.

Everything now rests on $\mu$ — on being able to assign a size to the sets the bands hand you.

## Recall
type: mcq
Q: What is the actual structural difference between the Riemann and Lebesgue integrals?
- [x] Riemann partitions the domain, Lebesgue partitions the range — one needs the function flat on each column, the other needs each preimage to have a measure.
- [ ] Lebesgue uses finer partitions — refinement is not the issue; no refinement makes the indicator of the rationals Riemann integrable.
- [ ] Lebesgue integrates only continuous functions — the opposite: its whole point is handling functions with no continuity at all.
