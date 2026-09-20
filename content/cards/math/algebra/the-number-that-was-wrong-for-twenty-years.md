---
id: math.algebra.groups-basics.the-number-that-was-wrong-for-twenty-years
topic: math.algebra.groups-basics
format: fact
difficulty: 2
language: en
weight: light
angles: [numbers, mistake]
tags: [groups, enumeration, p-groups, order-1024, computational-algebra]
hook: "There are 49,487,367,289 groups of order 1024. For twenty years the published figure was off by 1,867."
sources:
  - {title: "A000001: Number of groups of order n", type: dataset, url: "https://oeis.org/A000001"}
  - {title: "On the number of groups of order 1024", author: "David Burrell", year: 2021, type: paper, url: "https://doi.org/10.1080/00927872.2021.2006680"}
  - {title: "List of small groups", type: wiki, url: "https://en.wikipedia.org/wiki/List_of_small_groups"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Both figures verified (Burrell 2021, Comm. Algebra 50(6)); dropped the unverifiable account of how the 2001 miscount happened."}
---

# A published number that stayed wrong for twenty years

There are 49,487,367,289 groups of order 1024 — over 99% of all groups of order at most 2000 sit at that single order. The catalogue published in 2001 said 49,487,365,422. In 2021 David Burrell recounted and found 1,867 more; the OEIS corrected its entry in January 2022. Nobody had caught it for two decades, because nobody can check 49 billion groups by hand.
