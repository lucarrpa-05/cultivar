---
id: math.topology.connectedness.the-equator-proof-you-can-draw
topic: math.topology.connectedness
format: idea
difficulty: 2
language: en
weight: medium
angles: [beautiful, tool]
tags: [equator, antipodal-points, intermediate-value, proof-sketch]
hook: "You asked for a picture. Draw one diameter, then let its ends trade places."
answersQuestion: q-2026-09-20-bwns
related: [math.topology.connectedness.two-places-on-the-equator]
sources:
  - {title: "Intermediate value theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Intermediate_value_theorem"}
  - {title: "Borsuk–Ulam theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem"}
dates: {written: 2026-09-20}
diagram: {file: math/equator-proof.svg, caption: "Rotate a diameter through half a turn: the signed temperature gap starts at one value and ends at its negative, so it crosses zero.", alt: "A circle with opposite endpoints A and B, arrows showing a half-turn that swaps them; beneath it, a continuous temperature-difference curve crossing a zero line."}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Diagram corrected to show the half-turn used in the proof."}
---

# Draw a diameter. Now make its ends switch places.

You asked why the equator trick works *graphically*. Draw the equator as a circle and a diameter through it. Label the ends A and B. Suppose A is warmer: write a positive number for “A minus B.”

Now rotate the diameter halfway around. A and B have traded places, so that same subtraction is negative. As the diameter turned, its temperature difference changed continuously. Sketch that difference as a line starting above zero and ending below. It must cross zero somewhere. At that angle, the two ends match.

That is the whole proof you can reproduce: **subtract, swap, cross zero**. If the first difference was already zero, you were done before rotating.

## Rigor

Choose a continuous temperature function $T$ on the equator, with angle measured modulo $2\pi$. Put $g(\theta)=T(\theta)-T(\theta+\pi)$. This is the signed gap between the ends of your diameter, and it is continuous.

After a half-turn, the endpoints swap: $g(\theta+\pi)=T(\theta+\pi)-T(\theta+2\pi)=-g(\theta)$. In particular, $g(\pi)=-g(0)$. If $g(0)=0$, stop. Otherwise the continuous function $g$ has opposite signs at the ends of $[0,\pi]$. The intermediate value theorem gives some $\theta$ in that interval with $g(\theta)=0$, exactly the matching pair. The circle picture supplies the swap; the graph picture supplies the zero.

## Recall
type: reveal
Q: Sketch the proof in three moves. What do you draw, and why must the graph hit zero?
A: Draw a circle and a rotating diameter. Graph the signed difference $T(\theta)-T(\theta+\pi)$. A half-turn swaps the endpoints, so the graph goes from a value to its negative; continuity forces a zero (unless it started at zero).
