---
id: math.open-problems.navier-stokes.water-that-builds-a-smaller-copy
topic: math.open-problems.navier-stokes
format: story
difficulty: 3
language: en
weight: medium
angles: [human, prediction, open-problem]
tags: [tao, averaged-navier-stokes, blowup, self-replication, energy-cascade]
hook: "In 2014 Terence Tao built an equation in which a fluid makes a smaller, faster copy of itself, again and again, until it breaks."
related: [math.open-problems.navier-stokes.energy-cannot-see-small-scales]
sources:
  - {title: "Finite time blowup for an averaged three-dimensional Navier–Stokes equation", author: "Terence Tao", year: 2016, type: paper, url: "https://arxiv.org/abs/1402.0290"}
  - {title: "Finite time blowup for an averaged three-dimensional Navier–Stokes equation (blog post)", author: "Terence Tao", year: 2014, type: blog, url: "https://terrytao.wordpress.com/2014/02/04/finite-time-blowup-for-an-averaged-three-dimensional-navier-stokes-equation/"}
  - {title: "Navier–Stokes announcement (11 September 2026)", type: primary, url: "https://www.claymath.org/news/navier-stokes-announcement/"}
  - {title: "Finite time blowup for Navier–Stokes", author: "OpenAI", year: 2026, type: paper, url: "https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf"}
  - {title: "AI Has Solved One of Math's $1 Million Millennium Prize Problems (8 September 2026; reports the priority dispute)", author: "Quanta Magazine", year: 2026, type: article, url: "https://www.quantamagazine.org/ai-has-solved-one-of-maths-1-million-millennium-prize-problems-20260908/"}
dates: {written: 2026-09-23, event: 2014-02-04}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Tao compared his mechanism to a von Neumann machine and floated fluid logic gates; he did not say real fluids 'might compute one': now quoted. Clay quote made verbatim ('has apparently been settled', 11 Sept), dispute and pending checks stated, Wikipedia controversy page replaced by the OpenAI paper and Quanta. Moved 'What would count' to the top of the rigor for the handoff; trimmed to 120 words."}
---

# Tao imagined water that builds a smaller, faster copy of itself

In February 2014 Terence Tao swapped the nonlinear term in Navier–Stokes for an averaged version obeying the same energy law, and proved the new equation blows up in finite time.

The mechanism: a flow that, after a delay, hands its energy to a smaller copy of itself, which does the same, faster, forever, all before a fixed moment. Tao called it a von Neumann machine and floated a "real (but remote)" route to the true equations: build logic gates out of ideal fluid.

On 8 September 2026 OpenAI announced a blowup for the real equations, driven by a smooth outside force. Priority is disputed and independent checks are pending; Clay says the problem "has apparently been settled".

## Rigor

**What would count.** Clay's statements (A) and (B) ask for global smooth solutions with no force, on $\mathbb{R}^3$ or on a periodic box; (C) and (D) ask for a breakdown for some smooth data and some smooth force. OpenAI's paper claims (C) and (D), starting from a fluid at rest. Whether water blows up with no force at all is still open.

**The averaged equation.** Write Navier–Stokes as $\partial_tu=\Delta u+B(u,u)$, with $B$ the Leray-projected nonlinear term. Tao replaces $B$ by an average $\tilde B$ of rotated, dilated and Fourier-multiplied versions of $B$, chosen so that $\langle\tilde B(u,u),u\rangle=0$. The energy identity survives exactly.

**Blowup by cascade.** He then engineers $\tilde B$ so that energy concentrated at one frequency scale is transferred, after a delay, almost entirely to the next finer scale. The delay at each scale shrinks geometrically, so infinitely many transfers fit before a finite time $T_*$, and the solution stops being smooth there. That is the smaller, faster copy, made precise.

**The moral, stated in the paper.** Any proof of global regularity in 3D must use finer structure of $B(u,u)$ than the energy identity and harmonic-analysis estimates, since $\tilde B$ shares all of those and blows up.

## Recall
type: reveal
Q: What did Tao's averaged equation prove about possible proofs that Navier–Stokes never blows up?
A: That energy conservation plus the standard harmonic-analysis estimates cannot be enough: his modified equation satisfies all of them and still blows up. A proof has to use finer structure of the real nonlinear term.
