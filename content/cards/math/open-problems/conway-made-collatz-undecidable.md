---
id: math.open-problems.collatz-goldbach.conway-made-collatz-undecidable
topic: math.open-problems.collatz-goldbach
topics: [math.foundations.computability]
format: fact
difficulty: 3
language: en
weight: light
angles: [weird, connection]
tags: [collatz, undecidability, fractran, conway, generalized-collatz]
hook: "Let the Collatz rule depend on n modulo any number instead of modulo 2, and no algorithm can ever decide where the orbits go."
related: [math.open-problems.collatz-goldbach.collatz-shrinks-on-average]
sources:
  - {title: "Collatz conjecture (undecidable generalizations)", type: wiki, url: "https://en.wikipedia.org/wiki/Collatz_conjecture"}
  - {title: "FRACTRAN", type: wiki, url: "https://en.wikipedia.org/wiki/FRACTRAN"}
  - {title: "The Undecidability of the Generalized Collatz Problem", author: "Stuart A. Kurtz and Janos Simon", year: 2007, type: paper, url: "https://doi.org/10.1007/978-3-540-72504-6_49"}
dates: {written: 2026-09-23, event: 1972-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "The rigor implied Conway's 1972 proof used FRACTRAN; dated FRACTRAN to 1987."}
---

# Generalise Collatz slightly and no algorithm can ever settle it

Collatz's rule looks at $n$ modulo 2: halve the evens, send the odds to $3n+1$. In 1972 John Conway let the rule look at $n$ modulo any fixed number, with a different linear map for each remainder. He proved that no algorithm can decide, for every such rule and starting number, whether the orbit reaches 1. Maps this simple can simulate any computer program. Collatz's own rule may still be provable; it just has very capable relatives.

## Rigor

A **generalized Collatz function** is $g(n)=a_in+b_i$ when $n\equiv i\pmod m$, with rationals $a_i,b_i$ chosen so that $g(n)$ is always an integer. Collatz is $m=2$ with $g(n)=n/2$ on evens and $3n+1$ on odds.

**Conway (1972).** There is no algorithm which, given $g$ and $n$, decides whether some iterate $g^k(n)$ equals $1$.

*Idea*, in the language Conway later packaged as FRACTRAN (1987). A machine state is a number $n=2^{a}3^{b}5^{c}\cdots$, the registers stored in the exponents. Multiplying by a fraction such as $\tfrac32$ moves one unit from the 2-register to the 3-register, and a program applies the first fraction in its list that keeps $n$ an integer. Whether a fraction applies is a divisibility test, so it depends only on $n$ modulo the product of the denominators. One step of a FRACTRAN program is therefore a generalized Collatz map, and FRACTRAN can run any register machine. Halting becomes reaching a target, and the undecidability of halting transfers.

**Kurtz and Simon (2007).** The universally quantified version, "every orbit reaches 1", is $\Pi^0_2$-complete: exactly as hard as asking whether a program halts on every input.
