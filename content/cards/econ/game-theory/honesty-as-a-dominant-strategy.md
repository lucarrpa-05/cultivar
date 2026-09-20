---
id: econ.game-theory.auctions.honesty-as-a-dominant-strategy
topic: econ.game-theory.auctions
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [vickrey-auction, second-price, revenue-equivalence, dominant-strategy]
hook: "Pay the second-highest bid and bidding your true value becomes optimal no matter what anyone else does."
sources:
  - {title: "Vickrey auction", type: wiki, url: "https://en.wikipedia.org/wiki/Vickrey_auction"}
  - {title: "William Vickrey", type: wiki, url: "https://en.wikipedia.org/wiki/William_Vickrey"}
  - {title: "Revenue equivalence", type: wiki, url: "https://en.wikipedia.org/wiki/Revenue_equivalence"}
dates: {written: 2026-09-19, event: 1961-03-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The auction where telling the truth is a dominant strategy

In a sealed first-price auction you should never bid your true value: winning at exactly your valuation earns you nothing. So everyone shades down, and how far down depends on how many rivals you imagine and what you think they know. It is a guessing contest bolted onto a sale.

William Vickrey's 1961 proposal deletes the guessing. Sealed bids, highest bidder wins — and pays the *second*-highest bid. Now bidding your true value is a dominant strategy: not just a best response to what others happen to do, but the best thing to do whatever they do. You never have to model your rivals at all.

That is the mechanism eBay's proxy bidding implements, and a close relative ran the advertising auctions that paid for the early web.

Vickrey shared the 1996 Nobel, announced on 8 October. He died three days later.

Then comes the result that makes auction theory strange: the seller does not care.

## Rigor

**Truthfulness is dominant.** Let your value be $v$ and let $b$ be the highest of the other bids. Bid $v$: you win exactly when $b<v$, paying $b$ and earning $v-b>0$; otherwise you earn $0$. Bidding $x>v$ changes the outcome only when $v<b<x$, where you now win and earn $v-b<0$. Bidding $x<v$ changes the outcome only when $x<b<v$, where you now lose and earn $0$ instead of $v-b>0$. Both deviations are weakly worse, for every $b$. No beliefs appear anywhere in that argument.

**Revenue equivalence (Vickrey 1961; Myerson 1981).** Suppose $n$ bidders draw values independently from the same continuous distribution, are risk-neutral, and the auction is any format in which (a) in equilibrium the good goes to the highest-value bidder and (b) the lowest possible type earns zero. Then every such format yields the seller the same expected revenue, and every bidder type the same expected payment.

First-price, second-price, English and Dutch auctions are therefore revenue-equivalent: the shading in a first-price auction exactly cancels the discount in a second-price one.

Use the theorem backwards. When real formats *do* differ in revenue, and they do, one assumption has failed — correlated values, risk aversion, limited entry, collusion. Revenue equivalence is the null hypothesis that tells you where to look.

## Recall
type: mcq
Q: Why is truthful bidding dominant in a second-price auction?
- [x] Your bid decides only whether you win, never what you pay — so shading can only lose profitable wins or buy unprofitable ones.
- [ ] Because the second price is always lower — it is, but that alone would not stop you shading or inflating your bid.
- [ ] Because the other bidders also bid truthfully — dominance means it is optimal whatever the others do, truthful or not.
