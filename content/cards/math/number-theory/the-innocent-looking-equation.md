---
id: math.number-theory.diophantine.the-innocent-looking-equation
topic: math.number-theory.diophantine
format: challenge
difficulty: 3
language: en
weight: light
angles: [numbers, history, weird]
tags: [pell-equation, chakravala, brahmagupta, fermat-challenge]
hook: "Two unknowns, one equation, small coefficients. Try it by hand and you will not finish this century."
sources:
  - {title: "Pell's equation", type: wiki, url: "https://en.wikipedia.org/wiki/Pell%27s_equation"}
  - {title: "Chakravala method", type: wiki, url: "https://en.wikipedia.org/wiki/Chakravala_method"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Find the smallest positive solution of x² − 61y² = 1

Nothing about this equation looks dangerous. It has two unknowns, degree two, and a coefficient smaller than a football score. Nearby cases are trivial: $x^2-60y^2=1$ has $(31,4)$, and $x^2-62y^2=1$ has $(63,8)$. You can find both by trying $y=1,2,3,\dots$ over coffee.

Now do 61.

Before you start: how big do you expect the answer to be? Four digits? Six? Write down a guess, because the guess is the point of this card. Fermat put exactly this kind of case to the English mathematicians as a public challenge in 1657, knowing what was waiting for them.

And before Fermat, by six centuries, Indian mathematicians had a method that cracks it in a handful of steps.

## Recall
type: reveal
Q: What is the smallest positive solution of $x^2-61y^2=1$?
A: $x=1\,766\,319\,049$, $y=226\,153\,980$. Ten digits and nine, from an equation with none. Brahmagupta (628) found the composition identity behind it and Bhāskara II (c. 1150) got this exact answer with the *chakravala* cyclic method, roughly five hundred years before Europe had a general technique. The size is not an accident: solutions come from the continued-fraction expansion of $\sqrt{61}$, whose period is long, and long periods mean monstrous numerators.
