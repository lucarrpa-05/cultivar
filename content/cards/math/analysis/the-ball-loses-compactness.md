---
id: math.analysis.hilbert-functional.the-ball-loses-compactness
topic: math.analysis.hilbert-functional
topics: [math.optimization.calculus-of-variations]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, tool]
tags: [riesz-lemma, banach-alaoglu, weak-convergence, compactness, direct-method]
hook: "In infinite dimensions, bounded sequences can refuse to have convergent subsequences. The repair is to change what convergence means."
sources:
  - {title: "Riesz's lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Riesz%27s_lemma"}
  - {title: "Banach-Alaoglu theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Banach%E2%80%93Alaoglu_theorem"}
  - {title: "Weak topology", type: wiki, url: "https://en.wikipedia.org/wiki/Weak_topology"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 5 to 4: Banach-Alaoglu sits exactly where the calibration table puts Tychonoff."}
---

# The unit ball loses compactness, then buys it back

Every existence proof you trust runs on the same engine: a bounded sequence has a convergent subsequence, so grab the limit and call it the answer. In $\mathbb{R}^{n}$ that engine is Bolzano-Weierstrass, and it is free.

In infinite dimensions the engine seizes. Take an orthonormal sequence in a Hilbert space. Every element has length one, so the sequence is as bounded as it gets, and any two of them are at distance $\sqrt2$. No subsequence is even Cauchy. Frigyes Riesz proved in 1918 that this is not bad luck: the closed unit ball of a normed space is compact if and only if the space is finite-dimensional.

The fix is not to find better sequences. It is to lower the standard for "converging". Stop demanding that the vectors get close, and demand only that every linear measurement of them converges. Under that weaker standard the ball is compact again.

The bill comes due in one place, and knowing where it comes due is the whole skill.

## Rigor

**Weak convergence.** $x_n\rightharpoonup x$ in a Hilbert space $H$ iff $\langle x_n,y\rangle\to\langle x,y\rangle$ for every $y\in H$.

**Banach-Alaoglu (1940).** The closed unit ball of $X^{*}$ is compact in the weak-* topology. In a Hilbert space this specialises to: every bounded sequence has a weakly convergent subsequence.

The orthonormal sequence shows both the failure and the repair. Bessel gives $\sum_n|\langle e_n,y\rangle|^{2}\le\|y\|^{2}<\infty$, so $\langle e_n,y\rangle\to0$ for every $y$: $e_n\rightharpoonup 0$ while $\|e_n\|=1$ for all $n$. Norm is *not* weakly continuous; it is only weakly lower semicontinuous,
$$\|x\|\ \le\ \liminf_n\|x_n\|\qquad\text{when }x_n\rightharpoonup x .$$

That single inequality is what the direct method in the calculus of variations runs on. To minimise a functional $J$: take a minimising sequence, use coercivity to bound it, extract a weakly convergent subsequence, and close the argument with weak lower semicontinuity, $J(x)\le\liminf J(x_n)=\inf J$. Compactness returns in a weaker form, and the existence proofs start working again.

## Recall
type: mcq
Q: What do you lose by switching to weak convergence?
- [x] Continuity of the norm — it becomes only lower semicontinuous, so mass can leak away in the limit, as with $e_n \rightharpoonup 0$ and $\|e_n\|=1$.
- [ ] Compactness of the unit ball — that is exactly what you gain; Banach-Alaoglu is the whole point.
- [ ] Uniqueness of limits — weak limits are still unique, since the inner products determine the vector.
