---
id: poli.political-economy.institutions-growth.two-towns-one-fence
topic: poli.political-economy.institutions-growth
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, mistake]
tags: [acemoglu, robinson, institutions, settler-mortality, instrumental-variables]
hook: "Same desert, same families, same food, and one side of the fence earns several times the other."
sources:
  - {title: "Why Nations Fail", author: "Daron Acemoglu and James A. Robinson", year: 2012, type: book, url: "https://en.wikipedia.org/wiki/Why_Nations_Fail"}
  - {title: "The Colonial Origins of Comparative Development: An Empirical Investigation", author: "Acemoglu, Johnson and Robinson", year: 2001, type: paper, url: "https://www.aeaweb.org/articles?id=10.1257/aer.91.5.1369"}
  - {title: "The Colonial Origins of Comparative Development: An Empirical Investigation: Comment", author: "David Albouy", year: 2012, type: paper, url: "https://www.aeaweb.org/articles?id=10.1257/aer.102.6.3059"}
dates: {written: 2026-09-19, event: 2012-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Easterly reviewed the book warmly; his objection is ex-post rationalising and reliance on anecdote, not cherry-picked cases. Corrected."}
---

# Two towns, one fence, three times the income

Nogales, Arizona and Nogales, Sonora are one town cut by a border. Same desert, same families, same food, and by the book's own figures median household income on the north side is roughly three times that on the south. Geography cannot explain it. Culture cannot explain it. Daron Acemoglu and James Robinson, in *Why Nations Fail* (2012), say institutions can, and that the difference is the fence.

Their distinction: **inclusive** institutions secure property broadly, let outsiders into markets and permit creative destruction; **extractive** institutions funnel the surplus to whoever holds power, and so must block the innovation that would displace them. Each kind reproduces itself, which is why poor countries stay poor for centuries instead of converging. Acemoglu, Simon Johnson and Robinson won the Nobel in 2024.

Now the honest part. Jared Diamond and Jeffrey Sachs argue geography does more work than the book allows. Arvind Subramanian points at China: extractive politics, forty years of growth. William Easterly, reviewing it warmly, still objects to the ex-post rationalising and the weight put on anecdote. And the natural experiment underneath the theory has been attacked directly.

## Rigor

The empirical core is Acemoglu, Johnson and Robinson (2001), an instrumental-variables argument. Institutions and income are jointly determined, so a regression of GDP on property rights says nothing about causation. Their instrument is the mortality rate of European settlers in a colony centuries ago:

$$\text{settler mortality} \;\rightarrow\; \text{early institutions} \;\rightarrow\; \text{institutions today} \;\rightarrow\; \log(\text{GDP per capita}).$$

The story: where Europeans could survive they settled and built institutions to protect themselves; where they died they built extraction machines, and those persisted. The exclusion restriction is load-bearing — mortality two centuries ago must reach income today *only* through institutions.

David Albouy's 2012 comment, in the same journal, went at the data rather than the logic. Of 64 countries, 36 are assigned mortality rates borrowed from other countries; the underlying figures mix labourers, bishops and soldiers on campaign, whose death rates are not comparable. Correct for that, he argues, and the first stage stops being robust while the IV confidence intervals blow up.

This is what a contested empirical claim looks like from inside. The theory may well be right. The cleanest evidence for it is not clean.

## Recall
type: mcq
Q: What does the settler-mortality instrument need in order to be valid?
- [ ] That settler mortality is uncorrelated with institutions — the opposite: an instrument is useless unless it predicts them strongly.
- [x] That old settler mortality reaches income today only through institutions — no other channel, such as today's disease burden.
- [ ] That institutions are measured without error — measurement error matters, but it is not the exclusion restriction.
