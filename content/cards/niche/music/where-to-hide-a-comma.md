---
id: niche.music.tuning.where-to-hide-a-comma
topic: niche.music.tuning
format: series
difficulty: 2
language: en
weight: heavy
angles: [history, tool]
tags: [meantone, wolf-fifth, well-temperament, bach, pythagorean-tuning]
hook: "You cannot destroy the comma. You can only decide which chord has to carry it — and that decision picks which keys exist."
series: {id: niche.music.temperament-arc, index: 2, total: 3, title: "Why the piano is a lie"}
prerequisites: [niche.music.theory-math]
sources:
  - {title: "Quarter-comma meantone", type: wiki, url: "https://en.wikipedia.org/wiki/Quarter-comma_meantone"}
  - {title: "Well temperament", type: wiki, url: "https://en.wikipedia.org/wiki/Well_temperament"}
  - {title: "The Well-Tempered Clavier", type: wiki, url: "https://en.wikipedia.org/wiki/The_Well-Tempered_Clavier"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Somewhere on your keyboard, a wolf is living

Twenty-three cents have to go somewhere. Pythagorean tuning makes the brutal choice: tune eleven fifths pure and shove the whole comma into the twelfth. That last interval beats violently, and was nicknamed the *wolf* for the howl. Play in the wrong key and the wolf is in your chord.

Renaissance musicians made a different trade. They cared less about fifths than about *thirds*, which Pythagorean tuning leaves badly sharp. Quarter-comma meantone flattens every fifth slightly so that the major thirds come out perfect at 5:4 — luminous, beatless triads, which is why Renaissance choral music sounds the way it does. The price: the leftover fifth is now even worse, and whole regions of the keyboard become unplayable. You composed in the keys that worked.

Around 1690 the well temperaments arrived: distribute the comma *unevenly*, so no interval is unbearable but every key keeps a flavour — C major bright, A♭ major dark. Bach's *Well-Tempered Clavier* (1722, 1742) walks through all twenty-four. Which tuning he meant is genuinely disputed.

The arithmetic of the trade-off is unforgiving.

## Rigor

Cents are logarithmic: an interval of ratio $r$ measures $1200\log_2 r$.

In quarter-comma meantone the fifth is tuned to $\sqrt[4]{5}:1$, so four fifths stacked and dropped two octaves give exactly $5/4$. In cents the fifth is $300\log_2 5=696.58$, flat of the pure 701.955 by 5.38 cents; four of them minus two octaves give exactly $386.31$ cents, the just major third.

Now the bill. A twelve-key octave forces the twelve fifths to total seven octaves, $8400$ cents. Eleven tempered fifths take $11\times 696.58=7662.4$, leaving

$$8400-7662.4=737.6\ \text{cents}$$

for the last one — about 36 cents wider than pure. That is the wolf, usually parked between G♯ and E♭ where a Renaissance composer would not go.

The general principle: the comma is conserved. Every scheme is a choice of how to distribute a fixed error budget of 23.46 cents across twelve fifths, and you are choosing which chords sound holy and which sound wrong.

Unless you refuse to choose, and spread it perfectly evenly — which is the modern answer, and which creates its own strange problem.

## Recall
type: reveal
Q: What does quarter-comma meantone buy, and what does it pay?
A: It buys pure 5:4 major thirds by flattening each fifth to $\sqrt[4]{5}:1$ (696.58 cents, about 5.4 cents flat). It pays with a wolf fifth of roughly 737.6 cents left over, and with whole keys becoming unusable — which is why so much Renaissance music lives in so few keys.
