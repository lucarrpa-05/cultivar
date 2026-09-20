---
id: econ.history-thought.marx.marx-was-a-ricardian
topic: econ.history-thought.marx
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, mistake]
tags: [marx, labour-theory-of-value, transformation-problem, okishio, das-kapital]
hook: "Marx's economics starts from Ricardo's, taken seriously. The place it broke is an arithmetic problem that took a century to settle."
sources:
  - {title: "Transformation problem", type: wiki, url: "https://en.wikipedia.org/wiki/Transformation_problem"}
  - {title: "Das Kapital", author: "Karl Marx", year: 1867, type: book, url: "https://en.wikipedia.org/wiki/Das_Kapital"}
  - {title: "Okishio's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Okishio%27s_theorem"}
dates: {written: 2026-09-19, event: 1867-09-14}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Marx was a Ricardian, and the arithmetic caught up with him

Strip away the politics and volume one of *Capital* (1867) is classical economics done stubbornly. Ricardo had said that the value of a commodity traces back to the labour needed to produce it. Marx accepted that and asked where profit comes from if everything exchanges at its value — answering that labour power itself is a commodity, bought at its cost of reproduction, whose use yields more value than it costs.

Then the bill arrives. Industries use very different mixtures of machinery and workers, so if goods sold at their labour values, capital-heavy industries would earn lower profit rates than labour-heavy ones. Competition does not allow that. Volume three, which Engels assembled after Marx's death and published in 1894, tries to convert values into "prices of production" with an economy-wide profit rate — and the conversion does not close.

Böhm-Bawerk pounced in 1896. Bortkiewicz produced a consistent version in 1907, at the cost of Marx's two aggregate equalities. Nobuo Okishio then proved in 1961 that cost-reducing technical change with constant real wages *cannot* lower the profit rate — contradicting one of Marx's central predictions.

## Rigor

In volume one a commodity's value is $c+v+s$: constant capital consumed, variable capital (wages), and surplus value. The rate of exploitation is $s/v$ and the profit rate is

$$r=\frac{s}{c+v}=\frac{s/v}{(c/v)+1},$$

falling in the organic composition $c/v$. That is the mechanism behind the predicted tendency of the profit rate to fall.

The **transformation problem** is that competition equalises $r$ across sectors, so sector prices must be $(c+v)(1+r)$ rather than $c+v+s$. Marx transformed outputs at these prices while leaving inputs valued at labour values, which is inconsistent; done simultaneously, Bortkiewicz showed you generally cannot have both "total price = total value" and "total profit = total surplus value".

**Okishio's theorem** closes the other flank. If a technique is adopted because it cuts cost at current prices, and the real wage bundle is unchanged, the new uniform profit rate is at least as high as the old. A falling profit rate therefore needs rising real wages, not mechanisation — a result proved with the same linear-algebra machinery as Sraffa's price systems.

## Recall
type: mcq
Q: What is the transformation problem?
- [x] Prices that equalise profit rates across industries cannot generally be derived from labour values while preserving Marx's aggregate equalities. — inputs and outputs must be transformed together, and then the totals stop matching.
- [ ] That labour cannot be measured in homogeneous units. — a separate difficulty about reducing skilled to unskilled labour.
- [ ] That Marx never finished volume three of Capital. — Engels did assemble it posthumously, but the inconsistency is mathematical, not editorial.
- [ ] That profit rates differ across countries. — the problem concerns industries within one economy facing a common rate.
