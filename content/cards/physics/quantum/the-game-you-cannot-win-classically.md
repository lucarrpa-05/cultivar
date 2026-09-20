---
id: physics.quantum.entanglement-bell.the-game-you-cannot-win-classically
topic: physics.quantum.entanglement-bell
format: series
difficulty: 3
language: en
weight: heavy
angles: [paradox, numbers]
tags: [bell-theorem, chsh, entanglement, local-hidden-variables, tsirelson]
hook: "A two-player game with a hard ceiling of 75%. Share entangled particles and you win 85.4% of the time, every time."
series: {id: physics.quantum.no-mysticism-arc, index: 4, total: 5, title: "Quantum, no mysticism"}
sources:
  - {title: "CHSH inequality", type: wiki, url: "https://en.wikipedia.org/wiki/CHSH_inequality"}
  - {title: "Proposed Experiment to Test Local Hidden-Variable Theories", author: "Clauser, Horne, Shimony & Holt", year: 1969, type: paper, url: "https://doi.org/10.1103/PhysRevLett.23.880"}
  - {title: "The Nobel Prize in Physics 2022", year: 2022, type: primary, url: "https://www.nobelprize.org/prizes/physics/2022/summary/"}
dates: {written: 2026-09-19, event: 1969-10-13}
diagram: {file: physics/chsh-game.svg, caption: "The CHSH game: one random bit to each player, one bit back, no communication allowed.", alt: "A referee box at the top sends a bit x to Alice on the left and a bit y to Bob on the right; each returns a bit, with a dashed barrier between them marking that they cannot communicate"}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The game you cannot win more than 75% of the time

Two players, Alice and Bob, taken to opposite ends of a field. A referee flips two coins and hands one bit to each: $x$ to Alice, $y$ to Bob. Each answers with a single bit, $a$ and $b$. They win the round if

$$a \oplus b = x \wedge y$$

— their answers must differ when both bits are 1, and agree otherwise. They may plan all night beforehand. They may carry identical notebooks, shared dice, any conspiracy you like. They may not communicate once the coins are flipped.

The best they can do is win 75% of rounds. This is not a hard theorem: there are finitely many deterministic strategies, you can check them all, and none beats three-in-four.

Give them a pair of entangled particles each round, and they win 85.4%.

That is Bell's theorem as a wager, and the laboratory has settled it. Aspect's experiments in the early 1980s, the loophole-free runs of 2015, and the 2022 Nobel Prize to Clauser, Aspect and Zeilinger. Something about the world is not locally pre-determined.

## Rigor

Let $A(x),B(y)\in\{\pm1\}$ and define correlations $E(x,y) = \langle A(x)B(y)\rangle$. Any local hidden-variable model has outcomes $A(x,\lambda), B(y,\lambda)$ with $\lambda$ shared randomness, and then

$$S = |E(0,0)+E(0,1)+E(1,0)-E(1,1)| \le 2 ,$$

because for fixed $\lambda$ the bracket $A_0(B_0+B_1) + A_1(B_0-B_1)$ is $\pm2$: one of $B_0\pm B_1$ is always zero. Averaging over $\lambda$ cannot exceed the bound. The win probability of the game is $\tfrac12 + S/8$, so $S\le2$ is exactly the 75% ceiling.

Quantum mechanics uses the singlet $|\psi^-\rangle = \tfrac{1}{\sqrt2}(|01\rangle - |10\rangle)$, for which measuring spin along directions separated by angle $\theta$ gives $E = -\cos\theta$. Choosing measurement axes 45° apart makes every term $1/\sqrt2$ and

$$S = 2\sqrt2 \approx 2.828,$$

Tsirelson's bound, i.e. $\cos^2(\pi/8) = 85.36\%$ wins. Note what is *not* violated: Alice's marginal is uniform whatever Bob does, so no message is sent, and no-signalling holds exactly. What fails is the assumption that the answers existed before the questions were asked.

So the correlations are real, stronger than any pre-agreed plan, and useless for sending anything. The last episode asks what that leaves you believing.

## Recall
type: mcq
Q: What assumption does a Bell inequality violation actually rule out?
- [ ] That quantum mechanics is a complete theory. — violations are evidence *for* quantum predictions, not against them.
- [ ] That information cannot travel faster than light. — the marginals stay uniform, so no signal is sent; relativity is untouched.
- [x] That each particle carried pre-existing answers to every possible measurement, fixed locally in advance. — that is exactly the $\lambda$ in the hidden-variable derivation, and the data says no such $\lambda$ works.
- [ ] That measurement outcomes are random. — randomness was never at stake; classical shared randomness is allowed in the 75% bound.
