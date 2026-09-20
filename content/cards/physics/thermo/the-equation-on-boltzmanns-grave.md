---
id: physics.thermo.entropy.the-equation-on-boltzmanns-grave
topic: physics.thermo.entropy
format: idea
difficulty: 2
language: en
weight: heavy
angles: [beautiful, numbers]
tags: [entropy, microstates, boltzmann, counting, second-law]
hook: "There is an equation carved on a grave in Vienna. Boltzmann never wrote it in that form — Planck did."
sources:
  - {title: "Boltzmann's entropy formula", type: wiki, url: "https://en.wikipedia.org/wiki/Boltzmann%27s_entropy_formula"}
  - {title: "Entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Entropy"}
  - {title: "Ludwig Boltzmann", type: wiki, url: "https://en.wikipedia.org/wiki/Ludwig_Boltzmann"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The equation carved above Boltzmann's head

In Vienna's Zentralfriedhof there is a bust of Ludwig Boltzmann with one line chiselled above it: $S = k \log W$. He did not put it there and never wrote it in quite that form; Planck did, and the grave came later. It is still the right epitaph, because it says what entropy is in five symbols.

$W$ is a count. Take a description of a system from the outside — "one litre of air at room temperature and pressure" — and ask how many distinct microscopic arrangements of molecules would look exactly like that. The answer is an obscene number. Entropy is its logarithm.

That is the whole idea, and it makes the second law almost boring. Systems drift from arrangements there are few of, towards arrangements there are astronomically many of, for the same reason a shuffled deck comes up disordered: there are more ways to be disordered. Nothing pushes. Counting does the work.

"Disorder" is a poor word for it, though. Entropy is not messiness; it is the size of the set of possibilities you cannot tell apart.

## Rigor

Fix a macrostate and let $\Omega$ be the number of microstates consistent with it. Then

$$S = k_B \ln \Omega, \qquad k_B = 1.380649\times10^{-23}\ \mathrm{J/K}.$$

The logarithm is not decoration. Microstate counts multiply for independent systems, $\Omega_{12} = \Omega_1\Omega_2$, and we want entropy to *add*; $\ln$ is the unique continuous function turning products into sums.

A worked case. Put $N$ distinguishable particles in a box and ask how many are in the left half: the macrostate "$n$ on the left" has $\Omega = \binom{N}{n}$ microstates. Stirling's approximation gives

$$\frac{S}{k_B} = \ln\binom{N}{n} \approx N\left[-x\ln x - (1-x)\ln(1-x)\right], \qquad x = n/N,$$

maximised at $x = 1/2$, exactly the binary entropy function. Let the gas double its volume freely and every particle gains one binary choice: $\Delta S = N k_B\ln 2$, which is the textbook free-expansion result obtained without a single thermodynamic cycle.

Note what had to be fixed before any of this meant anything: which microstates count as "looking the same". Entropy is defined relative to a choice of macrostate, and that dependence is not a flaw — it is where information gets in.

## Recall
type: mcq
Q: Why is entropy the *logarithm* of the number of microstates rather than the number itself?
- [ ] Because the numbers are too large to write down otherwise. — they are, but that is convenience, not a reason the physics requires it.
- [x] Because microstate counts multiply for independent systems and entropy has to add. — $\ln$ is what converts $\Omega_1\Omega_2$ into $S_1+S_2$.
- [ ] Because the second law refers to logarithms directly. — the second law says entropy does not decrease; it never mentions the functional form.
- [ ] Because probabilities are always logarithmic. — probabilities are not logarithmic; the log appears when you demand additivity.
