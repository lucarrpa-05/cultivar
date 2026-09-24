---
id: css.llm-agents.electoral-simulation.it-mostly-read-the-party-card
topic: css.llm-agents.electoral-simulation
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, numbers, practical]
tags: [vote-choice, germany, gles, party-identification, multi-party, baseline]
hook: "GPT-3.5 matched 46% of German voters' choices. A plain regression on the same variables did better."
related: [css.llm-agents.silicon-samples.a-sample-with-no-population]
sources:
  - {title: "Vox Populi, Vox AI? Using Language Models to Estimate German Public Opinion (v1)", author: "Leah von der Heyde, Anna-Carolina Haensch, Alexander Wenz", year: 2024, type: paper, url: "https://arxiv.org/abs/2407.08563v1"}
  - {title: "Vox Populi, Vox AI? Using Large Language Models to Estimate German Vote Choice, Social Science Computer Review", author: "von der Heyde, Haensch, Wenz", year: 2025, type: paper, url: "https://doi.org/10.1177/08944393251337014"}
dates: {written: 2026-09-23, event: 2024-07-11}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Regression F1 for the FDP is 0.50 in v1 Table A6, so 'above 0.5' became '0.5 or more'. Other v1 figures verified."}
---

# In Germany, the simulated voters mostly read their party ID

The famous early result was American: give a language model a voter's backstory and it predicts their presidential vote well. Leah von der Heyde, Anna-Carolina Haensch and Alexander Wenz asked whether that travels. They built 1,905 personas from the 2017 German Longitudinal Election Study, 13 variables each, prompted GPT-3.5 in German, and asked how each person voted.

It matched 46% of them. It overestimated the Greens, the Left and non-voters, and underestimated the FDP and the AfD, where its F1 score fell to about 0.3. A plain multinomial regression on the same variables beat it overall and for every party.

The failure had a shape, and it is the shape to watch for in any multi-party electorate.

## Rigor

The mechanism is party identification. GPT-3.5 leaned on it far more than on attitudes or demographics, and it predicts partisans well, because most people who identify with a party vote for it. But only about half of FDP, AfD and small-party voters identified with the party they chose, so for them the strongest cue was missing or pointed elsewhere.

Write accuracy as a mixture. If a share $\pi$ of voters carry a party cue the model reads with accuracy $a_p$, and the rest are predicted with accuracy $a_n$,

$$\text{acc}=\pi\,a_p+(1-\pi)\,a_n .$$

A model strong on $a_p$ and weak on $a_n$ looks brilliant wherever $\pi$ is large and loyalty high, and mediocre where many voters are unaligned or switch. The headline number measures the electorate as much as the model.

Two disciplines follow. Report the dumb baseline: a multinomial model fitted on the same 13 variables beat GPT-3.5 overall and most clearly on the AfD and FDP (F1 of 0.5 or more against about 0.3). And report accuracy for voters without a party cue, since that is where elections move and where the simulation is weakest. The study used text-davinci-003; newer models may do better, which is exactly why the baseline has to be rerun each time.

## Recall
type: mcq
Q: Why might an LLM electorate that looks good in the US disappoint in a multi-party system?
- [x] It leans on party identification, which predicts votes well only when most voters have one and stay loyal — unaligned and switching voters are where it breaks.
- [ ] Because it was prompted in German — language may matter, but the documented failure is over-reliance on the party cue.
- [ ] Because more parties make any prediction harder, so 46% is as good as it gets — a simple regression on the same variables did better.
