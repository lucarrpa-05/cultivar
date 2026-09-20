---
id: math.probability.information-entropy.the-same-formula-in-a-steam-engine
topic: math.probability.information-entropy
topics: [physics.thermo.entropy]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful, numbers]
tags: [boltzmann, gibbs-entropy, landauer, k-log-w, thermodynamics]
hook: "Shannon's formula and the one on Boltzmann's gravestone differ by a unit conversion. Erasing a bit has a temperature."
callback: {from: math.probability.information-entropy, to: physics.thermo.entropy}
sources:
  - {title: "Boltzmann's entropy formula", type: wiki, url: "https://en.wikipedia.org/wiki/Boltzmann%27s_entropy_formula"}
  - {title: "Entropy in thermodynamics and information theory", type: wiki, url: "https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory"}
  - {title: "Experimental verification of Landauer's principle", author: "Bérut et al.", year: 2012, type: paper, url: "https://doi.org/10.1038/nature10872"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember entropy as a question count? It is carved on a gravestone

You met entropy as the average number of yes/no questions a source forces you to ask. Physicists got to the same expression seventy years earlier, from a completely different question: how many microscopic arrangements of atoms look the same from outside?

Boltzmann's answer, on his tombstone in Vienna, is $S = k\log W$ — count the indistinguishable arrangements, take the logarithm, multiply by a constant with units of joules per kelvin. If you squint, that is the uniform case of Shannon's formula, and Gibbs's version for unequal probabilities is Shannon's formula exactly, with $k_B$ where Shannon has 1 and natural logs where Shannon has base 2.

So the constant is a unit conversion, not a coincidence. Thermodynamic entropy is the number of questions you would have to ask to pin down which microstate the system is actually in, priced in joules per kelvin.

That sounds like a metaphor until you make a computer pay the bill.

## Rigor

**The two formulas.**
$$S_{\text{Gibbs}}=-k_B\sum_i p_i\ln p_i,\qquad H=-\sum_i p_i\log_2 p_i .$$
Hence $S = k_B\ln 2 \cdot H$, so one bit of information is $k_B\ln 2\approx 9.57\times10^{-24}$ J/K. When all $W$ microstates are equally likely, $H=\log_2 W$ and $S=k_B\ln W$: Boltzmann's line is the uniform special case.

**Landauer's principle (1961).** Logically irreversible operations have a thermodynamic price. Erasing one bit — mapping two distinguishable states to one — reduces the memory's entropy by $k_B\ln 2$, and the second law requires that entropy to be dumped into the environment as heat:
$$Q \ge k_B T \ln 2 \approx 2.9\times 10^{-21}\ \text{J at 300 K}.$$
Bérut and colleagues measured exactly this in 2012, erasing a bit stored in a colloidal particle held in a double-well optical trap and watching the dissipated heat approach the bound.

**The moral.** Computation itself is free — reversible operations cost nothing in principle. Forgetting is what costs. Information is not *like* a physical quantity; it is one.

## Recall
type: mcq
Q: What is the relationship between Boltzmann's $S=k\log W$ and Shannon's entropy?
- [x] They are the same quantity in different units — Gibbs' $-k_B\sum p\ln p$ is Shannon's formula times $k_B\ln 2$, and $k\log W$ is its uniform case.
- [ ] A loose analogy between disorder and uncertainty — the correspondence is exact, and Landauer's bound makes it experimentally testable.
- [ ] Shannon's applies to messages, Boltzmann's to atoms, with no formal link — the link is a unit conversion, confirmed by measurement in 2012.
- [ ] Boltzmann's is a special case because it needs quantum mechanics — it needs a count of microstates, which is classical combinatorics.
