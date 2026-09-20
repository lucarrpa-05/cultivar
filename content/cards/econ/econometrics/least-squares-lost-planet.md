---
id: econ.econometrics.ols.least-squares-lost-planet
topic: econ.econometrics.ols
format: story
difficulty: 2
language: en
weight: medium
angles: [history, feud]
tags: [least-squares, gauss, legendre, ceres, priority-dispute]
hook: "A planet went missing in 1801. Getting it back made the tool every empirical paper still runs on famous — and started a priority war."
sources:
  - {title: "Least squares — Legendre 1805, Gauss 1809 and the priority dispute", type: wiki, url: "https://en.wikipedia.org/wiki/Least_squares"}
  - {title: "Ceres (dwarf planet) — Piazzi's discovery and Gauss's prediction", type: wiki, url: "https://en.wikipedia.org/wiki/Ceres_(dwarf_planet)"}
  - {title: "Carl Friedrich Gauss", type: wiki, url: "https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss"}
dates: {written: 2026-09-19, event: 1801-01-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Title claimed least squares was invented for Ceres, but Gauss dated his use to 1795; retitled. Piazzi tracked Ceres 24 times in six weeks, not 41 nights."}
---

# The lost planet that made least squares famous

On 1 January 1801 Giuseppe Piazzi spotted a new object between Mars and Jupiter, logged it twenty-four times in six weeks until illness stopped him, and then lost it in the glare of the sun. Ceres had been discovered and mislaid in the same season, a few dozen noisy angles the only evidence it had ever existed.

Carl Friedrich Gauss, twenty-four, took the scraps, computed an orbit by methods nobody had seen, and said where to point the telescopes in December. On the last night of 1801 Ceres was there.

Then the awkward part. When Gauss finally published, in 1809, the book carried least squares with it — and the remark that he had been using the method since 1795, four years before Adrien-Marie Legendre printed the first clear account of it, in an 1805 appendix on comet orbits. Legendre was furious, and the priority dispute never fully closed.

Worth remembering at your next regression: the tool was built for a world where the errors really were measurement slips of a telescope, and the thing being measured did not read the newspaper or respond to policy.

## Recall
type: reveal
Q: What problem was least squares built to solve, and why does that origin matter for economics?
A: Recovering one true orbit from noisy astronomical measurements. The errors there are instrument noise around a fixed law; in economics the "errors" contain everything you left out, including things that respond to the variable you care about.
