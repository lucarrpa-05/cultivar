---
id: physics.cosmos.dark-matter-energy.the-stars-at-the-edge-move-too-fast
topic: physics.cosmos.dark-matter-energy
format: idea
difficulty: 1
language: en
weight: medium
angles: [open-problem, numbers]
tags: [dark-matter, rotation-curves, vera-rubin, zwicky, dark-energy]
hook: "The outer stars of a galaxy orbit as fast as the inner ones. By every rule we know, they should be flung off."
sources:
  - {title: "Vera Rubin", type: wiki, url: "https://en.wikipedia.org/wiki/Vera_Rubin"}
  - {title: "Rotation of the Andromeda Nebula from a Spectroscopic Survey of Emission Regions", author: "Vera C. Rubin & W. Kent Ford Jr.", year: 1970, type: paper, url: "https://articles.adsabs.harvard.edu/pdf/1970ApJ...159..379R"}
  - {title: "Dark matter", type: wiki, url: "https://en.wikipedia.org/wiki/Dark_matter"}
dates: {written: 2026-09-19, event: 1970-02-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The stars at the edge are moving much too fast

In the solar system, the further out you go the slower you orbit. Mercury takes 88 days, Neptune takes 165 years, and the relationship is exact: the Sun holds nearly all the mass, so orbital speed falls off as one over the square root of distance.

A galaxy looks like the same situation. Light concentrates in the middle, so the outskirts should crawl.

In 1970 Vera Rubin and Kent Ford measured the orbital speeds of glowing gas clouds across Andromeda, out past where the starlight fades. The speeds did not fall. They stayed flat, kilometre per second, all the way out — as if the mass kept accumulating in regions where nothing shines. Rubin found the same thing in galaxy after galaxy.

Fritz Zwicky had seen a version of it in 1933 in the Coma cluster and called the missing stuff *dunkle Materie*, and been largely ignored for forty years.

Something with mass is out there that neither emits nor absorbs light. We can weigh it, map it, and watch it bend light. We have no idea what it is.

## Rigor

For a test mass outside a spherical distribution, $\frac{mv^2}{r} = \frac{GM(r)m}{r^2}$, so

$$v(r) = \sqrt{\frac{GM(r)}{r}} .$$

If the mass is essentially all inside radius $r$, $M(r)$ is constant and $v \propto r^{-1/2}$ — the Keplerian fall-off. Flat curves, $v \approx$ const, instead require $M(r)\propto r$: mass growing linearly with radius, far beyond the visible disc, so the galaxy sits in a roughly isothermal halo of unseen material.

The evidence is no longer one measurement. Gravitational lensing weighs clusters independently of any dynamics and agrees. In the Bullet Cluster, two clusters passed through each other, the hot gas — most of the ordinary matter — was stripped and left behind, while the lensing mass went straight through with the galaxies, exactly as collisionless dark matter should. The CMB power spectrum's acoustic peaks independently fix the ratio of dark to ordinary matter.

Current accounting: about 5% ordinary matter, 27% dark matter, 68% dark energy, this last inferred from the 1998 supernova surveys showing the expansion is accelerating. Note the honest asymmetry: dark matter is a well-constrained *something* with unknown identity, while dark energy is mostly a name for a number in an equation.

## Recall
type: mcq
Q: What do flat galactic rotation curves imply about the distribution of mass?
- [ ] That gravity weakens at galactic distances. — that is the alternative hypothesis (modified gravity), and lensing plus the Bullet Cluster weigh heavily against it.
- [x] That the enclosed mass keeps growing roughly linearly with radius, far beyond where the light stops. — $v\approx$ const forces $M(r)\propto r$.
- [ ] That the stars are not gravitationally bound to the galaxy. — they plainly are; they have completed many orbits without escaping.
- [ ] That the galaxy's centre holds more mass than we can see. — extra mass in the centre would steepen the fall-off, not flatten it.
