---
id: math.topology.connectedness.two-places-on-the-equator
topic: math.topology.connectedness
format: challenge
difficulty: 2
language: en
weight: light
angles: [weird, practical]
tags: [borsuk-ulam, antipodal, equator, temperature]
hook: "Right now there are two points exactly opposite each other on the equator with exactly the same temperature. Why must that be true?"
sources:
  - {title: "Borsuk–Ulam theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem"}
  - {title: "Intermediate value theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Intermediate_value_theorem"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two places on the equator, same temperature

Here is a claim about the world, right now, that you can prove without leaving your chair. Somewhere on the equator there are two antipodal points — directly opposite each other through the centre of the Earth — where the temperature is exactly the same. Not nearly the same. Exactly.

It sounds like meteorology. It is not: the argument works for any quantity that varies continuously along the circle, and it never uses a single fact about weather.

Before you read the answer: what would you subtract from what, and what theorem would you reach for? And a second question worth sitting with — does the same trick still work if you ask for two antipodal points on the whole sphere that match in temperature *and* pressure at once?

## Recall
type: reveal
Q: What is the argument, and what happens in two dimensions?
A: Let $T(\theta)$ be the temperature at angle $\theta$ and set $g(\theta)=T(\theta)-T(\theta+\pi)$. Then $g(\theta+\pi)=-g(\theta)$, so $g$ takes both signs (or is zero somewhere already); $g$ is continuous on a connected circle, so the intermediate value theorem hands you a $\theta$ with $g(\theta)=0$. For temperature *and* pressure on the sphere the answer is still yes — that is the Borsuk–Ulam theorem, and it needs algebraic topology, not the IVT.
