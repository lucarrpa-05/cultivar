---
id: math.analysis.continuity.breaks-where-you-can-name-it
topic: math.analysis.continuity
topics: [math.analysis.riemann-integral]
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, paradox]
tags: [thomae-function, popcorn-function, g-delta, baire-category, discontinuity]
hook: "There is a function continuous at every irrational and broken at every rational. The mirror image is impossible, and the reason is deep."
sources:
  - {title: "Thomae's function", type: wiki, url: "https://en.wikipedia.org/wiki/Thomae%27s_function"}
  - {title: "Baire category theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Baire_category_theorem"}
  - {title: "Gδ set", type: wiki, url: "https://en.wikipedia.org/wiki/G%CE%B4_set"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The function that breaks exactly where you can name it

Define $f$ on $[0,1]$: at a rational $p/q$ in lowest terms, $f=1/q$; at every irrational, $f=0$. Carl Johannes Thomae wrote it down in 1875 and it has been ruining intuitions ever since.

It is continuous at every irrational and discontinuous at every rational. Both sets are dense, so the function is broken on a dense set and unbroken on a dense set at once. Picture the graph: spikes of height 1, 1/2, 1/3, thinning as denominators grow, a haze settling toward zero. Near an irrational the only tall spikes are the ones with small denominators, and you can always find a window with none of them in it.

Now the real surprise. Swap the roles: continuous exactly at the rationals, broken at every irrational. No such function exists, for any definition you try. Not "nobody has found one" — impossible, and the obstruction has nothing to do with this construction.

## Rigor

**Continuity at irrationals.** Fix irrational $x$ and $\varepsilon>0$. Only finitely many rationals in $[0,1]$ have denominator $q<1/\varepsilon$, so some $\delta>0$ keeps all of them out of $(x-\delta,x+\delta)$. On that window $f<\varepsilon$, and $f(x)=0$. At a rational $p/q$, nearby irrationals give value $0$ against $f(p/q)=1/q>0$, so it jumps there.

**Why the mirror fails.** For any $f:\mathbb{R}\to\mathbb{R}$ the continuity set is
$$C(f)=\bigcap_{n\ge 1}\left\{x:\ \operatorname{osc}_f(x)<1/n\right\},$$
and each of those sets is open, so $C(f)$ is always a $G_\delta$. If some $f$ had $C(f)=\mathbb{Q}$, then $\mathbb{Q}$ and the irrationals would both be dense $G_\delta$ sets in $\mathbb{R}$; their intersection would be empty, contradicting Baire.

So the haze of spikes is allowed and its mirror image is forbidden — by a theorem about complete spaces, not about functions.

## Recall
type: mcq
Q: Why can no function be continuous exactly at the rationals?
- [x] The set of continuity points is always a $G_\delta$, and ℚ is not one — Baire's theorem rules it out.
- [ ] Because ℚ is countable and continuity sets must be uncountable — false; a function can be continuous at exactly one point.
- [ ] Because ℚ is dense — density is no obstacle: Thomae's function is continuous on the dense set of irrationals.
