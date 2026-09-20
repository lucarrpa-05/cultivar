---
id: physics.relativity.gravitational-waves.the-wiggle-smaller-than-a-proton
topic: physics.relativity.gravitational-waves
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, prediction]
tags: [ligo, gw150914, strain, interferometry, black-hole-merger]
hook: "Two black holes collided 1.3 billion years ago. The news arrived as a four-kilometre ruler changing length by a four-hundredth of a proton."
sources:
  - {title: "Observation of Gravitational Waves from a Binary Black Hole Merger", author: "B. P. Abbott et al. (LIGO and Virgo Collaborations)", year: 2016, type: paper, url: "https://doi.org/10.1103/PhysRevLett.116.061102"}
  - {title: "First observation of gravitational waves", type: wiki, url: "https://en.wikipedia.org/wiki/First_observation_of_gravitational_waves"}
  - {title: "Gravitational wave", type: wiki, url: "https://en.wikipedia.org/wiki/Gravitational_wave"}
dates: {written: 2026-09-19, event: 2015-09-14}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "4e-18 m is the difference between the two arms (hL), not one arm's change (hL/2); made explicit in body and rigor. Added the February 2016 announcement."}
---

# The wiggle that was a four-hundredth of a proton wide

At 09:50:45 UTC on 14 September 2015, a ripple in the shape of space crossed the Earth. It hit the detector in Livingston, Louisiana, and seven milliseconds later the one in Hanford, Washington — exactly the delay for something crossing the planet at light speed.

The source was two black holes of roughly 35 and 30 solar masses, spiralling into each other 1.3 billion light years away. They merged into one of about 62 solar masses. Three solar masses ceased to exist as mass, radiated away in a fifth of a second, and for that instant the collision outshone every star in the observable universe combined.

By the time it reached us, all that was left was a stretch-and-squeeze of about one part in $10^{21}$. LIGO's arms are 4 km long. One arm grew and the other shrank, and the gap between them opened by $4\times10^{-18}$ metres.

Einstein predicted these waves in 1916 and doubted for decades that anyone could ever detect one. He had a point: the collaboration sat on the signal for five months, checking, before announcing it in February 2016.

## Rigor

A passing wave is a perturbation $h_{\mu\nu}$ on flat spacetime, and in the transverse-traceless gauge it changes proper distances by a *strain*: $\Delta L = \tfrac12 h L$ on each arm, stretching one transverse axis while squeezing the other. The interferometer reads the difference, $h L$, so with $h \approx 10^{-21}$ and $L = 4$ km,

$$\Delta L_x - \Delta L_y \approx 4\times10^{-18}\ \mathrm{m},$$

against a proton diameter of about $1.7\times10^{-15}$ m. An interferometer can see this because it does not measure a length, it measures a *difference* between two arms as a phase shift, with the light bouncing hundreds of times and the noise beaten down by averaging.

Why the signal is a chirp: for a circular binary, the quadrupole formula gives a radiated power $\propto (m_1m_2)^2(m_1+m_2)/r^5$, so the orbit shrinks, the frequency rises, the amplitude grows, and the waveform sweeps upward until merger. The whole thing is controlled by one parameter, the chirp mass $\mathcal{M} = (m_1m_2)^{3/5}/(m_1+m_2)^{1/5}$, which is why the masses could be read straight off the recorded frequency sweep.

Gravitational waves are quadrupolar rather than dipolar because conservation of momentum kills the dipole term — one more thing Noether's bookkeeping decides.

## Recall
type: mcq
Q: What does a gravitational-wave detector actually measure?
- [ ] The force the wave exerts on the mirrors. — the mirrors are in free fall along the arms; no force is pushing them.
- [x] A fractional change in the *difference* between two perpendicular lengths — a strain of about $10^{-21}$, read out as an interference shift. — the wave stretches one arm while squeezing the other, and interferometry is exquisitely good at differences.
- [ ] A change in the speed of light along one arm. — $c$ is unchanged; the geometry the light traverses is what shifts.
- [ ] The energy deposited in the detector by the passing wave. — almost none is absorbed; the wave passes through essentially unimpeded.
