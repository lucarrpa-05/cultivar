---
id: math.analysis.chaos.three-decimal-places
topic: math.analysis.chaos
format: story
difficulty: 2
language: en
weight: light
angles: [mistake, history]
tags: [lorenz, butterfly-effect, weather-prediction, rounding, lgp-30]
hook: "In 1961 a weather simulation was restarted from a printout. Three missing decimal places produced a completely different season."
sources:
  - {title: "Edward Norton Lorenz", type: wiki, url: "https://en.wikipedia.org/wiki/Edward_Norton_Lorenz"}
  - {title: "Deterministic Nonperiodic Flow, J. Atmos. Sci. 20, 130-141", author: "Edward N. Lorenz", year: 1963, type: paper, url: "https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2"}
  - {title: "Butterfly effect", type: wiki, url: "https://en.wikipedia.org/wiki/Butterfly_effect"}
dates: {written: 2026-09-19, event: 1961-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The forecast that changed because of three decimal places

Edward Lorenz ran a toy weather model on a Royal McBee LGP-30, a desk-sized machine slower than a modern doorbell. In 1961 he wanted to look again at a stretch of simulated weather, so instead of restarting from the beginning he typed in the numbers from an earlier printout and let it run.

The new weather diverged from the old one, gently at first, then completely. A different season.

The machine carried six digits internally. The printout showed three: a value of 0.506127 came out as 0.506. That rounding, one part in a thousand, was the entire difference between the two runs.

Lorenz's conclusion was not that the computer was broken or the model too crude. It was that the equations themselves amplify. His 1963 paper, *Deterministic Nonperiodic Flow*, said it in the title: fully determined, and never repeating. A decade later he gave a talk asking whether the flap of a butterfly's wings in Brazil sets off a tornado in Texas, and the phrase escaped into the world.

Determinism and predictability, it turned out, are different things.

## Recall
type: reveal
Q: What did the rounding error actually demonstrate?
A: That the system amplifies small differences exponentially. The model was perfectly deterministic; the same input always gives the same output. But any uncertainty in the input, however small, grows until it swamps the forecast - so a deterministic system can still have a prediction horizon.
