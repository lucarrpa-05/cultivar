---
id: math.algebra.homomorphisms-quotients.noether-and-the-numbering
topic: math.algebra.homomorphisms-quotients
format: story
difficulty: 2
language: en
weight: medium
angles: [history, human, origin]
tags: [isomorphism-theorems, emmy-noether, van-der-waerden, first-isomorphism-theorem, diamond-theorem]
hook: "Emmy Noether stated the isomorphism theorems in general in 1927. Nearly a century later, textbooks still disagree on how to number them."
related: [math.algebra.homomorphisms-quotients.forgetting-on-purpose, math.algebra.rings-ideals.noether-y-la-cadena-que-se-detiene]
sources:
  - {title: "Isomorphism theorems (history and numbering)", type: wiki, url: "https://en.wikipedia.org/wiki/Isomorphism_theorems"}
  - {title: "Emmy Noether", type: wiki, url: "https://en.wikipedia.org/wiki/Emmy_Noether"}
  - {title: "Moderne Algebra", type: wiki, url: "https://en.wikipedia.org/wiki/Moderne_Algebra"}
dates: {written: 2026-09-23, event: 1927-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "softened the Moderne Algebra overclaim ('made abstract algebra a standard course') and cut 'in every textbook since' (also trims the body to the 120-word limit); replaced the 'injective once the identity is removed' distractor, which no one believes, with a real misconception."}
---

# Noether stated the isomorphism theorems, and nobody agrees on the numbers

The isomorphism theorems you are proving for groups were stated in general form by Emmy Noether in 1927, for modules, in a paper on the ideal theory of number fields and function fields.

Three years later Bartel van der Waerden, who had sat in her Göttingen lectures, put them into *Moderne Algebra*, the book that set the pattern for how abstract algebra is taught.

What never settled is the numbering. The theorem one book calls the second, another calls the third. Dummit and Foote add a fourth and give them nicknames: the second is the Diamond theorem, the fourth the Lattice theorem.

Underneath, they are one idea: every homomorphism is a quotient followed by an inclusion.

## Rigor

**First isomorphism theorem.** If $\varphi:G\to H$ is a homomorphism, then $\ker\varphi\trianglelefteq G$ and
$$G/\ker\varphi\ \cong\ \varphi(G),\qquad g\ker\varphi\mapsto\varphi(g).$$
*Sketch.* The map is well defined and injective because $\varphi(g)=\varphi(g')\iff g^{-1}g'\in\ker\varphi$; it is a surjective homomorphism onto $\varphi(G)$ by construction. So every $\varphi$ factors as
$$G\twoheadrightarrow G/\ker\varphi\xrightarrow{\ \cong\ }\varphi(G)\hookrightarrow H:$$
quotient, then isomorphism, then inclusion.

**The others are applications of the first.**
- *Diamond.* For $A\le G$ and $B\trianglelefteq G$, apply it to $A\to AB/B$, $a\mapsto aB$: it is onto and its kernel is $A\cap B$, so $A/(A\cap B)\cong AB/B$.
- *Third.* For $N\le K$, both normal in $G$, apply it to $G/N\to G/K$, $gN\mapsto gK$: the kernel is $K/N$, so $(G/N)/(K/N)\cong G/K$.

Noether's version replaces "normal subgroup" by "submodule" and the proofs do not change, which is why the same three statements reappear for rings, vector spaces and modules.

## Recall
type: mcq
Q: What does the first isomorphism theorem say about every homomorphism $\varphi:G\to H$?
- [x] It factors as quotient, isomorphism, inclusion — divide out the kernel, match with the image, then include the image in $H$.
- [ ] Its image is isomorphic to $G$ — only when the kernel is trivial; in general the image is $G$ with the kernel collapsed to a point.
- [ ] Its image is a normal subgroup of $H$ — the kernel is always normal; the image need not be.
