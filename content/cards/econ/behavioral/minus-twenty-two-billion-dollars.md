---
id: econ.behavioral.behavioral-finance.minus-twenty-two-billion-dollars
topic: econ.behavioral.behavioral-finance
topics: [econ.finance.efficient-markets]
format: story
difficulty: 2
language: en
weight: medium
angles: [mistake, numbers, weird]
tags: [law-of-one-price, limits-to-arbitrage, short-selling, palm-3com, carve-outs]
hook: "For two months in 2000 the market valued everything 3Com owned except Palm below zero. On day one: minus 22 billion dollars."
related: [econ.behavioral.behavioral-finance.sell-the-winners]
sources:
  - {title: "Can the Market Add and Subtract? Mispricing in Tech Stock Carve-outs, Journal of Political Economy 111(2)", author: "Owen A. Lamont, Richard H. Thaler", year: 2003, type: paper, url: "https://doi.org/10.1086/367683"}
  - {title: "Can the Market Add and Subtract? (NBER WP 8302)", author: "Lamont, Thaler", year: 2001, type: paper, url: "https://www.nber.org/papers/w8302"}
dates: {written: 2026-09-23, event: 2000-03-02}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved, notes: "The hook put the stub at minus 22 billion 'for months'; that was day one, and the stub was negative for 47 trading days. Hook and body now say two months."}
---

# The stock market priced 3Com's other businesses at minus 22 billion dollars

On March 2, 2000, 3Com floated a slice of Palm, the handheld maker it owned, keeping 95% to hand to its shareholders within the year: about 1.5 Palm shares per 3Com share. So a 3Com share had to be worth at least 1.5 Palm shares, plus a profitable networking business and over \$10 a share in cash.

Palm closed its first day at \$95.06. 3Com closed at \$81.81. Everything 3Com owned apart from Palm was priced at minus \$63 a share, about minus \$22 billion. The *Wall Street Journal* and the *New York Times* said so the next day. The negative value lasted two months.

Nobody could simply buy the cheap one and sell the dear one.

## Rigor

On paper the trade was free money. The law of one price gives a one-line inequality. With $x\approx1.5$ Palm shares per 3Com share, the stub

$$S=P_{\text{3Com}}-x\,P_{\text{Palm}}\ \ge\ 0,$$

since 3Com's equity cannot be worth less than nothing. On day one, $S\approx81.81-1.525\times95.06\approx-63$.

The arbitrage: buy 100 shares of 3Com, short 150 of Palm. You now own the stub for about $-63$ dollars, and at distribution it cannot be negative. No model of fundamentals needed; Palm's risk is hedged.

It stalled because shorting means borrowing shares, and Palm shares were scarce. Short interest peaked at 147.6% of the shares trading in July 2000, the same shares borrowed, sold and lent again. Borrowing cost reached about 35% a year, and Palm's options priced in the constraint: at-the-money puts cost about twice as much as calls, where put–call parity says calls should cost slightly more.

So Palm's price was set by the optimists, because the pessimists could barely trade. That is the limits of arbitrage: mispricing needs some irrational buyers, and it persists because rational sellers are fenced out. Lamont and Thaler found five more unambiguous negative stubs among the 18 carve-outs they studied.

## Recall
type: mcq
Q: Why didn't arbitrageurs erase 3Com's negative stub right away?
- [x] Shorting Palm required borrowing shares that were scarce and expensive — short interest exceeded the shares trading and borrowing cost about 35% a year.
- [ ] The trade was risky because Palm might fall — long 3Com plus short Palm hedges Palm's price risk.
- [ ] Nobody noticed the mispricing — it was in the Wall Street Journal and the New York Times the next day.
