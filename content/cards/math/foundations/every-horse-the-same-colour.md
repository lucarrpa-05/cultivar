---
id: math.foundations.induction-recursion.every-horse-the-same-colour
topic: math.foundations.induction-recursion
format: challenge
difficulty: 1
language: en
weight: light
angles: [mistake, paradox]
tags: [induction, base-case, fallacy, horses]
hook: "The induction is clean, the base case is true, and the conclusion is that all horses are the same colour."
sources:
  - {title: "All horses are the same color", type: wiki, url: "https://en.wikipedia.org/wiki/All_horses_are_the_same_color"}
  - {title: "Mathematical induction", type: wiki, url: "https://en.wikipedia.org/wiki/Mathematical_induction"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# All horses are the same colour. Find the bug.

**Claim.** In any set of $n$ horses, all the horses have the same colour.

**Base case.** $n=1$: one horse, one colour. True.

**Inductive step.** Suppose it holds for $n$. Take $n+1$ horses. Remove the last one: the first $n$ horses all share a colour, by the hypothesis. Now put it back and remove the first one instead: those $n$ horses all share a colour too. The two groups overlap, so the colour is the same in both, and all $n+1$ horses share it.

By induction, every finite set of horses is monochrome. George Pólya used this in 1954 to make a point that every proof you write from here on depends on.

The logic is valid at every step you have checked. So which step did you not check?

## Recall
type: reveal
Q: Where does the horse induction break?
A: At $n=1\to n=2$. With two horses, removing the last leaves {first} and removing the first leaves {second}: the two groups share no horse, so "the overlap forces the same colour" has nothing to stand on. The step is valid for every $n\ge 2$ and fails exactly once — which is enough to sink it.
