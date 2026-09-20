---
id: sports.football-analytics.possession-value.most-of-the-game-has-no-shot
topic: sports.football-analytics.possession-value
format: series
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [expected-threat, vaep, possession-value, pitch-zones, action-valuation]
hook: "Expected goals prices the 25 shots in a match and nothing else. So what is the pass that made the goal possible worth?"
series: {id: sports.football-analytics.counting-arc, index: 2, total: 4, title: "How football learned to count"}
sources:
  - {title: "Introducing Expected Threat (xT)", author: "Karun Singh", year: 2018, type: blog, url: "https://karun.in/blog/expected-threat.html"}
  - {title: "Actions Speak Louder than Goals: Valuing Player Actions in Soccer", author: "Decroos, Bransen, Van Haaren, Davis", year: 2019, type: paper, url: "https://arxiv.org/abs/1802.07127"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Hook's unsourced '1,500 actions a match' cut; kept Opta's verified 25 shots."}
---

# The pass that made the goal possible gets nothing

Expected goals has a blind spot the size of a football match. It scores shots. It says nothing about the turn, the switch of play, the tackle that started the move — most of what players do, and most of what scouts argue about.

In 2018 Karun Singh published a fix on his blog. Chop the pitch into a 16-by-12 grid, 192 zones, and ask a single question of each zone: if my team has the ball *here*, what is the chance this possession ends in a goal? A player in that zone will either shoot (worth his shot's xG) or move the ball (worth whatever the destination zone is worth). So the value of a zone is defined in terms of the values of other zones. Circular — and that circularity is the engine, not the bug.

The Leuven group went further. Their VAEP framework prices *every* action, defensive ones included, by how much it shifts the probability of scoring and of conceding over the next few actions. A recovery in your own half gets a price tag.

The circular definition is what makes this work. Here it is written down.

## Rigor

Let $V(z)$ be the expected threat of zone $z$. In zone $z$ a player shoots with probability $s(z)$ and scores with probability $g(z)$, or moves with probability $m(z)=1-s(z)$ to zone $z'$ with transition probability $T(z\to z')$. Then

$$V(z)=s(z)\,g(z)+m(z)\sum_{z'}T(z\to z')\,V(z').$$

Singh solves it by setting $V\equiv 0$ and iterating; it converges in four or five passes. In matrix form $V=b+MTV$, so $V=(I-MT)^{-1}b$ — a linear solve whose inverse exists because possessions end: the chain is absorbing, $\|MT\|<1$.

The value of a pass is then just $V(\text{end})-V(\text{start})$, and you can hand a player his season total in goals-worth-of-progression.

VAEP (Decroos et al., KDD 2019) drops the grid and learns $\Pr(\text{score within }k\text{ actions})$ and $\Pr(\text{concede within }k)$ directly from the game state, then values an action as the change in the difference. Same idea, richer state, no zones.

And still a fiction: the model knows where the ball is, not where the other twenty-one players are standing.

## Recall
type: reveal
Q: Why is expected threat defined circularly — the value of a zone in terms of the values of other zones — and why doesn't that break?
A: Because value flows backwards from goals: a zone is worth what you can reach from it. It doesn't break because possessions end, so the chain is absorbing and the fixed-point equation $V=b+MTV$ has a unique solution you can reach by iterating from zero.
