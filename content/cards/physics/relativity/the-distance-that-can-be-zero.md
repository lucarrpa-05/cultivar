---
id: physics.relativity.spacetime-minkowski.the-distance-that-can-be-zero
topic: physics.relativity.spacetime-minkowski
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, connection]
tags: [minkowski, light-cone, invariant-interval, lorentz-group, rapidity]
hook: "Two different events can be at zero distance from each other. That single minus sign is what makes causality geometric."
sources:
  - {title: "Minkowski space", type: wiki, url: "https://en.wikipedia.org/wiki/Minkowski_space"}
  - {title: "Hermann Minkowski (on the 1908 'Raum und Zeit' address)", author: "Hermann Minkowski", year: 1908, type: wiki, url: "https://en.wikipedia.org/wiki/Hermann_Minkowski"}
  - {title: "Lorentz group", type: wiki, url: "https://en.wikipedia.org/wiki/Lorentz_group"}
dates: {written: 2026-09-19, event: 1908-09-21}
diagram: {file: physics/light-cone.svg, caption: "The light cone of one event: the two regions it can influence or be influenced by, and the elsewhere it cannot reach.", alt: "Two triangles meeting at a point, labelled future and past, with the regions to the left and right labelled elsewhere, and a wiggly worldline rising inside the future cone"}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The distance between two different events can be zero

In September 1908 Hermann Minkowski told a room in Cologne that space by itself and time by itself were finished, and only a union of the two would survive. He had been Einstein's mathematics teacher, and he had noticed something Einstein had not yet said out loud: the Lorentz transformations are not weird formulas about clocks. They are rotations.

Rotations of what? Of a four-dimensional space with one strange feature. The squared distance between two events is not a sum of four squares — the time term enters with a minus sign. Everything counterintuitive about relativity comes from that one sign.

It has an immediate consequence: distances can vanish between distinct points. The set of events at zero separation from you, right now, is a cone — and it is exactly the set of events a light ray can connect you to. Inside the cone lies everything you could still affect; outside lies everything you can never reach or hear from. Causality stops being a rule imposed on physics and becomes the shape of a quadratic form.

## Rigor

Equip $\mathbb{R}^4$ with the symmetric bilinear form $\eta = \mathrm{diag}(-1,1,1,1)$, so

$$\langle X, X\rangle = -c^2t^2 + x^2 + y^2 + z^2 .$$

The Lorentz group $O(1,3)$ is by definition the isometry group of $\eta$: $\Lambda^{T}\eta\,\Lambda = \eta$. Everything you know about orthogonal groups transfers, with signature $(1,3)$ instead of $(4,0)$, and the differences are exactly the interesting parts.

A boost along $x$ is the matrix

$$\begin{pmatrix} \cosh\varphi & -\sinh\varphi\\ -\sinh\varphi & \cosh\varphi\end{pmatrix}, \qquad \tanh\varphi = v/c,$$

a hyperbolic rotation through *rapidity* $\varphi$. Rapidities add under composition, exactly as angles do for $SO(2)$; velocities do not, and the relativistic velocity-addition formula is just $\tanh(\varphi_1+\varphi_2)$ written out. The speed of light is unreachable because $\tanh$ has a horizontal asymptote, not because of a cosmic traffic rule.

Because the form is indefinite, nonzero vectors can be null: $\langle X,X\rangle = 0$ defines the light cone, and the classification timelike ($<0$), null, spacelike ($>0$) is Lorentz-invariant. Two events with spacelike separation have no invariant time order — different observers disagree about which came first — which is exactly why no signal may connect them, and why "elsewhere" in the picture is not a place you can get to.

## Recall
type: mcq
Q: What makes Minkowski spacetime different from ordinary four-dimensional Euclidean space?
- [ ] It has four dimensions instead of three. — $\mathbb{R}^4$ with the usual inner product also has four; the dimension is not the issue.
- [x] Its bilinear form is indefinite, with signature $(1,3)$, so nonzero vectors can have zero length. — those null vectors form the light cone and encode causality.
- [ ] Time is measured in different units from space. — a factor of $c$ is a change of units and changes nothing structurally; the minus sign does.
- [ ] Distances in it are not preserved by any transformation. — they are: the Lorentz group is precisely the group preserving the interval.
