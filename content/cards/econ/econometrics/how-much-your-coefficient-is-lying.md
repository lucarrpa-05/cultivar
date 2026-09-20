---
id: econ.econometrics.omitted-variable-bias.how-much-your-coefficient-is-lying
topic: econ.econometrics.omitted-variable-bias
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, numbers]
tags: [omitted-variable-bias, endogeneity, ability-bias, auxiliary-regression, sign-the-bias]
hook: "You cannot measure ability. You can still work out which way it pushes your estimate, and usually that settles the argument."
sources:
  - {title: "Omitted-variable bias", type: wiki, url: "https://en.wikipedia.org/wiki/Omitted-variable_bias"}
  - {title: "Mostly Harmless Econometrics, ch. 3 — the omitted variables bias formula", author: "Joshua Angrist & Jörn-Steffen Pischke", year: 2009, type: book, url: "https://press.princeton.edu/books/paperback/9780691120355/mostly-harmless-econometrics"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How much your coefficient is lying, in two factors

Regress wages on years of schooling and you get something like eight percent per year. Somebody immediately says "ability" — the people who stayed in school would have earned more anyway. Fine. The useful question is not *is it biased*, it is which way, and by how much.

The answer is a product of two things you can often sign without any data at all. First: what the missing variable does to the outcome, holding schooling fixed. Ability raises wages, so positive. Second: how the missing variable moves with the variable you care about. Abler people get more schooling, so positive again. Positive times positive: your eight percent is too big, and the true return sits below it.

That is a real argument, and you made it with no measure of ability. It also says when to relax — if the missing variable is uncorrelated with your regressor, the bias is exactly zero however strongly it affects the outcome. Which is the deeper reason randomisation works.

Here is the arithmetic, in one line of covariance.

## Rigor

Suppose the true model is $y=\beta x+\gamma z+u$ with $\mathbb{E}[u\mid x,z]=0$, and you run the **short regression** of $y$ on $x$ alone. Then

$$\operatorname{plim}\hat\beta_{\text{short}}=\frac{\operatorname{Cov}(x,y)}{\operatorname{Var}(x)}=\beta+\gamma\,\underbrace{\frac{\operatorname{Cov}(x,z)}{\operatorname{Var}(x)}}_{\delta}=\beta+\gamma\delta ,$$

where $\delta$ is the slope of the **auxiliary regression** of the omitted $z$ on the included $x$. Short equals long plus (effect of omitted on $y$) times (regression of omitted on included). With $\gamma>0$ and $\delta>0$ the bias is upward; with opposite signs, downward; with $\delta=0$ it disappears.

Nothing here is special to omission. The general statement is $\operatorname{plim}\hat\beta=\beta+\operatorname{Cov}(x,u)/\operatorname{Var}(x)$: **endogeneity** is any correlation between a regressor and what is left in the error, whether from omission, from measurement error in $x$ (which drags $\hat\beta$ toward zero), or from simultaneity.

One trap the formula does not cover: controls that are themselves caused by $x$. Those change the target, not the bias.

## Recall
type: mcq
Q: Schooling raises measured wages by 8%. Ability raises wages and is higher among the more schooled. What follows?
- [x] The true return is below 8%, because the bias is (positive effect of ability) times (positive relation with schooling). — you signed the bias without ever measuring ability.
- [ ] The true return is above 8%, because a variable is missing from the model. — a missing variable does not automatically bias downward; the sign is a product of two signs.
- [ ] Nothing, since the bias could go either way. — in general yes, but here both factors are signed, so the direction is pinned down.
- [ ] The true return is 8%, since ability affects wages but not schooling. — that needs the auxiliary slope to be zero, which contradicts the premise.
