---
id: bio.body.immune-system.counting-for-a-living
topic: bio.body.immune-system
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, beautiful]
tags: [immune-system, vdj-recombination, clonal-selection, repertoire, combinatorics]
callback: {from: math.combinatorics.counting, to: bio.body.immune-system}
hook: "A few dozen gene segments, cut and pasted at random, generate more receptor shapes than there are cells in your body."
sources:
  - {title: "V(D)J recombination", type: wiki, url: "https://en.wikipedia.org/wiki/V(D)J_recombination"}
  - {title: "Clonal selection", type: wiki, url: "https://en.wikipedia.org/wiki/Clonal_selection"}
  - {title: "Commonality despite exceptional diversity in the baseline human antibody repertoire, Nature 566, 393–397", author: "Bryan Briney, Anne Inderbitzin, Collin Joyce, Dennis R. Burton", year: 2019, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6411386/"}
  - {title: "Susumu Tonegawa", type: wiki, url: "https://en.wikipedia.org/wiki/Susumu_Tonegawa"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember counting arrangements? Your immune system does it for a living

Counting taught you that a short ingredient list generates a catalogue nobody could ever write out. Your immune system is that fact, implemented in flesh, under a deadline.

The problem: you will meet pathogens that have never existed before, so you cannot carry a gene for each. The solution is to stop storing and start generating. As each B cell develops, it physically cuts its own DNA and splices together one segment from each of three small libraries, then chews back the ends and inserts random letters at the joins. Every lymphocyte finishes with a different receptor, and none of them was designed for anything.

Then the second half, which is pure selection. Cells that bind your own tissues are killed off. A cell that binds something real is told to divide, and its descendants mutate the receptor further and are re-selected for tighter binding. Burnet named this clonal selection in 1957; Tonegawa showed in 1976 that the DNA really is being cut and re-joined.

Here is the accounting.

## Rigor

The human immunoglobulin heavy-chain locus holds roughly 44 V, 27 D and 6 J segments. Pure choice gives

$$44\times27\times6\approx7\times10^{3}$$

heavy chains, multiplied again by the light chain's own combinations. That alone is unimpressive. The explosion comes from the joins: nucleotides are trimmed and added at random where the segments meet, so the junction itself is a variable-length random string. Textbook estimates of the potential repertoire land near $10^{12}$–$10^{13}$; sequencing-based estimators push the bound on paired sequences far higher, and the spread between methods is several orders of magnitude, so treat any single figure with suspicion.

Against that, the *realised* repertoire in one person is on the order of $10^{7}$–$10^{9}$ distinct clones. You never hold the catalogue. You hold a random sample of it, vanishingly small, and rely on receptors being sloppy enough that near-misses still bind.

Then comes hill-climbing. Somatic hypermutation runs at about $10^{-3}$ per base per division in the receptor genes — roughly a million times the background rate — and selection keeps the best binders each round. Generate broadly, sample thinly, then optimise locally: the same three-step shape as evolution, compressed into a fortnight.

## Recall
type: mcq
Q: Why can't your body simply store a gene for every antibody it might need?
- [x] The potential repertoire is astronomically larger than the genome — the only way to cover it is to generate receptors combinatorially and sample, not to store them.
- [ ] Because antibodies are proteins and proteins cannot be encoded — every antibody *is* encoded by a gene; the point is how many distinct genes would be required.
- [ ] Because pathogens mutate too quickly to be catalogued — they do, but the deeper problem is the size of the space before anything mutates.
- [ ] Because the genes would take too long to transcribe — transcription speed is irrelevant; storage capacity is the binding constraint.
