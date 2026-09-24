---
id: niche.games.puzzles.ten-hats-one-word
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: medium
angles: [tool, beautiful]
tags: [hat-puzzle, parity, prisoners, information, modular-arithmetic]
hook: "Pairing up guarantees five survivors. A better plan guarantees nine, and it fits in one word."
sources:
  - {title: "Prisoners and hats puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Prisoners_and_hats_puzzle"}
dates: {written: 2026-09-23}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Ten hats in a line, and one word has to carry everything

Ten prisoners stand in a line, each wearing a red or blue hat assigned at random. Each sees every hat in front of them, but not their own and not those behind. Starting from the back, each says one word, "red" or "blue", loud enough for all to hear. Anyone who names their own hat colour lives.

They may plan beforehand. Pairing up guarantees five: the back person of each pair names the colour in front, and the front one repeats it. Can you guarantee nine?

The person at the back sees nine hats and must spend a word. What single bit about those nine hats would help everyone else?

## Rigor

The parity of the red hats. The back prisoner says "red" if he sees an odd number of red hats and "blue" if even.

Now take prisoner $k$, counting from the back, with $k \ge 2$. From the first word he knows the parity of the reds among prisoners $2, \dots, 10$. He sees prisoners $k+1, \dots, 10$, and he has heard prisoners $2, \dots, k-1$, whose answers are correct by induction. The only unknown term in that parity is his own hat: if the reds he can account for already have the announced parity, his hat is blue; otherwise it is red. Every prisoner from 2 to 10 is right, whatever the hats are.

Nine is the best guarantee. The back prisoner gets no information about his own hat, so for any plan there is a colouring where he is wrong; he survives with probability exactly $\tfrac12$.

The bit generalises. With $m$ colours numbered $0, \dots, m-1$, the back prisoner announces the colour equal to the sum of the nine hats he sees, mod $m$, and everyone else solves for one unknown in $\mathbb{Z}/m$. Parity was just the group $\mathbb{Z}/2$.

## Recall
type: reveal
Q: What does the back prisoner's word actually encode?
A: Not his own hat, which he cannot know, but the parity of the red hats he sees. Every later prisoner knows all the other terms of that parity, so their own hat is the only unknown.
