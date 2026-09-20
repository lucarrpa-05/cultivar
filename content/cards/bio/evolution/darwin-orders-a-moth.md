---
id: bio.evolution.coevolution.darwin-orders-a-moth
topic: bio.evolution.coevolution
format: idea
difficulty: 2
language: en
weight: medium
angles: [prediction, connection]
tags: [coevolution, angraecum, xanthopan, red-queen, arms-race]
hook: "A flower with a foot-long nectar tube made Darwin predict an unseen moth. Nobody watched one drink from it for 135 years."
sources:
  - {title: "Angraecum sesquipedale", type: wiki, url: "https://en.wikipedia.org/wiki/Angraecum_sesquipedale"}
  - {title: "The Pollinators of the Malagasy Star Orchids Angraecum sesquipedale, A. sororium and A. compactum, Botanica Acta 110(5), 343–359", author: "Lutz T. Wasserthal", year: 1997, type: paper, url: "https://doi.org/10.1111/j.1438-8677.1997.tb00650.x"}
  - {title: "Xanthopan", type: wiki, url: "https://en.wikipedia.org/wiki/Xanthopan"}
  - {title: "Red Queen hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Red_Queen_hypothesis"}
  - {title: "Fertilisation of Orchids", author: "Charles Darwin", year: 1862, type: book, url: "https://en.wikipedia.org/wiki/Fertilisation_of_Orchids"}
dates: {written: 2026-09-19, event: 1862-01-25}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The 1992 photographs and 2004 video are not documented; the published first record is Wasserthal 1997. Fixed body and hook, added the Wasserthal paper as a source."}
---

# Darwin looked at an orchid and ordered a moth

In January 1862 a box of Madagascan orchids reached Down House. One of them, *Angraecum sesquipedale*, had a green nectar tube nearly a foot long with the nectar only at the very bottom. Darwin wrote to Hooker: "Good Heavens what insect can suck it". Then he did the unfashionable thing and predicted the insect — a moth with a tongue long enough to reach. Wallace went further in 1867, pointing at a likely African relative and saying naturalists should hunt for the Madagascan one with the confidence astronomers had when they went looking for Neptune.

In 1903 Rothschild and Jordan described a Madagascan hawkmoth with a proboscis that long, and gave it the epithet *praedicta*. Nobody published a record of one actually drinking from the flower until Lutz Wasserthal's Madagascan fieldwork, reported in 1997 — 135 years after Darwin asked. In 2021 the moth was raised to a full species, *Xanthopan praedicta*.

The tube and the tongue built each other. Each species is the other's environment, and that environment keeps moving.

## Rigor

Coevolution changes what "adapted" means: fitness is measured against a landscape that the other player is deforming. Leigh Van Valen turned that into a testable claim in 1973. Plot the fraction of fossil genera in a group still surviving after $t$ million years. If the curve is log-linear,

$$S(t)=e^{-\lambda t},$$

then the hazard rate is constant: $P(\text{extinct in }[t,t+dt]\mid \text{survived to }t)=\lambda\,dt$, independent of $t$. Extinction is memoryless. A lineage that has been winning for fifty million years is in no less danger than a new one.

That is the Red Queen: improvement buys no lasting safety, because everything you interact with is improving too. Van Valen called it a law of constant extinction; how well the log-linearity really holds across taxa has been argued about ever since, and the modern reading keeps the mechanism — adaptation is relative — while treating the constant hazard as an approximation.

The same logic pays rent elsewhere. The leading explanation for why sex is worth its two-fold cost is Red Queen dynamics against parasites: recombination keeps shuffling the lock while the parasites keep filing keys.

## Recall
type: mcq
Q: What does a constant extinction hazard imply about being well adapted?
- [x] Past success buys no future safety — the risk of extinction is memoryless, because competitors and parasites improve as fast as you do.
- [ ] Species get more robust as they age — that is what a *falling* hazard would mean, and it is what the fossil curves do not show.
- [ ] Extinction is caused mainly by external catastrophes — mass extinctions are real, but a constant background hazard points at ongoing biotic pressure.
- [ ] Adaptation does not happen — it happens constantly; it just does not accumulate into a permanent advantage.
