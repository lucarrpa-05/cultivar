---
id: physics.em.light-optics.why-the-sky-is-blue-and-not-violet
topic: physics.em.light-optics
format: idea
difficulty: 1
language: en
weight: medium
angles: [practical, beautiful]
tags: [rayleigh-scattering, sky-colour, dipole-radiation, sunsets, wavelength]
hook: "Violet scatters more than blue. So why isn't the sky violet? The honest answer needs two extra facts, and both are about you."
sources:
  - {title: "Rayleigh scattering", type: wiki, url: "https://en.wikipedia.org/wiki/Rayleigh_scattering"}
  - {title: "Diffuse sky radiation", type: wiki, url: "https://en.wikipedia.org/wiki/Diffuse_sky_radiation"}
  - {title: "Absorption and Scattering of Light by Small Particles", author: "Craig F. Bohren & Donald R. Huffman", year: 1983, type: book, url: "https://doi.org/10.1002/9783527618156"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Body claimed blue scatters nine times more than red; nine is the violet-to-red ratio. Reworded to agree with the rigor."}
---

# Why the sky is blue — and why that's only two thirds of the answer

Sunlight arrives white. Air is transparent. Yet the sky away from the sun glows blue, which means air is doing something wavelength-dependent to light that is not simply letting it pass.

It scatters it. A molecule in the path of a light wave has its electrons jiggled by the wave's electric field, and a jiggling charge radiates in all directions. The efficiency of that re-radiation depends brutally on wavelength: short waves jiggle faster, and the power radiated goes as the fourth power of frequency. The blue end of the band is scattered several times more than the red. Look anywhere except at the sun and you are seeing sunlight that bounced, which means you are seeing mostly the blue end.

Two honest footnotes. Violet scatters *more* than blue, so why not a violet sky? Because sunlight contains less violet to begin with, and because your cone cells register the scattered mixture as blue with white mixed in. And at sunset the beam travels a long slanted path through air, losing its blue on the way, so what survives to reach you directly is red.

## Rigor

Model each molecule as an induced dipole: $\mathbf{p} = \alpha\mathbf{E}_0 e^{-i\omega t}$. An oscillating dipole radiates total power

$$P = \frac{\omega^4 |p|^2}{12\pi\varepsilon_0 c^3},$$

so the scattering cross-section goes as $\sigma \propto \omega^4 \propto \lambda^{-4}$. That single exponent is the whole phenomenon. The ratio between the violet and red ends of the visible band is

$$\left(\frac{700\ \mathrm{nm}}{400\ \mathrm{nm}}\right)^4 \approx 9.4 .$$

Three conditions have to hold for this to be Rayleigh scattering rather than something else: the scatterer must be much smaller than $\lambda$ (a nitrogen molecule is about $0.3$ nm against $500$ nm), it must be non-absorbing, and the scatterers must be positioned randomly — a perfect crystal of air would not scatter at all, because the re-radiated waves would cancel in every direction except forward. What you are seeing overhead is *density fluctuation*, which is why the brightness of the sky is, in principle, a measurement of how many molecules a cubic metre of air contains.

And when the particles are *not* small compared to $\lambda$ — water droplets in a cloud, at micrometre scale — the $\lambda^{-4}$ law fails entirely and you get Mie scattering, which is white. That is why clouds are grey and the sky between them is blue.

## Recall
type: mcq
Q: Violet light scatters more strongly than blue. Why is the daytime sky blue rather than violet?
- [ ] Violet light is absorbed by ozone before it reaches us. — some ultraviolet is, but visible violet reaches the ground fine.
- [x] Sunlight contains less violet than blue, and human colour vision reports the scattered mixture as blue plus white. — the physics favours violet; the source spectrum and your eye outvote it.
- [ ] Violet scatters so much that it never reaches the observer. — scattered light is precisely what reaches you when you look away from the sun.
- [ ] Because air molecules resonate at blue wavelengths. — there is no resonance in the visible; the $\lambda^{-4}$ law is smooth across the whole band.
