---
id: ai.theory.information-bottleneck.sorting-not-forgetting
topic: ai.theory.information-bottleneck
format: story
difficulty: 3
language: en
weight: medium
angles: [mistake, feud]
tags: [compression-phase, binning, clustering, goldfeld-2019, noisy-networks]
prerequisites: [math.probability.information-entropy, ai.neural-nets.perceptron-mlp]
hook: "A famous plot showed networks forgetting their input. The quantity plotted could not actually fall. Something else did."
related: [ai.theory.information-bottleneck.the-two-phases-that-might-not-exist]
sources:
  - {title: "Estimating Information Flow in Deep Neural Networks", author: "Goldfeld, van den Berg, Greenewald, Melnyk, Nguyen, Kingsbury & Polyanskiy", year: 2019, type: paper, url: "https://arxiv.org/abs/1810.05728"}
  - {title: "Opening the Black Box of Deep Neural Networks via Information", author: "Ravid Shwartz-Ziv & Naftali Tishby", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.00810"}
  - {title: "On the Information Bottleneck Theory of Deep Learning", author: "Saxe, Bansal, Dapello, Advani, Kolchinsky, Tracey & Cox", year: 2018, type: paper, url: "https://openreview.net/forum?id=ry_WPG-A-"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "\"Constant or infinite\" is proved for strictly monotone activations (Goldfeld et al.), not every network; narrowed the body claim to tanh networks like the original ones. Overlaps in setup with the-two-phases-that-might-not-exist but delivers a different payoff (the clustering resolution)."}
---

# The network was not forgetting its input. It was sorting it

In 2017 Ravid Shwartz-Ziv and Naftali Tishby reported that networks learn in two phases: first they fit the labels, then they slowly *forget* the input, discarding whatever is irrelevant. A year later Andrew Saxe and colleagues found the forgetting appeared or vanished with the choice of activation function.

Then came an awkward fact. In a deterministic tanh network like theirs, the information a layer holds about its input is either constant or infinite. It cannot fall. So what had been falling?

In 2019 Ziv Goldfeld and colleagues answered: clustering. As training proceeds, same-class inputs huddle together inside the layer, and the measurement was counting that. The compression was real geometry, mislabelled as forgetting.

## Rigor

"Constant or infinite" takes two lines. Let $T=f(X)$ for a deterministic layer $f$.

- Discrete $X$ (a finite training set), $f$ injective on it: $H(T\mid X)=0$ and $H(T)=H(X)$, so $I(X;T)=H(X)$. Constant, whatever the weights.
- Continuous $X$: given $X$, $T$ is a point mass, the conditional differential entropy is $-\infty$, and $I(X;T)=+\infty$.

What the plots computed was $I\big(X;\mathrm{bin}(T)\big)$ after cutting activation space into bins. Since $\mathrm{bin}(T)$ is itself a function of $X$, this is just $H\big(\mathrm{bin}(T)\big)$, the entropy of the bin histogram. It falls whenever activations crowd into fewer bins: through clustering, or through saturating $\tanh$ units piling into the extreme bins, which is the Saxe finding.

Goldfeld et al. make the question well posed by injecting noise, $T=f(X)+Z$ with $Z\sim\mathcal N(0,\sigma^2 I)$:

$$I(X;T)=h\big(f(X)+Z\big)-h(Z),$$

finite and dependent on the weights. Read it as a noisy channel: inputs whose images sit closer together than about $\sigma$ become indistinguishable at the output, so $I(X;T)$ drops as same-class points cluster. They also showed the old binned estimator, while it misses the true mutual information, does track clustering.

## Recall
type: mcq
Q: What were the famous "compression" plots of deep networks actually tracking?
- [x] How tightly hidden representations cluster — the binned estimate is the entropy of the bin histogram, which falls as same-class inputs huddle together.
- [ ] A genuine drop in what the layer knows about its input — for a deterministic network that quantity is constant or infinite, so it cannot drop.
- [ ] Noise from stochastic gradient descent — compression came and went with the activation function, which points at the nonlinearity instead.
