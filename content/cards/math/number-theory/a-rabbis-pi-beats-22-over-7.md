---
id: math.number-theory.transcendence.a-rabbis-pi-beats-22-over-7
topic: math.number-theory.transcendence
format: news
difficulty: 2
language: en
weight: light
angles: [history, numbers]
tags: [pi, continued-fractions, diophantine-approximation, ibn-ezra, zeilberger]
hook: "Tucked into a 12th-century commentary on Exodus: a π of the form (a/b)√2 that nothing with a denominator under 77 can beat."
related: [math.number-theory.transcendence.almost-all-and-almost-none]
sources:
  - {title: "Approximating Pi (and other constants) by Radicals in the Footsteps of Rabbi Abraham Ibn Ezra and Guru RSJ Reddy", author: "Doron Zeilberger", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.25098"}
  - {title: "Abraham ibn Ezra", type: wiki, url: "https://en.wikipedia.org/wiki/Abraham_ibn_Ezra"}
dates: {written: 2026-09-23, event: 2026-09-19, expires: 2026-11-03}
evergreen: false
author: author-news-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "event was 2026-09-23 but the arXiv v1 and the body say 19 Sep; set event 2026-09-19, expires 2026-11-03. Checked against the paper: ibn Ezra gives a construction that works out to 20√2/9 (reworded); Prop. 1 is b < 77. Checked 171/77 in node: it is the smallest-denominator a/b closer to π/√2 than 20/9 (an intermediate fraction; the next convergent is 311/140). Now says 'smallest-denominator'. Added the why-it-matters line; hook made precise."}
---

# A 12th-century rabbi's π beats 22/7, just barely

On 19 September 2026, Doron Zeilberger posted a four-page note on the π of Abraham ibn Ezra, the 12th-century poet and astronomer from Tudela. In his commentary on Exodus 3:15, ibn Ezra gives a ruler-and-compass construction that works out to 20√2/9 = 3.14270: off by 0.0011, a hair better than 22/7. Zeilberger shows that no (a/b)√2 with b below 77 does better, then has a computer find sharper ones.

You can check the 77 by hand. Expand π/√2 as a continued fraction: 20/9 is a convergent, and the smallest-denominator fraction that lands closer is 171/77.

Caveat: "optimal" only inside a hand-picked family with bounded denominators.
