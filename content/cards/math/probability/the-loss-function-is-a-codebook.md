---
id: math.probability.information-entropy.the-loss-function-is-a-codebook
topic: math.probability.information-entropy
topics: [ai.ml-basics.loss-functions]
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, tool, practical]
tags: [cross-entropy, kl-divergence, log-loss, maximum-likelihood, bayes-error]
hook: "The loss every classifier minimises is the number of extra bits you waste by believing the wrong distribution."
callback: {from: math.probability.information-entropy, to: ai.ml-basics.loss-functions}
sources:
  - {title: "Cross-entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Cross-entropy"}
  - {title: "Kullback–Leibler divergence", type: wiki, url: "https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence"}
  - {title: "Maximum likelihood estimation", type: wiki, url: "https://en.wikipedia.org/wiki/Maximum_likelihood_estimation"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the optimal code? Training a model is searching for one

Entropy told you the cheapest possible average description length for a source: build the code from the true probabilities and you pay $H(p)$ bits per symbol, and no less.

Now suppose you build your code from the *wrong* probabilities $q$. Short codewords go to things that rarely happen; frequent things get long ones. You still describe everything correctly, but you overpay, and the overpayment has a name and a formula.

That is the entire content of the loss function used to train essentially every classifier. When a network outputs a probability over labels and you score it by cross-entropy — or log loss, or negative log-likelihood, three names for one thing — you are charging it for the bits it wastes by believing $q$ when the world runs on $p$.

Which explains something that confuses people the first time: the loss does not go to zero on a well-trained model. It goes down to the entropy of the data.

## Rigor

**Cross-entropy and divergence.**
$$H(p,q)=-\sum_x p(x)\log q(x)=\underbrace{H(p)}_{\text{irreducible}}+\underbrace{D_{\mathrm{KL}}(p\,\|\,q)}_{\ge 0,\ =0 \iff p=q}.$$
$H(p)$ does not depend on the model, so minimising cross-entropy over $q$ is exactly minimising the KL divergence: the model is being pushed toward the truth by the only term it controls.

**Why it equals maximum likelihood.** With data $x_1,\dots,x_N$ drawn from $p$ and a model $q_\theta$,
$$-\frac{1}{N}\log\prod_{i} q_\theta(x_i)=-\frac1N\sum_i\log q_\theta(x_i)\ \xrightarrow[N\to\infty]{}\ H(p,q_\theta).$$
Average negative log-likelihood *is* empirical cross-entropy. The information-theoretic story and the statistical story are the same computation.

**The floor.** If labels are genuinely ambiguous — a coin flip given the features — then $H(p)>0$ and a perfect model still shows positive loss. A training run whose loss approaches zero on noisy data is memorising, not learning. In language models the same number, in base 2, is reported as perplexity: $2^{H(p,q)}$, "how many equally likely words is the model effectively choosing between".

## Recall
type: reveal
Q: Why doesn't cross-entropy loss go to zero for a perfectly calibrated model?
A: Because $H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q)$, and only the second term is the model's fault. A perfect model drives the KL term to zero and is left paying $H(p)$, the intrinsic entropy of the labels. Zero loss on noisy data means memorisation, not a better model.
