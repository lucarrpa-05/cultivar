---
id: bio.evolution.kin-selection-altruism.dying-for-two-brothers
topic: bio.evolution.kin-selection-altruism
format: idea
difficulty: 2
language: en
weight: heavy
angles: [numbers, connection]
tags: [kin-selection, hamiltons-rule, inclusive-fitness, haldane, altruism]
hook: "Two brothers, or eight cousins. The arithmetic is real; the pub quote it is famous for probably is not."
sources:
  - {title: "The Genetical Evolution of Social Behaviour, I, Journal of Theoretical Biology 7(1), 1–16", author: "W. D. Hamilton", year: 1964, type: paper, url: "https://doi.org/10.1016/0022-5193(64)90038-4"}
  - {title: "Kin selection", type: wiki, url: "https://en.wikipedia.org/wiki/Kin_selection"}
  - {title: "Two Brothers or Eight Cousins (provenance of the Haldane quip)", type: article, url: "https://quoteinvestigator.com/2016/05/05/brothers/"}
  - {title: "Inclusive fitness", type: wiki, url: "https://en.wikipedia.org/wiki/Inclusive_fitness"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The arithmetic of dying for your brother

J. B. S. Haldane did the sum in print in 1955: a gene that makes you sacrifice yourself can still spread, provided the sacrifice saves more than two brothers, or four half-brothers, or eight first cousins. That is the real, citable version.

The famous version — Haldane in a pub, on the back of an envelope, announcing he would lay down his life for two brothers or eight cousins — reaches us second-hand. John Maynard Smith published the anecdote in 1975; Hamilton himself said he was dismayed by it and doubted the phrasing. Treat the scene as a story and the numbers as arithmetic.

The arithmetic is Hamilton's, from 1964. Copies of a gene do not care which body they sit in. So a behaviour that costs the actor and benefits a relative can pay, if the relative is likely enough to be carrying the same copy. Sterile worker bees, alarm calls that draw the hawk, birds that skip breeding to feed a sibling's chicks — all of them stop being paradoxes and become accounting.

Here is the inequality that does the accounting.

## Rigor

**Hamilton's rule.** A social act is favoured when

$$r\,b \;>\; c,$$

with $c$ the fitness cost to the actor, $b$ the fitness benefit to the recipient, and $r$ their relatedness. Hamilton's own 1964 statement was $K > 1/r$ for $K=b/c$; the $rb>c$ form is a later standardisation of the same inequality.

$r$ is not "fraction of DNA shared" — you share about 99.9% of your genome with any human. It is a regression coefficient: how much better than the population baseline the recipient predicts the actor's genotype. Full siblings $r=\tfrac12$, half-siblings $\tfrac14$, first cousins $\tfrac18$. So Haldane's numbers are break-even points: $2\times\tfrac12 = 1$ and $8\times\tfrac18 = 1$.

Inclusive fitness is then the actor's own reproduction plus the sum of $r_j b_j$ over everyone it helps. Where it breaks: the rule as stated assumes costs and benefits add, and that $r$ is measured against the right baseline. The old star argument — that haplodiploid Hymenoptera evolve sterile castes because sisters share $r=\tfrac34$ — has not held up on its own, since termites are diplodiploid and eusocial; lifetime monogamy of the queen turns out to matter more.

## Recall
type: mcq
Q: In Hamilton's rule, what does the relatedness coefficient $r$ actually measure?
- [x] How much more likely than a random population member the recipient is to carry the actor's allele — a regression, not a raw percentage of shared DNA.
- [ ] The fraction of the genome two individuals share — by that measure any two humans are over 99% related and the rule would predict universal altruism.
- [ ] The probability that two individuals were born to the same mother — that is one special case; the rule covers cousins, nieces and clones alike.
- [ ] How similar two individuals look — resemblance is a noisy proxy that selection cannot compute directly.
