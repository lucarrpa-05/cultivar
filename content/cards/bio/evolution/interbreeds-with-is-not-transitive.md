---
id: bio.evolution.speciation.interbreeds-with-is-not-transitive
topic: bio.evolution.speciation
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, connection]
tags: [speciation, ring-species, ensatina, species-concept, equivalence-relation]
hook: "Walk a ring of salamanders round a valley. Every neighbour interbreeds with the next, and the two ends will not."
sources:
  - {title: "Ring species", type: wiki, url: "https://en.wikipedia.org/wiki/Ring_species"}
  - {title: "Ensatina", type: wiki, url: "https://en.wikipedia.org/wiki/Ensatina"}
  - {title: "Genomic divergence in a ring species complex, Nature 511, 83–85", author: "Miguel Alcaide, Elizabeth S. C. Scordato, Trevor D. Price, Darren E. Irwin", year: 2014, type: paper, url: "https://doi.org/10.1038/nature13285"}
  - {title: "Species concept (biological species concept)", type: wiki, url: "https://en.wikipedia.org/wiki/Species"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# "Interbreeds with" is not transitive, and that is what a species is

Ensatina salamanders live in a horseshoe of populations around California's Central Valley. Follow the chain north to south down one arm and across the bottom, and each population interbreeds with its neighbour. Where the two arms finally meet in the south, the end forms mostly do not. Greenish warblers do something similar around the Tibetan plateau.

So the question "are these the same species?" gets a yes at every step and a no for the loop. That is not a flaw in the salamanders. It is what you should expect from a category produced by a continuous process: a species is a snapshot of a verb.

Be honest about the examples, though. Genomic work on the warblers confirmed the ring but found historical interruptions in gene flow around it and some mixing where the ends meet, and the salamander case has been argued about for decades. Both survive as rings; neither is the seamless textbook loop, and whether they still "count" depends on how strictly you define the term.

## Rigor

Mayr's biological species concept (1942) defines species as groups of actually or potentially interbreeding natural populations that are reproductively isolated from other such groups. Written as a relation, "can interbreed with" is meant to sort the living world into disjoint classes.

For that to work, the relation must be an **equivalence relation**: reflexive, symmetric, and *transitive*. Reflexivity and symmetry are free. Transitivity is an empirical claim — that if $A$ interbreeds with $B$ and $B$ with $C$, then $A$ interbreeds with $C$ — and a ring species is a direct counterexample. Without transitivity there are no equivalence classes, so no partition, so no clean species boundaries. The failure is structural, not a measurement problem.

The workarounds are all choices about what to give up. Restrict attention to one place and one time and transitivity is usually restored, which is why field guides work. Or replace the relation with a tree and define species as monophyletic groups, which needs no interbreeding at all and so handles asexual organisms and fossils, at the price of arbitrary cut-offs.

## Recall
type: mcq
Q: Why does a ring species break the biological species concept rather than merely complicate it?
- [x] The relation "can interbreed with" turns out not to be transitive — without transitivity there are no equivalence classes, so no partition into species at all.
- [ ] It shows two species can produce fertile hybrids — hybrids appear in many pairs; the structural problem is the failure of transitivity around the loop.
- [ ] It shows species change over time — everyone already accepts that; the ring makes trouble in space, at one moment.
- [ ] It shows reproductive isolation is impossible to measure — it is measurable at each contact zone; the measurements simply do not chain.
