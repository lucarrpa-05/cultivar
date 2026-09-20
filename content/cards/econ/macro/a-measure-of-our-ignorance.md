---
id: econ.macro.solow.a-measure-of-our-ignorance
topic: econ.macro.solow
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, mistake]
tags: [solow-residual, growth-accounting, total-factor-productivity, capital-share, solow]
hook: "Subtract everything you can measure from growth. Whatever is left is technology — and in Solow's numbers, that was seven-eighths of it."
sources:
  - {title: "Technical Change and the Aggregate Production Function", author: "Robert M. Solow", year: 1957, type: paper, url: "https://doi.org/10.2307/1926047"}
  - {title: "Solow residual", type: wiki, url: "https://en.wikipedia.org/wiki/Solow_residual"}
  - {title: "Total factor productivity", type: wiki, url: "https://en.wikipedia.org/wiki/Total_factor_productivity"}
dates: {written: 2026-09-19, event: 1957-08-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Solow measured technology by measuring everything else

In 1957 Robert Solow did something almost rude in its simplicity. He took US data from 1909 to 1949, worked out how much of the growth in output per hour could be explained by workers getting more capital to work with, and subtracted. Whatever was left he labelled technical change.

The leftover was about seven-eighths of the growth.

That number reorganised the field. If capital accumulation explains only an eighth of why people became richer, then saving harder is not the road to prosperity, and the interesting variable is whatever "technical change" is standing in for. Everything since — human capital, R&D, institutions, misallocation — has been an attempt to open that box.

It also deserves the nickname Moses Abramovitz gave it a year earlier: "a measure of our ignorance". The residual is defined as what your model failed to account for, so it silently collects mismeasured capital, idle factories, changing quality, market power and your own mistakes.

The definition is an accounting identity, and the assumptions hide in how the weights are chosen.

## Rigor

Write $Y=A\,F(K,L)$ with $F$ constant returns to scale. Differentiating logarithmically,

$$\frac{\dot Y}{Y}=\frac{\dot A}{A}+\alpha\frac{\dot K}{K}+(1-\alpha)\frac{\dot L}{L},\qquad \alpha=\frac{\partial F}{\partial K}\frac{K}{Y},$$

so the **Solow residual** is $\dot A/A=\dot Y/Y-\alpha\dot K/K-(1-\alpha)\dot L/L$: measured growth minus the weighted growth of inputs.

The move that makes this operational is replacing the unobservable output elasticity $\alpha$ with the observable **capital share of income**. That substitution is legitimate only if factors are paid their marginal products — competitive markets and constant returns. With markups, the capital share understates $\alpha$ and the residual absorbs the difference.

So the residual is not a measurement of technology; it is a residual. If utilisation falls in a recession while measured capital does not, productivity appears to fall. Hall's later work used exactly this wedge to estimate markups — turning Solow's error term into somebody else's parameter.

## Recall
type: mcq
Q: Why is the Solow residual called "a measure of our ignorance"?
- [x] It is defined as the part of growth left unexplained, so every mismeasurement and omitted factor ends up inside it. — it is a leftover, not an observation of technology.
- [ ] Because technology cannot be measured in principle. — parts of it can be, by patents, R&D and quality adjustment; the point is what the residual sweeps up.
- [ ] Because Solow's data from 1909 to 1949 were unreliable. — the critique applies to modern data just as much.
- [ ] Because it is usually negative, which makes no sense. — it is typically positive; the problem is what it contains, not its sign.
