---
id: bio.evolution.drift-neutral.nobodys-fault
topic: bio.evolution.drift-neutral
format: series
difficulty: 3
language: en
weight: heavy
angles: [paradox, numbers]
tags: [genetic-drift, neutral-theory, kimura, molecular-clock, substitution-rate]
hook: "Two lines of algebra in which the population size cancels out — and a clock appears with nothing ticking."
series: {id: bio.evolution.precisely, index: 4, total: 5, title: "Evolution, precisely"}
sources:
  - {title: "Neutral theory of molecular evolution", type: wiki, url: "https://en.wikipedia.org/wiki/Neutral_theory_of_molecular_evolution"}
  - {title: "Evolutionary rate at the molecular level, Nature 217, 624–626", author: "Motoo Kimura", year: 1968, type: paper, url: "https://doi.org/10.1038/217624a0"}
  - {title: "Genetic drift", type: wiki, url: "https://en.wikipedia.org/wiki/Genetic_drift"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Most of evolution is nobody's fault

Hardy–Weinberg says nothing moves unless something pushes. There are two pushes. One has a direction: selection. The other is pure sampling noise. In a finite population, the alleles that make it into the next generation are a random draw, and random draws wander. In a population of a thousand, a variant can go from rare to universal on luck alone.

In 1968 Motoo Kimura argued that at the molecular level luck does most of the work. His evidence was a rate. Proteins were turning out to accumulate changes at a roughly constant pace per year, similar across lineages with wildly different lives, and the total pace looked too fast for selection to be paying for every one of them.

Then he gave an argument that was very hard to dismiss: two lines of arithmetic in which the population size cancels out.

## Rigor

Let $\mu$ be the rate of *neutral* mutation per gamete per generation, and let the population hold $2N$ copies of each gene.

New neutral mutants arising per generation: $2N\mu$. Probability that any one of them eventually takes over: under drift alone a neutral allele fixes with probability equal to its current frequency, and a brand-new mutant sits at $1/(2N)$. So the substitution rate is

$$k \;=\; 2N\mu \cdot \frac{1}{2N} \;=\; \mu .$$

The population size vanishes. Differences between two lineages accumulate at the neutral mutation rate no matter how large or small either population has been. That cancellation *is* the molecular clock: a clock with nothing ticking.

Drift's other signature is its noise. The change in allele frequency $p$ over one generation has variance $p(1-p)/(2N)$, so heterozygosity decays by a factor $\left(1-\tfrac{1}{2N}\right)$ each generation. Selection is audible above that noise only when $|s|\gtrsim 1/(2N)$ — the drift barrier. In a small population, a mildly beneficial mutation is indistinguishable from luck.

Kimura never claimed selection was unimportant, or that beaks and eyes are accidents. He claimed most *substitutions* are invisible to selection, which makes neutrality the null model you must reject before announcing adaptation.

Selection. Drift. Transmission. Three separate accounts. Is there one line that holds all of them at once?

## Recall
type: mcq
Q: Why does the neutral substitution rate not depend on population size?
- [x] A big population makes proportionally more mutants ($2N\mu$) but each one is proportionally less likely to fix ($1/2N$) — the two factors cancel exactly.
- [ ] Because large populations have lower mutation rates per individual — mutation rates per gamete are not set by population size.
- [ ] Because drift is negligible in large populations, so only mutation matters — drift is weaker in large populations, but the fixation probability falls at exactly the same rate.
- [ ] Because natural selection compensates for the difference — the calculation assumes no selection at all; that is what "neutral" means.
