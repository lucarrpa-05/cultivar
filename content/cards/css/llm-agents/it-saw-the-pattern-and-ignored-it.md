---
id: css.llm-agents.multi-agent-systems.it-saw-the-pattern-and-ignored-it
topic: css.llm-agents.multi-agent-systems
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, connection, tool]
tags: [repeated-games, battle-of-the-sexes, prisoners-dilemma, theory-of-mind, akata-2023]
hook: "In the Battle of the Sexes, GPT-4 could predict its partner's alternating pattern by round 5. It kept playing its own favourite anyway."
sources:
  - {title: "Playing repeated games with Large Language Models (2023 preprint)", author: "Akata, Schulz, Coda-Forno, Oh, Bethge, Schulz", year: 2023, type: paper, url: "https://arxiv.org/abs/2305.16867v1"}
  - {title: "Playing repeated games with large language models, Nature Human Behaviour", author: "Akata et al.", year: 2025, type: paper, url: "https://doi.org/10.1038/s41562-025-02172-y"}
  - {title: "Battle of the sexes (game theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Battle_of_the_sexes_(game_theory)"}
dates: {written: 2026-09-23, event: 2023-05-26}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Numbers match v1. 'Social chain-of-thought' is the Nature Human Behaviour version's term, not v1's; sentence now says so."}
---

# GPT-4 predicted its partner's next move, then ignored the prediction

Elif Akata and colleagues had language models play ten-round, two-by-two games against each other and against simple scripted partners. In the prisoner's dilemma GPT-4 looked strong for an unflattering reason: once a partner defected a single time, GPT-4 never cooperated again, even when the partner went back to cooperating every round.

The Battle of the Sexes showed the other side. A scripted partner alternated, your favourite one round, mine the next, the convention people find quickly. GPT-4 kept picking its own favourite. Yet asked to predict the partner's next move, it got the alternation right from round 5.

Seeing the other player and responding to them turned out to be separate skills.

## Rigor

Separate them formally. In a prisoner's dilemma repeated a known, finite number of times, backward induction makes defecting in every round the unique subgame-perfect outcome. GPT-4's grudge is equilibrium play; the cost is the joint payoff it gives up against partners willing to cooperate.

The Battle of the Sexes stage game has two pure equilibria, each favoured by one player. In the repeated game any sequence of stage equilibria is subgame perfect, alternation included, and alternation splits the surplus evenly. Reaching it requires putting a model of the partner inside your own choice: best-respond to $\hat a_{-i}$, your prediction of their action.

The paper's two interventions target that link. Telling GPT-4 the other player can make mistakes got it cooperating again by round 3. Asking it first to predict the partner and only then to choose got it alternating from round 6; the published version calls this social chain-of-thought.

For simulation: strategic behaviour is partly a property of the prompt scaffolding. Agents that never write down a belief about each other may read the room and still not use it.

## Recall
type: mcq
Q: What did the Battle of the Sexes result show about GPT-4?
- [x] It could predict its partner's alternating pattern but did not use the prediction when choosing, until prompted to predict first — prediction and response were separate steps.
- [ ] It could not detect the pattern at all — asked directly, it predicted the alternation from round 5.
- [ ] It was playing a subgame-perfect equilibrium that happened to be unfair — insisting on its favourite against an alternator mis-coordinates and loses payoff for both.
