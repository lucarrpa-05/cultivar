---
id: math.open-problems.collatz-goldbach.collatz-shrinks-on-average
topic: math.open-problems.collatz-goldbach
format: idea
difficulty: 3
language: en
weight: medium
angles: [open-problem, paradox, numbers]
tags: [collatz, 3x-plus-1, heuristic, random-walk, tao, almost-all]
hook: "Start at 27 and the Collatz sequence climbs to 9232 before falling to 1. On average it should shrink. Average is exactly the problem."
sources:
  - {title: "Collatz conjecture", type: wiki, url: "https://en.wikipedia.org/wiki/Collatz_conjecture"}
  - {title: "Almost all orbits of the Collatz map attain almost bounded values", author: "Terence Tao", year: 2022, type: paper, url: "https://arxiv.org/abs/1909.03562"}
  - {title: "The 3x+1 Problem and its Generalizations", author: "Jeffrey C. Lagarias", year: 1985, type: paper, url: "https://doi.org/10.1080/00029890.1985.11971528"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Collatz shrinks on average. Proving "always" is the whole problem.

Start at 27. Halve it when it is even; triple it and add one when it is odd. It climbs for a long time, peaks at 9232, and reaches 1 after 111 steps. Every starting number checked by computer, all the way up to $2^{71}$, eventually hits 1.

Why everyone believes it: follow only the odd numbers. Each is tripled, then halved at least once, and on average halved twice. So a typical odd step multiplies the size by about $3/4$: the orbit is a random walk that drifts downhill.

The trouble: a proof cannot use "typical" or "on average", and one exceptional start would break the conjecture. Here is the heuristic in numbers, and what is actually proved.

## Rigor

Use $T(n)=n/2$ for even $n$ and $T(n)=(3n+1)/2$ for odd $n$; the $+1$ always produces an even number, so halve at once.

**The heuristic.** Pretend the parities along an orbit are fair coin flips. Then each step multiplies $n$ by roughly $\tfrac32$ or $\tfrac12$, each with probability $\tfrac12$, and
$$\mathbb{E}[\log(\text{factor})]=\tfrac12\log\tfrac32+\tfrac12\log\tfrac12=\tfrac12\log\tfrac34<0 .$$
A random walk in $\log n$ with negative drift heads to $-\infty$: the orbit shrinks. The per-odd-number factor $3/4$ is the same computation seen from the odd terms.

This is not a proof, because the parities along one orbit are deterministic, and nothing forbids them from being arranged by an adversary.

**What is proved.** Terras (1976): the starting values whose orbit eventually drops below where it started have density 1. Tao (arXiv 2019, published 2022): for any function $f(n)\to\infty$, however slowly, almost all $n$ (in logarithmic density) have an orbit that dips below $f(n)$. Tao makes the coin-flip picture rigorous for most starting points, through a random walk on the 3-adic integers. No density statement can rule out a single bad orbit, and one is all a counterexample needs.

## Recall
type: mcq
Q: The Collatz heuristic says an orbit shrinks by about $3/4$ per odd step. Why is that not a proof?
- [x] It describes typical behaviour, and the conjecture is about every orbit — one exceptional orbit would break it, and averages cannot see it.
- [ ] The true average factor is bigger than 1 — no, the average log-drift is genuinely negative.
- [ ] Tao found orbits that escape to infinity — Tao proved that almost all orbits get small; he found no escaping orbit.
