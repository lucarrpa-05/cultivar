---
id: bio.body.cancer.the-fifth-power-of-your-age
topic: bio.body.cancer
format: idea
difficulty: 2
language: en
weight: heavy
angles: [numbers, connection]
tags: [cancer, armitage-doll, multistage, power-law, somatic-evolution]
hook: "Plot cancer incidence against age on log paper and you get a straight line of slope five. That slope is a count of something."
sources:
  - {title: "The Age Distribution of Cancer and a Multi-stage Theory of Carcinogenesis, British Journal of Cancer 8(1), 1–12", author: "Peter Armitage and Richard Doll", year: 1954, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2007940/"}
  - {title: "Multistage model of carcinogenesis", type: wiki, url: "https://en.wikipedia.org/wiki/Multistage_model_of_carcinogenesis"}
  - {title: "What can we learn from the population incidence of cancer? Armitage and Doll revisited, Lancet Oncology 8(11), 1030–1038", author: "Catherine Hornsby, Karen M. Page, Ian P. M. Tomlinson", year: 2007, type: paper, url: "https://doi.org/10.1016/S1470-2045(07)70343-1"}
dates: {written: 2026-09-19, event: 1954-03-01}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source was misattributed: the 2007 Lancet Oncology \"Armitage and Doll revisited\" paper is by Hornsby, Page and Tomlinson, not by Armitage and Doll. Fixed author and citation."}
---

# Cancer incidence rises as about the fifth power of your age

Take the incidence of colon, stomach or pancreatic cancer, plot it against age with both axes logarithmic, and you get a straight line with a slope of roughly five or six. That is a strange shape. If cancer were simple accumulating wear, incidence would climb roughly in proportion to age — slope one. A fifth power is the fingerprint of something that requires several independent rare events to land in the *same* cell.

Armitage and Doll said so in 1954 and read the slope as a count: number of required steps, minus one. Six or seven hits.

Underneath is the part that connects to everything else. Cancer is evolution running inside you, on your time. A cell that mutates into dividing a little faster leaves more descendants, which are the cells most likely to pick up the next mutation. Variation, heredity, differential success — Darwin's three conditions, with your body as the environment and no need for anyone to want the outcome.

The slope is solid. The interpretation is not.

## Rigor

Suppose a cell needs $k$ specific events, each arriving independently at small rate $p_i$ per unit time, in a fixed population of $N$ susceptible cells. The probability that one cell has completed all $k$ in order by time $t$ is approximately $p_1p_2\cdots p_k\,t^{k}/k!$, so the *incidence* — the derivative — is

$$I(t)\;\approx\;N\,\frac{p_1p_2\cdots p_k}{(k-1)!}\;t^{\,k-1}.$$

Take logs: $\log I = (k-1)\log t + \text{const}$. The log–log slope counts the stages minus one, and Armitage and Doll's slopes of 5–6 gave $k\approx 6$–$7$.

Three caveats, all live. Incidence decelerates and often falls above about 80, which this model cannot produce at all. The Moolgavkar–Venzon–Knudson model fits the same curves with only *two* rate-limiting events plus clonal expansion of the intermediate cells — so the exponent does not identify a mutation count. And deep sequencing now finds large driver-mutant clones sitting in morphologically normal skin and oesophagus, meaning "stages" and "driver mutations" are not the same thing.

## Recall
type: mcq
Q: Why does a log–log slope near five argue against cancer being simple accumulated damage?
- [x] Steady damage would give incidence roughly proportional to age, slope one — a high power means several independent rare events must coincide in one cell.
- [ ] Because damage accumulates exponentially, not as a power law — cumulative damage grows linearly in time; the exponential would be even harder to square with the data.
- [ ] Because older people are exposed to more carcinogens — exposure duration matters, but it cannot by itself bend a linear process into a fifth power.
- [ ] Because incidence falls again in the very old — that flattening is real and is a problem for the multistage model too, not evidence about damage.
