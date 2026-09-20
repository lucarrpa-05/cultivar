---
id: econ.micro.preferences-utility.utility-is-a-ranking
topic: econ.micro.preferences-utility
format: idea
difficulty: 2
language: en
weight: medium
angles: [origin, connection]
tags: [ordinal-utility, revealed-preference, samuelson, representation-theorem, warp]
hook: "Economists spent a century trying to measure pleasure, then realised the whole theory works if you only know what beats what."
sources:
  - {title: "Ordinal utility", type: wiki, url: "https://en.wikipedia.org/wiki/Ordinal_utility"}
  - {title: "A Note on the Pure Theory of Consumer's Behaviour", author: "Paul A. Samuelson", year: 1938, type: paper, url: "https://doi.org/10.2307/2548836"}
  - {title: "Revealed preference", type: wiki, url: "https://en.wikipedia.org/wiki/Revealed_preference"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Utility is a ranking with numbers glued on

Nineteenth-century economics had a real problem: its central quantity was pleasure, and nobody could measure a unit of it. Jevons wrote as though a util were a thing you could in principle weigh. It is not, and the theory looked doomed.

The escape was to notice that nothing in the theory ever uses the numbers. Demand only depends on *which* bundle you prefer, never on by how much. So take any utility function, square it, add seven, take the logarithm — every prediction survives, because all three describe the same ranking. Utility is a bookkeeping device for an ordering, and the numbers are an artefact of writing it down.

Samuelson pushed the idea one step further in 1938: stop talking about the mind altogether. If you bought the expensive bundle when the cheap one was affordable, you have told me your ranking by *acting*, and consistency across such choices is all the theory needs.

Where it breaks is exactly where behavioural economics lives — the same person, same options, different framing, different choice.

## Rigor

**Representation.** If $\succeq$ on a suitable set is complete, transitive and continuous, there is a continuous $u$ with $x\succeq y \iff u(x)\ge u(y)$. And $u$ is unique only up to strictly increasing transformations: for any strictly increasing $f$, $f\circ u$ represents the same $\succeq$. So statements like "this bundle gives twice the utility" carry no content — an ordinal scale has no ratios, and no interpersonal meaning either.

**Revealed preference.** Write $x \mathrel{R} y$ when $x$ was chosen while $y$ was affordable: $p\cdot y\le p\cdot x$. The weak axiom (WARP) says this cannot reverse — if $x\mathrel{R}y$ with $x\neq y$, then never $y\mathrel{R}x$. Houthakker's strong axiom extends it to chains, and it is essentially equivalent to the existence of a utility function generating the choices.

Notice what this buys: the whole apparatus rests on observable choices plus consistency, not on any claim about what is happening inside anyone.

## Recall
type: mcq
Q: Two utility functions, $u$ and $v=\ln u$ (with $u>0$), describe the same consumer. What differs?
- [x] Nothing observable — they induce the same ranking, so the same demand at every price. — utility is ordinal, and increasing transformations are invisible in behaviour.
- [ ] The consumer's demand curve, since logs compress large values. — demand depends only on the ranking, which the transformation leaves intact.
- [ ] The marginal rate of substitution between goods. — the MRS is a ratio of marginal utilities and is also invariant.
- [ ] The consumer's risk aversion. — that would matter for utility over lotteries, where the scale is cardinal; over certain bundles it does not.
