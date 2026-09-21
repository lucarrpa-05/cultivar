---
id: niche.everyday.statistics.berkeley-1973
topic: niche.everyday.statistics
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, tool]
tags: [simpsons-paradox, berkeley-admissions, aggregation, confounding, bickel]
hook: "Berkeley’s 1973 aggregate admission gap changed meaning when researchers separated departments."
sources:
  - {title: "Sex Bias in Graduate Admissions: Data from Berkeley", author: "Bickel, Hammel, O'Connell", year: 1975, type: paper, url: "https://doi.org/10.1126/science.187.4175.398"}
  - {title: "Simpson's paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Simpson%27s_paradox"}
dates: {written: 2026-09-20, event: 1975-02-07}
diagram: {file: niche/berkeley-1973.svg, caption: "The aggregate gap changes when admissions are separated by department, which had different applicant mixes and selectivity.", alt: "Bar chart: overall, men 44 percent and women 35 percent admitted; within departments some gaps favor women, some men, and department F admits under ten percent of either sex"}
author: author-sports-niche-1
reviewed: {by: reviewer-niche-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Corrected within-department claim and causal language; aligned diagram caption."}
---

# The admission gap changed when the departments appeared

Berkeley admitted about 44% of male applicants to graduate study in 1973, versus 35% of female applicants. The aggregate gap looked like evidence of discrimination. Bickel, Hammel and O'Connell checked decisions by department and found a different pattern: few departments showed significant sex differences, and the departures favored women about as often as men. Women had applied more often to departments with lower admission rates. Pooling those unequal mixes produced a misleading overall comparison. This is a lesson in selection and aggregation, not proof that no applicant faced bias. Before interpreting any group gap, ask which different populations were mixed to make it.

## Rigor

This is Simpson's paradox: an association can reverse under pooling. It is possible to have

$$\frac{a_i}{n_i}<\frac{b_i}{m_i}\quad\text{for every } i,\qquad\text{yet}\qquad \frac{\sum_i a_i}{\sum_i n_i}>\frac{\sum_i b_i}{\sum_i m_i},$$

because each pooled rate is a weighted average whose weights differ between the two groups.

The causal reading is the useful one. Department choice is associated with applicant sex and strongly predicts admission, so it can confound the aggregate comparison of admission by sex. The aggregate comparison conditions on nothing, so it mixes the within-department effects together with the difference in composition. Stratifying by department reveals the within-department comparisons, though it cannot by itself settle every causal question.

The trap is assuming stratification is always the fix. Condition on a variable sitting on the causal path *after* the treatment, a mediator, and you block part of the very effect you wanted to measure. Which way to slice the data is not a statistical question. It is a question about what caused what, and the numbers alone will not answer it.

## Recall
type: mcq
Q: Berkeley's aggregate admission gap disappears once you condition on department. What made the aggregate misleading?
- [x] Department is a confounder, driving both where people applied and how likely admission was — and the sexes applied very differently.
- [ ] The sample was too small to detect the real effect — nearly 13,000 applicants is ample; the problem is structure, not size.
- [ ] Departments applied different standards to men and women — within departments the rates were close, and pooled they slightly favoured women.
- [ ] Conditioning on more variables always removes bias — conditioning on a mediator can hide part of an effect or introduce bias.
