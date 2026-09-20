---
id: math.linear-algebra.jordan-form.same-polynomials-different-matrix
topic: math.linear-algebra.jordan-form
format: challenge
difficulty: 4
language: en
weight: light
angles: [paradox, tool]
tags: [similarity, minimal-polynomial, characteristic-polynomial, nilpotent, invariants]
hook: "Characteristic polynomial and minimal polynomial are complete invariants for similarity — until they suddenly are not."
sources:
  - {title: "Jordan normal form", type: wiki, url: "https://en.wikipedia.org/wiki/Jordan_normal_form"}
  - {title: "Minimal polynomial (linear algebra)", type: wiki, url: "https://en.wikipedia.org/wiki/Minimal_polynomial_(linear_algebra)"}
dates: {written: 2026-09-19}
related: [math.linear-algebra.jordan-form.when-diagonalisation-fails]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Find the smallest pair of matrices these two invariants cannot tell apart

Two square matrices are similar when one is the other written in a different basis. You already know two things similar matrices must share: the characteristic polynomial and the minimal polynomial. For small sizes those two together pin the matrix down completely, and it is tempting to assume they always do.

They do not. Find the smallest size at which they fail — two complex matrices that are *not* similar but have the same characteristic polynomial and the same minimal polynomial.

Work with nilpotent matrices, where all eigenvalues are 0. Then the characteristic polynomial records the total size, and the minimal polynomial records only the largest Jordan block. Ask what freedom that leaves.

## Recall
type: reveal
Q: What is the smallest size, and which two matrices?
A: Four by four. Take Jordan blocks of sizes 2+2 and of sizes 2+1+1, both with eigenvalue 0. Both have characteristic polynomial $x^4$ and minimal polynomial $x^2$, but the first has rank 2 and the second rank 1, so they are not similar. Below size 4 the two polynomials determine the Jordan type.
