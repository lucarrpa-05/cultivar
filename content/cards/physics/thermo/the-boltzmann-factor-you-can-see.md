---
id: physics.thermo.boltzmann.the-boltzmann-factor-you-can-see
topic: physics.thermo.boltzmann
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, practical]
tags: [boltzmann-distribution, barometric-formula, scale-height, arrhenius, temperature]
hook: "The atmosphere thins with height by exactly the factor that governs chemical reaction rates. Same exponential, same reason."
sources:
  - {title: "Boltzmann distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Boltzmann_distribution"}
  - {title: "Barometric formula", type: wiki, url: "https://en.wikipedia.org/wiki/Barometric_formula"}
  - {title: "Arrhenius equation", type: wiki, url: "https://en.wikipedia.org/wiki/Arrhenius_equation"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The Boltzmann factor is the shape of the sky

Air gets thinner as you climb, and it thins in a particular way: every 8 km or so, the density drops by a factor of about $e$. Bogotá at 2,640 m already has roughly three quarters of sea-level pressure, which is why visitors arrive out of breath.

That exponential is not about air. It is the single most reused formula in physics. The probability of finding a system in a state of energy $E$, when it is in contact with something at temperature $T$, falls off like $e^{-E/k_BT}$. For an air molecule, $E$ is $mgh$: the price of being high up. For a chemical reaction, $E$ is the activation barrier, which is why reaction rates roughly double every ten degrees. For a semiconductor, it is the band gap. For a protein, the cost of being unfolded.

The picture is a negotiation. Energy prefers everything at the bottom; temperature keeps knocking things upstairs. Their ratio $E/k_BT$ decides who wins.

Where does the exponential come from? From counting, again.

## Rigor

Put a small system in contact with a huge reservoir at temperature $T$, the total energy $E_{\text{tot}}$ fixed. The probability of the system being in microstate $i$ is proportional to the number of reservoir microstates left over:

$$p_i \propto \Omega_R(E_{\text{tot}} - E_i) = e^{S_R(E_{\text{tot}}-E_i)/k_B}.$$

Expand the exponent to first order, using $\partial S_R/\partial E = 1/T$:

$$S_R(E_{\text{tot}}-E_i) \approx S_R(E_{\text{tot}}) - \frac{E_i}{T} \implies p_i \propto e^{-E_i/k_BT}.$$

That is the entire derivation. The reservoir's entropy is what does the discriminating; a high-energy system state is unlikely because it leaves the rest of the universe with fewer ways to arrange itself.

Now the sky. With $E = mgh$, $n(h) = n_0 e^{-mgh/k_BT}$, so the scale height is

$$H = \frac{k_BT}{mg} = \frac{(1.381\times10^{-23})(288)}{(4.81\times10^{-26})(9.81)} \approx 8.4\ \mathrm{km},$$

using the average mass of an air molecule. You can read Boltzmann's constant off a barometer and a mountain — which is essentially how Perrin measured Avogadro's number in 1909, with suspended grains instead of air.

## Recall
type: mcq
Q: Why is a high-energy state unlikely for a system in contact with a reservoir?
- [ ] Because energy always decreases in nature. — energy is conserved; it does not decrease, it moves.
- [x] Because energy taken by the system is energy the reservoir no longer has, and the reservoir has exponentially fewer arrangements without it. — the factor $e^{-E/k_BT}$ is the reservoir's entropy cost.
- [ ] Because high-energy states are fewer in number. — often the opposite: high-energy states are more numerous, and the Boltzmann factor still suppresses each one.
- [ ] Because temperature forces every system to its ground state. — at $T>0$ excited states are occupied; only $T\to0$ does that.
