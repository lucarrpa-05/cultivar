---
id: niche.games.chess-go.two-rules-and-no-end
topic: niche.games.chess-go
format: idea
difficulty: 1
language: en
weight: medium
angles: [beautiful, numbers]
tags: [go, ko-rule, liberties, complexity, board-games]
hook: "Go's rules fit on a postcard. The number of legal positions has 171 digits."
sources:
  - {title: "Go (game)", type: wiki, url: "https://en.wikipedia.org/wiki/Go_(game)"}
  - {title: "Go and mathematics", type: wiki, url: "https://en.wikipedia.org/wiki/Go_and_mathematics"}
dates: {written: 2026-09-19}
rigor: none
rigorNote: "the striking quantity is stated in the body; the combinatorics belongs to a maths card"
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Go did not fall to brute force: AlphaGo won in 2016 with a neural network, not search. Corrected and trimmed to length."}
---

# A game you can teach in five minutes and lose at for fifty years

Chess needs a page of rules: six pieces, each moving differently, plus castling, en passant and promotion. Go needs two. Stones are captured when they have no adjacent empty points left — no liberties. And you may not repeat a previous board position, which stops infinite loops. That is essentially it; the rest is turn order and how you count at the end.

From those two rules comes a 19-by-19 board with 361 points and roughly $2.1\times 10^{170}$ legal positions — more than the estimated number of atoms in the observable universe, by about ninety orders of magnitude. Every move offers hundreds of plausible options rather than chess's dozens, and games run far longer.

This is the interesting asymmetry: rule complexity and game complexity are almost unrelated. Tic-tac-toe has simple rules and a trivial game. Go has simpler rules than chess and a vastly larger game. What generates depth is not how much the rules say, but how much interaction they permit.

Which is why brute force beat Kasparov in 1997 and got nowhere here. Go fell in 2016, to a neural network that guessed at positions instead of counting them.

## Recall
type: mcq
Q: What does Go's ko rule exist to prevent?
- [x] Endless repetition — it forbids recreating a previous board position, so capture-and-recapture cycles cannot loop forever.
- [ ] Capturing large groups — group capture is exactly what the liberty rule is for and is entirely legal.
- [ ] Playing on the edges of the board — edge points have fewer liberties but are perfectly legal to play.
