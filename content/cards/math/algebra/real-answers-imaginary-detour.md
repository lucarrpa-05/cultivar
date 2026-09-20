---
id: math.algebra.polynomials-factorization.real-answers-imaginary-detour
topic: math.algebra.polynomials-factorization
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, history]
tags: [casus-irreducibilis, complex-numbers, bombelli, cubic-equation, wantzel]
hook: "Three real roots, and Cardano's formula forces you through the square root of a negative number. Not clumsiness — a theorem."
sources:
  - {title: "Casus irreducibilis", type: wiki, url: "https://en.wikipedia.org/wiki/Casus_irreducibilis"}
  - {title: "Rafael Bombelli", type: wiki, url: "https://en.wikipedia.org/wiki/Rafael_Bombelli"}
  - {title: "Pierre Wantzel", type: wiki, url: "https://en.wikipedia.org/wiki/Pierre_Wantzel"}
dates: {written: 2026-09-19, event: 1572-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Complex numbers did not come from $x^2=-1$

They came from an equation whose answers were obviously real.

Cardano's formula stacks a square root inside two cube roots. When a cubic has one real root the square root is of a positive number and nothing is strange. The embarrassment is the other case. If a cubic with rational coefficients has *three distinct real roots*, the quantity under the square root is negative. You must take the square root of a negative number, carry it through two cube roots, and watch the imaginary parts annihilate each other to leave three perfectly ordinary real answers.

Declaring that $x^2=-1$ has no solution costs nothing. Declaring that $x^3=15x+4$ has no solution is absurd, because $4$ is sitting right there. Rafael Bombelli took the detour seriously in *L'Algebra* (1572) and wrote down the arithmetic rules that make the cancellation work — the first real use of complex numbers.

For 270 years people hoped a cleverer formula would avoid the detour. It cannot, and the man who proved that had already killed angle trisection.

## Rigor

Take $x^3=15x+4$, so $p=-15$, $q=-4$ in $y^3+py+q=0$. Cardano's inner quantity is
$$\frac{q^2}{4}+\frac{p^3}{27}=4-125=-121,$$
so the formula returns $x=\sqrt[3]{2+11i}+\sqrt[3]{2-11i}$. Bombelli's observation: $(2+i)^3=2+11i$. Hence the cube roots are $2\pm i$ and $x=4$, which you can check by substitution. The imaginary parts were scaffolding, not answers.

**Casus irreducibilis.** If an irreducible cubic over $\mathbb{Q}$ has three real roots, none of them lies in any tower of *real* radical extensions of $\mathbb{Q}$. Pierre Wantzel proved this in 1843.

The Galois reason, in one line: the discriminant is positive here, the splitting field has degree 3 over $\mathbb{Q}(\sqrt{D})$ with cyclic group $\mathbb{Z}/3$, and a cyclic degree-3 radical step requires a primitive cube root of unity in the base field. No subfield of $\mathbb{R}$ contains one. The detour through $\mathbb{C}$ is compulsory.

## Recall
type: mcq
Q: What does the *casus irreducibilis* actually assert?
- [x] An irreducible cubic with three real roots cannot be solved using real radicals alone — complex numbers in the formula are unavoidable, not a bad choice of method.
- [ ] Such a cubic has no solution in radicals at all — it does; Cardano's formula works, it just routes through $\mathbb{C}$.
- [ ] Such a cubic is irreducible over $\mathbb{R}$ — no cubic is; every real cubic has a real root and so factors over $\mathbb{R}$.
