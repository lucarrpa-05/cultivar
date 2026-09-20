---
id: physics.mechanics.oscillations-waves.every-small-wobble-is-the-same-wobble
topic: physics.mechanics.oscillations-waves
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, beautiful]
tags: [harmonic-oscillator, taylor-expansion, pendulum, normal-modes, potential-well]
hook: "A pendulum, a guitar string, a bond between two atoms and a radio circuit obey one equation. That is not a coincidence."
sources:
  - {title: "Harmonic oscillator", type: wiki, url: "https://en.wikipedia.org/wiki/Harmonic_oscillator"}
  - {title: "Pendulum (mechanics)", type: wiki, url: "https://en.wikipedia.org/wiki/Pendulum_(mechanics)"}
  - {title: "Simple harmonic motion", type: wiki, url: "https://en.wikipedia.org/wiki/Simple_harmonic_motion"}
dates: {written: 2026-09-19}
diagram: {file: physics/energy-landscape.svg, caption: "Any smooth energy valley, with the parabola that matches it at the bottom.", alt: "A bumpy curve of energy against displacement, with a dashed parabola that hugs the curve near one minimum and separates from it further out"}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why every gentle wobble in the universe is the same wobble

Nudge almost anything and let go: a pendulum, a mass on a spring, a ruler off the edge of a desk, a bond between two atoms in a molecule, an atom sitting in a crystal, the charge sloshing in a radio circuit. You get the same motion — a clean sine wave whose frequency does not depend on how hard you nudged it. Different objects, different sizes, nine orders of magnitude apart in scale, one equation.

The reason is not physics, it is shape. Draw the energy of any system against how far it has been displaced. Wherever it is stable, you are sitting at the bottom of a valley. Zoom in on the bottom of *any* smooth valley and it looks like a parabola. A parabolic energy means a restoring force proportional to displacement, and that force gives you a sine.

Where it breaks: nudge it hard and you leave the zoomed-in region. A pendulum swung wide runs measurably slow.

## Rigor

Let $V$ be smooth with a minimum at $x_0$, so $V'(x_0)=0$ and $V''(x_0)>0$. Taylor:

$$V(x) = V(x_0) + \tfrac12 V''(x_0)\,(x-x_0)^2 + O\big((x-x_0)^3\big).$$

Then $F = -V'(x) \approx -V''(x_0)(x-x_0)$, and $m\ddot{x} = -k x$ with $k = V''(x_0)$ gives $\ddot x = -\omega^2 x$, $\omega = \sqrt{V''(x_0)/m}$. The general solution is $A\cos(\omega t + \varphi)$: the amplitude $A$ cancels out of the frequency, which is why the period does not care how hard you pushed.

That independence is only the leading order — exactly as far as the dashed parabola in the picture tracks the real valley. The pendulum's exact period involves a complete elliptic integral,

$$T = 4\sqrt{\tfrac{L}{g}}\;K\!\left(\sin\tfrac{\theta_0}{2}\right) \approx T_0\left(1 + \frac{\theta_0^2}{16}\right),$$

so a 30° swing ($\theta_0 = 0.52$ rad) runs about 1.7% slow. And a system with $V''(x_0)=0$ has no linear regime at all: its period does depend on amplitude, from the very first nudge.

## Recall
type: mcq
Q: Why do a pendulum, a spring and a vibrating molecular bond all give sine waves at small amplitude?
- [ ] They are all governed by gravity, which is the same force in each case. — no gravity appears in a molecular bond or an LC circuit, and they oscillate all the same.
- [x] Near a stable equilibrium every smooth energy curve is a parabola to leading order, and a parabolic well gives a linear restoring force. — the shape of the minimum does the work, not the physics of the particular system.
- [ ] Sine waves are the only periodic functions available. — there are plenty of others; anharmonic oscillators produce them at large amplitude.
- [ ] Because energy is conserved in all three systems. — true but far too weak: conservation alone does not make a motion sinusoidal.
