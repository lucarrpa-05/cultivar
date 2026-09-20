---
id: math.topology.fundamental-group.hang-a-picture-on-two-nails
topic: math.topology.fundamental-group
format: challenge
difficulty: 3
language: en
weight: light
angles: [paradox, practical]
tags: [commutator, picture-hanging, free-group, punctured-plane]
hook: "Wind the string so the picture hangs on two nails, and pulling out either nail — either one — drops it."
sources:
  - {title: "Free group", type: wiki, url: "https://en.wikipedia.org/wiki/Free_group"}
  - {title: "Fundamental group", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_group"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Hang a picture so that either nail drops it

Two nails in a wall. A picture with a loop of string. The ordinary way to hang it is over both nails, which is robust: lose one nail and the picture still hangs.

Your job is the opposite. Wind the string around the two nails so that the picture hangs securely while both nails are in place, and removing *either* nail — it does not matter which — sends it to the floor.

Most people try a few windings, fail, and conclude it is impossible. It is not, and the solution is not a trick of friction or knots: the string is a closed loop, it never crosses itself in any essential way, and you can do it with shoelaces in about fifteen seconds once you know the word to write down.

Hint, if you want one: the wall with two nails removed has a fundamental group, and it is not abelian.

## Recall
type: reveal
Q: What winding works, and why?
A: The commutator: around nail $A$, around $B$, back around $A$, back around $B$ — the word $aba^{-1}b^{-1}$. In $\pi_1$ of the plane minus two points, the free group $F_2$, that word is not the identity, so the loop cannot be pulled free and the picture hangs. Remove nail $A$ and $a$ becomes trivial, leaving $bb^{-1}=e$; remove $B$ instead and it leaves $aa^{-1}=e$. Each single-nail wall has $\pi_1=\mathbb{Z}$, where everything commutes and the word collapses.
