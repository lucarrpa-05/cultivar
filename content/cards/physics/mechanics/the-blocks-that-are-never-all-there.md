---
id: physics.mechanics.energy.the-blocks-that-are-never-all-there
topic: physics.mechanics.energy
format: series
difficulty: 1
language: en
weight: medium
angles: [beautiful, tool]
tags: [energy, conservation, bookkeeping, feynman, kinetic-potential]
hook: "Energy is not a substance. It is a number you can only find by inventing the right places to look for it."
series: {id: physics.mechanics.energy-conservation-arc, index: 1, total: 4, title: "Energy, and why it's conserved"}
sources:
  - {title: "The Feynman Lectures on Physics, Vol. I, Ch. 4: Conservation of Energy", author: "Richard Feynman", year: 1963, type: book, url: "https://en.wikipedia.org/wiki/The_Feynman_Lectures_on_Physics"}
  - {title: "Conservation of energy", type: wiki, url: "https://en.wikipedia.org/wiki/Conservation_of_energy"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The blocks that are never all there

Feynman taught energy with a child who owns a set of indestructible blocks. His mother counts them every evening and always gets the same number. One evening two are missing: one is under the rug, one went out the window. Another evening the count is short and nothing is under the rug — but the toy box is heavier than an empty box should be, by exactly the weight of three blocks. Later the bath water is higher than usual. She never sees those blocks again. She can still write a sum that always comes back to the same total.

Energy is that sum. Not a fluid, not a substance sitting inside things, just a number: kinetic plus gravitational plus elastic plus chemical plus thermal. Invent the right terms and the total never moves. Feynman's honest warning was that physics does not know what energy *is*. We know how to count it.

Which invites an obvious cheat. Can't you always invent one more term? One of them took a century to find, and it was hiding inside anything warm.

## Rigor

For one particle, $\frac{d}{dt}\!\left(\tfrac12 m v^2\right) = m\mathbf{a}\cdot\mathbf{v} = \mathbf{F}\cdot\mathbf{v}$. If the force is conservative, $\mathbf{F} = -\nabla V(\mathbf{x})$, then $\mathbf{F}\cdot\mathbf{v} = -\nabla V\cdot\dot{\mathbf{x}} = -\frac{dV}{dt}$, so

$$\frac{d}{dt}\big(T + V\big) = 0, \qquad T = \tfrac12 m v^2 .$$

That is the classical statement: $T+V$ is a first integral of the motion whenever $\mathbf{F}$ is a gradient field, equivalently whenever $\oint \mathbf{F}\cdot d\boldsymbol\ell = 0$ around every loop.

And here is the rule that keeps the bookkeeping from being empty. A new term in the ledger is allowed only if it is a definite function of the present state of the system, and only if it can be measured *independently* of the discrepancy it was invented to close. "The toy box is heavier" qualifies: you can put the box on a scale. Episode 2 is about the term that failed that test for a hundred years, and then passed it.

## Recall
type: mcq
Q: What makes "energy is conserved" a real claim instead of a definition you can always rescue?
- [ ] Every form of energy can be seen directly, so the sum is never in doubt. — most of it cannot be seen at all; thermal and chemical energy are inferred, never watched.
- [x] Each new term must be a function of the system's state and measurable on its own, not just whatever number balances the books. — that independent measurability is what turns bookkeeping into physics.
- [ ] The total is conserved only for objects moving in a vacuum. — friction moves energy into thermal form; it does not destroy it, and the ledger still closes.
- [ ] It is a definition, and physicists admit it has no content. — it has sharp content: it forbids machines that deliver work from nothing, and none has ever worked.
