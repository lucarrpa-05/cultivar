---
id: math.analysis.sequences-limits.every-number-is-a-limit
topic: math.analysis.sequences-limits
format: challenge
difficulty: 3
language: en
weight: light
angles: [paradox, weird]
tags: [subsequential-limits, density, rationals, countability, enumeration]
hook: "Can one sequence of real numbers have every point of the unit interval as the limit of one of its subsequences?"
sources:
  - {title: "Subsequential limit", type: wiki, url: "https://en.wikipedia.org/wiki/Subsequential_limit"}
  - {title: "Countable set", type: wiki, url: "https://en.wikipedia.org/wiki/Countable_set"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One sequence that converges to every number at once

A sequence has at most one limit. But it can have many *subsequential* limits: $(-1)^n$ has two, and a sequence that wanders can have more.

So here is the question. Is there a single sequence of real numbers whose set of subsequential limits is all of $[0,1]$ — every number in the interval, rational and irrational, each of them the limit of some subsequence you could actually extract?

Before you answer, notice the tension. A sequence is a countable list. The interval is uncountable. It feels like you are being asked to hit uncountably many targets with countably many arrows.

Sit with it. The construction, if it exists, is one line long.

## Recall
type: reveal
Q: Does such a sequence exist, and what is it?
A: Yes. Enumerate the rationals in [0,1] as a sequence. Every real in [0,1] is a limit of rationals, so every real is a subsequential limit. Countably many arrows do hit uncountably many targets — because a limit point only needs the sequence to come arbitrarily close, not to land.
