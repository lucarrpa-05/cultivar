---
id: niche.art.perspective-math.remember-the-point-at-infinity
topic: niche.art.perspective-math
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, beautiful]
tags: [projective-geometry, vanishing-point, brunelleschi, alberti, desargues]
hook: "Painters were drawing the point at infinity for two hundred years before a mathematician admitted it was a point."
callback: {from: math.geometry.projective, to: niche.art.perspective-math}
prerequisites: [math.geometry.projective]
sources:
  - {title: "Perspective (graphical)", type: wiki, url: "https://en.wikipedia.org/wiki/Perspective_(graphical)"}
  - {title: "Projective geometry", type: wiki, url: "https://en.wikipedia.org/wiki/Projective_geometry"}
  - {title: "Girard Desargues", type: wiki, url: "https://en.wikipedia.org/wiki/Girard_Desargues"}
dates: {written: 2026-09-19, event: 1435-01-01}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the point at infinity? Florence got there first.

In projective geometry you adjoin points at infinity so that parallel lines meet, and Euclidean geometry becomes a special case. It feels like a formal convenience invented to tidy up theorems.

It was invented by painters, and it was not a convenience — it was an observation. Sometime between 1415 and 1420 Filippo Brunelleschi ran a demonstration in Florence involving a painted panel of the Baptistery, a peephole drilled through it and a mirror, so a viewer could compare the painted building with the real one. By 1435 Leon Battista Alberti had written *De pictura*, setting out the construction: the parallel edges of a tiled floor converge to a single point on the horizon.

That point is not an artistic convention. It is where those parallel lines genuinely go. Girard Desargues (1591–1661), who knew the perspective literature, took it seriously and built the geometry — then was ignored so completely that his work survived through a handwritten copy Michel Chasles stumbled on in 1845.

Here is the correspondence, exactly.

## Rigor

Model the eye at the origin of $\mathbb{R}^{3}$ and the canvas as the plane $z=1$. A point $(x,y,z)$ with $z>0$ is painted at $(x/z,\,y/z)$ — which is precisely the map from $\mathbb{R}^{3}\setminus\{0\}$ to homogeneous coordinates. A painting *is* a chart of $\mathbb{P}^{2}(\mathbb{R})$.

Take the ray through a scene point $p_0$ in direction $v$: $p(t)=p_0+tv$. Its image is

$$\frac{p_0+tv}{(p_0+tv)_z}\;\xrightarrow[t\to\infty]{}\;\frac{v}{v_z},$$

independent of $p_0$. That limit is the vanishing point, and the computation says the two things a painter knows by instinct: it depends only on the *direction* $v$, so all lines parallel to $v$ share one vanishing point; and a direction with $v_z=0$ — parallel to the canvas — has no vanishing point at all, which is why the verticals of a building stay parallel in a painting.

The set of vanishing points of all directions lying in a given plane is a line on the canvas. For the ground plane, that line is the horizon. The horizon is the line at infinity, and you have been looking at it your whole life.

## Recall
type: mcq
Q: In a perspective painting, why do a building's vertical edges stay parallel while the road's edges converge?
- [x] The verticals are parallel to the picture plane, so their direction has no vanishing point — only directions with a component towards the viewer converge.
- [ ] Because artists choose to draw them that way for balance — the construction is forced by the projection, not chosen.
- [ ] Because vertical lines are infinitely long and horizontal ones are not — length is irrelevant; only direction relative to the canvas matters.
