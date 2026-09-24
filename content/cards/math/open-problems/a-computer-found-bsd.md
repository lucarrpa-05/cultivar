---
id: math.open-problems.millennium.a-computer-found-bsd
topic: math.open-problems.millennium
topics: [math.number-theory.elliptic-curves]
format: fact
difficulty: 3
language: en
weight: light
angles: [origin, prediction, numbers]
tags: [birch-swinnerton-dyer, edsac, elliptic-curves, rank, experimental-mathematics]
hook: "One of the seven million-dollar problems was first seen in printouts from a Cambridge computer in the early 1960s."
related: [math.open-problems.millennium.seven-problems-in-paris]
sources:
  - {title: "Birch and Swinnerton-Dyer conjecture", type: wiki, url: "https://en.wikipedia.org/wiki/Birch_and_Swinnerton-Dyer_conjecture"}
  - {title: "Notes on elliptic curves. II", author: "B. J. Birch and H. P. F. Swinnerton-Dyer", year: 1965, type: paper, url: "https://doi.org/10.1515/crll.1965.218.79"}
dates: {written: 2026-09-23, event: 1965-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Title said a computer found the conjecture; Birch and Swinnerton-Dyer found it in EDSAC-2 output. Retitled. Difficulty 2 to 3: the rigor is the L-function and Hasse bound."}
---

# A million-dollar conjecture first showed up in computer printouts

In the early 1960s Peter Swinnerton-Dyer ran Cambridge's EDSAC-2 computer on elliptic curves, the equations $y^2=x^3+ax+b$. For many primes $p$ it counted the solutions modulo $p$. With Bryan Birch he noticed that curves with more independent rational solutions ran slightly high, and that a running product of those counts grew like a power of $\log$, the power being the number of independent solutions. They published the conjecture in 1965. It is now a Millennium problem.

## Rigor

Let $E:y^2=x^3+ax+b$ with $a,b\in\mathbb{Z}$, and for primes $p$ of good reduction let $N_p$ count the points of $E$ over $\mathbb{F}_p$, including the point at infinity. By Mordell's theorem the rational points form a finitely generated abelian group, $E(\mathbb{Q})\cong\mathbb{Z}^r\oplus T$ with $T$ finite; $r$ is the **rank**.

**The EDSAC observation.**
$$\prod_{p\le X}\frac{N_p}{p}\ \approx\ C\,(\log X)^r\qquad(X\to\infty).$$
Each factor is close to 1, since Hasse's bound gives $|N_p-(p+1)|\le2\sqrt p$; the rank lives in the accumulated bias.

**The conjecture as stated today.** With $a_p=p+1-N_p$, the $L$-function $L(E,s)=\prod_p\big(1-a_pp^{-s}+p^{1-2s}\big)^{-1}$ (good primes shown) extends to all of $\mathbb{C}$ by the modularity theorem, and BSD says
$$\operatorname{ord}_{s=1}L(E,s)=r .$$
At $s=1$ each local factor is $\big(1-a_p/p+1/p\big)^{-1}=p/N_p$, so formally $L(E,1)$ is the reciprocal of the EDSAC product, read exactly where the product stops converging. Known: if the order of vanishing is 0 or 1, the rank equals it (Gross–Zagier, Kolyvagin).
