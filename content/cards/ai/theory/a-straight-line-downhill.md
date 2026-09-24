---
id: ai.theory.loss-landscapes.a-straight-line-downhill
topic: ai.theory.loss-landscapes
format: fact
difficulty: 2
language: en
weight: light
angles: [weird, paradox]
tags: [linear-interpolation, monotonic, goodfellow-2015, non-convexity, initialization]
prerequisites: [math.optimization.convexity]
hook: "Training wanders through a wildly non-convex landscape. Yet the straight road from start to finish usually runs downhill all the way."
related: [math.optimization.convexity.the-landscape-that-should-not-work]
sources:
  - {title: "Qualitatively characterizing neural network optimization problems", author: "Ian J. Goodfellow, Oriol Vinyals & Andrew M. Saxe", year: 2015, type: paper, url: "https://arxiv.org/abs/1412.6544"}
  - {title: "Analyzing Monotonic Linear Interpolation in Neural Network Loss Landscapes", author: "Lucas, Bae, Zhang, Fort, Zemel & Grosse", year: 2021, type: paper, url: "https://arxiv.org/abs/2104.11044"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Title said the loss \"only goes down\" while the body reports a shallow bump in the convnet; softened to \"almost all the way\"."}
---

# Draw a straight line from start to finish: downhill almost all the way

Training a network is supposed to be a trek through a wildly non-convex landscape. In 2014 Ian Goodfellow, Oriol Vinyals and Andrew Saxe tried the simplest check: draw a straight line in weight space from the random start to the trained solution, and measure the loss along it.

It went down, smoothly, for network after network; the worst was one shallow bump near the start. SGD never walks that line. The line was there anyway. A 2021 follow-up broke it by pushing weights far from where they began.

## Rigor

Why a line is a fair test: it is what convexity would promise. Define the slice

$$\varphi(\alpha)=L\big((1-\alpha)\theta_0+\alpha\theta_1\big),\qquad\alpha\in[0,1],$$

from initialisation $\theta_0$ to solution $\theta_1$. If $L$ is convex, so is $\varphi$; and a convex $\varphi$ with $\varphi(1)\le\varphi(\alpha)$ for all $\alpha$ is non-increasing. For $\alpha<\gamma\le1$ write $\gamma=\lambda\alpha+(1-\lambda)\cdot1$ with $\lambda=\frac{1-\gamma}{1-\alpha}$; then

$$\varphi(\gamma)\le\lambda\varphi(\alpha)+(1-\lambda)\varphi(1)\le\varphi(\alpha).$$

Networks show this monotone slice without being convex. Goodfellow et al.'s toy makes the contrast exact: $L(w_1,w_2)=(1-w_1w_2)^2$, whose minima form the hyperbola $w_1w_2=1$. From near the origin towards $(1,1)$ along $(\alpha,\alpha)$, $\varphi(\alpha)=(1-\alpha^2)^2$ decreases on $[0,1]$. But the straight line between the two solutions $(1,1)$ and $(-1,-1)$ passes through $(0,0)$, where the loss is $1$: a barrier. Lines from the start are easy; lines between two endings are not.

## Recall
type: mcq
Q: The loss falls steadily along the straight line from initialisation to the trained weights. What does that tell you?
- [x] Along that one slice the network behaves as a convex function would — even though the full loss is not convex.
- [ ] The loss is convex — the straight line between two different trained solutions can cross a barrier, which convexity forbids.
- [ ] Gradient descent travels along that line — it does not; the line exists, and SGD wanders well off it.
