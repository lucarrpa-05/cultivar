---
id: math.analysis.differentiation.derivatives-cannot-jump
topic: math.analysis.differentiation
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, beautiful]
tags: [darboux-theorem, intermediate-value-property, derivative, discontinuity, mean-value]
hook: "A derivative can be discontinuous at uncountably many points. It can still never have a jump. Nobody expects that combination."
sources:
  - {title: "Darboux's theorem (analysis)", type: wiki, url: "https://en.wikipedia.org/wiki/Darboux%27s_theorem_(analysis)"}
  - {title: "Principles of Mathematical Analysis, 3rd ed., ch. 5", author: "Walter Rudin", year: 1976, type: book, url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Derivatives can be wild, but they cannot jump

Take $f(x)=x^{2}\sin(1/x)$ with $f(0)=0$. It is differentiable everywhere, including at the origin, where $f'(0)=0$. But $f'$ oscillates between $-1$ and $1$ as $x\to 0$: the derivative of a perfectly differentiable function is discontinuous. So derivatives are not tame.

Now try to build a worse one. Make a function whose derivative is $0$ to the left of a point and $1$ to the right — a clean step, the mildest discontinuity there is. You cannot. Darboux proved in 1875 that every derivative, continuous or not, has the intermediate value property: it takes every value between any two of its values.

So the step function is nobody's derivative. Derivatives may be discontinuous in the messy way, where the values crowd densely around a whole interval, and never in the tidy way, where they skip. Continuity is not what forbids the jump — something else is.

## Rigor

**Darboux (1875).** If $f$ is differentiable on $[a,b]$ and $c$ lies strictly between $f'(a)$ and $f'(b)$, then $f'(\xi)=c$ for some $\xi\in(a,b)$.

*Proof.* Say $f'(a)<c<f'(b)$ and set $g(x)=f(x)-cx$, so $g'(a)<0<g'(b)$. $g$ is continuous on the compact $[a,b]$, so it attains a minimum. It is not at $a$: $g'(a)<0$ means $g$ decreases just to the right of $a$. It is not at $b$: $g'(b)>0$ means $g$ decreases just to the left of $b$. So the minimum is at an interior $\xi$, where Fermat's condition gives $g'(\xi)=0$, i.e. $f'(\xi)=c$. $\square$

The engine is the extreme value theorem, not continuity of $f'$ — which is why the wild oscillating derivative of $x^{2}\sin(1/x)$ obeys it too. "Cannot skip a value" comes from compactness; "can be discontinuous" is left untouched.

## Recall
type: mcq
Q: Which function is definitely not the derivative of anything on $[-1,1]$?
- [x] The step that is $0$ for $x<0$ and $1$ for $x\ge 0$ — it skips every value in $(0,1)$, which Darboux forbids.
- [ ] $\sin(1/x)$ extended by $0$ at the origin — wildly discontinuous but it hits every value in $[-1,1]$ near $0$, and it is a derivative.
- [ ] A continuous function — every continuous function on an interval is the derivative of one of its antiderivatives.
