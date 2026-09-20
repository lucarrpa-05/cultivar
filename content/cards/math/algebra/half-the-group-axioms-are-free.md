---
id: math.algebra.groups-basics.half-the-group-axioms-are-free
topic: math.algebra.groups-basics
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, tool]
tags: [group-axioms, semigroups, cancellation, left-inverse, proof-technique]
hook: "Ask only for a left identity and left inverses. The right-handed versions arrive free — but mix the sides and it collapses."
sources:
  - {title: "Group (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Group_(mathematics)"}
  - {title: "Semigroup", type: wiki, url: "https://en.wikipedia.org/wiki/Semigroup"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You are checking twice as many axioms as you need

When you verify that something is a group you probably check four things, and two of them are free. Associativity you need. But you only have to find an identity that works on the *left*, and for each element an inverse that works on the *left*. Both right-handed versions then follow, in four lines.

Try to be clever and mix the sides and the whole thing falls apart: a left identity plus *right* inverses is not enough. There is a one-line counterexample where every element is a left identity and nothing is genuinely invertible.

The better surprise is finite. Take any non-empty finite set with an associative operation in which you can cancel — if $ax=ay$ then $x=y$, and the same on the right. That is already a group. You never asked for an identity or for inverses; finiteness hands them over. Drop finiteness and it dies: the natural numbers under addition cancel perfectly and have no inverses at all.

Here is why the free half is free.

## Rigor

**Claim.** Let $G$ be associative with $e$ satisfying $ex=x$ for all $x$, and suppose each $x$ has some $y$ with $yx=e$. Then $G$ is a group.

*Proof.* Fix $x$, take $y$ with $yx=e$, and take $z$ with $zy=e$. Then
$$xy=e(xy)=(zy)(xy)=z(yx)y=z(ey)=zy=e,$$
so $y$ is a two-sided inverse. And $xe=x(yx)=(xy)x=ex=x$, so $e$ is a two-sided identity. $\square$

**The mixed version fails.** On any set with at least two elements define $x\cdot y=y$. It is associative, every element is a left identity, and relative to a fixed $e$ every $x$ has the right inverse $e$, since $x\cdot e=e$. Not a group.

**Finite plus cancellative.** In a finite $G$ the map $x\mapsto ax$ is injective by cancellation, hence surjective. So $ax=a$ has a solution $e_a$, cancellation shows $e_a$ works as an identity for everything, and surjectivity then produces an inverse for $a$. In $(\mathbb{N},+)$ the map $x\mapsto a+x$ is injective and *not* surjective, which is exactly the step that needed finiteness.

## Recall
type: mcq
Q: Which package of assumptions already forces a group?
- [x] Associative, with a left identity and a left inverse for every element — the right-handed versions are then provable in four lines.
- [ ] Associative, with a left identity and a right inverse for every element — the operation $x\cdot y=y$ satisfies both and is not a group.
- [ ] Associative and cancellative on both sides — enough only when the set is finite; $(\mathbb{N},+)$ cancels and has no inverses.
