---
id: econ.behavioral.prospect-theory.two-choices-that-break-the-theory
topic: econ.behavioral.prospect-theory
topics: [econ.finance.expected-utility]
format: series
difficulty: 2
language: en
weight: medium
angles: [paradox, history]
tags: [allais-paradox, independence-axiom, expected-utility, certainty-effect]
series: {id: econ.behavioral.prospect-theory-properly, index: 1, total: 4, title: "Prospect theory, properly"}
hook: "Two pairs of gambles. Almost everyone answers in a way that no utility function on earth can produce."
sources:
  - {title: "Allais paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Allais_paradox"}
  - {title: "Le comportement de l'homme rationnel devant le risque, Econometrica 21(4)", author: "Maurice Allais", year: 1953, type: paper, url: "https://doi.org/10.2307/1907921"}
dates: {written: 2026-09-19, event: 1953-10-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two choices, and you have just broken the theory

Choose. **A**: one million, guaranteed. **B**: a 10% chance of five million, an 89% chance of one million, and a 1% chance of nothing.

Now choose again. **C**: an 11% chance of one million, otherwise nothing. **D**: a 10% chance of five million, otherwise nothing.

Most people take A, then take D. Maurice Allais presented this at a Paris colloquium in 1952 and published it in *Econometrica* in 1953 to make one point: those two answers cannot both come from an expected-utility maximiser. Not for any utility function. Not for any degree of risk aversion. The pair is not a taste. It is a contradiction.

You can feel where it comes from. In the first choice, B puts a 1% hole in a sure thing, and a sure thing is special. In the second there is no sure thing left to protect, so you go for the money. Certainty is collecting a bonus the axioms do not permit.

The axiom it kills has a name, and it is worth watching die.

## Rigor

The casualty is the **independence axiom** of von Neumann and Morgenstern: if $L\succ L'$, then $\alpha L+(1-\alpha)M \succ \alpha L'+(1-\alpha)M$ for every lottery $M$ and every $\alpha\in(0,1]$. Mixing both sides with the same thing cannot flip a preference.

Normalise $u(0)=0$ and write the four choices. Preferring A to B says

$$u(1) > 0.10\,u(5)+0.89\,u(1) \iff 0.11\,u(1) > 0.10\,u(5).$$

Preferring D to C says

$$0.10\,u(5) > 0.11\,u(1).$$

The two inequalities are exact negations of each other. No $u$ survives them — not concave, not convex, not any shape you like.

Independence is what manufactures the contradiction: A and B differ from C and D only by replacing a common 89% chance of one million with a common 89% chance of nothing. That shared branch is supposed to cancel. It does not, because the first pair contains a certainty and the second does not.

Prospect theory's reply is to bend the probabilities before they ever multiply a payoff. Episode 2 starts somewhere else entirely — with where you happen to be standing when you choose.

## Recall
type: mcq
Q: Which expected-utility axiom does the Allais pattern violate?
- [x] Independence — the two pairs differ only by a common branch, which the axiom says must cancel.
- [ ] Transitivity — the choices form two separate pairs, so no preference cycle is ever created.
- [ ] Completeness — subjects have no trouble stating preferences; the trouble is that the two are jointly impossible.
