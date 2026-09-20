---
id: physics.em.magnetism-induction.faradays-ring-and-the-twitch
topic: physics.em.magnetism-induction
format: idea
difficulty: 1
language: en
weight: medium
angles: [history, practical]
tags: [faraday, induction, transformer, lenz-law, flux]
hook: "Faraday's needle only moved when he connected the battery and when he disconnected it. Steady current did nothing at all."
sources:
  - {title: "Faraday's law of induction", type: wiki, url: "https://en.wikipedia.org/wiki/Faraday%27s_law_of_induction"}
  - {title: "Michael Faraday", type: wiki, url: "https://en.wikipedia.org/wiki/Michael_Faraday"}
  - {title: "Lenz's law", type: wiki, url: "https://en.wikipedia.org/wiki/Lenz%27s_law"}
dates: {written: 2026-09-19, event: 1831-08-29}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The twitch that became the entire electrical grid

On 29 August 1831 Michael Faraday wound two separate coils of wire on opposite sides of an iron ring. One coil went to a battery, the other to a galvanometer. The coils never touched. He closed the battery circuit and the galvanometer needle jumped — then fell back to zero while current kept flowing steadily. He opened the circuit and the needle jumped the other way.

That is the whole discovery, and the important part is the part that looks like failure. A steady magnetic field does nothing. Only *change* induces a current. Faraday's ring is a transformer, the device that makes long-distance power distribution possible and the reason your wall socket carries alternating current: alternating means always changing, and change is the only thing induction responds to.

Faraday had almost no mathematics. He thought in pictures, and invented field lines because he needed something to draw. Maxwell's later achievement was largely to take those lines seriously enough to write them down.

Here is the law in the form Faraday could not have written.

## Rigor

$$\oint_{\partial\Sigma}\mathbf{E}\cdot d\boldsymbol\ell = -\frac{d}{dt}\int_\Sigma \mathbf{B}\cdot d\mathbf{A} = -\frac{d\Phi_B}{dt}.$$

Read it as: a changing magnetic flux through a loop drives an electromotive force around the loop. For $N$ turns the flux is counted $N$ times, $\mathcal{E} = -N\,d\Phi_B/dt$. A 200-turn coil of area $0.01\ \mathrm{m^2}$ in a field ramping by $0.5$ T in $0.1$ s gives $\mathcal{E} = 200\times0.01\times5 = 10$ V — a lab-bench number from lab-bench quantities.

The minus sign is the physics. Lenz's law says the induced current opposes the change that produced it, and the reason is conservation of energy: if the induced current reinforced the change, a nudge would amplify itself and you would have a machine that the previous card's patent examiner would refuse to read about. Push a magnet toward a coil and the coil pushes back; the work you do against that push is exactly the electrical energy you get out.

Note the structural point. Faraday's law is the statement that $\mathbf{E}$ is *not* a gradient field when $\mathbf{B}$ changes: $\oint\mathbf{E}\cdot d\boldsymbol\ell \ne 0$, so no potential function exists. Electrostatics is the special case where the right-hand side vanishes.

## Recall
type: mcq
Q: Why did Faraday's galvanometer read zero while a steady current flowed in the first coil?
- [ ] Because iron blocks a constant magnetic field. — iron channels the field; a steady field was certainly present in the ring.
- [x] Because induction responds to the rate of change of flux, and a steady field has none. — the needle twitched exactly at connection and disconnection, the two moments when flux changed.
- [ ] Because the two coils were not electrically connected. — they never are in a transformer; that is the point of induction.
- [ ] Because the galvanometer was too insensitive for a steady signal. — there was no steady signal to detect; the effect is genuinely zero for constant flux.
