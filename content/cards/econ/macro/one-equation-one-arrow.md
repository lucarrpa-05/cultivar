---
id: econ.macro.solow.one-equation-one-arrow
topic: econ.macro.solow
related: [econ.macro.solow.a-measure-of-our-ignorance]
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [solow-model, phase-line, steady-state, convergence, golden-rule]
callback: {from: math.analysis.ode-dynamics, to: econ.macro.solow}
hook: "One state variable, one autonomous equation, one stable fixed point — and out falls a theory of why poor countries catch up."
sources:
  - {title: "A Contribution to the Theory of Economic Growth", author: "Robert M. Solow", year: 1956, type: paper, url: "https://doi.org/10.2307/1884513"}
  - {title: "Solow–Swan model", type: wiki, url: "https://en.wikipedia.org/wiki/Solow%E2%80%93Swan_model"}
  - {title: "Economic Growth, 2nd ed., ch. 1", author: "Robert J. Barro & Xavier Sala-i-Martín", year: 2004, type: book, url: "https://mitpress.mit.edu/9780262025539/economic-growth/"}
dates: {written: 2026-09-19, event: 1956-02-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember phase lines? The whole Solow model is one

When you studied autonomous first-order equations, the payoff was that you could read off the entire future without solving anything: draw $\dot x$ against $x$, mark where it crosses zero, note the sign on each side, done. Fixed points and arrows.

Macroeconomics' most-taught model is that picture with economic labels. The state is capital per worker. Each period a fixed fraction of output is saved and added to the stock, while depreciation and a growing population dilute it. Two curves: what saving adds, and what is needed just to stand still. They cross once.

Everything famous about the model is a property of that crossing. Start below it and capital per worker rises — poor countries grow faster, *conditional* on heading to the same crossing point. Raise the saving rate and the crossing moves right: you get richer, permanently, but you grow faster only during the transition. And long-run growth per worker cannot come from capital at all, because the arrow always points back to the same place.

Which is why Solow needed the residual.

## Rigor

With $k=K/L$, saving rate $s$, depreciation $\delta$, labour growth $n$, and $f$ concave with $f(0)=0$ and the Inada conditions:

$$\dot k = s\,f(k)-(n+\delta)\,k .$$

$\dot k>0$ below the crossing and $\dot k<0$ above it, so the steady state $sf(k^*)=(n+\delta)k^*$ is unique and globally stable on $k>0$. The stability calculation is one line: concavity with $f(0)=0$ gives $f'(k^*)<f(k^*)/k^*$, hence

$$\left.\frac{d\dot k}{dk}\right|_{k^*}=s f'(k^*)-(n+\delta)<s\frac{f(k^*)}{k^*}-(n+\delta)=0 .$$

For Cobb–Douglas $f(k)=k^{\alpha}$, $k^*=\big(s/(n+\delta)\big)^{1/(1-\alpha)}$, and consumption per worker is maximised at the **golden rule** $f'(k_{\text{gold}})=n+\delta$ — saving more than that makes you permanently poorer in consumption, which is the model's one genuinely surprising policy statement.

Add labour-augmenting technical progress at rate $g$ and the same phase line runs in effective units, with long-run growth per worker equal to $g$. The arrow never generates growth; it only decides the level.

## Recall
type: mcq
Q: In the Solow model, a country permanently raises its saving rate. What happens to its long-run growth rate of output per worker?
- [x] Unchanged — it converges to a higher level, growing faster only along the transition. — long-run per-worker growth is set by technical progress, not by saving.
- [ ] Permanently higher, since more capital means more output every year. — diminishing returns make each extra unit of capital add less, until break-even investment eats it all.
- [ ] Permanently lower, because consumption falls. — consumption can fall if saving exceeds the golden rule, but growth is still governed by $g$.
- [ ] It grows without bound, since capital accumulates forever. — that needs non-diminishing returns to capital, which is the endogenous-growth departure.
