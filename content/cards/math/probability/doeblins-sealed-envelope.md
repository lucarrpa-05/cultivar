---
id: math.probability.markov-chains.doeblins-sealed-envelope
topic: math.probability.markov-chains
format: story
difficulty: 4
language: en
weight: heavy
angles: [human, history, tool]
tags: [doeblin, coupling, convergence-theorem, pli-cachete, doeblin-condition]
hook: "In 1940 a French soldier mailed a sealed envelope to the Academy of Sciences. It stayed shut for sixty years."
related: [math.probability.markov-chains.where-a-chain-forgets-where-it-started]
sources:
  - {title: "Wolfgang Doeblin", type: wiki, url: "https://en.wikipedia.org/wiki/Wolfgang_Doeblin"}
  - {title: "W. Doeblin, 1915–1940", author: "Torgny Lindvall", year: 1991, type: paper, url: "https://doi.org/10.1214/aop/1176990329"}
  - {title: "Coupling (probability)", type: wiki, url: "https://en.wikipedia.org/wiki/Coupling_(probability)"}
dates: {written: 2026-09-23, event: 1940-02-26}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# He proved that chains forget, then sealed his last ideas in an envelope

In February 1940 a French army telephone operator mailed a sealed envelope to the Paris Academy of Sciences. That June, cut off near Housseras with German troops approaching, Wolfgang Doeblin burned his notes and shot himself. He was 25, the son of the novelist Alfred Döblin. Opened in 2000, the envelope held ideas Kiyoshi Itô would later reach on his own.

Two years earlier Doeblin had found the cleanest proof that a Markov chain forgets where it started. Run two copies: yours, and one already in equilibrium. Let them wander independently until they meet, then glue them together. After that nothing tells them apart, so yours is in equilibrium too.

The whole convergence theorem is one inequality about that meeting.

## Rigor

Let $P$ be irreducible and aperiodic on a finite set $S$, with stationary $\pi$. Run $X_t$ from $x$ and $Y_t$ from $\pi$ independently until $T=\min\{t:X_t=Y_t\}$, then move them together. Each is still the chain on its own, and $Y_t\sim\pi$ for every $t$.

**Coupling inequality.** For any $A\subseteq S$,
$$P(X_t\in A)-\pi(A)=P(X_t\in A)-P(Y_t\in A)\le P(X_t\ne Y_t)=P(T>t),$$
so $\|P^t(x,\cdot)-\pi\|_{TV}\le P(T>t)$. The glue is the proof: the two can only differ if they have not met.

**They meet, fast.** Irreducible and aperiodic on a finite set gives $N$ with $P^N(u,v)>0$ for all $u,v$; let $\delta=\min_{u,v}P^N(u,v)$. From any pair of states,
$$P(X_N=Y_N)\ \ge\ \sum_vP^N(u,v)\,P^N(w,v)\ \ge\ \delta,$$
so $P(T>kN)\le(1-\delta)^k$. Geometric convergence, and no eigenvalue appears anywhere.

A uniform lower bound of this kind, $P^N(x,\cdot)\ge\delta\,\nu(\cdot)$ for every starting $x$, is **Doeblin's condition**. It is the version that survives on infinite state spaces, where the Perron–Frobenius argument has nothing to hold on to.

## Recall
type: reveal
Q: In the coupling proof, why is the distance to equilibrium at time $t$ at most the chance that the copies have not yet met?
A: Once they meet they move together, so $X_t$ and $Y_t$ can land in different places only if the meeting has not happened. And $Y_t$ is exactly in equilibrium the whole time.
