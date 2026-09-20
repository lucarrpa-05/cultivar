---
id: physics.mechanics.symmetry-noether.the-group-that-pays-in-conservation-laws
topic: physics.mechanics.symmetry-noether
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [lie-groups, one-parameter-subgroup, momentum-map, noether, poisson-bracket]
callback: {from: math.algebra.groups-basics, to: physics.mechanics.symmetry-noether}
related: [physics.mechanics.symmetry-noether.every-symmetry-pays-you]
hook: "You learned that a group is a set of symmetries. Here is the invoice: each continuous one hands physics a quantity that cannot change."
sources:
  - {title: "Noether's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Noether%27s_theorem"}
  - {title: "Lie group", type: wiki, url: "https://en.wikipedia.org/wiki/Lie_group"}
  - {title: "Momentum map", type: wiki, url: "https://en.wikipedia.org/wiki/Moment_map"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember groups? Physics pays you for every one of them

When you met groups, the motivating line was probably "a group is a set of symmetries." Symmetries of what, and what do you get for having them, came later or never.

Here is what you get. Take a physical system. Take a group acting on its configuration space in a way that leaves the action functional alone — rotations of space, translations in space, shifts in time. If the group is continuous, so that you can slide from the identity along a one-parameter subgroup, then Noether's theorem hands you a function on phase space whose value never changes along any solution.

The dictionary is direct:

| group acting | conserved quantity |
|---|---|
| $\mathbb{R}$ translating time | energy |
| $\mathbb{R}^3$ translating space | linear momentum |
| $SO(3)$ rotating space | angular momentum |
| $U(1)$ rotating a complex phase | electric charge |

Discrete groups are not included — and that exclusion is the whole content of the word "continuous" here.

## Rigor

Let a Lie group $G$ act on configuration space $Q$ with $S[q]$ invariant. Each $\xi$ in the Lie algebra $\mathfrak{g}$ generates a vector field $K_\xi$ on $Q$ (differentiate $\exp(\varepsilon\xi)\cdot q$ at $\varepsilon = 0$: this is exactly the one-parameter subgroup through the identity). Noether's first theorem gives the conserved

$$J_\xi(q,p) = \sum_i p_i\,K_\xi^i(q), \qquad \dot J_\xi = 0 .$$

The map $\xi \mapsto J_\xi$ is linear, so it packages as a single momentum map $J : T^*Q \to \mathfrak{g}^*$. The punchline for an algebra reader: $J$ is (usually) a Lie algebra homomorphism,

$$\{J_\xi, J_\eta\} = J_{[\xi,\eta]},$$

with the Poisson bracket on the left and the Lie bracket on the right. The algebraic structure of the group is reproduced exactly by the conserved quantities. $SO(3)$ is non-abelian, so the three components of angular momentum do not Poisson-commute — the same relations that reappear as the commutators $[L_x,L_y]=i\hbar L_z$ once you quantise.

Why continuity is essential: the proof differentiates with respect to the group parameter. Parity and time reversal are symmetries with no $\varepsilon$ to differentiate, so they give selection rules instead of conserved currents.

## Recall
type: mcq
Q: Why does Noether's theorem need the symmetry group to be continuous?
- [ ] Because discrete groups are too small to act on configuration space. — finite groups act perfectly well; the issue is not the size.
- [x] Because the conserved quantity is produced by differentiating along a one-parameter subgroup, and a discrete group has no parameter to differentiate. — that derivative is literally the Lie algebra element that becomes the conserved function.
- [ ] Because only continuous groups have inverses. — every group has inverses; that is part of the definition.
- [ ] Because energy is a continuous variable. — the conserved quantity's spectrum has nothing to do with whether the symmetry group is continuous.
