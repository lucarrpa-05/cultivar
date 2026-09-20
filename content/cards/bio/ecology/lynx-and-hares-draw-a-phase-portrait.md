---
id: bio.ecology.population-dynamics.lynx-and-hares-draw-a-phase-portrait
topic: bio.ecology.population-dynamics
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers]
tags: [lotka-volterra, predator-prey, phase-portrait, hudsons-bay, volterras-principle]
callback: {from: math.analysis.ode-dynamics, to: bio.ecology.population-dynamics}
hook: "A century of fur-trade ledgers, two coupled ODEs, and closed orbits that never settle and never die."
sources:
  - {title: "Lotka–Volterra equations", type: wiki, url: "https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"}
  - {title: "The Ten-Year Cycle in Numbers of the Lynx in Canada, Journal of Animal Ecology 11(2), 215–244", author: "Charles Elton and Mary Nicholson", year: 1942, type: paper, url: "https://doi.org/10.2307/1358"}
  - {title: "Impact of Food and Predation on the Snowshoe Hare Cycle, Science 269, 1112–1115", author: "Charles J. Krebs et al.", year: 1995, type: paper, url: "https://doi.org/10.1126/science.269.5227.1112"}
  - {title: "Do Hares Eat Lynx?, The American Naturalist 107, 727–730", author: "Michael E. Gilpin", year: 1973, type: paper, url: "https://doi.org/10.1086/282870"}
diagram: {file: bio/lotka-volterra-phase.svg, caption: "Each loop is one solution: prey rise, predators follow, prey crash, predators starve. Nothing spirals in or out — the orbit you start on is the orbit you keep.", alt: "Hares on the horizontal axis, lynx on the vertical: four nested closed loops circle counter-clockwise around a marked centre where two dashed nullclines cross."}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember phase portraits? Lynx and hares drew one

You learned to read trajectories in the plane: fixed points, nullclines, orbits that close or spiral. Here is the same picture with fur in it.

The Hudson's Bay Company logged pelts for more than a century, and when Elton and Nicholson plotted lynx against snowshoe hare in 1942 the two series rose and fell on a roughly ten-year cycle, the predator trailing the prey. Volterra had already written equations that do that, in 1926, for a different reason: his son-in-law had noticed that the share of predatory fish in Adriatic catches went *up* during the First World War, when the boats stayed in port. Lotka had the same system in 1925.

Be careful with the ledgers. They count pelts traded, not animals alive, and the hare cycle is not a two-species affair — a Yukon field experiment found food and predation together produce an eleven-fold effect, far more than either alone. In the fur data the lynx peak sometimes even appears to *precede* the hare peak, which is almost certainly an artefact of trapping.

What the model does deliver is exact.

## Rigor

$$\dot{x}=\alpha x-\beta x y, \qquad \dot{y}=-\gamma y+\delta x y .$$

Fixed points: the origin (a saddle) and $(x^{*},y^{*})=(\gamma/\delta,\ \alpha/\beta)$, where the Jacobian has eigenvalues $\pm i\sqrt{\alpha\gamma}$ — purely imaginary, so linearisation is inconclusive. The quantity

$$V=\delta x-\gamma\ln x+\beta y-\alpha\ln y$$

is conserved, so every trajectory lies on a level set of $V$: a genuine centre, closed orbits, no damping. It is also structurally unstable — the smallest realistic perturbation turns the centre into a spiral, which is why nobody claims real populations sit on these curves.

Two exact consequences survive anyway. Divide the first equation by $x$: $\frac{d}{dt}\ln x=\alpha-\beta y$. Integrate over one period and the left side vanishes, giving $\bar{y}=\alpha/\beta$; the same move gives $\bar{x}=\gamma/\delta$. **Time averages equal the fixed point**, whatever loop you are on.

Now harvest both species at rate $h$: $\alpha\mapsto\alpha-h$, $\gamma\mapsto\gamma+h$. The averages become $\bar{y}=(\alpha-h)/\beta$ and $\bar{x}=(\gamma+h)/\delta$. Killing indiscriminately *raises* mean prey and *lowers* mean predators — so stopping fishing does the reverse. That is Volterra's principle, and it is what the Adriatic catch data had been showing all along.

## Recall
type: mcq
Q: The Lotka–Volterra system has a centre, not a stable spiral. Why does that matter for using it on real data?
- [x] The amplitude of the cycle is set entirely by initial conditions and never decays — and the centre is destroyed by any small perturbation, so real cycles need extra structure to explain.
- [ ] It means the populations must eventually go extinct — orbits are closed and periodic; neither species dies out in the model.
- [ ] It means the model has no equilibrium — it has one, at $(\gamma/\delta,\alpha/\beta)$, and that point is the time average of every orbit.
- [ ] It means the predator and prey peak simultaneously — they cannot; the predator peak lags the prey peak by a quarter cycle.
