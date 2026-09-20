---
id: css.abm.what-is-abm.model-you-have-to-run
topic: css.abm.what-is-abm
format: series
difficulty: 1
language: en
weight: medium
angles: [tool, connection]
tags: [agent-based-models, bottom-up, heterogeneity, simulation, method]
hook: "An equation model tells you the answer. An agent-based model makes you watch."
series: {id: css.abm.simulating-a-society, index: 1, total: 5, title: "Simulating a society"}
sources:
  - {title: "Agent-based model", type: wiki, url: "https://en.wikipedia.org/wiki/Agent-based_model"}
  - {title: "Remarks on the Foundations of Agent-Based Generative Social Science", author: "Joshua M. Epstein", year: 2006, type: paper, url: "https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/RemarksFoundationsABM.JEpstein2006.pdf"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The model you have to run to find out what it says

An equation model hands you the answer. You write down something true of the whole population, you solve, and the solution is a formula: this many infected by week six, this price at equilibrium. An agent-based model refuses. You write down what *one* agent does — who it can see, what it wants, when it moves — and then you genuinely do not know what happens next until you press play.

That is the trade. You give up the closed form and you buy back everything the closed form had to assume away: agents who differ from each other, who only see their neighbours, who are not optimising anything global, who never settle. Schelling's coins are the whole method in miniature. A rule a child could follow; an outcome nobody could read off the rule.

The cost shows up the first time the screen does something startling. You built the thing. So what have you actually learned?

## Rigor

Give agent $i$ a state $x_i\in S$, a neighbourhood $N_i(x)$, and an update $x_i \leftarrow f\!\left(x_i,\{x_j\}_{j\in N_i(x)}\right)$, possibly stochastic and applied asynchronously. The population state is $x\in S^n$ and the model is the induced map $F:S^n\to S^n$. What you care about is some aggregate $\pi:S^n\to\mathbb{R}^k$ — a mean, a segregation index, a vote share.

The representative-agent move assumes that aggregate has its own dynamics: that there exists $G$ with
$$\pi\big(F(x)\big)=G\big(\pi(x)\big).$$
When that holds you never need the agents; you solve $G$ and go home. Agent-based modelling is what you do when it fails, because $F$ does not commute with $\pi$ and the interaction structure $N_i$ is doing real work.

Schelling's board is exactly that failure. The mean fraction of like neighbours at $t+1$ is not a function of the mean at $t$; it depends on who is standing next to whom. No aggregate rule reproduces the coins, which is why he had to move them one at a time.

## Recall
type: mcq
Q: What is the defining trade an agent-based model makes?
- [x] A closed form for a population of agents who differ — the aggregate has no solvable law of its own, so you simulate instead.
- [ ] Realism for tractability — that is the representative-agent move, which agent-based modelling exists to refuse.
- [ ] Randomness for determinism — most agent-based models are stochastic, and the noise is frequently the point.
