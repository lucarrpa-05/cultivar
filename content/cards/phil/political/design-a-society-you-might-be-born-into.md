---
id: phil.political.rawls.design-a-society-you-might-be-born-into
topic: phil.political.rawls
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, connection]
tags: [rawls, veil-of-ignorance, difference-principle, maximin, harsanyi]
hook: "Design the society first, then find out who you are in it. Rawls turns fairness into a decision problem under uncertainty."
sources:
  - {title: "A Theory of Justice", author: "John Rawls", year: 1971, type: book, url: "https://en.wikipedia.org/wiki/A_Theory_of_Justice"}
  - {title: "John Rawls", type: encyclopedia, url: "https://plato.stanford.edu/entries/rawls/"}
  - {title: "Can the Maximin Principle Serve as a Basis for Morality? A Critique of John Rawls's Theory", author: "John C. Harsanyi", year: 1975, type: paper, url: "https://www.jstor.org/stable/1959090"}
dates: {written: 2026-09-19, event: 1971-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Choose the rules before you know who you will be

Rawls's move in *A Theory of Justice* (1971) is a trick for removing bias without asking anyone to be nice. You are choosing the basic institutions of a society — property, taxes, liberties, courts — from behind a **veil of ignorance**. You do not know your class, race, sex, talents, health, or even which conception of the good life you will end up holding. You know general facts about economics and psychology, and nothing about your own ticket.

Self-interest now does the work of impartiality. Endorsing a rule that crushes the bottom means endorsing it for a position you might occupy.

Rawls argues the parties pick two principles, in strict order. First, the most extensive basic liberties compatible with the same for everyone — absolutely first, so no amount of wealth buys a cut in anyone's basic freedoms. Second, inequalities are allowed only if they attach to positions open to all under fair equality of opportunity, and only if they benefit the least advantaged most. That is the **difference principle**: inequality is not forbidden, it is required to pay rent.

The step from the veil to those principles is the contested one.

## Rigor

Behind the veil, the choice is a decision under uncertainty over social positions. Rawls argues for **maximin**: rank institutions by the welfare of their worst-off position and take the best of those,
$$\max_{\text{institutions } I} \; \min_{\text{positions } i} \; u_i(I),$$
on the grounds that the situation is one of genuine ignorance rather than known risk, that the stakes at the bottom are catastrophic, and that gains above a decent minimum matter little.

John Harsanyi's 1975 objection is direct. If you are ignorant of your position, treat the positions as equiprobable — his "equiprobability" postulate — and expected-utility reasoning then gives
$$\max_{I} \; \frac{1}{n}\sum_{i=1}^{n} u_i(I),$$
which is average utilitarianism, not maximin. Maximin, he argued, is an irrational decision rule outside of games against a malevolent opponent: it would forbid you from ever crossing a street.

Rawls's defence is that the veil is not a lottery. There is no well-defined probability over being born as someone, the choice is made once and binds a whole life, and the parties must be able to honestly commit to whatever they choose — a "strains of commitment" condition that rules out gambles you could not live with. Which of the two arguments you accept determines whether the original position delivers Rawls's conclusions or Harsanyi's.

## Recall
type: mcq
Q: What does the difference principle actually permit?
- [ ] Only strictly equal distributions — Rawls explicitly allows inequality, on a condition.
- [x] Inequalities that make the worst-off position better than it would be under any alternative — inequality has to earn its keep from the bottom up.
- [ ] Whatever maximises total welfare — that is utilitarianism, and it is the position Rawls is arguing against.
