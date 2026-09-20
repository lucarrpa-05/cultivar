---
id: bio.genetics.epigenetics.a-famine-you-can-still-read
topic: bio.genetics.epigenetics
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, numbers]
tags: [epigenetics, dna-methylation, dutch-hunger-winter, imprinting, igf2]
hook: "People conceived in the Dutch famine of 1944 carry a chemical difference sixty years on. The caveats matter as much as the result."
sources:
  - {title: "Persistent epigenetic differences associated with prenatal exposure to famine in humans, PNAS 105(44), 17046–17049", author: "Bastiaan T. Heijmans et al.", year: 2008, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2579375/"}
  - {title: "Dutch famine of 1944–1945", type: wiki, url: "https://en.wikipedia.org/wiki/Dutch_famine_of_1944%E2%80%931945"}
  - {title: "DNA methylation", type: wiki, url: "https://en.wikipedia.org/wiki/DNA_methylation"}
  - {title: "Genomic imprinting", type: wiki, url: "https://en.wikipedia.org/wiki/Genomic_imprinting"}
dates: {written: 2026-09-19, event: 2008-11-04}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A famine that ended in 1945, still legible in 2008

In the winter of 1944 the western Netherlands was blockaded and rations collapsed. The cohort conceived during those months has been followed ever since, because it is the closest thing to a controlled experiment on prenatal starvation that anyone would tolerate.

In 2008 Heijmans and colleagues compared people conceived at the height of the famine with their own same-sex siblings — the tightest control available — and found about 5% less methylation at a stretch of the *IGF2* gene, six decades later. Only in those exposed around conception. People exposed in late pregnancy showed no methylation difference at all, though their birth weights were lower.

Now the part usually cut from the retelling. It is an association, not an experiment. The effect is small, roughly half a standard deviation, and it is a group average rather than a personal signature. It was measured in blood. And the paper did not show that this chemical difference causes anything.

## Rigor

A methyl mark is a $\mathrm{CH_3}$ group attached to the 5-carbon of cytosine, almost always where a C is followed by a G. It is not a change to the sequence, which is why "epigenetic" means *above* genetics.

The mark survives cell division by a neat trick. CpG sites are palindromic across the two strands, so after replication each site is *hemimethylated* — marked on the old strand, blank on the new one. The maintenance enzyme DNMT1 reads the old strand and completes the pair. The mark is copied with the DNA, so a liver cell's daughters stay liver cells.

What it does: heavily methylated promoters recruit proteins that compact chromatin and exclude transcription factors, so the gene stays shut.

And here is why "you inherit your grandmother's famine" is mostly not true in mammals. The germ line passes through two near-global waves of demethylation — once in primordial germ cells, once after fertilisation — which wipes the slate. The loci that escape are the *imprinted* ones, where an allele is silenced according to which parent it came from. *IGF2* is imprinted. That is exactly why it is the place to look, and also why it is a special case rather than a general rule.

## Recall
type: mcq
Q: Why is the Dutch famine result usually studied at an imprinted gene like *IGF2*?
- [x] Imprinted loci escape the germ line’s two waves of demethylation — a mark there can persist when almost every other one has been wiped.
- [ ] *IGF2* is the only gene affected by starvation — plenty of genes respond to nutrition; the question was which marks survive decades.
- [ ] Imprinted genes are the only ones that get methylated — methylation is genome-wide; imprinting is about which parent's copy is silenced.
- [ ] Because *IGF2* controls growth, and the famine cohort was small — the birth-weight effect appeared in the *late*-gestation group, which showed no methylation difference.
