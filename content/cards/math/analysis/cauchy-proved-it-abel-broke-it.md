---
id: math.analysis.uniform-convergence.cauchy-proved-it-abel-broke-it
topic: math.analysis.uniform-convergence
topics: [math.analysis.fourier]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, history]
tags: [cauchy-sum-theorem, abel, uniform-convergence, sawtooth, seidel-stokes]
hook: "Cauchy published the proof in 1821. Abel published the exception in 1826. The repair took another twenty years and invented a new idea."
sources:
  - {title: "Uniform convergence (history)", type: wiki, url: "https://en.wikipedia.org/wiki/Uniform_convergence"}
  - {title: "Cours d'Analyse", author: "Augustin-Louis Cauchy", year: 1821, type: book, url: "https://en.wikipedia.org/wiki/Cours_d%27Analyse"}
  - {title: "Niels Henrik Abel", type: wiki, url: "https://en.wikipedia.org/wiki/Niels_Henrik_Abel"}
dates: {written: 2026-09-19, event: 1826-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Cauchy proved it. Abel found the exception.

In the *Cours d'Analyse* of 1821, Cauchy stated and proved a theorem everyone wanted: if a series of continuous functions converges, its sum is continuous. It is the most natural thing in the world. Continuity is a local property, the partial sums are continuous, and they get close to the sum. What could go wrong?

In 1826 Abel — a fan of Cauchy's new rigour, not an enemy of it — remarked that the theorem "suffers exceptions", and produced one: the sine series

$$\sin x-\tfrac12\sin 2x+\tfrac13\sin 3x-\cdots$$

Every term continuous. It converges at every real $x$. And its sum is a sawtooth: equal to $x/2$ between $-\pi$ and $\pi$, then dropping off a cliff at $\pi$. A convergent series of continuous functions with a discontinuous sum.

Nobody could say which line of the proof was wrong, because the flaw was in a notion nobody had yet separated into two.

## Rigor

The two notions. $f_n\to f$ **pointwise** on $E$ if for each $x$ and each $\varepsilon>0$ there is $N(x,\varepsilon)$ with $|f_n(x)-f(x)|<\varepsilon$ for $n\ge N$. **Uniformly** if $N$ can be chosen independent of $x$, i.e.
$$\sup_{x\in E}|f_n(x)-f(x)|\longrightarrow 0 .$$

Cauchy's argument needs the second and only has the first. The repaired statement: a *uniformly* convergent series of continuous functions has a continuous sum, by the $\varepsilon/3$ argument — bound $|f(x)-f(y)|$ by $|f(x)-f_N(x)|+|f_N(x)-f_N(y)|+|f_N(y)-f(y)|$, where the outer terms need $N$ to work at both $x$ and $y$ at once.

Abel's series converges pointwise but not uniformly near $\pi$: the partial sums keep a bump there of size bounded away from zero. Ludwig Seidel and George Stokes isolated the missing condition in 1847–48; Weierstrass had the clean version and the name, *gleichmäßig konvergent*, in his lectures.

## Recall
type: mcq
Q: Where exactly is the gap in Cauchy's 1821 argument?
- [x] It silently assumes one $N$ works for all $x$ near the point — pointwise convergence only gives an $N$ per point.
- [ ] It assumes the terms are differentiable — continuity of the terms is all the statement uses, and all Abel's example has.
- [ ] It assumes the series converges absolutely — absolute convergence would not help; uniformity is the missing ingredient.
