---
id: ai.ml-basics.bias-variance.two-ways-to-be-wrong
topic: ai.ml-basics.bias-variance
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, beautiful]
tags: [bias, variance, irreducible-error, archery, model-selection]
hook: "One model is wrong the same way every time. Another is wrong differently every time. The cures are opposite."
diagram: {file: ai/bias-variance-decomposition.svg, caption: "Four archers: the average shot is the bias, the scatter is the variance, and the two move separately.", alt: "Four archery targets: shots tight on the bullseye; shots scattered around it; shots tight but off to one side; shots scattered and off-centre."}
sources:
  - {title: "Bias–variance tradeoff", type: wiki, url: "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff"}
  - {title: "Neural Networks and the Bias/Variance Dilemma", author: "Geman, Bienenstock & Doursat", year: 1992, type: paper, url: "https://doi.org/10.1162/neco.1992.4.1.1"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Diagram caption: bias and variance 'move separately' rather than 'are independent of each other'."}
---

# Two completely different ways for a model to be wrong

Retrain your model on a fresh sample from the same source. Then again. Then a hundred times. You now hold a hundred slightly different models, and you can ask two entirely separate questions about them.

First: where do they point *on average*? If the average prediction sits far from the truth, the model class cannot express what is going on — a straight line chasing a curve. That is **bias**, and more data will not touch it.

Second: how much do they disagree with *each other*? If a small change in the sample throws the prediction around, the model is fitting accidents. That is **variance**, and more data does help.

Archery is the picture. Bias is a sight that is off; variance is a shaky hand. An archer with a bad sight and a steady hand and an archer with a good sight and the shakes can post the same average miss, and they need opposite advice: one needs a richer model, the other a simpler one. Diagnose the wrong one and you make things worse.

These are not a metaphor. They add up, exactly.

## Rigor

Fix a point $x$, let $y=f(x)+\varepsilon$ with $\mathbb E[\varepsilon]=0$ and $\operatorname{Var}(\varepsilon)=\sigma^{2}$, and let $\hat f_S$ be the model fitted to a random sample $S$. Averaging over both the sample and the noise,

$$\mathbb E\big[(y-\hat f_S(x))^{2}\big]=\underbrace{\big(f(x)-\mathbb E_S[\hat f_S(x)]\big)^{2}}_{\text{bias}^{2}}+\underbrace{\operatorname{Var}_S\big(\hat f_S(x)\big)}_{\text{variance}}+\underbrace{\sigma^{2}}_{\text{irreducible}} .$$

Three terms, and only the first two are yours. The crooked sight is $\mathbb E_S[\hat f_S(x)]-f(x)$; the shaky hand is the spread of $\hat f_S(x)$ about its own mean; $\sigma^{2}$ is the wind, and no model removes it — which is why a reported error of zero on noisy data is a symptom, not an achievement.

Two cautions. The identity is stated *at one point* and for *squared* loss; under 0–1 loss no such clean split exists. And nothing above says the two terms must trade off. That extra claim — enlarge the model and variance must rise — is a habit, not a theorem.

## Recall
type: mcq
Q: You refit on a hundred fresh samples and get a hundred nearly identical models, all wrong in the same direction. What do you have?
- [x] High bias, low variance — they agree with each other and disagree with the truth, so the class itself cannot express the target.
- [ ] High variance, low bias — that would look like a hundred models scattered around the truth, disagreeing with each other.
- [ ] Irreducible noise — noise makes the labels vary, not the trained models' average prediction.
