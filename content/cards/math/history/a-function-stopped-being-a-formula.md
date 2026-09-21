---
id: math.history.rigor-19th-century.a-function-stopped-being-a-formula
topic: math.history.rigor-19th-century
topics: [math.analysis.fourier]
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, connection, weird]
tags: [dirichlet, function-concept, fourier-series, indicator-of-rationals]
hook: "Fourier drew curves no single formula described. Dirichlet helped change what a function could be."
sources:
  - {title: "Dirichlet function", type: wiki, url: "https://en.wikipedia.org/wiki/Dirichlet_function"}
  - {title: "History of the function concept", type: wiki, url: "https://en.wikipedia.org/wiki/History_of_the_function_concept"}
  - {title: "Peter Gustav Lejeune Dirichlet", type: wiki, url: "https://en.wikipedia.org/wiki/Peter_Gustav_Lejeune_Dirichlet"}
  - {title: "Function concept", type: encyclopedia, url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Functions/"}
dates: {written: 2026-09-20, event: 1837-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-history-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Corrected the 1829/1837 timeline; Fourier did not prove every curve had a Fourier series; trimmed the body and recall."}
---

# A function stopped being a formula

For Euler, a function was usually an analytic expression: a formula assembled from familiar operations. Then Fourier treated heat with trigonometric series and argued that even irregular curves might have such representations. A hand-drawn curve need not arrive with a formula attached.

Dirichlet's 1829 work gave conditions under which a Fourier series really converges; his 1837 account helped make the modern, broader idea explicit. A function assigns an output to each input, whether or not one expression describes it. The sharpest example now bearing his name gives 1 at every rational number and 0 at every irrational. Every interval contains both kinds, so this perfectly definite function is continuous nowhere.

## Rigor

**Dirichlet's function.** $\mathbf{1}_{\mathbb{Q}}(x)=1$ for $x\in\mathbb{Q}$ and $0$ otherwise.

*Nowhere continuous.* Every interval contains both rationals and irrationals, so on any neighbourhood of any point the function takes both values; the oscillation is 1 everywhere and no $\delta$ works for $\varepsilon<1$.

*Not Riemann integrable on $[0,1]$.* Every upper sum is 1 and every lower sum is 0, so the upper and lower integrals are 1 and 0. It *is* Lebesgue integrable, with integral 0, since $\mathbb{Q}$ is countable and hence null — one of the cleanest arguments for changing the integral.

*It is still a limit of formulas.* Baire's example:
$$\mathbf{1}_{\mathbb{Q}}(x)=\lim_{m\to\infty}\ \lim_{n\to\infty}\ \cos^{2n}(m!\,\pi x),$$
because $m!\,x$ is an integer for large $m$ exactly when $x$ is rational. So Euler's world and Dirichlet's are not disjoint; the monster is a double limit of cosines, which is precisely why single limits had to be separated from iterated ones.

**Dirichlet's convergence theorem (1829).** If $f$ is periodic, piecewise monotone and piecewise continuous with finitely many discontinuities, its Fourier series converges at every point to $\tfrac12\left(f(x^{+})+f(x^{-})\right)$. The first honest answer to Fourier's claim: not *any* function, but far more than a formula.

## Recall
type: reveal
Q: What forced the modern definition of "function"?
A: Fourier series pushed mathematicians to separate a function from any formula representing it. Dirichlet studied when such series converge in 1829 and later described functions as arbitrary assignments of values to inputs.
