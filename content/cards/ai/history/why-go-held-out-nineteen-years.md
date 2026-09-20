---
id: ai.history.games-milestones.why-go-held-out-nineteen-years
topic: ai.history.games-milestones
topics: [ai.rl.alphago-mcts]
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, numbers, paradox]
callback: {from: niche.games.chess-go, to: ai.history.games-milestones}
tags: [go, branching-factor, alpha-beta, evaluation-function, game-tree]
hook: "Chess fell in 1997. Go held out until 2016. The gap is not nineteen years of hardware — it is one missing function."
sources:
  - {title: "Go and mathematics", type: wiki, url: "https://en.wikipedia.org/wiki/Go_and_mathematics"}
  - {title: "Game complexity", type: wiki, url: "https://en.wikipedia.org/wiki/Game_complexity"}
  - {title: "Mastering the game of Go with deep neural networks and tree search", author: "Silver et al.", year: 2016, type: paper, url: "https://doi.org/10.1038/nature16961"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember why Go was supposed to be safe from computers?

A chess board has 64 squares and a Go board has 361, and that is the usual explanation for why Deep Blue won in 1997 while Go survived another nineteen years. Board size is real, but it is not the reason.

Deep Blue's method has two halves. Look ahead through possible moves; then, where you stop looking, *score* the position you reached and back the best score up. Go breaks both halves, but only one fatally.

The first half is arithmetic. Chess offers about 35 legal moves per turn, Go about 250, so each extra layer of lookahead costs seven times more. Painful, survivable, and hardware eats into it yearly.

The second half is the wall. In chess you can score a position by counting material — a queen is worth nine pawns, and that crude sum is startlingly good. In Go every stone is identical and worth nothing alone; a position's value lives in shape and influence. Nobody could write that function, and forty years of people tried.

Go did not need faster search. It needed a machine that could *learn what a position is worth*.

## Rigor

Game-tree size is roughly $b^d$ for branching factor $b$ and depth $d$. Chess: $b\approx 35$, $d\approx 80$, giving Shannon's 1950 estimate of about $10^{120}$. Go: $b\approx 250$, $d\approx 150$, about $10^{360}$. Tromp counted the legal 19×19 positions exactly in 2016: $2.08\times 10^{170}$.

Both are unsearchable, so the exponent is not what separates them. What separates them is what alpha–beta pruning needs. With perfect move ordering, alpha–beta visits about $b^{d/2}$ nodes — it turns $35^{80}$ into $35^{40}$, a genuine miracle and still astronomical. Chess programs survive by cutting the search off at depth 12–20 and calling a **static evaluation function** on the leaves. The whole scheme rests on that function existing and being cheap.

So the binding constraint is not $b$, it is the leaf evaluator. AlphaGo supplied one by learning it: a value network $v_\theta(s)$ estimating the probability of winning from position $s$, trained on self-play, plus a policy network to order moves. The exponent stayed enormous; the search simply stopped needing to reach the end.

## Recall
type: mcq
Q: Why did Go resist computer play so much longer than chess?
- [ ] Its game tree is too large to search — both trees are hopelessly large; chess programs never searched theirs either.
- [x] No cheap hand-written way to score a position existed — and search with a depth cutoff depends entirely on having one.
- [ ] Go has no equivalent of alpha–beta pruning — alpha–beta applies to any two-player zero-sum game, Go included.
