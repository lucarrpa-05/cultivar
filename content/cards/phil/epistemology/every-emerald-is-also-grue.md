---
id: phil.epistemology.induction.every-emerald-is-also-grue
topic: phil.epistemology.induction
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, weird]
tags: [goodman, grue, projectibility, entrenchment, new-riddle]
hook: "Every emerald ever examined is green. Every emerald ever examined is also grue. Pick one, and you have predicted different futures."
related: [phil.epistemology.induction.the-sun-has-made-you-no-promises]
sources:
  - {title: "Fact, Fiction, and Forecast", author: "Nelson Goodman", year: 1955, type: book, url: "https://en.wikipedia.org/wiki/Fact,_Fiction,_and_Forecast"}
  - {title: "New riddle of induction", type: wiki, url: "https://en.wikipedia.org/wiki/New_riddle_of_induction"}
  - {title: "Nelson Goodman", type: encyclopedia, url: "https://plato.stanford.edu/entries/goodman/"}
dates: {written: 2026-09-19, event: 1955-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The rigor quantified over an undefined predicate Ex'; renotated with Mx for 'is an emerald'."}
---

# Every emerald you have ever seen is also grue

Hume asked whether past regularities license future predictions. Nelson Goodman asked a nastier question in 1955: *which* regularity did you even observe?

Define **grue**: an object is grue if it has been examined before some future time $t$ and is green, or has not been examined before $t$ and is blue. Now look at your evidence. Every emerald ever examined has been green. Every emerald ever examined has also, by that definition, been grue. The evidence is identical, letter for letter.

But "all emeralds are green" predicts that the next emerald, examined after $t$, will be green, and "all emeralds are grue" predicts it will be blue. Same data, opposite forecasts, equal support.

The instinct is to say grue is artificial — defined with a clock in it. That instinct does not survive contact. Someone whose primitive vocabulary is *grue* and *bleen* can define green as "examined before $t$ and grue, or not so examined and bleen". Which pair is the gerrymandered one depends on where you start.

## Rigor

Formally, let $Mx$ be "x is an emerald", $Gx$ "x is green", $Bx$ "x is blue" and $Ex$ "x is examined before $t$". Define
$$G^{*}x \;\equiv\; (Ex \wedge Gx) \vee (\neg Ex \wedge Bx).$$
For every observed emerald $a$ we have $Ea$, so $Ga \leftrightarrow G^{*}a$. Any confirmation relation that depends only on the observed instances therefore confirms $\forall x (Mx \to Gx)$ and $\forall x (Mx \to G^{*}x)$ to exactly the same degree — yet they diverge on every unexamined case.

Goodman's conclusion is that confirmation is not a purely syntactic relation between evidence and hypothesis. Some predicates are **projectible** and some are not, and no amount of logic separates them, because the symmetry above shows the "positional" defect is relative to the chosen primitives.

His own answer is **entrenchment**: a predicate is projectible to the extent that it and its relatives have actually been used in successful past projections. That is frankly a historical fact about our language, not a logical one — which is either the honest answer or a surrender, depending on who you ask. Bayesians reply that priors do the work; the grue problem then reappears as the question of why your prior over hypotheses looks like that.

## Recall
type: reveal
Q: Why does calling "grue" artificial fail to settle the new riddle?
A: Because the artificiality is symmetric. Starting from grue and bleen as primitives, green is the one that needs a time-indexed definition. Nothing purely logical marks one vocabulary as the natural one, which is exactly Goodman's point.
