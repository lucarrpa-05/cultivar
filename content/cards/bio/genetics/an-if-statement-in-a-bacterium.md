---
id: bio.genetics.gene-regulation.an-if-statement-in-a-bacterium
topic: bio.genetics.gene-regulation
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, history]
tags: [lac-operon, jacob-monod, repressor, gene-regulation, logic-gate]
hook: "E. coli digests lactose only when there is lactose and no glucose. In 1961 two Frenchmen found the circuit that computes it."
sources:
  - {title: "lac operon", type: wiki, url: "https://en.wikipedia.org/wiki/Lac_operon"}
  - {title: "Genetic regulatory mechanisms in the synthesis of proteins, Journal of Molecular Biology 3, 318–356", author: "François Jacob and Jacques Monod", year: 1961, type: paper, url: "https://doi.org/10.1016/S0022-2836(61)80072-7"}
  - {title: "Operon", type: wiki, url: "https://en.wikipedia.org/wiki/Operon"}
dates: {written: 2026-09-19, event: 1961-06-01}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two Frenchmen found an if-statement inside a bacterium

*E. coli* would rather eat glucose. Give it lactose and no glucose and within minutes it is manufacturing the enzymes that digest lactose; take the lactose away and it stops. The bacterium is running a conditional, and in 1961 François Jacob and Jacques Monod worked out the circuit.

A protein called the repressor sits on a short stretch of DNA right next to the relevant genes and physically blocks the machinery that would copy them. A molecule made from lactose binds the repressor, changes its shape, and knocks it off the DNA. Separately, when glucose runs low a small signalling molecule accumulates and loads an activator that makes the same stretch of DNA far easier to read. Two inputs, one output: transcribe **if** lactose **and not** glucose.

That vocabulary — promoter, repressor, activator, feedback — is the whole of gene regulation. It is also why a liver cell and a neuron, carrying identical genomes, are different animals.

## Rigor

The operon is the unit: three structural genes (*lacZ*, *lacY*, *lacA*) sharing one promoter and transcribed into a single messenger RNA. Upstream sits the *operator*, a binding site; elsewhere on the chromosome, *lacI* encodes the repressor that binds it.

Jacob and Monod's decisive experiments were merodiploids — cells carrying two copies of the region, one mutant — and they established the distinction that makes molecular genetics possible. The repressor is **trans-acting**: it is a diffusible protein, so a good copy anywhere in the cell rescues a broken copy elsewhere. The operator is **cis-acting**: it is a site on the DNA and it governs only the genes physically attached to it, so a broken operator cannot be rescued by a good one on the other chromosome. Trans means "a molecule"; cis means "an address".

The circuit also has feedback. One of the genes, *lacY*, builds the permease that imports lactose, so induction raises the input that caused it. The loop makes the response all-or-none rather than graded: in a population under weak induction you see fully induced cells and fully uninduced cells, not intermediate ones — a result Novick and Weiner reported in 1957, before anyone knew what an operon was.

## Recall
type: mcq
Q: A mutation in the operator cannot be rescued by a good copy of the operator on a second chromosome in the same cell. Why?
- [x] The operator is a site on the DNA, not a product — it can only control the genes physically attached to it, which is what "cis-acting" means.
- [ ] Because the operator makes a protein that cannot diffuse — the operator encodes nothing; the diffusible product is the repressor, from *lacI*.
- [ ] Because bacteria have only one chromosome — they can be made partially diploid, and that is exactly how the experiment was done.
- [ ] Because the second copy is silenced — both copies are transcribed; the point is that control is local to the DNA molecule.
