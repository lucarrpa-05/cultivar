---
id: niche.music.tuning.the-piano-is-out-of-tune-twice
topic: niche.music.tuning
format: series
difficulty: 2
language: en
weight: heavy
angles: [paradox, practical]
tags: [equal-temperament, inharmonicity, railsback-curve, stretched-octaves, zhu-zaiyu]
hook: "A perfectly tuned piano has no pure thirds, and its octaves are deliberately too wide."
series: {id: niche.music.temperament-arc, index: 3, total: 3, title: "Why the piano is a lie"}
prerequisites: [niche.music.theory-math]
sources:
  - {title: "Equal temperament", type: wiki, url: "https://en.wikipedia.org/wiki/Equal_temperament"}
  - {title: "Piano acoustics", type: wiki, url: "https://en.wikipedia.org/wiki/Piano_acoustics"}
  - {title: "Inharmonicity", type: wiki, url: "https://en.wikipedia.org/wiki/Inharmonicity"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The piano in tune is the piano lying evenly

The modern answer to the comma is to refuse to choose a victim. Make every semitone the same ratio, $\sqrt[12]{2}$, and the twelve fifths close by construction. Zhu Zaiyu worked out the number in China in 1584; Simon Stevin reached it in Europe around 1585.

The cost is paid by everybody, a little. Every fifth on your piano is about two cents flat of pure — imperceptible. Every major third is about fourteen cents *sharp*, which is very perceptible; if you have ever thought a piano chord sounds slightly harder than the same chord on a guitar or in a choir, that is what you are hearing. Equal temperament is not clean. It is uniformly slightly dirty, which turns out to be a much better product.

Then the second lie, which is physical rather than mathematical. Real piano strings are stiff steel, so they do not vibrate like ideal strings: their overtones come out sharp of the exact harmonics. Tuners tune by listening to overtones, so they stretch — treble progressively sharp, bass progressively flat. O. L. Railsback measured the resulting curve in the 1930s.

Which makes the closing accounting rather neat.

## Rigor

Equal temperament divides the octave into twelve ratios of $2^{1/12}\approx 1.059463$, so every semitone is exactly 100 cents. The fifth is 700 cents against a just 701.955, and the major third is 400 against a just 386.314 — errors of $-1.96$ and $+13.69$ cents.

Look at that first number again. Episode 1's Pythagorean comma was 23.46 cents, and

$$\frac{23.46}{12}=1.955 .$$

Equal temperament is exactly the scheme that takes the comma and divides it by twelve, giving each fifth an equal share of the debt. That is the whole idea, in one division.

The stretch is a different beast. For a real string of stiffness $B$, the $n$th partial sits at $f_n\approx n f_1\sqrt{1+Bn^2}$ rather than $nf_1$. A tuner matching the second partial of a low note to the fundamental of the note an octave up is therefore matching something already sharp, so the octave comes out wider than 2:1 — and the error compounds across the keyboard.

So a correctly tuned piano is out of tune with the harmonic series twice: once on purpose, by arithmetic, and once on purpose, by physics.

## Recall
type: mcq
Q: Why does a piano tuner deliberately stretch octaves beyond the exact 2:1 ratio?
- [ ] To compensate for the Pythagorean comma — that is already handled by equal temperament, which divides it evenly among the fifths.
- [x] Because stiff strings have overtones sharp of the true harmonics — tuners match overtones, so an octave that sounds clean ends up wider than 2:1.
- [ ] To make the instrument louder in the treble — stretch is about pitch, not amplitude.
- [ ] Because listeners prefer sharp high notes for no physical reason — the reason is measurable string inharmonicity, not taste alone.
