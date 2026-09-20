---
id: math.algebra.galois.the-last-sporadic-group-fell-in-2026
topic: math.algebra.galois
format: idea
difficulty: 5
language: en
weight: medium
angles: [open-problem, history]
tags: [inverse-galois-problem, mathieu-group, hilbert-irreducibility, rigidity, sporadic-groups]
hook: "Every finite group should be the symmetry group of some rational equation. Nobody can prove it, but the last sporadic holdout fell in 2026."
sources:
  - {title: "Inverse Galois problem", type: wiki, url: "https://en.wikipedia.org/wiki/Inverse_Galois_problem"}
  - {title: "Mathieu group M23", type: wiki, url: "https://en.wikipedia.org/wiki/Mathieu_group_M23"}
  - {title: "The Mathieu group M_23 is a Galois group over Q", author: "Huang, Jackson, Lee, Poonen, Pries, Zhang", year: 2026, type: paper, url: "https://arxiv.org/abs/2608.08538"}
dates: {written: 2026-09-19, event: 2026-08-09}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "arXiv:2608.08538 fetched: Huang, Jackson, Lee, Poonen, Pries, Zhang, 9 Aug 2026, explicit degree-23 polynomial. Claim stands."}
---

# Run Galois theory backwards and nobody knows the answer

Galois theory attaches a finite group to every polynomial with rational coefficients. Run it the other way: hand me a finite group, and I want a polynomial whose group is that one. Does it always exist?

Nobody knows. The inverse Galois problem has been open since Hilbert, and it is one of those questions where every case anyone attacks works out, which is either overwhelming evidence or a warning.

Large territories are settled. Hilbert did the symmetric and alternating groups in 1892, using the irreducibility theorem he invented for the purpose. Shafarevich did every solvable group in the 1950s. From the 1980s the 26 sporadic simple groups were picked off one by one, until only the Mathieu group $M_{23}$ was left — and it stayed left for about forty years.

In 2026 Huang, Jackson, Lee, Poonen, Pries and Zhang produced an explicit degree-23 polynomial over $\mathbb{Q}$ whose splitting field has Galois group $M_{23}$. Every sporadic group is now accounted for, and the general problem is exactly as open as it was.

## Rigor

**The problem.** For every finite $G$, is there a Galois extension $K/\mathbb{Q}$ with $\operatorname{Gal}(K/\mathbb{Q})\cong G$?

The standard route goes through function fields. By the Riemann existence theorem, every finite group is a Galois group over $\mathbb{C}(t)$ — topologically it is just a branched cover of the sphere. The difficulty is entirely in descending the field of definition from $\mathbb{C}$ to $\mathbb{Q}$.

**Hilbert irreducibility.** If $f(t,x)\in\mathbb{Q}(t)[x]$ is irreducible with group $G$ over $\mathbb{Q}(t)$, then for infinitely many rational $t_0$ the specialisation $f(t_0,x)$ has group $G$ over $\mathbb{Q}$. So a *regular* realisation over $\mathbb{Q}(t)$ suffices, and the search moves from numbers to covers.

**Rigidity.** If $G$ has a rigid, rationally defined triple of conjugacy classes generating it with product 1, the corresponding three-point cover is defined over $\mathbb{Q}$, giving a regular realisation. This is the tool that cleared most of the sporadic groups.

Known: all solvable groups, all $S_n$ and $A_n$, all 26 sporadic groups. Open: the general case, including many simple groups of Lie type.

## Recall
type: mcq
Q: Why does realising a group over $\mathbb{Q}(t)$ help with realising it over $\mathbb{Q}$?
- [x] Hilbert's irreducibility theorem — infinitely many rational specialisations of $t$ keep the same Galois group, so one realisation over $\mathbb{Q}(t)$ gives many over $\mathbb{Q}$.
- [ ] Because $\mathbb{Q}(t)$ and $\mathbb{Q}$ have the same absolute Galois group — they do not; $\mathbb{Q}(t)$ is much larger and far easier to realise groups over.
- [ ] Because every extension of $\mathbb{Q}(t)$ restricts to one of $\mathbb{Q}$ — restriction is not automatic; the specialisation theorem is what makes the transfer work.
