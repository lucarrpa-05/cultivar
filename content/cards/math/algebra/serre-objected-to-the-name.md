---
id: math.algebra.modules.serre-objected-to-the-name
topic: math.algebra.modules
format: idea
difficulty: 5
language: en
weight: medium
angles: [open-problem, history]
tags: [projective-modules, quillen-suslin, vector-bundles, serre, free-modules]
hook: "Is every vector bundle over affine space trivial? Serre asked it in a footnote in 1955 and it took twenty-one years."
sources:
  - {title: "Quillen–Suslin theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Quillen%E2%80%93Suslin_theorem"}
  - {title: "Projective module", type: wiki, url: "https://en.wikipedia.org/wiki/Projective_module"}
dates: {written: 2026-09-19, event: 1976-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Serre asked a question and spent twenty years objecting to its name

In 1955, in *Faisceaux algébriques cohérents*, Jean-Pierre Serre remarked that it was not known whether there exist finitely generated projective modules over a polynomial ring that fail to be free. He wrote it as a question. It was instantly renamed "Serre's conjecture", and he later noted drily that he had objected as often as he could.

The geometric translation is what makes it stick. Modules over a ring of functions correspond to vector bundles over the underlying space; projective modules are the ones that are locally free, and free modules are the ones that are globally trivial. Over $k[x_1,\dots,x_n]$ the space is affine $n$-space, which is as contractible as a space gets.

So: is every vector bundle over a contractible space trivial? For continuous bundles over $\mathbb{R}^n$, yes, and the proof is a homotopy. Algebraically there is no homotopy to use, and the question stayed open for twenty-one years. Daniel Quillen and Andrei Suslin settled it independently in 1976, and Quillen's Fields Medal in 1978 was partly for that.

## Rigor

A module $P$ over $R$ is **projective** if it is a direct summand of a free module: $P\oplus Q\cong R^{n}$. Over a field this is vacuous (every module is free); over $\mathbb{Z}$ it is still vacuous for finitely generated modules, by the structure theorem. The first interesting case is a ring with genuine geometry in it.

**Quillen–Suslin.** For $k$ a field (or any PID) and $R=k[x_1,\dots,x_n]$, every finitely generated projective $R$-module is free.

The cases $n=1$ is classical: $k[x]$ is a PID. The content is $n\ge 2$. Quillen's route is **local-global patching**: if $P$ is a finitely presented module over $R[x]$ such that $P_{\mathfrak m}$ is extended from $R_{\mathfrak m}$ for every maximal ideal $\mathfrak m$ of $R$, then $P$ is extended from $R$. Combining with induction on $n$ and the fact that projective modules over local rings are free gives the result.

Contrast: over $R=\mathbb{R}[x,y,z]/(x^2+y^2+z^2-1)$, the tangent bundle of the 2-sphere is projective and not free — the hairy ball theorem, rewritten as algebra. So the theorem genuinely uses that affine space is contractible.

## Recall
type: mcq
Q: What is the geometric content of "every finitely generated projective module over $k[x_1,\dots,x_n]$ is free"?
- [x] Every algebraic vector bundle over affine $n$-space is trivial — projective corresponds to locally free, free to globally trivial.
- [ ] Every module over a polynomial ring has a basis — false: torsion modules like $k[x]/(x)$ are not free and not projective either.
- [ ] Polynomial rings are principal ideal domains — only for $n=1$; the theorem's whole difficulty is that $k[x,y]$ is not.
