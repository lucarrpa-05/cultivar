---
id: math.analysis.chaos.chaos-reads-the-next-binary-digit
topic: math.analysis.chaos
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [doubling-map, symbolic-dynamics, lyapunov-exponent, shift-map, sensitive-dependence]
hook: "Strip chaos down to its simplest example and it is a machine that deletes the first binary digit of a number and shifts the rest left."
sources:
  - {title: "Dyadic transformation", type: wiki, url: "https://en.wikipedia.org/wiki/Dyadic_transformation"}
  - {title: "Lyapunov exponent", type: wiki, url: "https://en.wikipedia.org/wiki/Lyapunov_exponent"}
  - {title: "Symbolic dynamics", type: wiki, url: "https://en.wikipedia.org/wiki/Symbolic_dynamics"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fixed: periodic points are the purely periodic binary expansions (rationals with odd denominator); the eventually periodic ones are all the rationals."}
---

# Chaos is a machine that reads the next binary digit

Take the simplest chaotic system there is: double a number in $[0,1)$ and throw away the whole part. $0.3\mapsto0.6\mapsto0.2\mapsto0.4$, and so on.

Now write the number in binary. Doubling shifts every digit one place left, and dropping the whole part deletes the digit that moved past the point. That is all the map does. It is a machine that eats binary digits, one per step.

Sensitive dependence stops being mysterious. After $n$ steps the state is determined by digits $n+1,n+2,\dots$ of the starting number. If you measured your initial condition to twenty binary places, then after twenty steps your knowledge is exhausted and the trajectory is being driven entirely by digits you never saw.

Chaos does not manufacture randomness. It transports information upward, from decimal places nobody measured to behaviour anybody can see. The equations stay perfectly deterministic; what runs out is your input.

## Rigor

$T:[0,1)\to[0,1)$, $T(x)=2x \bmod 1$. Coding $x=\sum_{k\ge1}b_k2^{-k}$ by its digit sequence $(b_1,b_2,\dots)$ conjugates $T$ to the **shift map** $\sigma(b_1,b_2,b_3,\dots)=(b_2,b_3,\dots)$ on $\{0,1\}^{\mathbb{N}}$.

Everything follows from the coding. Periodic points are the *purely* periodic expansions, i.e. the rationals with odd denominators — dense; every other rational is eventually periodic and drops onto a cycle. A point whose expansion concatenates every finite block has a dense orbit, so $T$ is topologically transitive. Dense periodic points plus transitivity plus sensitivity is Devaney's definition of chaos, and here all three are digit bookkeeping.

The rate: $|T'|=2$ everywhere, so the **Lyapunov exponent** is
$$\lambda=\lim_{n}\frac1n\ln\left|(T^{n})'(x)\right|=\ln 2 ,$$
and an initial error $\varepsilon$ grows like $\varepsilon e^{\lambda n}$. The prediction horizon is therefore $n\approx\frac{1}{\lambda}\ln\frac{1}{\varepsilon}$ — logarithmic in your precision. Buying a thousand times more accurate instruments buys you about ten more steps, which is why weather forecasts have a ceiling that better sensors cannot lift.

## Recall
type: mcq
Q: Why does a hundredfold improvement in measurement precision buy so little forecast time?
- [x] Errors grow exponentially, so the usable horizon grows like the logarithm of the precision — for the doubling map, a factor of $100$ buys about $\ln 100/\ln 2\approx 7$ extra steps.
- [ ] Because the model equations are approximate — the doubling map is exact, and the horizon is still logarithmic.
- [ ] Because the system is random — it is fully deterministic; the same input always produces the same orbit.
