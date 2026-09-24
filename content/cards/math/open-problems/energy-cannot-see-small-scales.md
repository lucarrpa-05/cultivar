---
id: math.open-problems.navier-stokes.energy-cannot-see-small-scales
topic: math.open-problems.navier-stokes
topics: [math.analysis.ode-dynamics]
format: idea
difficulty: 3
language: en
weight: medium
angles: [open-problem, paradox]
tags: [navier-stokes, scaling, supercritical, energy, blowup, dimension]
hook: "Friction only takes energy away, so a fluid's energy stays bounded forever. In three dimensions that guarantee says almost nothing."
related: [math.open-problems.navier-stokes.leray-called-them-turbulent, math.open-problems.navier-stokes.water-that-builds-a-smaller-copy]
sources:
  - {title: "Finite time blowup for an averaged three-dimensional Navier–Stokes equation", author: "Terence Tao", year: 2016, type: paper, url: "https://arxiv.org/abs/1402.0290"}
  - {title: "Navier–Stokes existence and smoothness", type: wiki, url: "https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_existence_and_smoothness"}
  - {title: "Existence and smoothness of the Navier–Stokes equation (official problem description)", author: "Charles L. Fefferman", year: 2000, type: primary, url: "https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf"}
  - {title: "Finite time blowup for Navier–Stokes", author: "OpenAI", year: 2026, type: paper, url: "https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf"}
  - {title: "Navier–Stokes announcement (11 September 2026)", type: primary, url: "https://www.claymath.org/news/navier-stokes-announcement/"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Rewrote the status line from the primary sources: OpenAI 8 Sept 2026 paper claims Clay (C) and (D) with a smooth force; Clay 11 Sept says 'has apparently been settled' and lists it as Active; no independent check published by mid-Sept. Added both as sources. 2D was not settled only in the 1960s: now 'decades ago'."}
---

# A fluid's energy budget is too weak to stop it focusing

The one thing everyone agrees on about a viscous fluid is that it loses energy: friction only ever takes. So the total kinetic energy stays below what you started with, forever.

Why doesn't that settle whether water can blow up? Picture the fluid squeezing a vortex into a region ten times smaller and spinning it ten times faster. In three dimensions that costs ten times *less* energy, not more. Zoom in far enough and a bounded budget allows arbitrarily violent motion in an arbitrarily small spot, which is exactly where a blowup would live.

In two dimensions the same zoom costs the same energy, which is why the 2D problem was settled decades ago.

## Rigor

**Scaling.** If $u(x,t)$ solves Navier–Stokes on $\mathbb{R}^d$ (with pressure $p$), so does
$$u_\lambda(x,t)=\lambda\,u(\lambda x,\lambda^2t),\qquad p_\lambda(x,t)=\lambda^2p(\lambda x,\lambda^2t).$$
Zooming in is $\lambda\to\infty$; the ten-times-smaller, ten-times-faster vortex is $\lambda=10$.

**Energy under the zoom.**
$$\|u_\lambda(\cdot,t)\|_{L^2}^2=\lambda^2\int|u(\lambda x,\lambda^2t)|^2\,dx=\lambda^{2-d}\,\|u(\cdot,\lambda^2t)\|_{L^2}^2 .$$
In $d=3$ the factor is $\lambda^{-1}$: a zoomed-in solution has tiny energy. A controlled quantity that shrinks under the zoom is called **supercritical**, and bounding it says almost nothing about behaviour at scale $1/\lambda$. In $d=2$ the factor is $\lambda^0$: energy is **critical**, and the energy inequality is then enough for global smooth solutions.

**The barrier is real.** Tao's averaged equation keeps the exact energy identity and still blows up, so any proof of global regularity in 3D must use structure of the nonlinear term beyond energy and harmonic-analysis estimates.

**Status (23 September 2026).** With no external force, the question is open. On 8 September 2026 OpenAI announced a blowup driven by a smooth external force, with a Lean formalization, claiming Clay's alternatives (C) and (D); by mid-September no independent check had been published. On 11 September the Clay Institute said the problem "has apparently been settled", and it lists the problem as "Active".

## Recall
type: mcq
Q: Zoom into a 3D flow by a factor $\lambda$: $\lambda$ times smaller and $\lambda$ times faster. What happens to its energy?
- [x] It is divided by $\lambda$ — so a bounded energy puts almost no constraint on what happens at tiny scales.
- [ ] It is multiplied by $\lambda$ — then energy would forbid concentration; that is the wrong exponent for 3D.
- [ ] It stays the same — that is the 2D case, and it is why 2D could be solved.
