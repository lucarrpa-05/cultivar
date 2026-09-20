---
id: ai.theory.pac-learning.what-the-theory-promised
topic: ai.theory.pac-learning
format: series
difficulty: 3
language: en
weight: medium
angles: [beautiful, history]
tags: [pac, valiant, sample-complexity, union-bound, realizable]
hook: "The theory never promised the truth. It promised a bound on how often you are badly wrong — and that bound is cheap."
series: {id: ai.theory.why-huge-models-generalize, index: 2, total: 6, title: "Why huge models generalize"}
sources:
  - {title: "A theory of the learnable", author: "Leslie Valiant", year: 1984, type: paper, url: "https://doi.org/10.1145/1968.1972"}
  - {title: "Probably approximately correct learning", type: wiki, url: "https://en.wikipedia.org/wiki/Probably_approximately_correct_learning"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Recall fixed: confidence costs about 7/epsilon extra examples (additive), not 'a constant multiple'."}
---

# What the theory actually promised: probably, approximately, right

Before the broken experiment there was a genuinely beautiful answer, and it is worth knowing exactly what it said, because all of it is still true.

Leslie Valiant's move in 1984 was to stop demanding the impossible. You will never recover the exactly correct rule from finite data — there is always some region you did not sample where an adversary can hide. So ask for less. With high probability over the draw of the training set (*probably*), the hypothesis you return is close to right (*approximately correct*). Two knobs: $\varepsilon$, how wrong you will tolerate, and $\delta$, how often you will tolerate being that wrong.

In exchange the theory hands you a number: given a class of candidate rules, how many examples you need to hit $(\varepsilon,\delta)$. The number is startlingly modest. It grows like $1/\varepsilon$ and only like $\log(1/\delta)$, so buying a hundred times more confidence costs a handful of extra examples.

And the whole thing rests on one inequality about averages you have already met.

## Rigor

Take a finite class $\mathcal H$ and assume some $h^{*}\in\mathcal H$ has zero error — the realizable case. Fix a bad hypothesis, $R(h)>\varepsilon$. The chance it survives $n$ independent samples without one mistake is

$$\Pr\big[\hat R_S(h)=0\big]\le(1-\varepsilon)^{n}\le e^{-\varepsilon n}.$$

Union bound over all the bad hypotheses: the chance that *any* of them survives is at most $|\mathcal H|\,e^{-\varepsilon n}$. Force that below $\delta$ and solve for $n$:

$$n\ \ge\ \frac{1}{\varepsilon}\left(\ln|\mathcal H|+\ln\frac{1}{\delta}\right).$$

That is the sample-complexity theorem, and it makes any algorithm returning a hypothesis consistent with the data PAC: with probability at least $1-\delta$, its true error is at most $\varepsilon$.

Two details worth holding on to. The class enters as $\ln|\mathcal H|$ — the number of *bits needed to name* a hypothesis, not the number of hypotheses, which is why doubling the description length only doubles the data you need. And the bound is distribution-free: it holds for every $D$, which is what makes it a theorem about learning rather than about a dataset.

So what happens when $\mathcal H$ is infinite and $\ln|\mathcal H|=\infty$? You stop counting hypotheses and start counting *behaviours on your sample* — and then the bound looks almost identical. Which is what makes the numbers for real networks so shocking.

## Recall
type: mcq
Q: In the PAC bound $n\ge\frac1\varepsilon(\ln|\mathcal H|+\ln\frac1\delta)$, why is confidence so cheap?
- [x] $\delta$ enters through $\ln(1/\delta)$ — going from 90% to 99.99% confidence adds only about $7/\varepsilon$ examples, while halving $\varepsilon$ doubles the whole requirement.
- [ ] Because $\delta$ does not affect the bound at all — it does, just logarithmically, which is the point.
- [ ] Because confidence and accuracy are the same knob — they are separate: $\varepsilon$ is how wrong, $\delta$ is how often.
