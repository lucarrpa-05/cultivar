---
id: physics.mechanics.lagrangian-hamiltonian.the-lifeguard-and-the-least-action
topic: physics.mechanics.lagrangian-hamiltonian
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, connection]
tags: [least-action, lagrangian, euler-lagrange, fermat-principle, hamiltonian]
hook: "Throw away forces. Assign one number to each possible history of the world, and physics becomes a problem about finding a stationary point."
sources:
  - {title: "Principle of least action", type: wiki, url: "https://en.wikipedia.org/wiki/Stationary-action_principle"}
  - {title: "Fermat's principle", type: wiki, url: "https://en.wikipedia.org/wiki/Fermat%27s_principle"}
  - {title: "Lagrangian mechanics", type: wiki, url: "https://en.wikipedia.org/wiki/Lagrangian_mechanics"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The lifeguard who does calculus of variations on the way to the water

A lifeguard sees someone drowning, off to one side. Running is fast, swimming is slow. The shortest path is a straight line, but it wastes too much time in the water; the fastest path bends at the shoreline, spending more of its length on sand. Every lifeguard solves this without thinking about it.

Light does the same thing. Fermat wrote it down in 1662: a ray between two points takes the path of stationary travel time, and bending at the water surface follows. Nothing pushes the light. There is no force in the story at all.

Then Euler, Lagrange and Hamilton found that *all* of mechanics works this way. Give every conceivable history of a system a single number. The history nature actually takes is the one where that number stops changing under small wiggles. Newton's laws come out the other end.

Two warnings before the formalism: the number is not always a minimum, and nothing is choosing anything.

## Rigor

Define the action of a path $q(t)$ between fixed endpoints:

$$S[q] = \int_{t_1}^{t_2} L(q,\dot q,t)\,dt, \qquad L = T - V .$$

Require $\delta S = 0$ for all variations vanishing at the endpoints. Integrating the $\delta\dot q$ term by parts and using the fundamental lemma gives the Euler–Lagrange equations,

$$\frac{d}{dt}\frac{\partial L}{\partial \dot q_i} = \frac{\partial L}{\partial q_i}.$$

For $L = \tfrac12 m\dot q^2 - V(q)$ this is literally $m\ddot q = -V'(q)$. You have recovered $F=ma$ from a variational problem on a function space — the same machinery as any Euler–Lagrange problem you have met in optimization, with the path playing the role of the unknown.

Two honesty notes. First, $\delta S = 0$ is *stationarity*, not minimality: for long enough times the true path is a saddle of $S$, which is why "least action" is a misnomer. Second, there is no teleology: the variational statement is exactly equivalent to a local differential equation, so the particle never needs to know where it is going. The lifeguard's bend at the shoreline is Snell's law, and Snell's law is a boundary condition, not a decision.

The Legendre transform $H = \sum_i p_i\dot q_i - L$, $p_i = \partial L/\partial\dot q_i$, turns the second-order system into the first-order flow $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$ on phase space — the form that quantum mechanics later inherits.

## Recall
type: mcq
Q: In what sense does a thrown ball "choose" the path of least action?
- [ ] It samples all paths and keeps the cheapest one. — that is a picture from quantum field theory, and even there the paths are summed, not compared.
- [ ] It minimises the action, which is always a strict minimum. — for sufficiently long time intervals the true path is a saddle point of $S$, not a minimum.
- [x] It does not choose: $\delta S = 0$ is mathematically equivalent to a local equation of motion it obeys instant by instant. — the global-sounding principle and the local law are two descriptions of one fact.
- [ ] It follows the shortest path in space. — the shortest path is generally not the true one; the lifeguard's bent route beats the straight line.
