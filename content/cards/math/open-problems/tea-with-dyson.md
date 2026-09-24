---
id: math.open-problems.riemann-hypothesis.tea-with-dyson
topic: math.open-problems.riemann-hypothesis
topics: [math.number-theory.zeta]
format: story
difficulty: 3
language: en
weight: medium
angles: [human, connection, history]
tags: [montgomery, dyson, pair-correlation, random-matrices, zeta-zeros, hilbert-polya]
hook: "In 1972 a number theorist described a formula about zeta zeros over afternoon tea. The physicist across the table recognised it at once."
related: [math.number-theory.zeta.riemann-turned-primes-into-zeros]
sources:
  - {title: "Montgomery's pair correlation conjecture", type: wiki, url: "https://en.wikipedia.org/wiki/Montgomery%27s_pair_correlation_conjecture"}
  - {title: "Tea Time in Princeton (quotes Montgomery's account of the tea)", author: "Paul Bourgade", type: article, url: "https://math.nyu.edu/~bourgade/papers/TeaTime.pdf"}
  - {title: "Prime Obsession (the 2003 book Bourgade cites for Montgomery's account)", author: "John Derbyshire", year: 2003, type: wiki, url: "https://en.wikipedia.org/wiki/Prime_Obsession"}
  - {title: "Riemann hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_hypothesis"}
dates: {written: 2026-09-23, event: 1972-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Added the verbatim Dyson line and Chowla's introduction from Montgomery's account (Derbyshire 2003, quoted by Bourgade). Difficulty 2 to 3: the rigor is pair correlation and the GUE."}
---

# A number theorist met a physicist at tea, and primes met atomic nuclei

In 1972 Hugh Montgomery had a formula for how the zeros of the Riemann zeta function are spaced: they repel, and two zeros rarely sit close together. At afternoon tea at the Institute for Advanced Study, Sarvadaman Chowla dragged him, reluctant, across the room to meet Freeman Dyson.

Montgomery described his formula. In Montgomery's telling, printed in 2003, Dyson said: "That's the form factor for the pair correlation of eigenvalues of random Hermitian matrices!" Physicists had used such matrices since Eugene Wigner to model energy levels of heavy nuclei.

Nobody knows why primes and random matrices agree. In the 1980s Andrew Odlyzko computed zeros far up the line, and the match held.

## Rigor

Write the nontrivial zeros as $\tfrac12+i\gamma$ with $\gamma\in\mathbb{C}$; RH says every $\gamma$ is real, and we assume it here. Near height $T$ the average gap between consecutive $\gamma$ is $2\pi/\log T$ up to lower order, so measure differences in units of that gap.

**Montgomery's pair correlation conjecture (1973).** For fixed $0<a<b$, as $T\to\infty$,
$$\frac{1}{N(T)}\#\Big\{(\gamma,\gamma'):\ 0<\gamma,\gamma'\le T,\ a\le(\gamma-\gamma')\tfrac{\log T}{2\pi}\le b\Big\}\ \longrightarrow\ \int_a^b\Big(1-\Big(\frac{\sin\pi u}{\pi u}\Big)^2\Big)du,$$
where $N(T)\sim\frac{T}{2\pi}\log T$ counts zeros up to height $T$. Montgomery proved the corresponding statement for test functions whose Fourier transform is supported in $(-1,1)$, assuming RH.

**Why Dyson knew it.** For the Gaussian Unitary Ensemble, $n\times n$ random Hermitian matrices with density proportional to $e^{-\operatorname{tr}H^2}$, the pair correlation of eigenvalues, normalised the same way, tends to exactly $1-(\sin\pi u/\pi u)^2$. Near $u=0$ it behaves like $\pi^2u^2/3$: close pairs are rare. Independent random points would give the constant $1$.

**Hilbert–Pólya.** If the $\gamma$ were the eigenvalues of a self-adjoint operator, they would all be real, which is exactly RH. The tea-time match is widely read as a hint that such an operator exists. Nobody has found it.

## Recall
type: reveal
Q: What did Montgomery's formula say about zeta zeros, and what did Dyson recognise in it?
A: That the zeros repel: close pairs are much rarer than for independent random points. Dyson recognised the pair-correlation law of eigenvalues of large random Hermitian matrices.
