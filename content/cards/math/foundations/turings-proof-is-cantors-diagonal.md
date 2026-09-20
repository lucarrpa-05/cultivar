---
id: math.foundations.computability.turings-proof-is-cantors-diagonal
topic: math.foundations.computability
topics: [math.foundations.cardinality]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [halting-problem, turing-1936, diagonalisation, undecidable, rice-theorem]
hook: "The halting problem, Gödel's sentence and Cantor's missing real are one two-line trick in three costumes."
sources:
  - {title: "Halting problem", type: wiki, url: "https://en.wikipedia.org/wiki/Halting_problem"}
  - {title: "On Computable Numbers, with an Application to the Entscheidungsproblem", author: "Alan Turing", year: 1936, type: paper, url: "https://doi.org/10.1112/plms/s2-42.1.230"}
  - {title: "The Church-Turing Thesis", type: encyclopedia, url: "https://plato.stanford.edu/entries/church-turing/"}
dates: {written: 2026-09-19, event: 1936-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the publication note: two instalments in 1936 inside a Proceedings volume dated 1937, so both years are cited in the literature."}
---

# Turing's proof is Cantor's diagonal in a new costume

Cantor takes your list of reals and builds one that differs from row $n$ at place $n$. Gödel takes your theory and builds a sentence saying it is not provable in that theory. Turing takes your halting-detector and builds a program that halts exactly when the detector says it loops.

All three do the same thing: let the object talk about itself, then flip the answer along the diagonal.

Turing's version, from 1936, stings most, because it is about machines you could actually build. Suppose a program $H$ reads any program plus its input and always answers correctly whether it halts. Write $D$: it hands $H$ the program it was given, fed to itself, and then does the opposite — loops if $H$ says halt, halts if $H$ says loop.

Now run $D$ on $D$. Whatever $H$ answers is wrong.

## Rigor

**Theorem (Turing, 1936).** The set $K=\{\langle M,w\rangle : M \text{ halts on } w\}$ is not decidable. (It came out in two instalments, on 30 November and 23 December 1936, inside a *Proceedings* volume dated 1937 — which is why you meet both years.)

**Proof.** Suppose $H$ decides $K$. Define $D$ on input $\langle M\rangle$: if $H(\langle M,\langle M\rangle\rangle)=1$, loop forever; otherwise halt. Then
$$D \text{ halts on } \langle D\rangle \iff H(\langle D,\langle D\rangle\rangle)=0 \iff D \text{ does not halt on } \langle D\rangle,$$
a contradiction, so $H$ does not exist.

**The common shape.** Index a family by the same set it acts on, then build the anti-diagonal object. Cantor: $D=\{x: x\notin f(x)\}$. Turing: $D$ behaves unlike machine $M$ on input $\langle M\rangle$. Gödel: the diagonal lemma delivers $\sigma\leftrightarrow\neg\mathrm{Prov}(\ulcorner\sigma\urcorner)$. All three are instances of Lawvere's fixed-point theorem: if a set surjects onto its own function space, every endomap of the target has a fixed point. Negation has none, so no such surjection exists — and each theorem is one reading of that sentence.

**How far it spreads.** Rice's theorem upgrades this to: every non-trivial semantic property of programs is undecidable. And coding halting into arithmetic gives a second proof of Gödel's first theorem.

## Recall
type: mcq
Q: What does the diagonal program $D$ have to do to defeat the halting detector?
- [x] Ask the detector about itself, then do the opposite of the answer — self-application plus negation is the whole trick.
- [ ] Run forever on an input the detector was never tested on — no untested input appears; it is one specific program run on itself.
- [ ] Be longer than any program the detector can read — the detector is assumed to handle every program, so size is irrelevant.
- [ ] Use randomness the detector cannot predict — $D$ is deterministic; randomness would only weaken the argument.
