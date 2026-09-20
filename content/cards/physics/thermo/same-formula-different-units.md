---
id: physics.thermo.entropy.same-formula-different-units
topic: physics.thermo.entropy
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, beautiful]
tags: [shannon-entropy, gibbs-entropy, maximum-entropy, information, bits-joules]
callback: {from: math.probability.information-entropy, to: physics.thermo.entropy}
related: [physics.thermo.entropy.the-equation-on-boltzmanns-grave]
hook: "Shannon's entropy is measured in bits. Gibbs's entropy is measured in joules per kelvin. The formula is identical."
sources:
  - {title: "Entropy in thermodynamics and information theory", type: wiki, url: "https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory"}
  - {title: "Information Theory and Statistical Mechanics", author: "E. T. Jaynes", year: 1957, type: paper, url: "https://doi.org/10.1103/PhysRev.106.620"}
  - {title: "Principle of maximum entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Principle_of_maximum_entropy"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Gibbs entropy dated to his 1902 statistical mechanics, not the 1870s work on heterogeneous substances."}
---

# Remember Shannon entropy? Physics wrote it first, in joules

You met entropy as a question about messages: how many yes/no questions, on average, to pin down which outcome occurred. $H = -\sum_i p_i \log_2 p_i$, measured in bits, and it was about compression.

Now look at what Gibbs wrote in 1902, decades before anyone thought about codes:

| information theory | statistical mechanics |
|---|---|
| $H = -\sum p_i \log_2 p_i$ | $S = -k_B\sum p_i \ln p_i$ |
| bits | joules per kelvin |
| uncertainty about which message | uncertainty about which microstate |
| uniform $p$ maximises $H$ | equilibrium maximises $S$ |

Not an analogy. The same function, evaluated on a probability distribution over microstates instead of over symbols, with $k_B \ln 2 \approx 9.57\times10^{-24}$ J/K playing the role of "one bit". The story that Shannon chose the name on von Neumann's advice, because nobody knows what entropy is and he would win every argument, is an anecdote told decades later — enjoy it, don't cite it.

The correspondence has teeth, and the teeth are in the next line.

## Rigor

Jaynes's 1957 move: stop deriving equilibrium from dynamics and derive it from inference. Choose the distribution that maximises $S = -k_B\sum_i p_i\ln p_i$ subject to what you actually know. With $\sum_i p_i = 1$ and a fixed mean energy $\sum_i p_i E_i = U$, Lagrange multipliers give

$$\mathcal{L} = -\sum_i p_i\ln p_i - \alpha\Big(\sum_i p_i - 1\Big) - \beta\Big(\sum_i p_i E_i - U\Big),$$

and $\partial\mathcal{L}/\partial p_i = 0$ yields $p_i \propto e^{-\beta E_i}$ — the Boltzmann distribution, with $\beta = 1/k_BT$ fixed by the constraint. Drop the energy constraint and you get $p_i = 1/\Omega$, whence $S = k_B\ln\Omega$: Boltzmann's epitaph is the maximum-entropy distribution when all you know is which microstates are available.

So the thermodynamic entropy of a system is the Shannon entropy of your probability distribution over its microstates, in different units. That is not a metaphor you can drop when convenient: it is why erasing one bit of information has to dump at least $k_BT\ln 2$ of heat into the room, and why a demon who sorts molecules by knowing about them gets no free lunch.

## Recall
type: mcq
Q: What does the maximum-entropy derivation add to "entropy is the log of the number of microstates"?
- [ ] Nothing: it is the same statement written with Lagrange multipliers. — it is strictly more general, since it handles cases where the microstates are not equally likely.
- [x] It says which distribution to use when you know more than "these states exist" — fix the mean energy and maximising $S$ hands you $p_i\propto e^{-\beta E_i}$. — constraints turn the uniform answer into the Boltzmann distribution.
- [ ] It proves the second law from Newton's equations. — it does not; maximum entropy is an inference principle, not a dynamical theorem.
- [ ] It replaces $k_B$ with $\log_2$, making entropy dimensionless. — units change, content does not; $k_B\ln 2$ per bit is just an exchange rate.
