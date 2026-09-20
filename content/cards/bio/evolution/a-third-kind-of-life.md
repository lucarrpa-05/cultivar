---
id: bio.evolution.phylogenetics.a-third-kind-of-life
topic: bio.evolution.phylogenetics
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, tool]
tags: [phylogenetics, archaea, woese, ribosomal-rna, tree-of-life]
hook: "In 1977 one molecule revealed a whole domain of life that nobody had noticed, and the field's reaction was to tell him to stop."
sources:
  - {title: "Phylogenetic structure of the prokaryotic domain: the primary kingdoms, PNAS 74(11), 5088–5090", author: "Carl R. Woese and George E. Fox", year: 1977, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC432104/"}
  - {title: "Carl Woese", type: wiki, url: "https://en.wikipedia.org/wiki/Carl_Woese"}
  - {title: "Archaea", type: wiki, url: "https://en.wikipedia.org/wiki/Archaea"}
  - {title: "Phylogenetic tree", type: wiki, url: "https://en.wikipedia.org/wiki/Phylogenetic_tree"}
  - {title: "Three-domain system (reception: Luria and Mayr objected)", type: wiki, url: "https://en.wikipedia.org/wiki/Three-domain_system"}
  - {title: "Two empires or three?, PNAS 95(17), 9720–9723", author: "Ernst Mayr", year: 1998, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC33883/"}
diagram: {file: bio/tree-of-life.svg, caption: "Bacteria split off first; Archaea and Eukarya — us — are each other's closest relatives, which anatomy had never suggested.", alt: "A rooted tree: from the last common ancestor, one branch leads down to Bacteria, the other splits into Archaea and Eukarya, each fanning into example groups."}
dates: {written: 2026-09-19, event: 1977-11-03}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added sources for the Luria and Mayr objections, which no cited source carried (three-domain system; Mayr 1998 PNAS)."}
---

# He found a third kind of life by reading one molecule

Until 1977 the living world came in two boxes: cells with a nucleus and cells without. Carl Woese ignored anatomy altogether. He picked a single molecule that every organism on Earth has — the small subunit of ribosomal RNA, part of the machine that turns genes into proteins — and compared its sequence across species, betting that something this essential changes slowly and honestly.

What came out was a set of "bacteria" from hot springs and cow stomachs that were not bacteria. Their ribosomal RNA sat about as far from bacteria as it did from us. Woese and George Fox announced three primary lines of descent where everyone had seen two.

The reception was rough. Salvador Luria told a colleague to dissociate himself from the nonsense, and Ernst Mayr never accepted it. Some of the anger was about manners: the claim went out by press release and reached the front page of the *New York Times* on 3 November 1977. Within a decade it was textbook.

## Rigor

A phylogeny is a tree whose leaves are the taxa and whose internal nodes are inferred ancestors. The trouble is the search space. The number of unrooted binary trees on $n$ labelled leaves is the double factorial

$$(2n-5)!! \;=\; 1\cdot 3\cdot 5\cdots(2n-5),$$

which for a modest $n=20$ is about $2.2\times 10^{20}$. Nobody enumerates. You optimise instead: parsimony picks the tree needing fewest character changes, distance methods cluster on pairwise divergence, and likelihood or Bayesian methods score trees under an explicit model of how sequences mutate.

The model is not decoration. The classic failure is **long-branch attraction**: two lineages evolving quickly will land on the same base at the same site by coincidence — with only four possible letters, coincidences are cheap — and parsimony reads the coincidence as shared ancestry, pulling unrelated fast branches together. Model-based methods are less vulnerable, not immune.

Woese's real design decision was the molecule. Ribosomal RNA is universal, functionally constrained enough to stay alignable across domains, and rarely swapped between unrelated organisms — the three properties that make a molecular character a usable clock rather than a rumour.

## Recall
type: mcq
Q: Why did Woese compare ribosomal RNA rather than, say, a metabolic gene?
- [x] It is present in every organism, changes slowly because its function is tightly constrained, and is rarely transferred between lineages — so it stays comparable across the deepest splits.
- [ ] It is the longest molecule in the cell, giving the most data — length is not the constraint; alignability across billions of years is.
- [ ] It mutates fastest, so differences accumulate quickly — fast mutation destroys deep signal and invites long-branch attraction.
- [ ] It was the only sequence available in 1977 — several proteins had been sequenced; the choice was deliberate, not forced.
