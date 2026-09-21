---
id: bio.genetics.population-genetics.no-gene-for-being-tall
topic: bio.genetics.population-genetics
format: idea
difficulty: 1
language: en
weight: medium
angles: [mistake, tool]
tags: [gene-for, polygenic, heritability, gwas, height]
related: [bio.genetics.population-genetics.the-theorem-that-says-nothing-happens]
hook: "Height runs in families, yet a population can grow taller in a few generations. Both facts can be true."
sources:
  - {title: "Adult height, nutrition, and population health", type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4892290/"}
  - {title: "Genetic and environmental influences on adult human height across birth cohorts from 1886 to 1994", type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5156525/"}
  - {title: "A century of trends in adult human height", type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4961475/"}
dates: {written: 2026-09-20}
author: author-bio-1
reviewed: {by: reviewer-bio-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Removed single-gene and nutrition-only overstatements; clarified heritability and secular height change; trimmed body."}
---

# Height runs in families. A population can still grow taller.

"A gene for height" sounds like a blueprint switch: tall or short. Ordinary height variation is more like many small nudges. Genetic variants can shift expected height, while growth also depends on conditions during childhood.

Now for the apparent contradiction. Height is highly heritable *within* many populations: genetic differences help explain why neighbors differ. Yet average height rose across generations in numerous countries, faster than a population's genes could plausibly change. Better food, sanitation, and reduced childhood disease all played roles.

Heritability describes variation among people in a particular setting. It does not tell you how much an entire population could grow when that setting changes.

## Rigor

An association study asks whether people carrying a variant differ in average height from otherwise comparable people in the sampled population. It is a statistical association, not proof that the variant itself causes the difference. Population structure can create misleading signals; ancestry adjustment helps but may not remove all confounding. An estimated effect can also change across environments or populations.

Two standard traps follow.

First, heritability is a ratio of variance components *within a population in a particular environment*. It is not the fraction of any person's height "caused by genes." A trait can be strongly heritable there while an environmental shift moves the population mean. Long-term height trends are an example: changing nutrition, sanitation, and disease exposure matter even when genetic differences contribute strongly to variation within cohorts.

Second, a typical height-associated variant has a small estimated effect, but rare variants can have large effects. "No single gene for height" describes the usual polygenic pattern, not a rule without exceptions. Association says *where to look*, not necessarily *what happens*.

## Recall
type: mcq
Q: Height is highly heritable within a population, yet its average can rise over generations. Is that a contradiction?
- [x] No — heritability describes how variation *among* people in a population tracks genetic variation; it says nothing about what moves the population's mean.
- [ ] Yes, because heritability fixes the population mean — a variance ratio within one setting does not fix the mean across settings.
- [ ] No, because genes never affect height — many variants contribute to differences among individuals.
- [ ] Yes, unless every child's genome changed — childhood conditions can change the population mean without that.
