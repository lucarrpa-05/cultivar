---
id: econ.causal.randomized-experiments.snows-grand-experiment
topic: econ.causal.randomized-experiments
topics: [econ.causal.credibility-revolution]
format: series
difficulty: 2
language: en
weight: medium
angles: [history, tool]
tags: [john-snow, cholera, natural-experiment, water-companies, as-if-random]
hook: "The famous pump-handle map is the worse study. Snow's masterpiece was a price war between two water companies."
series: {id: econ.causal.correlation-to-causation, index: 1, total: 5, title: "Correlation to causation"}
sources:
  - {title: "1854 Broad Street cholera outbreak", type: wiki, url: "https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak"}
  - {title: "John Snow", type: wiki, url: "https://en.wikipedia.org/wiki/John_Snow"}
dates: {written: 2026-09-19, event: 1854-09-08}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "420 is the outbreak total, not the toll before the handle came off on 8 September. Snow quote and the 14x ratio verified against the sources."}
---

# The first natural experiment was a fight between two water companies

Everyone knows the map: Soho, 1854, John Snow plotting cholera deaths around the Broad Street pump, the handle removed on 8 September of an outbreak that killed 420 people. Great story, mediocre evidence — the deaths were already falling when the handle came off.

His masterpiece was south of the river. Two companies piped water into the same streets, sometimes to houses next door to each other. Southwark and Vauxhall drew from the Thames below London's sewage outfalls; Lambeth had moved its intake upstream in 1852. The pipes had been laid during a price war, years before anyone suspected water, and most tenants could not tell you which company they paid. Cholera then killed in Southwark and Vauxhall houses at about fourteen times the Lambeth rate.

Snow knew exactly what he had: "no experiment could have been devised which would more thoroughly test the effect of water supply on the progress of Cholera than this, which circumstances placed ready made before the observer."

Circumstances placed it ready made. That is the whole trick. But what makes one comparison honest and another a lie?

## Rigor

This is what we now call a **natural experiment**. Write $D_i=1$ if house $i$ took Southwark and Vauxhall water and $Y_i=1$ if someone in it died of cholera. Snow's number is a risk ratio,

$$\widehat{RR}=\frac{\Pr(Y=1\mid D=1)}{\Pr(Y=1\mid D=0)}\approx 14 .$$

That ratio is a causal effect only if $D$ behaves like a coin flip — same streets, same rents, same air, differing only in which company's main ran under the pavement. Snow's defence of that is historical, not statistical: the pipes were laid in a commercial scramble, and the households were intermingled.

And everything that can go wrong fits in one sentence: if Southwark's customers were poorer, part of the fourteen is poverty, not water. "Circumstances placed it ready made" is a claim about *why* $D$ varies, and that claim is never in the data. Every design in this series is a different answer to the same question — what made the treatment vary, and was that reason innocent?

## Recall
type: mcq
Q: Why is the south London water-company study stronger evidence than the Broad Street map?
- [x] Which company supplied a house was decided years earlier by a price war, not by anything about the household — so the two groups are comparable. — that is the "as-if random" claim a natural experiment lives on.
- [ ] It had more deaths in it, so the statistics are more precise. — precision is not the issue; a biased comparison stays biased at any sample size.
- [ ] Snow removed the pump handle and cholera stopped, which proves causation. — the epidemic was already declining, so the timing proves little.
- [ ] It used a map, and maps show spatial patterns clearly. — the map shows clustering, which is equally consistent with bad air in that neighbourhood.
