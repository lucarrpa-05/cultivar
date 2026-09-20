---
id: bio.cells.signaling.bacteria-take-a-vote
topic: bio.cells.signaling
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, weird]
tags: [quorum-sensing, vibrio-fischeri, bobtail-squid, autoinducer, positive-feedback]
hook: "A single bacterium never glows. Put ten billion of them in a squid's light organ and they all switch on at once."
sources:
  - {title: "Quorum sensing", type: wiki, url: "https://en.wikipedia.org/wiki/Quorum_sensing"}
  - {title: "Aliivibrio fischeri", type: wiki, url: "https://en.wikipedia.org/wiki/Aliivibrio_fischeri"}
  - {title: "Euprymna scolopes", type: wiki, url: "https://en.wikipedia.org/wiki/Euprymna_scolopes"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Repaired a broken sentence in the rigor layer (\"fall out that matching the intuition demands\")."}
---

# Bacteria count themselves, and they refuse to glow until the vote passes

A Hawaiian bobtail squid hunts on moonlit nights, and a moonlit squid casts a shadow that something below can see. So it carries a light organ stuffed with the bacterium *Aliivibrio fischeri*, which glows downward and erases the shadow. The squid feeds them; every dawn it vents most of them into the sea.

Here is the part worth stealing. Those same bacteria, floating alone in the ocean, are dark. Making light is expensive and one cell's glow is useless. So each cell leaks a small molecule and listens for it. Diluted in open water the signal drifts away. Packed into the squid's organ at enormous density, the molecule builds up, crosses a threshold, binds its receptor, and the light genes come on — in everybody, nearly at once.

Nealson, Platt and Hastings noticed the effect in 1970 and described it as the cells "conditioning" their medium. It is a collective-action problem solved with a cheap, honest headcount: contribute only when enough others will.

## Rigor

Call $A$ the concentration of the signal molecule. Each cell makes it at a low basal rate, but the signal also switches on its own synthase, so production is autocatalytic. With $n$ cells per unit volume, dilution rate $\gamma$ and a Hill response of order $h$:

$$\frac{dA}{dt} = n\left(a + b\,\frac{A^{h}}{K^{h}+A^{h}}\right) - \gamma A$$

For small $n$ the only intersection of production and removal is a low fixed point: dark. As $n$ grows, the S-shaped production curve lifts until it crosses the line $\gamma A$ in three places, and the system becomes bistable; grow a little further and the low state vanishes entirely, so the cell jumps to the bright branch. That jump is the "vote passing", and it is a saddle-node bifurcation in $n$.

Two features fall out, and they are exactly the ones the intuition demanded: the switch is sharp rather than gradual (the Hill term with $h>1$), and it is hysteretic — having switched on, a population stays lit below the density that lit it.

## Recall
type: mcq
Q: Why does a quorum-sensing population switch on sharply rather than glowing a little more as it grows?
- [x] The signal induces its own production, so the response curve is S-shaped and the low state disappears past a critical density — a bifurcation, not a dimmer.
- [ ] Each cell measures the total population directly and votes — no cell counts anything; each one only reads a local concentration.
- [ ] Light production is all-or-nothing in a single cell — individual cells can express the genes at intermediate levels; the sharpness comes from the feedback loop.
