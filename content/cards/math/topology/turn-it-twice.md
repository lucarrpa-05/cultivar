---
id: math.topology.fundamental-group.turn-it-twice
topic: math.topology.fundamental-group
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, connection]
tags: [plate-trick, so3, quaternions, double-cover]
hook: "Rotate the cup on your palm once and your arm is twisted. Rotate it again the same way and everything is back to normal."
sources:
  - {title: "Plate trick", type: wiki, url: "https://en.wikipedia.org/wiki/Plate_trick"}
  - {title: "3D rotation group", type: wiki, url: "https://en.wikipedia.org/wiki/3D_rotation_group"}
  - {title: "Understanding quaternions and the Dirac belt trick", author: "Mark Staley", year: 2010, type: paper, url: "https://arxiv.org/abs/1001.1778"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Turn it twice and the tangle disappears

Hold a cup flat on your open palm. Rotate it a full turn, keeping it upright — your elbow ends up somewhere absurd and your arm is twisted. Now, instead of unwinding, keep rotating the same way. Halfway through the second turn your hand goes over your shoulder, and at the end of it your arm is comfortable again and the cup never tipped.

Two full turns undo what one full turn did. One does not.

The trick is a demonstration of a fact about the space of rotations. A continuous family of rotations returning to where it started is a loop in that space. The loop "spin once about an axis" cannot be shrunk to a point; the loop "spin twice" can. The fundamental group of the rotation group has exactly two elements: once-around is nontrivial, twice-around is trivial, and there is nothing else.

This is not a parlour trick that happens to have mathematics in it. It is why spin-$\tfrac12$ particles are possible: an electron's state also needs $720^\circ$ to come home.

## Rigor

$SO(3)$ is homeomorphic to $\mathbb{RP}^3$: represent a rotation by the vector along its axis with length equal to the angle, giving the closed ball of radius $\pi$, then identify antipodal boundary points, since rotating by $\pi$ about $v$ and about $-v$ agree.

$S^3 \to \mathbb{RP}^3$ is a two-sheeted covering with $S^3$ simply connected, so $S^3$ is the universal cover and
$$\pi_1(SO(3))\cong\mathbb{Z}/2\mathbb{Z}.$$
Concretely, the double cover is $SU(2)\cong S^3$, the unit quaternions, acting by $q \cdot x \cdot q^{-1}$; $q$ and $-q$ give the same rotation.

In the ball model, the once-around loop is a diameter: it runs from a boundary point to its antipode, and because the two ends are glued it *is* a loop — one that cannot be pulled off the boundary. The twice-around loop is two diameters, and the second can be slid around the sphere to cancel the first, which is exactly what your arm is doing.

The belt records the homotopy class of the path in $SO(3)$; a single twist is the nontrivial class, a double twist is the trivial one.

## Recall
type: mcq
Q: Why does the plate trick work only after two full turns?
- [x] $\pi_1(SO(3))=\mathbb{Z}/2$ — one turn is the nontrivial loop class, and two turns is the trivial one, so only the double rotation can be undone.
- [ ] Human joints happen to allow $720^\circ$ — the same phenomenon appears with a belt and with electron spin, where anatomy plays no part.
- [ ] Rotations by $360^\circ$ are not really the identity — they are the identity rotation; what differs is the *path* taken to get there.
