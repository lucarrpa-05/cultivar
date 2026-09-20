---
id: bio.genetics.population-genetics.the-theorem-that-says-nothing-happens
topic: bio.genetics.population-genetics
format: series
difficulty: 3
language: en
weight: heavy
angles: [beautiful, tool]
tags: [hardy-weinberg, allele-frequencies, null-model, wahlund, population-genetics]
hook: "A pure mathematician settled biology's loudest argument of 1908 with one line of algebra, and apologised for intruding."
series: {id: bio.evolution.precisely, index: 3, total: 5, title: "Evolution, precisely"}
sources:
  - {title: "Hardy–Weinberg principle", type: wiki, url: "https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle"}
  - {title: "Mendelian Proportions in a Mixed Population, Science 28(706), 49–50", author: "G. H. Hardy", year: 1908, type: paper, url: "https://doi.org/10.1126/science.28.706.49"}
  - {title: "G. H. Hardy", type: wiki, url: "https://en.wikipedia.org/wiki/G._H._Hardy"}
dates: {written: 2026-09-19, event: 1908-07-10}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Yule's objection is documented as dominants spreading until they swamp recessives; the brown-eyes/blue-eyes version is not in the cited sources. Hardy's opening quote verified verbatim."}
---

# The theorem that says nothing happens

In 1908 the geneticist Reginald Punnett could not answer an objection. Udny Yule had argued that a dominant allele ought to spread through a population until it had swamped the recessive one — so either Mendel was wrong or the world was. Punnett took the problem to his cricket partner, the Cambridge pure mathematician G. H. Hardy.

Hardy's letter to *Science* opens: "I am reluctant to intrude in a discussion concerning matters of which I have no expert knowledge, and I should have expected the very simple point which I wish to make to have been familiar to biologists."

The very simple point: dominance says how a genotype *looks*, not how common it is. Under random mating, allele frequencies do not change at all, and genotype frequencies reach their resting values after a single generation and stay. Wilhelm Weinberg published the same thing in German that year, which is why the name has two halves.

What you are looking at is biology's null hypothesis — the sound of nothing happening. Every interesting thing in evolution is a departure from it.

## Rigor

Let alleles $A$ and $a$ have frequencies $p$ and $q$ with $p+q=1$. Assume random mating, no selection, no mutation, no migration, infinite population, non-overlapping generations.

A zygote is two gametes drawn independently, so

$$f(AA)=p^{2},\qquad f(Aa)=2pq,\qquad f(aa)=q^{2},$$

which sum to $(p+q)^{2}=1$. Now compute the next generation's allele frequency: $p' = p^{2} + \tfrac12(2pq) = p(p+q) = p$. Nothing moves. One round of random mating and the population is frozen, whatever it started from.

So every evolutionary force is a named violation of one assumption. Selection breaks "no selection"; finite size breaks "infinite" and gives you drift; inbreeding and assortative mating break "random". Population structure breaks it in a useful way: pool two populations with different $p$ and you observe *fewer* heterozygotes than $2pq$. That deficit is the Wahlund effect, and it lets you detect hidden structure in a sample without being told it is there.

To test a real sample, compare observed counts against $Np^{2}$, $2Npq$, $Nq^{2}$ with $\chi^{2}=\sum (O-E)^{2}/E$ on one degree of freedom: three genotypes minus two allele frequencies.

A population at equilibrium is a population nothing has pushed. Next: what pushes.

## Recall
type: mcq
Q: A population is found to have far fewer heterozygotes than $2pq$. What is the most informative first guess?
- [x] The sample pools two or more groups with different allele frequencies — the Wahlund effect, a deficit of heterozygotes that reveals hidden structure.
- [ ] The allele is dominant, so heterozygotes are hidden — dominance changes what you see in the phenotype, not the genotype counts.
- [ ] Natural selection is favouring the $A$ allele — directional selection shifts $p$ itself; it does not by itself produce a heterozygote deficit.
- [ ] The population is too large for the model — the model's trouble is small populations, where drift moves frequencies around.
