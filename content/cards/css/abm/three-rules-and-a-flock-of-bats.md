---
id: css.abm.flocking-swarms.three-rules-and-a-flock-of-bats
topic: css.abm.flocking-swarms
format: story
difficulty: 1
language: en
weight: light
angles: [origin, practical, beautiful]
tags: [boids, reynolds, flocking, animation, starlings]
hook: "The bat swarm in Batman Returns has no choreographer. It has three rules, written in 1986."
sources:
  - {title: "Boids", type: wiki, url: "https://en.wikipedia.org/wiki/Boids"}
  - {title: "Flocks, Herds and Schools: A Distributed Behavioral Model", author: "Craig W. Reynolds", year: 1987, type: paper, url: "https://doi.org/10.1145/37401.37406"}
  - {title: "Interaction ruling animal collective behavior depends on topological rather than metric distance", author: "Ballerini et al.", year: 2008, type: paper, url: "https://doi.org/10.1073/pnas.0711437105"}
dates: {written: 2026-09-19, event: 1987-07-27}
rigor: none
rigorNote: "a story about where the three rules came from and how they became testable"
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Ballerini et al. report six-seven neighbours, not 'roughly seven'."}
author: author-css-1
---

# Three rules, and a cloud of bats over Gotham

Craig Reynolds was trying to animate a flock and getting nowhere, because the obvious method — draw the flock's path, then hang birds on it — looks exactly as scripted as it is. In 1986 he inverted the problem. Forget the flock. Write one bird.

His bird, a "boid", follows three instructions about the neighbours it can actually see. Do not crowd them. Steer roughly the way they are steering. Drift toward the middle of them. Nothing in there says "flock", how many birds there are, or where they are headed.

He presented it at SIGGRAPH in 1987, and by 1992 it was on screen: the bat swarms and the marching penguins in *Batman Returns* run on its descendants.

Then it stopped being a graphics trick. In 2008 a team led by Michele Ballerini reconstructed real starling murmurations in three dimensions and found each bird tracks six or seven neighbours — a fixed *count*, not everything within a fixed distance. A way of faking a flock had turned into a measurable claim about a real one.

## Recall
type: reveal
Q: What are the three boid rules, and what is conspicuously missing from them?
A: Separation (do not crowd your neighbours), alignment (match their heading), cohesion (move toward their average position). Missing: the flock. No boid knows it exists, how big it is, or where it is going.
