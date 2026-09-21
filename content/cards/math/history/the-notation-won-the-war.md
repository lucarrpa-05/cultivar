---
id: math.history.calculus-dispute.the-notation-won-the-war
topic: math.history.calculus-dispute
topics: [math.analysis.differentiation]
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, history, connection]
tags: [leibniz-notation, chain-rule, fluxions, analytical-society, babbage]
hook: "Newton’s dots were shorter. Leibniz’s differentials made the structure of a calculation visible."
sources:
  - {title: "Leibniz's notation", type: wiki, url: "https://en.wikipedia.org/wiki/Leibniz%27s_notation"}
  - {title: "Analytical Society", type: wiki, url: "https://en.wikipedia.org/wiki/Analytical_Society"}
  - {title: "Notation for differentiation", type: wiki, url: "https://en.wikipedia.org/wiki/Notation_for_differentiation"}
  - {title: "George Peacock biography", type: encyclopedia, url: "https://mathshistory.st-andrews.ac.uk/Biographies/Peacock/"}
dates: {written: 2026-09-20, event: 1812-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-history-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Removed unsupported 1830 victory date and simplified the national decline claim; trimmed body."}
---

# The notation won the calculus fight

Newton marked a changing quantity with a dot: $\dot{x}$. Leibniz wrote $dy/dx$ and used an elongated S, $\int$, for a sum of tiny pieces. A dot is compact; Leibniz's symbols show relationships. The chain rule looks like cancelling, and substitution looks like replacing one differential with another. Those moves need proofs, but the notation helps you guess the right one.

British mathematicians favoured Newton's fluxions for decades while continental texts developed with Leibniz's notation. In 1812 Babbage, Herschel, and Peacock founded the Analytical Society at Cambridge to promote the continental approach. Their campaign helped make the new symbols familiar in Britain. The symbols won because they made calculations easier to organise, not because they settled who invented calculus first.

## Rigor

**Why the fraction behaves.** For $y=f(u)$, $u=g(x)$, the chain rule says
$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}.$$
This is not literal cancellation: $dy/du$ is a limit, not a quotient of numbers. The honest proof takes $\Delta u=g(x+h)-g(x)$ and writes
$$\frac{f(g(x+h))-f(g(x))}{h}=\frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{h}$$
where these *are* ordinary quotients, then takes $h\to0$ — with a patch for the case $\Delta u=0$, usually by defining the difference quotient to be $f'(u)$ there. The cancellation is real at the level of increments and survives the limit.

**Where the notation earns its keep.** Substitution: $\int f(g(x))g'(x)\,dx=\int f(u)\,du$ reads as replacing $g'(x)\,dx$ by $du$. Implicit differentiation, related rates, separation of variables in $\frac{dy}{dx}=h(x)k(y)$ — all are bookkeeping that the symbols do for you.

**Where it lies.** $\frac{d^{2}y}{dx^{2}}$ is not a square of anything, and the second-order chain rule is not obtained by cancelling twice:
$$\frac{d^{2}y}{dx^{2}}=\frac{d^{2}y}{du^{2}}\left(\frac{du}{dx}\right)^{2}+\frac{dy}{du}\frac{d^{2}u}{dx^{2}} .$$
Every good notation has a boundary, and this is where Leibniz's is.

## Recall
type: mcq
Q: In what sense is the chain rule "just cancelling"?
- [x] The cancellation is exact for finite increments, $\frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}$, and survives passing to the limit — the notation records a true fact about differences.
- [ ] It is literally a quotient of two infinitesimals, so they cancel — in standard analysis $dy$ and $dx$ are not numbers; the derivative is a limit.
- [ ] It is a coincidence of notation with no content — the identity is a theorem; the notation was chosen so the theorem looks obvious.
- [ ] It works for all higher derivatives too — the second derivative picks up an extra term, which is exactly where the cancelling picture fails.
