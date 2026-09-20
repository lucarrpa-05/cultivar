---
id: niche.music.theory-math.the-circle-does-not-close
topic: niche.music.theory-math
format: series
difficulty: 2
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [pythagorean-comma, circle-of-fifths, continued-fractions, irrationality, tuning]
hook: "Go up twelve perfect fifths and you should land seven octaves higher. You land a quarter of a semitone past it."
series: {id: niche.music.temperament-arc, index: 1, total: 3, title: "Why the piano is a lie"}
sources:
  - {title: "Pythagorean comma", type: wiki, url: "https://en.wikipedia.org/wiki/Pythagorean_comma"}
  - {title: "Circle of fifths", type: wiki, url: "https://en.wikipedia.org/wiki/Circle_of_fifths"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The circle of fifths is not a circle

Start on C and climb by perfect fifths — the interval that sounds most obviously *right* to a human ear, two strings vibrating at a clean 3:2. C, G, D, A, E, B, F♯, C♯, G♯, D♯, A♯, E♯, and the twelfth step lands you on B♯, which on a piano is the key marked C.

It is not the same C. Twelve fifths multiply out to $(3/2)^{12}=129.746\ldots$, while seven octaves are exactly $2^7=128$. You have overshot by a factor of 531441/524288, about 1.36%.

That sounds trivial. It is not: in musical units the gap is 23.46 cents, nearly a quarter of a semitone, and any competent listener hears it as out of tune. It is called the Pythagorean comma, and it has been the central embarrassment of Western music for 2,500 years.

You might hope it is a rounding artefact that a cleverer tuning would fix. It is not fixable, and the proof is one line.

## Rigor

Suppose $m$ fifths equalled $n$ octaves exactly: $(3/2)^{m}=2^{n}$, so $3^{m}=2^{n+m}$. For $m\ge 1$ the left side is odd and the right even — contradiction. Equivalently, $\log_2(3/2)=0.5849625\ldots$ is irrational, so the fifths spiral forever and never revisit a pitch.

The only question left is which rational approximations are *good*, and continued fractions answer it exactly. The expansion $\log_2(3/2)=[0;1,1,2,2,3,1,5,2,\ldots]$ gives convergents

$$\tfrac11,\;\tfrac12,\;\tfrac35,\;\tfrac7{12},\;\tfrac{24}{41},\;\tfrac{31}{53}.$$

There is the twelve-note keyboard: $7/12$, the fourth convergent, meaning twelve equal steps put the fifth at 700 cents against a true 701.955. The next serious improvements are 41 and 53 notes to the octave — and 53-tone equal temperament really does have a famously pure fifth, 701.887 cents, wrong by seven hundredths of a cent.

Western music has twelve notes because a continued fraction has a large partial quotient in the right place. Nothing deeper.

So: 23.46 cents you cannot destroy. The only choice is where to put them — and that choice is the next three hundred years of music.

## Recall
type: mcq
Q: Why can no tuning make a whole number of perfect fifths equal a whole number of octaves?
- [x] It would force $3^{m}=2^{n+m}$, which unique factorisation forbids — $\log_2(3/2)$ is irrational, so the spiral of fifths never closes.
- [ ] Because human hearing is imprecise — the gap is an exact arithmetic fact, audible or not.
- [ ] Because the octave is not exactly 2:1 — the octave is exactly 2:1 by definition; the fifth is what gets bent.
