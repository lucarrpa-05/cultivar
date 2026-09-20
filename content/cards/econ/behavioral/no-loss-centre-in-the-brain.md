---
id: econ.behavioral.neuroeconomics.no-loss-centre-in-the-brain
topic: econ.behavioral.neuroeconomics
topics: [econ.behavioral.loss-aversion-endowment]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, weird]
tags: [neuroeconomics, loss-aversion, fmri, amygdala, reverse-inference]
hook: "If losses hurt twice as much, there should be a pain circuit for them. There is not — and that is the finding."
sources:
  - {title: "Neuroeconomics", type: wiki, url: "https://en.wikipedia.org/wiki/Neuroeconomics"}
  - {title: "The neural basis of loss aversion in decision-making under risk, Science 315(5811)", author: "Tom, Fox, Trepel & Poldrack", year: 2007, type: paper, url: "https://doi.org/10.1126/science.1134239"}
  - {title: "Amygdala damage eliminates monetary loss aversion, PNAS 107(8)", author: "De Martino, Camerer & Adolphs", year: 2010, type: paper, url: "https://doi.org/10.1073/pnas.0910230107"}
dates: {written: 2026-09-19, event: 2007-01-26}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The brain has no loss centre, which is stranger than having one

If losses hurt about twice as much as equivalent gains please, the tidy prediction is a dedicated circuit: some region that fires for losses and stays quiet for gains. Tom, Fox, Trepel and Poldrack went looking for it in 2007, scanning people deciding whether to accept coin-flip gambles with real money on the line.

There is no such region. The areas that track value — ventral striatum, ventromedial prefrontal cortex — raise their activity as the possible gain grows and *lower* it as the possible loss grows, in the same circuit, on the same scale. What differs is the slope. The fall per unit of loss is steeper than the rise per unit of gain, and how much steeper a given person's slopes are predicts how loss-averse that person's choices are. They called it neural loss aversion.

The complement is a blunt little experiment: De Martino, Camerer and Adolphs tested two patients whose damage was confined to the amygdala and found their loss aversion gone, with ordinary risk aversion intact.

## Rigor

The design is parametric rather than categorical, which is what makes the claim testable. Each trial offers a 50/50 gamble with gain $G$ and loss $L$ varied independently across a grid, and the subject accepts or rejects. Two fits run in parallel.

Behaviourally, the probability of accepting is modelled as a logistic function of $G-\lambda L$, giving each subject a choice-based loss aversion coefficient $\lambda$.

Neurally, the response in each voxel is regressed on both parameters,

$$y=\beta_0+\beta_{G}\,G+\beta_{L}\,L+\varepsilon,$$

and the quantity of interest is $\lambda_{\text{neural}}=-\beta_L/\beta_G$: the asymmetry of one circuit's sensitivity in the two directions.

The result is that $\beta_G>0$ and $\beta_L<0$ in striatal and ventromedial prefrontal regions, that no region shows a selective *increase* for growing losses, and that $\lambda_{\text{neural}}$ correlates across subjects with the behavioural $\lambda$. That correlation is what turns a picture into evidence.

Two caveats worth carrying into every scan you read. Reverse inference — reasoning backwards from a region to a mental process — is weak. And absence of activation is much weaker evidence than presence. Which is exactly why the lesion patients matter: lesions test necessity, scans only test correlation.

## Recall
type: mcq
Q: What made the 2007 scan evidence rather than a pretty picture?
- [x] The neural asymmetry predicted individual behaviour — each subject's $\lambda_{\text{neural}}$ tracked their choice-based $\lambda$.
- [ ] A region lit up only for losses — no such selective loss region was found, and that absence was the headline.
- [ ] The sample was very large — samples of this kind are small; the parametric design and the individual correlation carried the argument.
