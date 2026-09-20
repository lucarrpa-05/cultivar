---
id: math.probability.martingales.you-cannot-beat-a-fair-game
topic: math.probability.martingales
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, tool, practical]
tags: [martingale, optional-stopping, doubling-strategy, doob, gamblers-ruin]
hook: "The doubling system really does win almost every time. The theorem explains where the money for that comes from."
sources:
  - {title: "Optional stopping theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Optional_stopping_theorem"}
  - {title: "Martingale (probability theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Martingale_(probability_theory)"}
  - {title: "Martingale (betting system)", type: wiki, url: "https://en.wikipedia.org/wiki/Martingale_(betting_system)"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You cannot beat a fair game, and the theorem says exactly why

Bet 1 on a fair coin. If you lose, bet 2. Lose again, bet 4, then 8, and so on. The first time you win, you recover everything and finish exactly 1 ahead. Then stop.

The strategy is not a fallacy. It really does end in profit with probability 1, if you can keep doubling forever. People have run it and gone home up, over and over, which is why the system has survived three centuries of ridicule.

The catch is not in the probability. It is in the ledger. To survive $n$ losses you must be able to stake $2^{n}-1$, and with any finite bankroll there is a run of bad luck that wipes you out entirely. Then the arithmetic is exact: a very large chance of winning 1, and a very small chance of losing everything, multiplying to precisely zero.

That "precisely zero" is a theorem, and it says something much stronger than "casinos win". It says no rule for *when to stop* can turn a fair game into a favourable one.

## Rigor

**Martingale.** $(X_t)$ adapted to a filtration $(\mathcal{F}_t)$ with $\mathbb{E}|X_t|<\infty$ and $\mathbb{E}[X_{t+1}\mid\mathcal{F}_t]=X_t$: your fortune in a fair game, whatever your betting rule, as long as bets depend only on the past.

**Optional stopping (Doob).** If $\tau$ is a stopping time and any one of the following holds, then $\mathbb{E}[X_\tau]=\mathbb{E}[X_0]$:

1. $\tau$ is bounded;
2. $\mathbb{E}[\tau]<\infty$ and the increments are bounded: $\mathbb{E}[|X_{t+1}-X_t|\mid\mathcal{F}_t]\le c$;
3. the stopped process $X_{t\wedge\tau}$ is bounded.

**The doubling system breaks all three.** $\tau$ is unbounded, increments are $2^{t}$ rather than bounded, and the stopped fortune dives to $-(2^{t}-1)$. So the conclusion is allowed to fail — and it does: $\mathbb{E}[X_\tau]=+1\ne 0$, purchased with unlimited credit.

**With a real bankroll.** Cap the stake at $2^{n}-1$. Then
$$\mathbb{E}[\text{profit}]=\left(1-2^{-n}\right)(+1)+2^{-n}\left(-(2^{n}-1)\right)=0 .$$
Optional stopping applies again, because the stopped process is now bounded, and the answer it forces is zero.

**What this buys you.** Run the argument backwards and it is a computational tool: for a symmetric walk absorbed at $0$ or $N$ from start $k$, the walk is a martingale, so $\mathbb{E}[X_\tau]=k$ gives $P(\text{hit }N)=k/N$ in one line — gambler's ruin with no recursion at all.

## Recall
type: mcq
Q: What does the optional stopping theorem actually forbid?
- [x] Turning a fair game favourable by choosing when to quit — with bounded stakes and a finite bankroll, every stopping rule has expected profit zero.
- [ ] Winning money at a fair game — you can easily win; what is impossible is a positive *expectation*.
- [ ] Betting systems that depend on past outcomes — those are allowed; a martingale stays a martingale under any predictable strategy.
- [ ] Stopping at a random time — random stopping times are exactly what the theorem is about, provided they are stopping times.
