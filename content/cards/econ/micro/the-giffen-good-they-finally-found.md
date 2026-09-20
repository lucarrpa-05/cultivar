---
id: econ.micro.consumer-choice.the-giffen-good-they-finally-found
topic: econ.micro.consumer-choice
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, history]
tags: [giffen-good, slutsky, income-effect, jensen-miller, subsistence]
hook: "For a century the textbook counterexample to downward-sloping demand had no confirmed example. Then someone ran the experiment in Hunan."
sources:
  - {title: "Giffen Behavior and Subsistence Consumption", author: "Robert T. Jensen & Nolan H. Miller", year: 2008, type: paper, url: "https://doi.org/10.1257/aer.98.4.1553"}
  - {title: "Giffen good — including the challenges to the Irish potato story", type: wiki, url: "https://en.wikipedia.org/wiki/Giffen_good"}
  - {title: "Slutsky equation", type: wiki, url: "https://en.wikipedia.org/wiki/Slutsky_equation"}
dates: {written: 2026-09-19, event: 2008-09-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The counterexample every textbook taught and nobody had found

Demand curves slope down. Every course says so, then immediately mentions the exception — the Giffen good, where a price *rise* makes people buy *more*. For over a century the illustration was Irish potatoes during the famine, and when historians checked the potato data, it did not hold up.

Robert Jensen and Nolan Miller went and made one. In 2006 and 2007 they randomly handed poor households in Hunan vouchers that cut the price of rice, their staple, and did the same for wheat in Gansu. If rice behaves like a Giffen good, cheaper rice should make households buy *less* of it. Among the poor households in Hunan, that is what happened; the wheat evidence in Gansu was weaker.

The mechanism is almost obvious once you see it. If rice is most of your calories and most of your budget, a fall in its price makes you *richer* — and a slightly richer household buys a little meat and slightly less rice. The good has to be near-subsistence for this to bite, which is why nobody ever found it in a rich country.

## Rigor

The Slutsky decomposition splits a price change into a substitution effect along an indifference curve and an income effect:

$$\frac{\partial x}{\partial p}=\underbrace{\left.\frac{\partial x}{\partial p}\right|_{u}}_{\le 0}-\;x\,\frac{\partial x}{\partial m}.$$

The first term is always weakly negative — a compensated price rise never raises demand. So a Giffen good requires the second term to dominate, which needs two things at once: the good must be **inferior**, $\partial x/\partial m<0$, and the budget share $x p/m$ must be large, since the income effect scales with $x$.

That combination is exactly a subsistence staple for a poor household, and it explains the failures of earlier hunts. It also explains Jensen and Miller's non-result for the very poorest: households too poor to afford *any* meat have nothing to substitute toward, so the income effect has nowhere to go.

The law of demand survives intact in its honest form: compensated demand slopes down, always. Uncompensated demand is what can misbehave.

## Recall
type: mcq
Q: What does a good need in order to be Giffen?
- [x] To be inferior and to take up a large share of the budget, so the income effect can outweigh the substitution effect. — that combination points straight at subsistence staples.
- [ ] To be a luxury whose appeal rises with its price. — that is a Veblen good, a different (and demand-shifting) story.
- [ ] To have no close substitutes at any price. — helpful for a strong income effect, but not sufficient on its own.
- [ ] To be consumed only by the very poorest households. — the very poorest showed no Giffen behaviour, because they had nothing to substitute toward.
