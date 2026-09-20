---
id: econ.macro.financial-crises.a-bank-run-is-an-equilibrium
topic: econ.macro.financial-crises
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [diamond-dybvig, bank-run, multiple-equilibria, maturity-transformation, deposit-insurance]
hook: "Queueing at a bank you believe is solvent is the rational move, provided you think everyone else will queue too."
sources:
  - {title: "Bank Runs, Deposit Insurance, and Liquidity", author: "Douglas W. Diamond & Philip H. Dybvig", year: 1983, type: paper, url: "https://doi.org/10.1086/261155"}
  - {title: "Diamond–Dybvig model", type: wiki, url: "https://en.wikipedia.org/wiki/Diamond%E2%80%93Dybvig_model"}
  - {title: "Bank run", type: wiki, url: "https://en.wikipedia.org/wiki/Bank_run"}
dates: {written: 2026-09-19, event: 1983-06-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A bank run is an equilibrium, not a panic

The word "panic" does a lot of dishonest work. It suggests the depositors queueing around the block have lost their heads, and that with better information they would go home.

Diamond and Dybvig showed in 1983 that they are behaving perfectly sensibly. A bank exists to do something genuinely useful: people want their money available at any moment, while the projects worth financing take years. The bank bridges that gap by holding illiquid assets against demandable deposits, which is the service, not a flaw.

But it means the bank can never pay everybody at once. If you believe others will withdraw, the bank must dump its long assets at a loss, and the people at the back of the queue get nothing. So withdrawing is your best response. If you believe nobody will withdraw, waiting pays more and you stay home. Two beliefs, two equilibria, the same balance sheet, no new information required.

The cure follows from the diagnosis: promise to pay everyone regardless. Deposit insurance works by deleting the bad equilibrium, so in the good one it never pays out — and the bill arrives later, as moral hazard.

## Rigor

Three dates $t=0,1,2$, a unit endowment, and a technology returning $1$ if liquidated at $t=1$ and $R>1$ at $t=2$. A fraction $\pi$ of depositors turn out to be "early" types who must consume at $t=1$; nobody knows who in advance. Risk-averse agents want insurance against that shock.

The bank offers a demand deposit paying $c_1>1$ at $t=1$ or $c_2<R$ at $t=2$, which beats autarky because it transfers consumption to the early types. Withdrawals are met under a **sequential service constraint**: first come, first served, until the assets run out.

Now the game among late types. If all late types wait, each receives $c_2>c_1$: waiting is optimal. If all late types withdraw, the bank liquidates everything, has $1$ per depositor and pays $c_1>1$ to the first $1/c_1$ of the queue and zero to the rest; expected payoff from waiting is zero, so running is optimal.

Both are Nash equilibria, and nothing distinguishes them but expectations. Deposit insurance changes the payoff to waiting so the run stops being a best response — which is why the guarantee is credible without ever being used.

## Recall
type: mcq
Q: In the Diamond–Dybvig model, what triggers the bad equilibrium?
- [x] Nothing observable needs to change — it is a shift in what depositors expect other depositors to do. — both outcomes are equilibria of the same game with the same balance sheet.
- [ ] The bank's assets turn out to be worth less than its deposits. — that is insolvency, a different problem; the run happens to a solvent bank.
- [ ] Depositors misunderstand the bank's accounts. — they are fully rational and correctly informed in the model.
- [ ] The central bank raises interest rates. — no monetary policy appears anywhere in the model.
