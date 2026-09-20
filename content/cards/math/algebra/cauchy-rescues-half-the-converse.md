---
id: math.algebra.subgroups-lagrange.cauchy-rescues-half-the-converse
topic: math.algebra.subgroups-lagrange
topics: [math.algebra.group-actions]
format: idea
difficulty: 4
language: en
weight: medium
angles: [beautiful, tool]
tags: [cauchy-theorem, lagrange-converse, group-actions, mckay-proof, element-order]
prerequisites: [math.algebra.subgroups-lagrange, math.algebra.group-actions]
hook: "Lagrange's converse is false — except at primes, where it is true, and the proof fits on a napkin."
sources:
  - {title: "Cauchy's theorem (group theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Cauchy%27s_theorem_(group_theory)"}
  - {title: "Group action", type: wiki, url: "https://en.wikipedia.org/wiki/Group_action"}
dates: {written: 2026-09-19}
related: [math.algebra.subgroups-lagrange.cosets-tile-the-group]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The one divisor that never lets you down

Lagrange's converse is false: a divisor of $|G|$ need not be the size of any subgroup, and $A_4$ with its missing subgroup of order 6 is the standard embarrassment. So it is a genuine surprise that the converse is *always* true when the divisor is prime.

If a prime $p$ divides the order of a finite group, that group contains an element of order exactly $p$. No exceptions, no hypotheses, no abelian assumption.

The proof that everyone remembers is James McKay's, and it is almost a card trick. Write down every list of $p$ elements of the group whose product is the identity. You are free to choose the first $p-1$ of them however you like, and the last one is forced, so there are $|G|^{p-1}$ such lists. Now rotate: shifting a list cyclically gives another list with the same property. A list is left unchanged by rotation exactly when all its entries are equal — that is, when some $x$ satisfies $x^p=e$.

Counting the fixed lists is the whole proof.

## Rigor

Let $X=\{(x_1,\dots,x_p)\in G^p : x_1x_2\cdots x_p=e\}$, so $|X|=|G|^{p-1}$. The cyclic group $\mathbb{Z}/p$ acts on $X$ by rotation: if $x_1\cdots x_p=e$ then $x_2\cdots x_p x_1=x_1^{-1}(x_1\cdots x_p)x_1=e$, so rotation really does stay inside $X$.

Every orbit has size dividing $p$, hence size $1$ or $p$. Therefore
$$|X|\equiv |X^{\mathbb{Z}/p}| \pmod p,$$
where $X^{\mathbb{Z}/p}$ is the set of constant tuples $(x,\dots,x)$ with $x^p=e$.

Since $p$ divides $|G|$, it divides $|X|=|G|^{p-1}$, so $p$ divides $|X^{\mathbb{Z}/p}|$. That set is non-empty — it contains $(e,\dots,e)$ — so it has at least $p$ members. Any other one gives $x\neq e$ with $x^p=e$, and since $p$ is prime, $x$ has order exactly $p$. $\square$

The tiling picture from Lagrange is still doing the work: orbits partition $X$ into blocks whose sizes divide $p$.

## Recall
type: mcq
Q: In McKay's proof, why are the rotation-fixed tuples exactly the ones we want?
- [x] A tuple is fixed by rotation only if all entries are equal, so fixing one means some $x$ satisfies $x^p=e$ — and $p$ prime forces order exactly $p$ unless $x=e$.
- [ ] Because fixed points of a group action always form a subgroup — they do not in general; here they are just a set of tuples counted modulo $p$.
- [ ] Because $|X|=|G|^p$ — it is $|G|^{p-1}$: the last coordinate is determined by the first $p-1$.
