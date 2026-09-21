---
id: niche.games.puzzles.three-and-five-litres
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [tool, practical]
tags: [water-jugs, measuring, pouring, state-space]
hook: "A three-litre jug and a five-litre jug can measure exactly four. No marks needed."
sources:
  - {title: "Water pouring puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Water_pouring_puzzle"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# Four litres with the wrong two jugs

You have an unmarked three-litre jug, an unmarked five-litre jug, a tap, and a drain. You can fill a jug completely, empty it completely, or pour between jugs until one is full or the other empty. How do you leave exactly four litres in the five-litre jug?

No careful eyeballing is allowed. Each legal move lands on a state you can name: “two in the small jug, five in the big one,” for example. Try to get a *one-litre remainder* first. Once the small jug holds one, filling the big jug and pouring into the small one will leave four behind.

## Recall
type: reveal
Q: What sequence leaves exactly four litres in the five-litre jug?
A: Fill the 5; pour into the 3, leaving 2 in the 5. Empty the 3; pour the remaining 2 into it. Fill the 5 again; pour from it into the 3 until that jug fills with one more litre. Four remain in the 5.
