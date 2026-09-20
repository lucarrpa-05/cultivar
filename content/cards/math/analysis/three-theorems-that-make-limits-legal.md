---
id: math.analysis.measure-lebesgue.three-theorems-that-make-limits-legal
topic: math.analysis.measure-lebesgue
topics: [math.analysis.completeness-banach]
format: series
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [dominated-convergence, monotone-convergence, fatou, riesz-fischer, l2-completeness]
hook: "The payoff for giving up on measuring every set: three theorems that let you swap a limit and an integral, with no continuity in sight."
series: {id: math.analysis.riemann-to-lebesgue, index: 4, total: 4, title: "From Riemann to Lebesgue"}
sources:
  - {title: "Dominated convergence theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Dominated_convergence_theorem"}
  - {title: "Monotone convergence theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Monotone_convergence_theorem"}
  - {title: "Riesz-Fischer theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Riesz%E2%80%93Fischer_theorem"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Episode arithmetic: 'four episodes later' is three."}
---

# Three theorems that make limits legal

Episode 1 left a corpse: functions that were each integrable, converging to something that was not. Here is the same sequence under the new theory. The functions are bounded by $1$, the limit is measurable, and the integral of the limit is the limit of the integrals. Both are zero. Nothing to prove.

That is the shape of all three of Lebesgue's theorems, and what is startling is what they do *not* require. No continuity. No uniform convergence. No control on how fast anything converges. Monotone convergence asks only that the sequence climbs. Fatou asks nothing at all and gives you an inequality. Dominated convergence asks for one integrable function sitting on top of the whole sequence.

Compare what Riemann demanded — uniform convergence, essentially — and you can see why the twentieth century moved house. Probability, Fourier analysis and PDEs are all built on swapping limits with integrals, and these are the theorems that let you.

Then there is the second payoff, quieter and larger.

## Rigor

**Monotone convergence.** $0\le f_1\le f_2\le\cdots$ measurable, $f_n\to f$ pointwise $\Rightarrow \int f_n\to\int f$.

**Fatou.** $f_n\ge0$ measurable $\Rightarrow \int\liminf f_n\le\liminf\int f_n$.

**Dominated convergence.** $f_n\to f$ pointwise with $|f_n|\le g$ and $\int g<\infty$ $\Rightarrow$ $f$ is integrable and $\int f_n\to\int f$.

*DCT from Fatou in two lines.* Apply Fatou to $g+f_n\ge0$ and to $g-f_n\ge0$:
$$\int f\le\liminf\int f_n,\qquad -\int f\le\liminf\left(-\int f_n\right)=-\limsup\int f_n,$$
so $\limsup\int f_n\le\int f\le\liminf\int f_n$, forcing convergence.

**The quiet payoff: Riesz-Fischer (1907).** $L^p(\mu)$ is complete for $1\le p\le\infty$. The space of continuous functions under the integral norm did *not* keep its Cauchy sequences; $L^1$ and $L^2$ do. In particular $L^2$ is a complete inner-product space, which is the hypothesis every Fourier expansion silently uses.

Episode 1 asked why the indicator of the rationals broke the Riemann integral. The answer, three episodes later: it never broke anything. It was measuring the size of a set, and Riemann had no way to ask.

## Recall
type: mcq
Q: What does dominated convergence require that pointwise convergence alone does not give you?
- [x] A single integrable function bounding the whole sequence — it is what stops mass escaping to infinity or piling onto a thin spike.
- [ ] Uniform convergence — not needed anywhere; that was exactly Riemann's requirement and the thing Lebesgue removed.
- [ ] Continuity of the limit — never required; the limit only has to be measurable, which pointwise limits of measurable functions always are.
