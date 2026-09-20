---
id: bio.evolution.natural-selection.three-facts-one-conclusion
topic: bio.evolution.natural-selection
format: series
difficulty: 1
language: en
weight: medium
angles: [beautiful, connection]
tags: [natural-selection, darwin, malthus, heredity, algorithm]
hook: "Darwin's argument mentions no genes, no DNA, not even life. It is three observations and a conclusion that cannot be refused."
series: {id: bio.evolution.precisely, index: 1, total: 5, title: "Evolution, precisely"}
sources:
  - {title: "Natural selection", type: wiki, url: "https://en.wikipedia.org/wiki/Natural_selection"}
  - {title: "On the Origin of Species", author: "Charles Darwin", year: 1859, type: book, url: "https://en.wikipedia.org/wiki/On_the_Origin_of_Species"}
  - {title: "The Units of Selection, Annual Review of Ecology and Systematics 1", author: "Richard C. Lewontin", year: 1970, type: paper, url: "https://doi.org/10.1146/annurev.es.01.110170.000245"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Three facts and one conclusion

In September 1838 Darwin read Malthus on population growth, and the argument closed. It has three premises.

More individuals are born than can possibly survive. Individuals differ from one another. Some of those differences pass to offspring.

The conclusion follows without any further biology: individuals whose differences happen to help them survive and reproduce leave more offspring, and those offspring tend to carry the same differences. Run it again. Nothing in that chain mentions genes, cells, or even life — which is why the same argument turns up in economics, in immunology, and in every optimisation algorithm that keeps what works and discards what does not.

That generality is the point. Darwin was not proposing a force. He was pointing at an accounting identity that any system with copying, variation and unequal success cannot escape.

Which raises the awkward part. Premise three says traits are inherited. Darwin had no theory of how. And the theory of heredity most Victorians actually believed would have destroyed his argument in about ten generations.

## Rigor

Lewontin (1970) put the premises in their minimal form. Evolution by natural selection occurs in any population with:

1. **Variation** — individuals differ in some trait $z$.
2. **Differential fitness** — the expected number of offspring $w$ depends on $z$.
3. **Heritability** — offspring resemble their parents in $z$.

All three are necessary. Drop variation and there is nothing to select. Drop the fitness–trait relationship and the changes are random. Drop heritability and every generation starts from scratch: selection still happens, it just leaves no trace.

Notice what is *not* on the list. No mention of DNA, sexual reproduction, species, or organisms. The conditions are satisfied by molecules in a test tube, by firms in a market, by antibodies in your lymph nodes. This is why biologists say natural selection is substrate-neutral, and why "survival of the fittest" is a bad summary: fitness here just means expected reproductive output, so the phrase says nothing that the three conditions do not already say.

Episode 5 turns these three sentences into one equation. First, heredity.

## Recall
type: mcq
Q: Which of Darwin's three conditions is the one he could not explain in 1859?
- [x] Heredity — he had no mechanism for how offspring resemble parents, and the going theory of inheritance actively undermined him.
- [ ] Variation — that individuals differ was the least controversial thing in the book; breeders had known it for centuries.
- [ ] Overproduction — Malthus had already made the case, and Darwin took the premise directly from him.
