---
id: econ.econometrics.did.new-jersey-raised-the-minimum-wage
topic: econ.econometrics.did
topics: [econ.causal.credibility-revolution]
format: series
difficulty: 3
language: en
weight: heavy
angles: [feud, tool]
tags: [difference-in-differences, minimum-wage, card-krueger, parallel-trends, new-jersey]
hook: "In 1992 New Jersey raised its minimum wage and Pennsylvania did not. Two economists treated a state line as an experiment."
series: {id: econ.causal.correlation-to-causation, index: 4, total: 5, title: "Correlation to causation"}
diagram: {file: econ/did-parallel-trends.svg, caption: "The dashed line is the whole method: the treated group's trend if the policy had never happened.", alt: "Two lines sloping down in parallel before the policy date; after it New Jersey flattens while a dashed line keeps the old slope, with a bracket marking the gap"}
sources:
  - {title: "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania", author: "David Card & Alan B. Krueger", year: 1994, type: paper, url: "https://www.nber.org/papers/w4509"}
  - {title: "Myth and Measurement — includes the 1994 study and the Neumark–Wascher exchange", type: wiki, url: "https://en.wikipedia.org/wiki/Myth_and_Measurement"}
  - {title: "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania: Reply", author: "David Card & Alan B. Krueger", year: 2000, type: paper, url: "https://doi.org/10.1257/aer.90.5.1397"}
dates: {written: 2026-09-19, event: 1992-04-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Card-Krueger 2000 reply title corrected against Crossref (A Case Study)."}
---

# A state line, a wage rise, and the most argued-about study in economics

On 1 April 1992 New Jersey's minimum wage went from \$4.25 to \$5.05. Pennsylvania's stayed. David Card and Alan Krueger phoned 410 fast-food restaurants on both sides of the border before the rise and again that November, and asked how many people were working.

Textbook prediction: New Jersey sheds jobs. What they found was employment holding up in New Jersey slightly *better* than across the line. The paper detonated. David Neumark and William Wascher went back with actual payroll records and got the opposite sign; Card and Krueger answered in the same 2000 issue of the *American Economic Review* using government payroll data for every fast-food outlet, and again found no job losses. The employment question is still live — later work using different designs lands on both sides.

What nobody disputes is the move. Don't ask what happened in New Jersey; ask what happened in New Jersey *minus* what happened in Pennsylvania. Two differences, one estimate.

And it works only if Pennsylvania was going where New Jersey was going.

## Rigor

Two groups, two periods. Let $Y_{gt}$ be mean employment in group $g\in\{T,C\}$ at $t\in\{0,1\}$. The **difference-in-differences** estimator is

$$\hat\tau_{DD}=\big(\bar Y_{T1}-\bar Y_{T0}\big)-\big(\bar Y_{C1}-\bar Y_{C0}\big),$$

identical to the coefficient on the interaction in $Y_{it}=\alpha+\beta\,\mathrm{Treat}_i+\gamma\,\mathrm{Post}_t+\tau\,(\mathrm{Treat}_i\times\mathrm{Post}_t)+\varepsilon_{it}$.

The first difference sweeps out anything fixed about New Jersey — its tax code, its diners, its commuting patterns. The second sweeps out anything that hit both states, like the 1992 recovery. What survives is the policy, *provided* the untreated trends would have matched:

$$\mathbb{E}[Y_{T1}(0)-Y_{T0}(0)] = \mathbb{E}[Y_{C1}(0)-Y_{C0}(0)].$$

That is **parallel trends**, and it is the dashed line in the picture: a statement about a world you never observe. It is not implied by randomisation, it is not testable, and pre-treatment periods only make it plausible. Note too that it is not scale-free — parallel in levels is not parallel in logs.

## Recall
type: mcq
Q: What does difference-in-differences actually assume?
- [ ] That the two groups looked the same before the policy. — levels can differ freely; only the *change* has to be comparable.
- [x] That without the policy, the two groups' outcomes would have moved by the same amount. — the untestable parallel-trends assumption, which the second difference relies on entirely.
- [ ] That treatment was randomly assigned across states. — if it were, you would not need the second difference at all.
- [ ] That the outcome is unaffected by anything except the policy. — common shocks are fine; that is exactly what the control group subtracts.
