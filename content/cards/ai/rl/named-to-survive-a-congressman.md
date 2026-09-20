---
id: ai.rl.mdp-bellman.named-to-survive-a-congressman
topic: ai.rl.mdp-bellman
format: story
difficulty: 1
language: en
weight: light
angles: [human, origin, weird]
tags: [bellman, dynamic-programming, rand, naming, curse-of-dimensionality]
hook: "It is not dynamic and it is not programming. Bellman picked the name so that nobody could defund it."
sources:
  - {title: "Dynamic programming", type: wiki, url: "https://en.wikipedia.org/wiki/Dynamic_programming"}
  - {title: "Eye of the Hurricane: An Autobiography", author: "Richard Bellman", year: 1984, type: book, url: "https://en.wikipedia.org/wiki/Richard_E._Bellman"}
dates: {written: 2026-09-19, event: 1950-01-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Flagged the hole in Bellman's memoir: Wilson only became Secretary of Defense in 1953, three years after the naming."}
---

# He named it "dynamic programming" to get it past Washington

Richard Bellman spent the autumn of 1950 at RAND, working on multistage decision processes and needing a name for them. In his 1984 autobiography he explained the choice. The Secretary of Defense, Charles Wilson, "had a pathological fear and hatred of the word research", so calling it mathematics was asking for trouble. "Dynamic" sounded impressive and could not be turned into an insult. "Programming" meant scheduling, not code.

The result is a phrase that describes nothing whatsoever about the method. Dynamic programming is neither. It is one observation: the tail of an optimal plan is itself an optimal plan, so a long problem can be solved backwards from its end, one step at a time, reusing the answers.

Bellman told this story thirty-odd years after the fact, and the dates do not quite line up — Wilson only became Secretary of Defense in 1953. Read it as memoir, not minutes. He also coined "curse of dimensionality", which is the same instinct pointed the other way — a phrase so vivid that the problem it names has never needed re-explaining.

## Recall
type: reveal
Q: What is the one idea inside dynamic programming?
A: The principle of optimality: whatever the first decision was, the remaining decisions must be optimal for the state you land in. So you can solve the problem backwards from the end and reuse sub-answers.
