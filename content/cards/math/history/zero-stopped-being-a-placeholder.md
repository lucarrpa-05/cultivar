---
id: math.history.ancient.zero-stopped-being-a-placeholder
topic: math.history.ancient
format: idea
difficulty: 2
language: en
weight: medium
angles: [origin, beautiful, mistake]
tags: [brahmagupta, zero, negative-numbers, division-by-zero, "628"]
hook: "Brahmagupta wrote rules for calculating with zero in 628. Division revealed their limit."
sources:
  - {title: "Brahmagupta", type: wiki, url: "https://en.wikipedia.org/wiki/Brahmagupta"}
  - {title: "Brahmasphutasiddhanta", type: wiki, url: "https://en.wikipedia.org/wiki/Br%C4%81hmasphu%E1%B9%ADasiddh%C4%81nta"}
  - {title: "Division by zero", type: wiki, url: "https://en.wikipedia.org/wiki/Division_by_zero"}
  - {title: "Brahmagupta biography", type: encyclopedia, url: "https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/"}
dates: {written: 2026-09-20, event: 0628-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-history-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Removed first-recorded-mistake claim; clarified Brahmagupta’s actual n/0 wording and why 0/0 is not unique."}
---

# Zero became something you could calculate with

Babylonian scribes had used a mark for an empty place in a number. Brahmagupta went further. In his 628 treatise *Brāhmasphuṭasiddhānta*, he gave arithmetic rules for zero alongside positive fortunes and negative debts: zero times any number is zero, and subtracting a debt from zero produces a fortune.

Then he tried division. He wrote a nonzero number divided by zero as a fraction with zero below, and said zero divided by zero is zero. That last answer is tempting: zero times zero does equal zero. But zero times *every* number equals zero, so division cannot single out his answer. The failed rule is useful because it exposes what division requires: one unique number that reverses multiplication.

## Rigor

Division is defined by multiplication: $a/b$ is the unique $x$ with $bx=a$.

**Case $a\neq 0$, $b=0$.** We need $0\cdot x=a\neq0$. No such $x$ exists, because $0\cdot x=0$ for every $x$ — itself a consequence of distributivity, since $0\cdot x=(0+0)x=0\cdot x+0\cdot x$. So $a/0$ has no candidate at all. Brahmagupta wrote $a/0$ as a fraction with zero below, but that notation does not supply a solution.

**Case $a=0$, $b=0$.** Now we need $0\cdot x=0$, and *every* $x$ works. The failure is the opposite one: not no answer but no unique answer. Brahmagupta picked $x=0$, and nothing in the algebra singles it out.

**Why you cannot patch it.** Suppose a ring assigns some value to $1/0$. Then $1=0\cdot(1/0)=0$, and a ring where $1=0$ has exactly one element. Division by zero is not forbidden by convention; admitting it collapses the arithmetic to a point.

## Recall
type: mcq
Q: Why are $1/0$ and $0/0$ undefined for different reasons?
- [x] $1/0$ has no solution to $0\cdot x=1$, while $0/0$ has every $x$ as a solution — one fails for absence, the other for non-uniqueness.
- [ ] Both fail because the result would be infinite — infinity is not the issue; $0/0$ has no size problem at all.
- [ ] Both are conventions that could be changed — defining $1/0$ in a ring forces $1=0$ and collapses it to one element.
- [ ] $0/0$ is actually 0, as Brahmagupta said — every value satisfies the defining equation, so no value is singled out.
