---
id: css.opinion-dynamics.degroot.everyone-averages-someone-wins
topic: css.opinion-dynamics.degroot
topics: [css.networks.centrality]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful, tool]
tags: [degroot, consensus, stochastic-matrix, influence-weights, wisdom-of-crowds]
hook: "Nobody argues, nobody persuades, everyone just averages. Somebody still wins."
sources:
  - {title: "Reaching a Consensus", author: "Morris H. DeGroot", year: 1974, type: paper, url: "https://doi.org/10.1080/01621459.1974.10480137"}
  - {title: "Naïve Learning in Social Networks and the Wisdom of Crowds", author: "Benjamin Golub and Matthew O. Jackson", year: 2010, type: paper, url: "https://doi.org/10.1257/mic.2.1.112"}
  - {title: "DeGroot learning", type: wiki, url: "https://en.wikipedia.org/wiki/DeGroot_learning"}
dates: {written: 2026-09-19, event: 1974-03-01}
diagram: {file: css/degroot-rounds.svg, caption: "Three people averaging the people they listen to, three rounds. Beto is heard by everyone, so the consensus lands near him — 48.6, not the plain average of 53.3.", alt: "Four columns of three circles holding numbers, arrows from each round to the next, the numbers converging from 90, 20, 50 toward the high forties"}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Nobody persuades anybody, and somebody still wins

Here is the most boring model of opinion change ever written, and it is still in use fifty years later. Everyone starts with a number — a probability, a rating, a position. Each round, you replace your number with a weighted average of the numbers held by the people you listen to, yourself included. No arguments. No evidence. No stubbornness.

Morris DeGroot wrote it down in 1974 and proved that, under mild conditions, everybody converges to the *same* number.

The interesting part is which number. It is not the plain average of where people started. It is a weighted average, and the weights are not the ones anybody chose — they are a property of the listening network as a whole. Someone whom everyone listens to, even indirectly, ends up controlling the consensus, whether or not they say anything more than the rest.

If that sounds like PageRank, it is PageRank. Same matrix, same eigenvector, different story.

## Rigor

Let $T$ be row-stochastic: $T_{ij}\ge 0$ is how much $i$ weights $j$, and $\sum_j T_{ij}=1$. Opinions update as
$$p(t+1)=T\,p(t),\qquad\text{so}\qquad p(t)=T^{t}p(0).$$

If the listening graph is strongly connected and aperiodic, Perron–Frobenius gives $T^{t}\to \mathbf{1}s^{\!\top}$, where $s$ is the unique left eigenvector with $s^{\!\top}T=s^{\!\top}$ and $\sum_i s_i=1$. Then every coordinate of $p(t)$ converges to the same limit
$$p_\infty=s^{\!\top}p(0)=\sum_i s_i\,p_i(0).$$

So $s_i$ is agent $i$'s **social influence**: the weight their starting opinion carries in the final consensus. It is eigenvector centrality of the listening matrix — the same object that ranks web pages, arrived at from a story about averaging.

Golub and Jackson (2010) turn this into a condition for the crowd being right. If the initial opinions are unbiased noisy signals of a truth, the consensus converges to that truth as the society grows **iff** the largest influence weight vanishes, $\max_i s_i \to 0$. One sufficiently central listener, and the crowd inherits their error forever — no matter how many people you add.

## Recall
type: mcq
Q: In DeGroot learning, what determines the number everyone ends up agreeing on?
- [x] The left eigenvector of the listening matrix — each person's starting opinion is weighted by their eigenvector centrality, not equally.
- [ ] The plain average of the starting opinions — that is only the limit in the special case where all influence weights are equal.
- [ ] The opinion of whoever listens to the fewest people — listening less makes you stubborn, but influence comes from being listened *to*.
