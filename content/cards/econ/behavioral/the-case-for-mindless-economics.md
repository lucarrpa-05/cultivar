---
id: econ.behavioral.neuroeconomics.the-case-for-mindless-economics
topic: econ.behavioral.neuroeconomics
format: story
difficulty: 3
language: en
weight: medium
angles: [feud, human, connection]
tags: [mindless-economics, revealed-preference, gul-pesendorfer, camerer, axioms, methodology]
hook: "Two Princeton theorists told neuroeconomics that brain scans could never refute an economic model. The best reply was a set of axioms."
related: [econ.micro.preferences-utility.utility-is-a-ranking, econ.behavioral.neuroeconomics.the-neurons-stopped-firing-for-the-juice]
sources:
  - {title: "The Case for Mindless Economics (working paper, 2005; in Caplin and Schotter eds., 2008)", author: "Faruk Gul, Wolfgang Pesendorfer", year: 2008, type: paper, url: "https://www.princeton.edu/~pesendor/mindless.pdf"}
  - {title: "The Case for Mindful Economics (working paper version)", author: "Colin Camerer", year: 2008, type: paper, url: "https://www.cirje.e.u-tokyo.ac.jp/research/workshops/micro/documents/microCOE0806.pdf"}
  - {title: "Dopamine, Reward Prediction Error, and Economics, QJE 123(2)", author: "Andrew Caplin, Mark Dean", year: 2008, type: paper, url: "https://doi.org/10.1162/qjec.2008.123.2.663"}
  - {title: "Testing the reward prediction error hypothesis with an axiomatic model", author: "Rutledge, Dean, Caplin, Glimcher", year: 2010, type: paper, url: "https://pubmed.ncbi.nlm.nih.gov/20926678/"}
dates: {written: 2026-09-23, event: 2005-11-01}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Rutledge et al. 2010: striatum plus three other regions passed and the anterior insula failed the axioms; added. Related link to the dopamine card added."}
---

# Two theorists argued brain scans can never refute an economic model

In 2004 and 2005 Colin Camerer, George Loewenstein and Drazen Prelec argued that neuroscience would shake economics, questioning constructs as basic as risk aversion, time preference and altruism. Faruk Gul and Wolfgang Pesendorfer of Princeton answered with an essay whose title is its argument: *The Case for Mindless Economics*, circulated in 2005, published in 2008.

Their claim was blunt. Economic models are about choices and assume nothing about the brain, so brain data cannot refute them. A theory that changes no prediction about choices is the same theory; one that does can be tested with choice data.

Camerer replied in the same 2008 volume with *The Case for Mindful Economics*. The sharper reply was a theorem.

## Rigor

First make the mindless position precise. The data of standard economics is a choice function $c$ giving each menu $A$ a non-empty $c(A)\subseteq A$. Two models that generate the same $c$ are, for economics, the same model, whatever story about the brain comes attached. A scan can only bear on the story.

Andrew Caplin and Mark Dean turned the method around. Treat a neural measurement as the data, a number $\delta(z,p)$ for receiving prize $z$ from lottery $p$, and ask what it must satisfy if it encodes a reward prediction error. Their 2008 answer is three testable axioms. *Coherent prize dominance*: if prize $z$ produces more dopamine than $z'$ when both come from one lottery, the same holds for every lottery. *Coherent lottery dominance*: if lottery $p$ produces more dopamine than $p'$ for one prize, the same holds for every prize. *No-surprise equivalence*: a prize received for certain produces the same response whatever the prize. These are necessary for a representation $\delta(z,p)=E\big(r(z),r(p)\big)$, increasing in experienced reward and decreasing in predicted reward, and with a suitable extension also sufficient. The reward $r$ is identified only up to increasing transformations.

That is revealed-preference method applied to a neuron. In 2010 Rutledge, Dean, Caplin and Glimcher tested the axioms with fMRI and found activity in the striatum and three other regions consistent with them, while the anterior insula failed them. Mindless economics set the rules; neuroeconomics answered by playing by them.

## Recall
type: mcq
Q: What was Gul and Pesendorfer's core argument against the neuroeconomic critique?
- [x] Economic models are about choices and assume nothing about the brain, so brain data cannot refute them — only a changed prediction about choices matters.
- [ ] Brain imaging is too noisy to be useful — their point was about what economic models claim, not about measurement quality.
- [ ] Neuroscience had shown that people do maximise utility — they argued brain data is irrelevant either way, not that it confirmed the standard model.
