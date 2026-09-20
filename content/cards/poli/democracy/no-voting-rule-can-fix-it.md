---
id: poli.democracy.arrow.no-voting-rule-can-fix-it
topic: poli.democracy.arrow
format: series
difficulty: 3
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [arrow, impossibility, iia, social-welfare-function, dictatorship]
hook: "Condorcet found one broken rule. Arrow proved that the repair shop is empty."
series: {id: poli.democracy.hard-to-define, index: 3, total: 4, title: "Why democracy is hard to define"}
topics: [econ.game-theory.social-choice]
sources:
  - {title: "Arrow's Theorem", type: encyclopedia, url: "https://plato.stanford.edu/entries/arrows-theorem/"}
  - {title: "Social Choice and Individual Values", author: "Kenneth J. Arrow", year: 1951, type: book, url: "https://en.wikipedia.org/wiki/Social_Choice_and_Individual_Values"}
  - {title: "A Difficulty in the Concept of Social Welfare", author: "Kenneth J. Arrow", year: 1950, type: paper, url: "https://www.jstor.org/stable/1828886"}
dates: {written: 2026-09-19, event: 1951-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Episode had no curiosity gap into episode 4; added one on giving up a condition."}
---

# Arrow proved the repair shop is empty

The natural reaction to Condorcet's cycle is engineering: majority rule is a crude device, so build a better one. Borda counts, runoffs, approval, whatever it takes. Kenneth Arrow, writing a doctoral thesis at Columbia, asked the question properly. Instead of testing rules one at a time, he wrote down the handful of things *any* acceptable rule should do, and asked whether anything satisfies them all.

Four conditions. Accept every possible set of individual rankings. If everyone prefers x to y, rank x above y. Decide x against y using only how people rank x against y. And do not let one person's ranking dictate the outcome no matter what anyone else says.

Nothing does all four. Not a single rule, not now, not ever, once there are at least three alternatives. The result appeared in *Social Choice and Individual Values* in 1951, and it won him the Nobel in 1972.

The third condition is the one doing the damage.

## Rigor

Let $X$ be a set of alternatives with $|X| \ge 3$ and $N = \{1,\dots,n\}$ a finite set of individuals. A **social welfare function** $f$ maps each profile $(\succsim_1,\dots,\succsim_n)$ of complete transitive orders on $X$ to a complete transitive order $\succsim_S$ on $X$.

**Arrow's theorem (1951).** No $f$ satisfies all of:

- **Unrestricted domain.** $f$ is defined on every profile of complete transitive orders.
- **Weak Pareto.** If everyone strictly prefers $x$ to $y$, then $x \succ_S y$.
- **Independence of irrelevant alternatives.** $\succsim_S$ restricted to $\{x,y\}$ depends only on each $\succsim_i$ restricted to $\{x,y\}$.
- **Non-dictatorship.** There is no $i$ such that $x \succ_i y \Rightarrow x \succ_S y$ for all profiles and all $x,y$.

Two readings of the fine print. The transitivity of $\succsim_S$ is an assumption, not a conclusion — it is exactly the property Condorcet's cycle destroyed. And IIA is what forbids the rule from using *strength* of preference: a Borda count violates it, which is why inserting a hopeless candidate can flip a Borda winner.

Arrow's own 1951 statement used monotonicity and non-imposition; the second edition of 1963 replaced them with the Pareto condition above, which is how the theorem is now taught.

Four conditions, no rule. Which leaves exactly one move, and every working democracy has already made it: decide which condition you are willing to lose.

## Recall
type: mcq
Q: Which Arrow condition does the Borda count violate?
- [x] Independence of irrelevant alternatives — Borda scores depend on where the other candidates sit, so adding a no-hoper can flip the winner.
- [ ] Weak Pareto — a unanimously top-ranked alternative always wins a Borda count.
- [ ] Unrestricted domain — the Borda count accepts any profile of rankings you hand it.
- [ ] Non-dictatorship — no single Borda voter can override the rest.
