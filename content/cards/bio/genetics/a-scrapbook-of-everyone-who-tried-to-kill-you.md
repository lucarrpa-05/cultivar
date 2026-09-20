---
id: bio.genetics.crispr.a-scrapbook-of-everyone-who-tried-to-kill-you
topic: bio.genetics.crispr
format: idea
difficulty: 2
language: en
weight: medium
angles: [origin, tool]
tags: [crispr, cas9, bacterial-immunity, doudna-charpentier, phage]
hook: "The gene-editing tool of the decade started as an unexplained pattern of repeats next to a bacterial gene in 1987."
sources:
  - {title: "CRISPR", type: wiki, url: "https://en.wikipedia.org/wiki/CRISPR"}
  - {title: "Intervening sequences of regularly spaced prokaryotic repeats derive from foreign genetic elements, Journal of Molecular Evolution 60, 174–182", author: "Francisco J. M. Mojica et al.", year: 2005, type: paper, url: "https://doi.org/10.1007/s00239-004-0046-3"}
  - {title: "A Programmable Dual-RNA-Guided DNA Endonuclease in Adaptive Bacterial Immunity, Science 337, 816–821", author: "Martin Jinek, Krzysztof Chylinski, Ines Fonfara, Michael Hauer, Jennifer A. Doudna, Emmanuelle Charpentier", year: 2012, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6286148/"}
  - {title: "The Nobel Prize in Chemistry 2020", year: 2020, type: primary, url: "https://www.nobelprize.org/prizes/chemistry/2020/summary/"}
dates: {written: 2026-09-19, event: 2012-06-28}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Bacteria keep a scrapbook of everyone who ever tried to kill them

In 1987 a Japanese team sequencing a gene in *E. coli* found something beside it they could not explain: short repeated sequences, evenly spaced, with a unique chunk of DNA between each pair. Nobody knew what it was for, and nobody much cared for fifteen years.

Francisco Mojica did. In 2005 he showed that the unique chunks match the genomes of phages — the viruses that hunt bacteria. The repeats are a filing cabinet of past attackers. His paper was turned down by four journals before the *Journal of Molecular Evolution* took it.

In 2007 a team working on yoghurt cultures proved the file is operational: a bacterium that survives a phage pastes a piece of it into the array, and its descendants recognise and destroy that phage on sight. Then in 2012 Jinek, Charpentier, Doudna and colleagues showed the recognition step could be reprogrammed — hand the enzyme a synthetic guide and it will cut whatever you name. Nobel in chemistry, 2020.

## Rigor

Take the type II system, the one that became a tool. A spacer in the array is transcribed into a short **crRNA**, which pairs with a second RNA, the **tracrRNA**; the duplex loads into the protein Cas9 and becomes its instructions.

Cas9 does not scan for the 20-letter match first. It scans for a **protospacer-adjacent motif** — for the *Streptococcus pyogenes* enzyme, the three letters `NGG` — and only where it finds one does it unwind the helix and test the guide against the adjacent 20 bases. A full match gives a blunt double-strand break about 3 base pairs upstream of the motif.

That ordering is the elegant part, and it solves a problem any immune system must solve: how not to attack yourself. The bacterium's own CRISPR array holds the same spacer sequences that the guides encode, but the array does not carry the adjacent motif, so Cas9 never licenses a cut there. Self and non-self are told apart by three letters of context.

The 2012 contribution was to fuse crRNA and tracrRNA into a **single guide RNA**. One synthetic 20-letter sequence, one protein, and the address of a cut anywhere you can name.

## Recall
type: mcq
Q: What stops Cas9 from cutting the bacterium's own CRISPR array, which contains the very sequences it targets?
- [x] The array lacks the short adjacent motif that Cas9 requires before it will unwind and check a match — self and non-self differ by three letters of context.
- [ ] The array is chemically modified so the enzyme cannot bind — the discrimination is sequence context, not a chemical tag.
- [ ] Cas9 is kept physically away from the array — the protein diffuses through the cell and does encounter it.
- [ ] The spacers are stored backwards — orientation is not what protects them; the missing motif is.
