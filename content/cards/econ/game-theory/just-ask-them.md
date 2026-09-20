---
id: econ.game-theory.mechanism-design.just-ask-them
topic: econ.game-theory.mechanism-design
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [revelation-principle, incentive-compatibility, direct-mechanism, myerson]
hook: "Whatever your clever multi-stage procedure achieves, a form that people fill in honestly achieves the same thing."
sources:
  - {title: "Revelation principle", type: wiki, url: "https://en.wikipedia.org/wiki/Revelation_principle"}
  - {title: "Incentive compatibility and the bargaining problem, Econometrica 47(1)", author: "Roger Myerson", year: 1979, type: paper, url: "https://doi.org/10.2307/1912346"}
dates: {written: 2026-09-19, event: 1979-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Any mechanism can be replaced by one where lying is pointless

You are designing a rule — an auction, a voting system, a way to allocate kidneys — and you are worried about the obvious thing: people will misrepresent what they want in order to game it. So you start sketching elaborate multi-stage procedures to smoke out the truth.

Stop. The revelation principle says that whatever outcome your elaborate procedure produces in equilibrium, there is a *direct* mechanism — everyone reports their private information once, the designer computes the outcome — that produces exactly the same outcome, and in which reporting honestly is an equilibrium.

The argument is almost insultingly simple. Whatever strategy each type would have played inside your clever mechanism, build that strategy into the rule. The mechanism now does the lying on everyone's behalf, so nobody has to.

It is the most useful theorem in mechanism design, and its usefulness points backwards: if no honest mechanism can reach your goal, no dishonest one can either.

## Rigor

Fix types $\theta_i\in\Theta_i$ drawn from a common prior, and a **mechanism** $\Gamma=(M_1,\dots,M_n,g)$ with message spaces $M_i$ and outcome function $g:\prod_i M_i\to X$. Suppose $\Gamma$ has a Bayesian Nash equilibrium $m^{*}$, with $m^{*}_i:\Theta_i\to M_i$, implementing the social choice function $f(\theta)=g(m^{*}(\theta))$.

**Revelation principle.** The direct mechanism with $M_i=\Theta_i$ and outcome function $f$ has truth-telling as a Bayesian Nash equilibrium, and implements the same $f$.

*Proof.* Suppose type $\theta_i$ gained by reporting $\hat\theta_i$ in the direct mechanism. Then in $\Gamma$, type $\theta_i$ would have gained by sending $m^{*}_i(\hat\theta_i)$ rather than $m^{*}_i(\theta_i)$, since the two induce identical outcome distributions against $m^{*}_{-i}$. That contradicts $m^{*}$ being an equilibrium. $\square$

The power lies in what it rules out. To show that *no* mechanism achieves some goal, it now suffices to check the incentive-compatible direct ones — a finite system of inequalities instead of a search over all conceivable institutions. That is how the impossibility theorems get proved: Gibbard–Satterthwaite for voting, Myerson–Satterthwaite for efficient bilateral trade.

Two cautions. It is a statement about equilibria, so a mechanism with several of them is replicated only at the one you selected. And truth-telling becomes *an* equilibrium, not the unique or a dominant one, unless you demand more.

## Recall
type: mcq
Q: Why is the revelation principle used mostly to prove impossibility results?
- [x] It shrinks the search from all mechanisms to incentive-compatible direct ones — so ruling those out rules out everything.
- [ ] It shows an honest mechanism exists for any goal — it says nothing about whether the goal is reachable at all.
- [ ] It makes truth-telling a dominant strategy — it makes truth-telling an equilibrium, which is strictly weaker.
