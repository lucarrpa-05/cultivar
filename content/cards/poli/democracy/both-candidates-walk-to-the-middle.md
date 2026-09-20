---
id: poli.democracy.median-voter.both-candidates-walk-to-the-middle
topic: poli.democracy.median-voter
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, prediction]
tags: [median-voter, single-peaked, downs, hotelling, spatial-models]
hook: "Two ice-cream carts on a beach end up side by side in the middle. So do two parties."
sources:
  - {title: "Median voter theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Median_voter_theorem"}
  - {title: "On the Rationale of Group Decision-making", author: "Duncan Black", year: 1948, type: paper, url: "https://www.jstor.org/stable/1825026"}
  - {title: "An Economic Theory of Democracy", author: "Anthony Downs", year: 1957, type: book, url: "https://en.wikipedia.org/wiki/An_Economic_Theory_of_Democracy"}
  - {title: "Stability in Competition", author: "Harold Hotelling", year: 1929, type: paper, url: "https://www.jstor.org/stable/2224214"}
diagram: {file: poli/median-voter-line.svg, caption: "Five voters on one line: whoever gets closer to voter 3 wins, so both candidates move there.", alt: "A horizontal line with five voter positions, the middle one marked as median, and two arrows showing candidates moving inward toward it"}
dates: {written: 2026-09-19}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Diagram text referred to 'voter 3' but the median dot was labelled only 'median voter'; relabelled."}
---

# Why both candidates walk to the middle

Put two ice-cream carts on a straight beach where sunbathers are spread out and always walk to the nearer cart. Wherever your rival parks, you gain by sliding a step toward them. Harold Hotelling wrote that down in 1929 for shops on a road. The carts end up back to back in the middle, which is terrible for the people at the ends and unbeatable for each cart.

Duncan Black in 1948 and Anthony Downs in 1957 saw that elections are the same beach. Line up voters by how much spending they want, let each vote for whichever platform sits closer to their own ideal, and the platform that beats every other head-to-head is the one the *median* voter wants. Not the mean. The median, which is why a rich minority's extreme position moves nothing.

This is the most-used model in political science, and it explains a real annoyance: why parties that fight bitterly end up proposing nearly the same budget. It also fails loudly — with three candidates, with abstention, with primaries, and above all with more than one issue.

Here is the theorem, and the exact place it breaks.

## Rigor

Let voters $1,\dots,n$ ($n$ odd) have ideal points $x_i \in \mathbb{R}$ and **single-peaked** preferences: each $u_i$ is strictly increasing to the left of $x_i$ and strictly decreasing to the right.

**Black's theorem (1948).** The median ideal point $x_m$ is a Condorcet winner: for any $y \neq x_m$, a strict majority prefers $x_m$ to $y$.

*Why.* Take $y > x_m$. Every voter with $x_i \le x_m$ is strictly closer to $x_m$ than to $y$, and by single-peakedness ranks $x_m$ higher. That is at least $(n+1)/2$ voters, a majority. Symmetrically for $y < x_m$. The "walk toward your rival" story is this argument run as a best response: any platform other than $x_m$ is beaten, so $(x_m, x_m)$ is the unique Nash equilibrium of the two-candidate game.

Now add a second dimension — say spending *and* an unrelated social question. Ideal points sit in $\mathbb{R}^2$, and a median in every direction almost never exists. The McKelvey–Schofield chaos theorem says that when it does not, majority rule can be steered from any point to any other point by a clever sequence of pairwise votes. One dimension: an equilibrium. Two: the agenda-setter owns you.

## Recall
type: mcq
Q: Which assumption is doing the real work in the median voter theorem?
- [ ] That voters are selfish — self-interest is not needed; any single-peaked preference works.
- [x] That preferences are single-peaked along a single dimension — with two dimensions a Condorcet winner usually fails to exist.
- [ ] That turnout is complete — the theorem runs on whoever votes, though who is median then changes.
- [ ] That there are exactly two candidates — two candidates make the convergence story vivid, but the Condorcet result holds regardless.
