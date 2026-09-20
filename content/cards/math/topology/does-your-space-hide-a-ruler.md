---
id: math.topology.metrization.does-your-space-hide-a-ruler
topic: math.topology.metrization
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [urysohn-metrization, hilbert-cube, embedding, second-countable]
hook: "Two conditions that never mention distance decide whether a distance exists. The proof does not guess a metric — it borrows one."
sources:
  - {title: "Urysohn metrization theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Urysohn_metrization_theorem"}
  - {title: "Hilbert cube", type: wiki, url: "https://en.wikipedia.org/wiki/Hilbert_cube"}
  - {title: "Topology, 2nd ed., §34", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Spelled out that regular is Munkres regular (T1 included), since the statement is false under the weaker convention."}
---

# Does your space secretly have a ruler?

You are handed a topology: a list of which sets are open, nothing more. Question: is there a distance function somewhere that produces exactly this list? That is not an idle question — if the answer is yes, every metric theorem you know becomes available at once.

The surprising thing is that the answer is decidable from conditions that never mention distance. Urysohn's theorem: if the space is regular and has a countable basis, yes, a metric exists.

The proof is the part worth remembering, because it does not invent a formula. It finds somewhere to *put* the space. The Hilbert cube $[0,1]^{\omega}$ already has a metric. If your space can be embedded into it — sat inside it as a homeomorphic copy — then pull that metric back and you are done. Metrizability turns into a seating question.

The functions that do the seating come from Urysohn's lemma. Each one is a continuous coordinate; countably many of them together tell the points apart.

## Rigor

**Urysohn metrization theorem.** A regular space with a countable basis is metrizable. ("Regular" in Munkres's sense, which folds in $T_1$: points are closed.)

Sketch. Regular + second countable implies normal, so Urysohn's lemma is available. From a countable basis $\{B_n\}$, take the countably many pairs $(n,m)$ with $\overline{B_n}\subseteq B_m$ and choose $f_{n,m} : X \to [0,1]$ continuous with $f_{n,m}\equiv 1$ on $\overline{B_n}$ and $\equiv 0$ outside $B_m$. Re-index as $f_1,f_2,\dots$ and define
$$F(x)=\big(f_1(x),f_2(x),f_3(x),\dots\big)\in[0,1]^{\omega}.$$
$F$ is injective (given $x \ne y$, regularity and the basis supply a pair $(n,m)$ separating them), continuous (each coordinate is), and open onto its image (the $f_i$ detect basis elements). So $F$ is an embedding.

$[0,1]^{\omega}$ with the product topology is metrizable by
$$D(x,y)=\sup_i \frac{|x_i-y_i|}{i},$$
so $X$ inherits $d(x,y)=D(F(x),F(y))$.

The converse fails: any uncountable discrete space is metrizable and not second countable. Getting an exact characterisation took another twenty-five years.

## Recall
type: mcq
Q: How does the Urysohn metrization theorem produce a metric?
- [x] By embedding the space in the Hilbert cube and pulling back its metric — the coordinates are Urysohn functions supplied by normality.
- [ ] By defining $d(x,y)$ as the number of basis elements separating $x$ from $y$ — that need not satisfy the triangle inequality, nor give the right topology.
- [ ] By showing every second countable space is a subspace of $\mathbb{R}$ — the target is $[0,1]^{\omega}$; $\mathbb{R}$ is far too small to hold every such space.
