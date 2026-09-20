---
id: physics.mechanics.motion-newton.why-you-cant-feel-the-earth-moving
topic: physics.mechanics.motion-newton
format: idea
difficulty: 1
language: en
weight: medium
angles: [paradox, history]
tags: [galilean-relativity, inertia, reference-frames, galileo, coriolis]
hook: "Bogotá is moving at about 1,670 km/h and you cannot feel a thing. That is not a failure of your senses."
sources:
  - {title: "Galilean invariance", type: wiki, url: "https://en.wikipedia.org/wiki/Galilean_invariance"}
  - {title: "Dialogue Concerning the Two Chief World Systems", author: "Galileo Galilei", year: 1632, type: book, url: "https://en.wikipedia.org/wiki/Dialogue_Concerning_the_Two_Chief_World_Systems"}
  - {title: "Foucault pendulum", type: wiki, url: "https://en.wikipedia.org/wiki/Foucault_pendulum"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You are doing 1,670 km/h right now and your coffee doesn't care

The old argument against a spinning Earth was an experiment anyone could do: jump. You land where you started. If the ground were racing east at a thousand miles an hour, it should slide out from under you.

Galileo's answer, in his 1632 *Dialogue*, was to put you below deck on a ship. Butterflies fly, fish swim in their bowl, water drips into a jar, you toss a ball to a friend. Now let the ship sail smoothly. Nothing changes. Not one experiment inside the cabin tells you whether you are moving or parked at the dock — because everything in the cabin is moving with you.

That is the whole idea: constant velocity is not a property of a thing, only of a thing *relative to another thing*. There is no "really at rest".

Where it breaks: the Earth doesn't move uniformly, it turns. And spin is detectable from inside.

## Rigor

Compare two frames with $\mathbf{x}' = \mathbf{x} - \mathbf{v}t$, $t' = t$, $\mathbf{v}$ constant. Differentiate twice: $\dot{\mathbf{x}}' = \dot{\mathbf{x}} - \mathbf{v}$, but $\ddot{\mathbf{x}}' = \ddot{\mathbf{x}}$. Forces depend on separations $\mathbf{x}_i - \mathbf{x}_j$, which are unchanged. So $\mathbf{F} = m\mathbf{a}$ has exactly the same form in both frames: the Galilean group acts on solutions and maps them to solutions. No experiment built out of Newton's laws can pick out $\mathbf{v}$.

Rotation is different, because it is acceleration. In a frame rotating at $\boldsymbol\omega$ you must add real-looking terms, centrifugal $-\boldsymbol\omega\times(\boldsymbol\omega\times\mathbf{r})$ and Coriolis $-2\boldsymbol\omega\times\mathbf{v}$. With $\omega = 7.29\times10^{-5}\,\mathrm{s}^{-1}$ and $R = 6.37\times10^{6}$ m, the centrifugal term at the equator is $\omega^2R \approx 0.034\ \mathrm{m/s^2}$ — about $0.35\%$ of $g$, and measurable. Foucault hung a pendulum in the Panthéon in 1851 and watched its swing plane turn: the cabin argument fails the moment the cabin spins.

## Recall
type: mcq
Q: Why does a ball thrown straight up in a smoothly sailing ship land back in your hand?
- [x] The ball keeps the ship's horizontal velocity, and so do you — this is Galileo's point, and it is why $F=ma$ looks identical in every frame moving at constant velocity.
- [ ] The air inside the cabin drags the ball along with the ship. — take the air away and the result is identical; the ball already has the velocity, it is not being pushed.
- [ ] The ship is moving slowly enough that the effect is too small to see. — the speed is irrelevant; at any constant velocity the result is exactly the same.
- [ ] Gravity pulls the ball back to the exact point it left. — gravity is vertical; it says nothing about where the ball lands horizontally.
