---
id: econ.game-theory.matching.the-algorithm-that-places-doctors
topic: econ.game-theory.matching
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, history]
tags: [deferred-acceptance, gale-shapley, stable-matching, residency-match]
hook: "Tens of thousands of American doctors are assigned to hospitals every March by a 1962 paper about marriage."
sources:
  - {title: "Gale–Shapley algorithm", type: wiki, url: "https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm"}
  - {title: "National Resident Matching Program", type: wiki, url: "https://en.wikipedia.org/wiki/National_Resident_Matching_Program"}
  - {title: "College admissions and the stability of marriage, American Mathematical Monthly 69(1)", author: "Gale & Shapley", year: 1962, type: paper, url: "https://doi.org/10.2307/2312726"}
dates: {written: 2026-09-19, event: 1962-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The algorithm that decides where American doctors work

Every March, tens of thousands of American medical graduates learn where they will spend the next years of their lives. Nobody negotiates. Applicants rank hospitals, hospitals rank applicants, and a computer runs a procedure published in 1962 by David Gale and Lloyd Shapley in a paper ostensibly about marriage.

It goes like this. Every applicant proposes to their favourite hospital. Each hospital provisionally *holds* the best applicants it has seen so far and rejects the rest. Rejected applicants propose to their next choice. Repeat until nobody is proposing. Hold, not accept — that one word is the whole trick, which is why it is called deferred acceptance.

The output is **stable**: there is no applicant and hospital who would both rather have each other than what they got. Unstable matchings fall apart, because the two unhappy parties have an obvious private deal available. The medical match had been running a version of this since 1952, years before anyone proved why it worked.

Shapley and Alvin Roth took the 2012 Nobel for it. Gale had died in 2008.

## Rigor

**Deferred acceptance.** In each round, every unmatched proposer proposes to their most preferred acceptable partner who has not yet rejected them; each receiver holds the best proposal received so far and rejects the others; repeat until no proposals remain.

**Termination.** Each proposer proposes to each receiver at most once, so the process stops after at most $|P|\cdot|R|$ proposals.

**Stability.** Suppose $p$ and $r$ each prefer the other to their assigned partner. Since $p$ prefers $r$ to their match, $p$ proposed to $r$ at some round. So $r$ either rejected $p$ then or held $p$ and dropped them later — and a receiver's held partner only improves over time, so $r$ finished with someone they prefer to $p$. Contradiction. $\square$

Two more facts. *Proposer optimality*: deferred acceptance gives every proposer, simultaneously, the best partner they have in any stable matching — the stable matchings form a lattice and this is its top. And *strategy-proofness* holds for the proposing side but not the receiving side.

Which side proposes therefore matters politically. The medical match originally ran hospital-proposing; Roth and Peranson's 1997 redesign switched to applicant-proposing and added handling for couples seeking jobs in the same city — a constraint that can destroy the existence of a stable matching altogether, and is patched in practice rather than solved.

## Recall
type: mcq
Q: What does "deferred" mean in deferred acceptance?
- [x] Receivers hold their best offer instead of accepting it — so a better proposer arriving later can still displace it.
- [ ] Proposals are made in a delayed order — the order of proposals inside a round does not change the outcome.
- [ ] The result is announced later than it is computed — the announcement date has nothing to do with the name.
