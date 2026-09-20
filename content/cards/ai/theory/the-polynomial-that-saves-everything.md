---
id: ai.theory.vc-dimension.the-polynomial-that-saves-everything
topic: ai.theory.vc-dimension
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, paradox]
tags: [growth-function, sauer-shelah, dichotomy, uniform-convergence, fundamental-theorem]
prerequisites: [ai.theory.vc-dimension, ai.theory.pac-learning]
hook: "Infinitely many functions can behave in at most n^d ways on n points. That collapse is the whole theorem."
related: [ai.theory.vc-dimension.how-many-points-can-you-shatter]
sources:
  - {title: "Sauer–Shelah lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Sauer%E2%80%93Shelah_lemma"}
  - {title: "Vapnik–Chervonenkis theory", type: wiki, url: "https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_theory"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Past the VC dimension, exponential growth turns polynomial

Infinitely many hypotheses, one union bound, and the sample-complexity theorem dies on the spot: $\ln|\mathcal H|=\infty$. The way out starts by noticing that you never actually see infinitely many hypotheses. You see how they *behave on your $n$ points*, and no matter how enormous the class, there are at most $2^{n}$ behaviours.

$2^{n}$ is still hopeless — it cancels the $e^{-2nt^{2}}$ exactly, leaving a bound that says nothing. But now count the behaviours as $n$ grows. Below the VC dimension the count is exactly $2^{n}$, doubling every time as it should. At the VC dimension it stops doubling, and from there it grows like a *polynomial* of degree $d$. There is no middle case: either the class shatters forever, or it collapses to $n^{d}$.

A polynomial against $e^{-2nt^{2}}$ still goes to zero. That dichotomy is why learning from finite samples is possible at all, and the rest of statistical learning theory hangs from it.

## Rigor

The **growth function** is $\Pi_{\mathcal H}(n)=\max_{|C|=n}|\mathcal H_C|$: the most behaviours $\mathcal H$ can realise on any $n$ points.

**Sauer–Shelah.** If $\mathrm{VC}(\mathcal H)=d$ then for every $n$,

$$\Pi_{\mathcal H}(n)\ \le\ \sum_{i=0}^{d}\binom{n}{i}\ \le\ \Big(\frac{en}{d}\Big)^{d}\qquad (n\ge d).$$

So the count is exactly $2^{n}$ while $n\le d$ and at most $O(n^{d})$ afterwards, with nothing in between. The proof is a shifting argument: repeatedly push the set system downward and show $|\mathcal H_C|$ is bounded by the number of subsets of $C$ that $\mathcal H$ shatters.

Feeding that into a union bound over *behaviours* rather than hypotheses — with a symmetrisation step that compares your sample against a ghost sample — gives the VC bound: with probability $1-\delta$, for all $h\in\mathcal H$,

$$R(h)\ \le\ \hat R_S(h)+O\!\left(\sqrt{\frac{d\log(n/d)+\log(1/\delta)}{n}}\right),$$

the PAC bound again with $\ln|\mathcal H|$ replaced by $d\log n$. The converse matters just as much: a class of infinite VC dimension is *not* PAC learnable, because an adversary can always relabel a fresh sample in a way your class fits and that means nothing. That is the fundamental theorem of statistical learning — and it is precisely the wall a deep network walks into when it fits random labels.

## Recall
type: reveal
Q: Why does counting *behaviours on n points* rescue an infinite hypothesis class?
A: Sauer–Shelah: once $n$ passes the VC dimension $d$, the number of realisable labelings stops doubling and grows only like $(en/d)^{d}$. A polynomial multiplied by $e^{-2nt^{2}}$ still tends to zero, so the union bound survives — which a factor of $2^{n}$ would not.
