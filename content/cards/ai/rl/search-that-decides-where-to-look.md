---
id: ai.rl.alphago-mcts.search-that-decides-where-to-look
topic: ai.rl.alphago-mcts
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful, tool]
tags: [mcts, uct, puct, tree-search, bandit-in-a-tree]
prerequisites: [ai.rl.bandits, ai.rl.q-learning]
hook: "Every node of the search tree is a slot machine. That one idea turns an impossible search into a practical one."
sources:
  - {title: "Monte Carlo tree search", type: wiki, url: "https://en.wikipedia.org/wiki/Monte_Carlo_tree_search"}
  - {title: "Bandit based Monte-Carlo Planning", author: "Levente Kocsis & Csaba Szepesvári", year: 2006, type: paper, url: "https://doi.org/10.1007/11871842_29"}
  - {title: "Mastering the game of Go with deep neural networks and tree search", author: "Silver et al.", year: 2016, type: paper, url: "https://doi.org/10.1038/nature16961"}
diagram: {file: ai/mcts-four-steps.svg, caption: "One iteration: walk down by the bandit rule, add a node, evaluate it, push the result back up the path you came.", alt: "A lopsided tree with a highlighted path from root to a new leaf, labelled select, expand, evaluate, back up"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Search that decides for itself where to look

Classical game search is a bureaucrat: examine everything to depth twelve, prune what provably cannot matter, score the leaves. It is even-handed, and even-handedness is exactly what you cannot afford when every position offers 250 moves.

Monte Carlo tree search is a gambler instead. Treat each position in the tree as a row of slot machines, one arm per legal move, paying out in eventual wins. Walk down from the root, at each step choosing the move with the best combination of *how well this has gone* and *how little I have tried it*. When you walk off the edge of what you have explored, add one node, get an estimate of how good it is, and carry that number back up the path you came down, updating every machine you played on the way.

Do that a hundred thousand times and the tree grows deliberately lopsided: deep and bushy along the handful of lines that matter, one node thick everywhere else. Nobody told it where to concentrate. The exploration rule did.

## Rigor

UCT (Kocsis and Szepesvári, 2006) is literally UCB1 applied at every node: from state $s$, pick
$$a=\arg\max_a\Big[\bar{Q}(s,a)+c\sqrt{\tfrac{\ln N(s)}{N(s,a)}}\Big],$$
$N$ counting visits. The square-root term is the bandit exploration bonus from a tree's worth of bandits stacked on top of each other.

AlphaGo replaces the bonus with a learned prior $P(s,a)$ from a policy network:
$$a_t=\arg\max_a\Big[Q(s,a)+c\,P(s,a)\frac{\sqrt{\sum_b N(s,b)}}{1+N(s,a)}\Big],$$
and replaces random rollouts at the leaf with a mixture of a value network and a fast rollout, $(1-\lambda)v_\theta(s_L)+\lambda z_L$. Backup: increment $N$ along the path and set each $Q$ to the running mean of the leaf evaluations beneath it.

One honest caveat, and it is the bandit connection biting back. A node's arms are *non-stationary*: the value of a subtree keeps changing as the subtree is explored. UCB1's guarantees assume stationary arms, so UCT's regret bounds are asymptotic and the finite-time behaviour is empirical.

Alpha–beta prunes by proving a branch cannot matter. MCTS prunes by never getting round to it.

## Recall
type: mcq
Q: Where does the lopsided shape of an MCTS tree come from?
- [ ] A depth limit applied to unpromising branches — there is no depth limit; branches simply stop being selected.
- [x] The bandit selection rule at every node — it keeps sending visits to moves that look good relative to how often they have been tried.
- [ ] Pruning branches that are proved worse than the current best — that is alpha–beta; MCTS proves nothing and simply allocates attention.
