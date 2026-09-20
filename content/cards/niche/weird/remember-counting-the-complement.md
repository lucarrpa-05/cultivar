---
id: niche.weird.coincidences.remember-counting-the-complement
topic: niche.weird.coincidences
format: callback
difficulty: 2
language: en
weight: medium
angles: [paradox, connection]
tags: [birthday-problem, pairs, complement, coincidence, hash-collision]
hook: "Twenty-three people in a room, and the odds of a shared birthday are better than even. Count pairs, not people."
callback: {from: math.probability.basics, to: niche.weird.coincidences}
prerequisites: [math.probability.basics]
sources:
  - {title: "Birthday problem", type: wiki, url: "https://en.wikipedia.org/wiki/Birthday_problem"}
  - {title: "Birthday attack", type: wiki, url: "https://en.wikipedia.org/wiki/Birthday_attack"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Absorbed the 253-people / 253-pairs coincidence from a rejected near-duplicate fact card."}
---

# Remember counting the complement? It explains why coincidences are boring.

The first real trick you learn in probability is to compute what you want by computing its opposite: *at least one* is impossible to count directly, *none* is easy. The birthday problem is that trick's greatest hit, and it is also a general theory of coincidence.

Ask 23 strangers their birthdays and the chance two of them match is 50.7%. People find this absurd, and the reason they find it absurd is that they are silently asking a different question — *does anyone share mine?* — which involves 22 comparisons. The actual question involves every pair: $\binom{23}{2}=253$ of them.

That is the whole lesson, and it generalises well past birthdays. A "miracle" is almost always an *at-least-one* event that your intuition has priced as a *this-specific-one* event. In a country of 50 million, things with a one-in-a-million chance happen to fifty people every time the clock ticks.

The arithmetic is short enough to do completely.

## Rigor

With $n$ people and $d=365$ equally likely birthdays, compute the complement:

$$\bar{p}(n)=\prod_{k=1}^{n-1}\left(1-\frac{k}{d}\right),\qquad p(n)=1-\bar{p}(n).$$

Take logs and use $\ln(1-x)\approx -x$:

$$\ln\bar{p}(n)\approx-\frac{1}{d}\sum_{k=1}^{n-1}k=-\frac{n(n-1)}{2d},$$

so $p(n)\approx 1-e^{-n(n-1)/730}$. The exponent is quadratic in $n$, which is the entire surprise: doubling the room quadruples the collisions.

$p(23)=0.507$, $p(57)\approx 0.99$, $p(70)\approx 0.999$. Ask instead *does anyone share mine?* and you need 253 people for even odds — the same 253 as the pair count above, for no reason whatsoever.

Setting $p=1/2$ gives $n\approx 1.177\sqrt{d}$, and that square root is why cryptographers care: a hash with $N$ output bits has $d=2^{N}$ values, so collisions appear after about $2^{N/2}$ hashes, not $2^{N}$. A 128-bit hash gives 64 bits of collision resistance. The birthday attack is this card, with $d$ made enormous.

## Recall
type: mcq
Q: Why do people underestimate the chance of a shared birthday in a room of 23?
- [ ] They forget about leap years — 29 February changes the answer by a negligible amount.
- [x] They picture comparisons with themselves (22 of them) instead of all pairs (253) — the number of pairs grows quadratically, and that is where the probability comes from.
- [ ] They assume birthdays are uniformly distributed — real birthdays are slightly clumped, which makes matches *more* likely, not less.
