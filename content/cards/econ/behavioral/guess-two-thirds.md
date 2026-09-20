---
id: econ.behavioral.behavioral-game-theory.guess-two-thirds
topic: econ.behavioral.behavioral-game-theory
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, tool]
tags: [beauty-contest, level-k, iterated-reasoning, nagel]
hook: "Pick a number from 0 to 100. Closest to two-thirds of the average wins. The equilibrium is 0 and you should not play it."
sources:
  - {title: "Guess 2/3 of the average", type: wiki, url: "https://en.wikipedia.org/wiki/Guess_2/3_of_the_average"}
  - {title: "Unraveling in guessing games: an experimental study, American Economic Review 85(5)", author: "Rosemarie Nagel", year: 1995, type: paper, url: "https://www.jstor.org/stable/2950991"}
dates: {written: 2026-09-19, event: 1995-12-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Pick a number. Closest to two-thirds of the average wins.

You and a hundred other people each write down a number between 0 and 100. Whoever lands closest to two-thirds of the average takes the prize.

Think before reading on. If everyone chose at random the average would be 50, so the target is 33 — write 33. But everyone else can reason that far too, and if they all write 33 the target becomes 22. And if they all see *that*, 15. Keep unravelling and the chain ends at 0, which is the unique Nash equilibrium of the game.

So: do you write 0? What would you actually write, and what does your answer assume about how many steps the other hundred people will take?

## Recall
type: reveal
Q: What number should you actually write, and why is it not 0?
A: Rosemarie Nagel ran this in 1995 and almost nobody plays 0. First-round averages sit in the mid-30s, with visible spikes at 33 and 22 — one and two rounds of reasoning away from 50. Playing 0 is a best response only in a room where everyone reasons infinitely far, and no such room exists. Winning means estimating how many steps the room will take, then taking one more.
