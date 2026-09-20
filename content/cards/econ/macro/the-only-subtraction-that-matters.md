---
id: econ.macro.fiscal-debt.the-only-subtraction-that-matters
topic: econ.macro.fiscal-debt
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, numbers]
tags: [debt-dynamics, r-minus-g, blanchard, primary-deficit, sustainability]
hook: "Whether a public debt explodes or melts comes down to one subtraction, and the debt level is not in it."
sources:
  - {title: "Public Debt and Low Interest Rates", author: "Olivier Blanchard", year: 2019, type: paper, url: "https://doi.org/10.1257/aer.109.4.1197"}
  - {title: "Debt-to-GDP ratio", type: wiki, url: "https://en.wikipedia.org/wiki/Debt-to-GDP_ratio"}
  - {title: "Government debt", type: wiki, url: "https://en.wikipedia.org/wiki/Government_debt"}
dates: {written: 2026-09-19, event: 2019-04-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Whether the debt explodes is one subtraction

"Is 60% of GDP too much debt?" is not an answerable question, and the reason is arithmetic rather than politics. What decides whether a debt ratio drifts up or down is the gap between the interest rate the government pays and the growth rate of the economy.

If the economy grows faster than the debt accrues interest, the denominator outruns the numerator. The ratio falls by itself, and a government can run a permanent primary deficit forever without the debt ratio exploding — it converges to a finite level. Olivier Blanchard built his 2019 presidential address to the American Economic Association on the observation that for most of the postwar period, the US paid less on its debt than its economy grew.

Flip the sign and everything inverts. With the interest rate above growth, you must run a primary *surplus* just to keep still, and the required surplus grows with the debt you already have.

That is why emerging-market debt is a different animal. The gap is no constant of nature: it depends on what investors think of you, which depends on the debt — a feedback loop, not a formula.

## Rigor

Let $b$ be debt as a share of GDP, $r$ the real interest rate on debt, $g$ real growth, and $s$ the primary balance (surplus positive) as a share of GDP. In continuous time,

$$\dot b=(r-g)\,b-s .$$

If $r<g$ the coefficient on $b$ is negative and the dynamics are stable: with a permanent primary *deficit* $s<0$, the ratio converges to

$$b^{*}=\frac{s}{r-g}=\frac{|s|}{g-r}>0 .$$

A 2% of GDP deficit with $g-r=1$ point settles at 200% of GDP. Unpleasant, but finite.

If $r>g$ the fixed point is unstable: any debt above $b^*$ grows without bound unless the surplus rises. The required stabilising surplus is $s=(r-g)b$ — proportional to the debt, which is why the same gap is survivable at 30% of GDP and lethal at 90%.

The dangerous part is that $r$ is not exogenous. Investors price default risk off $b$ itself, so $r(b)$ can jump, turning a stable configuration into an unstable one overnight — a sudden stop, in the literature's phrase.

## Recall
type: mcq
Q: A country runs a permanent primary deficit of 2% of GDP, with $r-g=-1\%$. What happens to its debt ratio?
- [x] It converges to a finite level — here about 200% of GDP — because growth erodes the ratio faster than interest builds it. — stability depends on the sign of $r-g$, not on the deficit's existence.
- [ ] It rises without bound, since a permanent deficit always means explosive debt. — only when $r>g$; otherwise the denominator wins.
- [ ] It falls to zero, since $r<g$ means debt shrinks. — debt shrinks relative to GDP only until the deficit's contribution balances it.
- [ ] It depends entirely on the starting debt level. — the starting level sets the path, but the limit is determined by $s$ and $r-g$.
