---
id: css.abm.schelling.want-half-get-four-fifths
topic: css.abm.schelling
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, numbers, connection]
tags: [schelling, segregation, checkerboard, thresholds, tipping]
hook: "Schelling ran the first famous social simulation by hand, moving coins on graph paper one at a time."
sources:
  - {title: "Dynamic Models of Segregation", author: "Thomas C. Schelling", year: 1971, type: paper, url: "https://doi.org/10.1080/0022250X.1971.9989794"}
  - {title: "Schelling's model of segregation", type: wiki, url: "https://en.wikipedia.org/wiki/Schelling%27s_model_of_segregation"}
  - {title: "Thomas Schelling", type: wiki, url: "https://en.wikipedia.org/wiki/Thomas_Schelling"}
dates: {written: 2026-09-19, event: 1971-01-01}
diagram: {file: css/schelling-before-after.svg, caption: "Schelling's rule run on a board of his size — 138 coins on 13 × 16 squares: 53% of neighbours match at the random start, 75% once nobody wants to move.", alt: "Two grids of filled and open circles: the left one mixed at random, the right one clumped into large single-colour blocks with empty gaps between them"}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Diagram caption claimed an equilibrium 'after 45 people move', which the figure does not show; recaptioned with the run's measured 53% -> 75%. Body numbers all check against Schelling pp. 155-159."}
author: author-css-1
---

# Want half your neighbours to match. You'll get four-fifths.

Thomas Schelling did it on graph paper with two kinds of coin: 13 rows, 16 columns, 138 coins, the rest of the squares blank. Each coin looks at the eight squares around it and asks one modest question — are at least half of my neighbours my colour? Nobody wants to be surrounded by strangers. Nobody objects to a 50-50 street. An unhappy coin moves to the nearest empty square where the answer is yes.

In the random start, coins already averaged about half like neighbours; 43 of them were unhappy anyway. Schelling moved those by hand, then the newly unhappy ones, until nobody wanted to move. Result: one colour now averaged five-sixths of its neighbours matching, the other four-fifths. The share of coins who saw no other colour at all went from one in ten to four in ten.

No coin is a racist. Everyone got what they asked for. Nobody asked for this. So what is the actual threshold?

## Rigor

Write the demand as $\tau$: a coin is content iff $\ell/(\ell+u)\ge\tau$, where $\ell$ and $u$ count like and unlike neighbours among the eight surrounding squares, and a coin with no neighbours is content. Schelling's headline run is $\tau=\tfrac12$.

His comparative statics are the part that gets misquoted. At $\tau\approx\tfrac13$ the equilibrium ratio of like to unlike neighbours is *under* $1.5$ — mild sorting. At $\tau\ge\tfrac12$ it is "upwards of four to one", and the curve climbs steeply between about 35% and 50% (1971, pp. 158–159). The slogan "a one-third preference produces total segregation" is not what the 1971 paper reports; one-half is.

Why a half is the knife edge: if the two colours demand shares $\tau_A$ and $\tau_B$ of like neighbours and $\tau_A+\tau_B>1$, then inside any fixed boundary no mixture satisfies both, so the only stable arrangements are separated ones. At $\tau_A=\tau_B=\tfrac12$ the sum is exactly one. The "at least half" each coin asked for sits precisely on the edge, and movement pushes the board off it.

## Recall
type: mcq
Q: In Schelling's checkerboard, what does each coin actually demand?
- [x] That at least half of its eight surrounding neighbours share its colour — a coin is perfectly happy on a 50-50 street.
- [ ] That a majority of the whole board share its colour — the model is entirely local; no coin can see past its own eight squares.
- [ ] That no neighbour be of the other colour — that demand would make segregation trivial rather than surprising.
