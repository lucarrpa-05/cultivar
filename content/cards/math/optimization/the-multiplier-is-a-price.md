---
id: math.optimization.lagrange-duality.the-multiplier-is-a-price
topic: math.optimization.lagrange-duality
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, practical]
tags: [lagrange-multiplier, shadow-price, envelope-theorem, constraint, tangency]
hook: "The multiplier is taught as bookkeeping you throw away at the end. It is usually the number you actually wanted."
sources:
  - {title: "Lagrange multiplier", type: wiki, url: "https://en.wikipedia.org/wiki/Lagrange_multiplier"}
  - {title: "Shadow price", type: wiki, url: "https://en.wikipedia.org/wiki/Shadow_price"}
  - {title: "Envelope theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Envelope_theorem"}
dates: {written: 2026-09-19}
diagram: {file: math/lagrange-tangency.svg, caption: "At the best feasible point the constraint is tangent to a level curve, so the two gradients are parallel.", alt: "Hyperbolic level curves of an objective and a straight constraint line touching one of them at a single point, with two parallel arrows drawn at that point"}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Replaced a distractor that was arguably true (with an equality constraint a zero multiplier does force a zero objective gradient) with a real misconception."}
---

# The multiplier is a price

Lagrange multipliers get introduced as a device: add $\lambda$ times the constraint, differentiate, solve, discard $\lambda$. Most people never find out that $\lambda$ is often the interesting part of the answer.

Here is what it is. You are maximising something subject to a constraint at level $c$. Now imagine the constraint loosens slightly — one more peso of budget, one more machine-hour, one more gram of catalyst. The optimum improves by some amount per unit of loosening, and that rate is exactly $\lambda$.

So $\lambda$ is a price: the most you should be willing to pay for one more unit of the scarce thing. Zero means the constraint is not binding and extra is worthless. Large means you are being strangled by it. In a factory it prices machine time; in a portfolio it prices risk; in a government budget it prices the crowded-out programme.

The picture is tangency. At the optimum, the constraint curve just grazes a level set of the objective, so their gradients point the same way and $\lambda$ is the ratio between them.

## Rigor

Maximise $f(x)$ subject to $g(x)=c$. Form $\mathcal{L}(x,\lambda)=f(x)-\lambda\,(g(x)-c)$. Stationarity gives
$$\nabla f(x^{*})=\lambda^{*}\,\nabla g(x^{*}),$$
which is the tangency: the gradients are parallel, and $\lambda^{*}$ is the proportionality constant.

**Envelope theorem.** Let $v(c)=\max\{f(x):g(x)=c\}$. Then, under regularity,
$$\frac{dv}{dc}=\lambda^{*}.$$
The multiplier is the derivative of the optimal value with respect to the constraint level. That is the whole "price" claim, and it is why $\lambda$ carries units of objective per unit of constraint.

**Check it.** Maximise $xy$ subject to $x+2y=m$. Stationarity gives $y=\lambda$, $x=2\lambda$, so $x=m/2$, $y=m/4$, $\lambda=m/4$. The optimal value is $v(m)=m^{2}/8$, and $v'(m)=m/4=\lambda$. At $m=6$: the optimum is $4.5$ and one more unit of budget buys $1.5$ more.

## Recall
type: mcq
Q: What does a Lagrange multiplier of zero tell you?
- [x] The constraint is not binding — relaxing it buys nothing, so its shadow price is zero.
- [ ] The problem has no solution — a zero multiplier is perfectly compatible with a well-defined optimum in the interior.
- [ ] You may as well drop the constraint and solve the unconstrained problem — the optimum still has to satisfy $g(x)=c$; what is zero is the *rate* at which loosening it would pay.
