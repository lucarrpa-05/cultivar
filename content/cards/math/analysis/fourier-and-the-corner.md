---
id: math.analysis.fourier.fourier-and-the-corner
topic: math.analysis.fourier
format: story
difficulty: 3
language: en
weight: medium
angles: [feud, history]
tags: [fourier, lagrange, heat-equation, trigonometric-series, paris-academy]
hook: "Fourier claimed smooth waves could add up to a corner. The greatest analyst alive told him it was impossible, and blocked the paper."
sources:
  - {title: "Joseph Fourier", type: wiki, url: "https://en.wikipedia.org/wiki/Joseph_Fourier"}
  - {title: "Fourier series (history)", type: wiki, url: "https://en.wikipedia.org/wiki/Fourier_series"}
  - {title: "Theorie analytique de la chaleur", author: "Joseph Fourier", year: 1822, type: book, url: "https://en.wikipedia.org/wiki/Th%C3%A9orie_analytique_de_la_chaleur"}
dates: {written: 2026-09-19, event: 1807-12-21}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The corner that was not allowed to exist

On 21 December 1807 Fourier handed the Paris Institute a memoir on how heat spreads through a solid, containing a claim that read as vandalism: *any* function, however jagged, is a sum of sines and cosines.

Lagrange, who had studied vibrating strings for forty years and had come close to the same series himself, refused it. His instinct was sound. Every sine is infinitely smooth; sums of smooth things stay smooth; a square wave has corners, and no amount of adding waves should produce one. The memoir was not published.

The Institute set heat as its 1811 prize problem. Fourier entered, won, and was told by the jury — Lagrange, Laplace, Legendre, Malus — that his derivations still fell short on generality and rigour. The work appeared in full only in 1822, in the *Théorie analytique de la chaleur*.

The verdict now: the claim was false as stated and right about the world. Sorting out which functions it holds for produced Dirichlet's conditions, Riemann's integral, Cantor's set theory and most of modern analysis. Lagrange's objection was not stubbornness; it was the discovery that pointwise convergence is strange.

## Recall
type: reveal
Q: Who was right, Fourier or Lagrange?
A: Both, partly. Lagrange was right that a convergent sum of smooth functions need not be smooth in any naive sense - that is exactly the failure Abel later exhibited. Fourier was right that the expansions work, and pinning down the conditions took a century and built modern analysis.
