---
id: math.algebra.polynomials-factorization.cardano-and-the-broken-oath
topic: math.algebra.polynomials-factorization
format: series
difficulty: 2
language: en
weight: medium
angles: [feud, history]
tags: [cubic-equation, cardano, tartaglia, ars-magna, quartic]
hook: "A formula for the cubic was a weapon you kept secret. Cardano swore an oath to keep one, and then published it."
series: {id: math.algebra.why-you-cannot-solve-the-quintic, index: 1, total: 4, title: "Why you can't solve the quintic"}
sources:
  - {title: "Cubic equation", type: wiki, url: "https://en.wikipedia.org/wiki/Cubic_equation"}
  - {title: "Nicolo Tartaglia", type: wiki, url: "https://en.wikipedia.org/wiki/Nicolo_Tartaglia"}
  - {title: "Gerolamo Cardano", type: wiki, url: "https://en.wikipedia.org/wiki/Gerolamo_Cardano"}
dates: {written: 2026-09-19, event: 1545-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "1545 to Ruffini is 254 years, not 275. Tartaglia, del Ferro, Fior and Ferrari all check out."}
---

# A formula worth swearing an oath over, and then breaking it

Scipione del Ferro, in Bologna in the early 1500s, worked out how to solve $x^3+mx=n$ and told almost nobody. That was rational behaviour. Italian mathematicians held their university chairs by winning public problem contests, so a method was a weapon and you did not show it to people you might have to fight.

In 1535 del Ferro's student Antonio Fior challenged Niccolò Tartaglia — who stammered from a sabre wound to the jaw taken as a boy during the sack of Brescia — to thirty problems. Tartaglia reconstructed the method himself, days before the deadline, and took every one.

In 1539 Gerolamo Cardano coaxed the method out of Tartaglia, in verse, under an oath never to publish it. Cardano later saw del Ferro's own unpublished notebook, dated before Tartaglia's discovery, decided the oath protected a formula Tartaglia had not been first to find, and printed it in *Ars Magna* in 1545. Tartaglia raged about it for the rest of his life. In the same book is Ferrari's solution of the quartic.

Degree three and degree four, both inside a decade. Then silence for two and a half centuries.

## Rigor

Substituting $x=y-\tfrac{a_2}{3}$ turns $x^3+a_2x^2+a_1x+a_0$ into a depressed cubic $y^3+py+q=0$. Now set $y=u+v$. Since $y^3=u^3+v^3+3uv(u+v)$,
$$y^3-3uv\,y-(u^3+v^3)=0,$$
so it suffices to choose $uv=-p/3$ and $u^3+v^3=-q$. Then $u^3$ and $v^3$ are the two roots of $t^2+qt-\tfrac{p^3}{27}=0$, giving
$$y=\sqrt[3]{-\tfrac q2+\sqrt{\tfrac{q^2}4+\tfrac{p^3}{27}}}+\sqrt[3]{-\tfrac q2-\sqrt{\tfrac{q^2}4+\tfrac{p^3}{27}}}.$$

Ferrari's quartic works the same way one floor up: a clever completion of the square reduces any quartic to a **resolvent cubic**, so degree 4 collapses onto degree 3.

The pattern begs to continue — each degree leaning on the one below. It does not, and what stops it is not a shortage of cleverness. It is the symmetry of the roots themselves, and the man who first proved that printed the proof at his own expense, six pages, to save money.

## Recall
type: mcq
Q: What does the substitution $y=u+v$ actually buy you in Cardano's method?
- [x] It converts one cubic condition into two simpler simultaneous ones — a product $uv$ and a sum $u^3+v^3$ — which are the coefficients of a quadratic.
- [ ] It removes the quadratic term — that is the earlier substitution $x=y-a_2/3$; the $u+v$ trick comes after.
- [ ] It guarantees real answers — it does not; three real roots force square roots of negative numbers into the formula.
