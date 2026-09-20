---
id: css.llm-agents.electoral-simulation.median-voter-meets-a-thousand-agents
topic: css.llm-agents.electoral-simulation
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, tool, open-problem]
tags: [median-voter, hotelling-downs, electoral-simulation, assumptions, single-peaked]
hook: "The median voter theorem is a simulation with one agent in it. Adding a thousand only helps if you know which assumption you dropped."
callback: {from: poli.democracy.median-voter, to: css.llm-agents.electoral-simulation}
sources:
  - {title: "Median voter theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Median_voter_theorem"}
  - {title: "Stability in Competition", author: "Harold Hotelling", year: 1929, type: paper, url: "https://doi.org/10.2307/2224214"}
  - {title: "Generative Agent Simulations of 1,000 People (v1)", author: "Park, Zou, Shaw, Hill, Cai, Morris, Willer, Liang, Bernstein", year: 2024, type: paper, url: "https://arxiv.org/abs/2411.10109v1"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source repointed to arXiv v1, since the unversioned link now serves the retitled June 2026 version."}
author: author-css-1
---

# Remember the median voter? That theorem is your null model

When you met the median voter theorem, the surprise was how little it needed. Voters on a line, each preferring policies closer to their own ideal point, two candidates who only want to win — and both candidates pile onto the median voter's position. One agent, effectively, decides the election.

Simulating an electorate with a thousand language models is the maximal opposite: every voter distinct, reasoning in sentences, responding to events. And that is exactly why the theorem is the right thing to hold it against. If your simulation predicts convergence to the median, it has told you nothing a 1929 model did not. If it predicts something else, the useful question is *which assumption broke*.

That is a checklist, not a vibe. Single-peaked preferences. One dimension. Full turnout. Two candidates. Candidates who want office rather than policy. Voters who know where candidates stand.

Your simulated agents silently take a position on every one of those. Nothing makes them state it.

## Rigor

Hotelling–Downs: policy space $X=[0,1]$, voter $i$ with ideal point $x_i$ and single-peaked preferences, two candidates choosing platforms to maximise vote share, everyone votes. Then both platforms at the median $m$ is the unique Nash equilibrium, because any candidate deviating to $p\ne m$ loses every voter on the far side of $m$.

Each hypothesis is a separate failure mode. Drop single-peakedness and majority rule can cycle. Drop one dimension and there is generically no Condorcet winner at all — McKelvey's theorem says an agenda-setter can steer majority voting to *any* outcome. Drop full turnout and candidates chase enthusiasm, not the median. Add primaries, or policy-motivated candidates, and platforms diverge.

Now the discipline for a simulation. An LLM electorate has no declared preference structure: whether its agents are single-peaked, how many dimensions they use, when they abstain, are all emergent from a prompt and a training corpus. So the informative experiment is not "what does the simulation predict?" but "what does it do when I vary one of these on purpose?" — give agents a second issue dimension, or a reason to stay home, and see whether the simulated equilibrium moves the way theory says it should.

A simulation that cannot reproduce the median voter theorem when its assumptions hold has not earned the right to contradict it when they do not.

## Recall
type: mcq
Q: What is the most useful way to compare an LLM electoral simulation with the median voter theorem?
- [x] Use it as a null model — impose its assumptions and check the simulation reproduces convergence, then vary one assumption at a time and see whether the result moves as theory predicts.
- [ ] Check whether the simulation predicts the actual election result — matching an observed outcome does not tell you which mechanism produced it.
- [ ] Assume the theorem is superseded because it has one dimension — its assumptions are the checklist your simulation silently takes a position on.
