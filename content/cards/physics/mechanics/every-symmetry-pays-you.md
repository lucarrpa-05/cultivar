---
id: physics.mechanics.symmetry-noether.every-symmetry-pays-you
topic: physics.mechanics.symmetry-noether
format: series
difficulty: 2
language: en
weight: medium
angles: [beautiful, human]
tags: [noether-theorem, symmetry, conservation-laws, emmy-noether, gottingen]
hook: "The books balance because the laws of physics do not care what day it is. That indifference is worth exactly one conserved number."
series: {id: physics.mechanics.energy-conservation-arc, index: 4, total: 4, title: "Energy, and why it's conserved"}
sources:
  - {title: "Noether's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Noether%27s_theorem"}
  - {title: "Emmy Noether", type: wiki, url: "https://en.wikipedia.org/wiki/Emmy_Noether"}
  - {title: "Invariante Variationsprobleme (English translation by M. A. Tavel)", author: "Emmy Noether", year: 1918, type: paper, url: "https://arxiv.org/abs/physics/0503066"}
dates: {written: 2026-09-19, event: 1918-07-26}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Klein read it out because she was not a member of the society (was: not allowed to speak); paper source now points to the Tavel translation rather than a wiki page."}
---

# Every symmetry pays you a conserved quantity

Three episodes of bookkeeping and nobody has said why the books balance. Emmy Noether answered that on 26 July 1918, in a paper Felix Klein read out for her at Göttingen because she was not a member of the society.

Hilbert and Klein had brought her there in 1915 for a specific reason: energy conservation had gone strange in Einstein's new theory of gravity, and they wanted the best invariant theorist alive working on it. The faculty blocked her appointment — one member asked what the soldiers would think on returning to find themselves taught by a woman — so she lectured for years under Hilbert's name, unpaid.

Her answer is one sentence. The total does not change because the laws do not care *when* you run the experiment. Today, next Tuesday, same laws. That indifference is a symmetry, and every continuous symmetry buys you exactly one conserved quantity.

It is a machine, not a one-off. Laws don't care *where* you are: momentum is conserved. Don't care which way you face: angular momentum. The blocks in episode 1 were never the point — the symmetry was.

## Rigor

Let the action $S[q]=\int L(q,\dot q,t)\,dt$ be invariant under a one-parameter family of transformations $q \mapsto q + \varepsilon K(q) + O(\varepsilon^2)$. Then along any solution of the Euler–Lagrange equations,

$$Q = \sum_i \frac{\partial L}{\partial \dot q_i}K_i(q)$$

satisfies $\dot Q = 0$. The proof is three lines: expand $\delta L$ to first order in $\varepsilon$, use $\frac{d}{dt}\frac{\partial L}{\partial\dot q_i} = \frac{\partial L}{\partial q_i}$, and the whole thing collapses into $\frac{d}{dt}\big(\sum_i \frac{\partial L}{\partial\dot q_i}K_i\big) = 0$.

Read off the dictionary. Spatial translation $K = \hat{\mathbf{n}}$ gives $Q = \mathbf{p}\cdot\hat{\mathbf{n}}$: linear momentum. Rotation $K = \hat{\mathbf{n}}\times\mathbf{q}$ gives $Q = (\mathbf{q}\times\mathbf{p})\cdot\hat{\mathbf{n}}$: angular momentum. Time translation needs the slightly different argument with $\partial L/\partial t = 0$, and the conserved quantity is the Hamiltonian $H = \sum_i p_i\dot q_i - L$: energy.

Which settles episode 1's worry. You cannot invent a conserved term for free — you have to find a symmetry of the action, and symmetries are checkable.

## Recall
type: mcq
Q: Noether's theorem says energy is conserved because the laws of physics are unchanged under which transformation?
- [ ] Shifting the system in space. — that symmetry buys you linear momentum instead.
- [x] Shifting the system in time: running the same experiment later gives the same laws. — time-translation invariance of the action is exactly what yields conservation of energy.
- [ ] Rotating the system. — rotational invariance gives angular momentum.
- [ ] Reflecting the system in a mirror. — parity is a discrete symmetry, and Noether's theorem needs a continuous one.
