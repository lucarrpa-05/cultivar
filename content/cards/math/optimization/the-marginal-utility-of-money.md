---
id: math.optimization.lagrange-duality.the-marginal-utility-of-money
topic: math.optimization.lagrange-duality
topics: [econ.micro.consumer-choice]
format: callback
difficulty: 4
language: en
weight: medium
angles: [connection, practical]
tags: [consumer-choice, marginal-utility-of-income, indirect-utility, duality, roy-identity]
hook: "The multiplier in the consumer's problem has a name in every micro course, and nobody mentions that it is the same object."
callback: {from: math.optimization.lagrange-duality, to: econ.micro.consumer-choice}
sources:
  - {title: "Consumer choice", type: wiki, url: "https://en.wikipedia.org/wiki/Consumer_choice"}
  - {title: "Indirect utility function", type: wiki, url: "https://en.wikipedia.org/wiki/Indirect_utility_function"}
  - {title: "Hicksian demand function", type: wiki, url: "https://en.wikipedia.org/wiki/Hicksian_demand_function"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the multiplier as a price? Here it is called income

You met $\lambda$ as the rate at which the optimum improves when the constraint loosens. Put a consumer in that problem and the constraint is a budget, so loosening it means giving the person another peso.

The multiplier is therefore the marginal utility of income: how much better off one more peso makes you. Intermediate micro states this as a result. It is the same theorem you already have.

The first-order conditions say something you can act on. At the optimum, marginal utility per peso is equal across every good you buy — $\partial u/\partial x_i$ divided by $p_i$ is the same number for all $i$, and that number is $\lambda$. If chocolate gives more utility per peso than coffee, you are not optimising; shift spending until the ratios level out. All of consumer theory's "equate the ratios" slogans are this one equation.

One honest warning, which most courses skip.

## Rigor

$\max u(x)$ subject to $p^{\top}x=m$. With $\mathcal{L}=u(x)-\lambda(p^{\top}x-m)$,
$$\frac{\partial u}{\partial x_i}=\lambda p_i\quad\forall i\ \Longrightarrow\ \frac{\partial u/\partial x_i}{p_i}=\lambda \ \ \text{for every purchased good},$$
and dividing any two gives $\mathrm{MRS}_{ij}=p_i/p_j$: the indifference curve is tangent to the budget line, the same tangency as before.

By the envelope theorem applied to the indirect utility $v(p,m)=\max\{u(x):p^{\top}x=m\}$,
$$\lambda=\frac{\partial v}{\partial m},$$
which is the marginal utility of income, and Roy's identity $x_i=-\dfrac{\partial v/\partial p_i}{\partial v/\partial m}$ is the same derivative taken in the other direction. The dual problem — minimise $p^{\top}x$ subject to $u(x)\ge \bar u$ — has multiplier $1/\lambda$ and produces Hicksian demand.

**The warning.** Utility is ordinal: replacing $u$ by $2u$ or $\ln u$ describes the same preferences and the same choices, but multiplies or mangles $\lambda$. So $\lambda$ is a genuine shadow price *within* one chosen representation and is not comparable across people or across representations. Welfare arguments that add up marginal utilities of income are assuming much more than the maths gives them.

## Recall
type: mcq
Q: What does the consumer's Lagrange multiplier measure?
- [x] The marginal utility of income — the derivative of the maximised utility with respect to the budget, for the chosen utility representation.
- [ ] The price of the cheapest good — prices enter through the constraint, and $\lambda$ has units of utility per peso, not pesos.
- [ ] A quantity of the optimal bundle — the bundle is the $x$; the multiplier is a rate, not a quantity.
