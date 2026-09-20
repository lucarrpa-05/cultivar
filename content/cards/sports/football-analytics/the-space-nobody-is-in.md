---
id: sports.football-analytics.pitch-control.the-space-nobody-is-in
topic: sports.football-analytics.pitch-control
format: series
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [pitch-control, tracking-data, voronoi, time-to-intercept, spearman]
hook: "Draw the map of everywhere your team would win the ball if it landed there. Football turns into a weather chart."
series: {id: sports.football-analytics.counting-arc, index: 3, total: 4, title: "How football learned to count"}
prerequisites: [sports.football-analytics.expected-goals]
sources:
  - {title: "Physics-Based Modeling of Pass Probabilities in Soccer (MIT Sloan Sports Analytics Conference)", author: "William Spearman et al.", year: 2017, type: paper, url: "https://static.hudl.com/craft/downloads/SSAC17-Physics-Based-Modeling-of-Pass-Probabilities-in-Soccer.pdf"}
  - {title: "Everything you need to know about pitch control", type: blog, url: "https://www.getgoalsideanalytics.com/everything-you-need-to-know-about-pitch-control/"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The best pass on the pitch is often the one nobody made

Event data records what happened. Tracking cameras record where all twenty-two players were while it happened, many times a second, which lets you ask a stranger question: *if the ball appeared at that patch of grass right now, whose would it be?*

Answer it for every patch and you get a map — Spearman's pitch control, presented at MIT Sloan in 2017 and extended in 2018. Two coloured territories, breathing and shifting as players run, with contested grey seams between them. A midfielder who never touches the ball spends ninety minutes redrawing that map.

Suddenly you can grade the pass a player *didn't* play. Take every point he could have reached, weight it by the chance his team would keep the ball there and by what that zone is worth, and the difference between the best available option and the one he chose is a number. Scouts have always said "he sees the pass"; this is the first tool that can disagree with them.

The map comes out of ordinary kinematics.

## Rigor

For every point $r$ and player $i$, compute the shortest time $T_i(r)$ to arrive there from the player's current position $x_i$ and velocity $v_i$, subject to a reaction delay and caps on acceleration and top speed. Let $T_b(r)$ be the time for the ball to travel there.

The crude version is a hard comparison: $r$ belongs to the team whose fastest player satisfies $\min_i T_i(r)<T_b(r)$. Note what this degenerates to — if every player stands still with the same top speed, $T_i(r)\propto\lVert r-x_i\rVert$ and the map is exactly the Voronoi diagram of the players. Pitch control *is* a Voronoi diagram that knows about momentum.

The usable version is probabilistic, because arrival times are uncertain. Smooth the comparison,

$$P_i(r)=\sigma\!\left(\frac{T_b(r)-T_i(r)}{s}\right),$$

with $\sigma$ the logistic function and $s$ a timing-uncertainty scale of a fraction of a second, then normalise across all players so the two teams' control at $r$ sums to one.

Combine with episode 2's zone values and you have the expected value of a pass to $r$: control times threat, integrated over the pitch.

Beautiful, and still incomplete. None of this knows why the players are standing where they are.

## Recall
type: mcq
Q: If every player froze in place and they all ran equally fast, what would a pitch-control map become?
- [x] The Voronoi diagram of the players' positions — time-to-arrive is then proportional to distance, so each point goes to its nearest player.
- [ ] A uniform 50–50 split — control depends on positions, which are not symmetric between the teams.
- [ ] The convex hull of each team — hulls describe shape, not who reaches a point first.
- [ ] An expected-goals surface — xG values shots, not territory.
