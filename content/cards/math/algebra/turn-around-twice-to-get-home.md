---
id: math.algebra.lie-groups.turn-around-twice-to-get-home
topic: math.algebra.lie-groups
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, connection]
tags: [plate-trick, so3, su2, double-cover, spinors]
hook: "Rotate a glass of water through 360 degrees and your arm is twisted. Through 720 and it is not. The group of rotations is the reason."
sources:
  - {title: "Plate trick", type: wiki, url: "https://en.wikipedia.org/wiki/Plate_trick"}
  - {title: "3D rotation group", type: wiki, url: "https://en.wikipedia.org/wiki/3D_rotation_group"}
  - {title: "Spinor", type: wiki, url: "https://en.wikipedia.org/wiki/Spinor"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Turn all the way around and you are not back where you started

Hold a full glass of water flat on your palm and rotate it, keeping it upright, until your arm is twisted. Keep going the same way, up over your shoulder, and after a second full turn your arm comes back unwound. Three hundred and sixty degrees leaves you tangled. Seven hundred and twenty does not.

That is not a fact about arms. It is a fact about the group of rotations of space. A loop of rotations that winds once around cannot be shrunk to a point without tearing; a loop that winds twice can. In the usual words: the rotation group $SO(3)$ has fundamental group $\mathbb{Z}/2$.

Physics takes this literally. The group that *can* tell 360 from 720 is $SU(2)$, a double cover of $SO(3)$, and it is what electrons transform under. Rotate a spin-½ particle by one full turn and its wavefunction comes back multiplied by $-1$. Two full turns to get home, in a kitchen and in a particle detector.

Where the analogy leaks: your arm is a physical strand with ends. The theorem is about paths in a group.

## Rigor

Identify $\mathbb{R}^3$ with the purely imaginary quaternions. For a unit quaternion $q$, the map
$$v\longmapsto qvq^{-1}$$
is a rotation, and this gives a surjective homomorphism $\varphi: SU(2)\cong S^3\to SO(3)$ with $\ker\varphi=\{\pm1\}$. So $SO(3)\cong S^3/\{\pm1\}\cong\mathbb{RP}^3$.

Since $S^3$ is simply connected, $\varphi$ is the universal cover and
$$\pi_1(SO(3))\cong\mathbb{Z}/2 .$$
A loop in $SO(3)$ lifts to a path in $S^3$ from $1$ to $\pm1$; it is null-homotopic exactly when the endpoint is $+1$. One full rotation lifts to a path ending at $-1$ — tangled. Traverse it twice and the lift ends at $+1$ — untangled. That is the plate trick, with the arm playing the role of the lift.

Both groups have the same Lie algebra $\mathfrak{su}(2)\cong\mathfrak{so}(3)$, so infinitesimally they are indistinguishable: the difference is purely global. That is why a Lie algebra determines a Lie group only up to covering.

## Recall
type: mcq
Q: What does $\pi_1(SO(3)) = \mathbb{Z}/2$ say about rotating something by a full turn?
- [x] The loop of rotations cannot be contracted to a constant, but doing it twice can — which is exactly the plate trick and the sign flip of a spin-½ state.
- [ ] A full rotation is not the identity rotation — it is the identity; what differs is the *path*, not the endpoint.
- [ ] $SO(3)$ has two connected components — it is connected; the two-ness lives in loops, not in components.
