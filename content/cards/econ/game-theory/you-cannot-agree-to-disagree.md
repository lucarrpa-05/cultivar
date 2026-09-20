---
id: econ.game-theory.bayesian-games.you-cannot-agree-to-disagree
topic: econ.game-theory.bayesian-games
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [aumann, common-knowledge, common-prior, posteriors, disagreement]
hook: "If we start from the same prior and our probabilities are common knowledge, they must be equal. Not close. Equal."
sources:
  - {title: "Aumann's agreement theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Aumann%27s_agreement_theorem"}
  - {title: "Agreeing to disagree, Annals of Statistics 4(6)", author: "Robert J. Aumann", year: 1976, type: paper, url: "https://doi.org/10.1214/aos/1176343654"}
dates: {written: 2026-09-19, event: 1976-11-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two honest Bayesians cannot knowingly disagree

You and I look at the world and reach different probabilities that it will rain. Perfectly fine so far — we have seen different things. Now I tell you my number and you tell me yours, and we each update on what the other's number reveals. Then we tell each other again. And again.

Robert Aumann proved in 1976 that if we began from the same prior and our probabilities become common knowledge — I know yours, you know mine, I know that you know, all the way up — then our probabilities must be *equal*. Not similar. Equal. Open disagreement cannot survive.

The proof is a few lines and entirely elementary. What is hard is what it implies about real arguments. Either people do not share priors, or they are not Bayesian, or the disagreement never actually becomes common knowledge. One of the three is always true, which is why the world is full of arguments.

The mechanism is the part to keep: your opinion is evidence about what you saw.

## Rigor

Fix a finite probability space $(\Omega,p)$ and two agents with information partitions $\mathcal{P}_1,\mathcal{P}_2$. At state $\omega$ agent $i$ knows the cell $P_i(\omega)$ containing it and holds posterior $q_i=p(E\mid P_i(\omega))$ for an event $E$. An event is **common knowledge** at $\omega$ if it contains the cell $M(\omega)$ of the meet $\mathcal{P}_1\wedge\mathcal{P}_2$, the finest common coarsening of the two partitions.

**Theorem (Aumann, 1976).** If $q_1$ and $q_2$ are common knowledge at $\omega$, then $q_1=q_2$.

*Proof.* Write $M=M(\omega)$. Because $q_1$ is common knowledge, $p(E\mid P_1)=q_1$ for every cell $P_1\subseteq M$ of agent 1's partition, and $M$ is a disjoint union of such cells. So

$$p(E\cap M)=\sum_{P_1\subseteq M}p(E\cap P_1)=\sum_{P_1\subseteq M}q_1\,p(P_1)=q_1\,p(M),$$

giving $q_1=p(E\mid M)$. The identical computation gives $q_2=p(E\mid M)$. $\square$

Everything turns on the common prior $p$: both agents condition the *same* distribution on the *same* commonly known event, so they must arrive at the same number. Geanakoplos and Polemarchakis showed that in a finite space, simply exchanging posteriors back and forth reaches common knowledge in finitely many rounds — so this describes a conversation that terminates, not merely a limit.

Harsanyi's common prior is doing the work. Drop it and persistent disagreement returns at once.

## Recall
type: mcq
Q: What does Aumann's theorem need beyond Bayesian updating?
- [x] A common prior and common knowledge of the posteriors — both are required, and both are strong assumptions.
- [ ] That the two agents observed the same evidence — they may observe entirely different evidence, which is what makes the result surprising.
- [ ] That the agents are honest — honesty is assumed throughout, but the common prior is what does the mathematical work.
