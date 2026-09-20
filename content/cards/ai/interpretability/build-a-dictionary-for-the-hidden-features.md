---
id: ai.interpretability.sparse-autoencoders.build-a-dictionary-for-the-hidden-features
topic: ai.interpretability.sparse-autoencoders
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, practical]
tags: [sparse-autoencoder, dictionary-learning, monosemanticity, feature-splitting, dead-features]
prerequisites: [ai.interpretability.features-superposition]
hook: "Stop reading neurons. Learn 4,096 sparse directions out of 512 of them and read those instead."
sources:
  - {title: "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", author: "Bricken, Templeton, Batson, Chen, Jermyn et al.", year: 2023, type: article, url: "https://transformer-circuits.pub/2023/monosemantic-features/index.html"}
  - {title: "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet", author: "Templeton, Conerly, Marcus, Lindsey et al.", year: 2024, type: article, url: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html"}
  - {title: "Sparse Autoencoders Find Highly Interpretable Features in Language Models", author: "Cunningham, Ewart, Riggs, Huben & Sharkey", year: 2023, type: paper, url: "https://arxiv.org/abs/2309.08600"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# If the features hide between the neurons, build a dictionary

Superposition says the features are directions that do not line up with the neurons. So stop reading neurons and go looking for directions.

The tool is a sparse autoencoder. Take a layer's activation vector and learn to write it as a sum of a *small* number of terms drawn from a much larger dictionary of learned directions. Overcomplete on purpose — more dictionary entries than dimensions — and sparse on purpose, because sparsity is what made superposition worth doing in the first place.

Bricken and colleagues ran this in 2023 on a one-layer transformer with a 512-neuron MLP layer, learning 4,096 features. The features were interpretable where the neurons were not: one fires on Arabic script, one on DNA sequences, one on base64 strings. In 2024 Templeton and colleagues scaled it to Claude 3 Sonnet with dictionaries of up to 34 million features, turning up features for the Golden Gate Bridge, for security vulnerabilities in code, for sycophancy.

It is one loss function with two terms, and its failure modes are worth knowing before you trust it.

## Rigor

For activations $x\in\mathbb R^{D}$ and $F\gg D$ features,

$$f(x)=\mathrm{ReLU}\big(W_{\text{enc}}(x-b_{\text{dec}})+b_{\text{enc}}\big),\qquad \hat x=b_{\text{dec}}+\sum_{i=1}^{F}f_i(x)\,W^{\text{dec}}_{\cdot,i},$$

trained on

$$\mathcal L=\underbrace{\|x-\hat x\|_2^{2}}_{\text{reconstruction}}+\lambda\underbrace{\sum_i f_i(x)\,\big\|W^{\text{dec}}_{\cdot,i}\big\|_2}_{\text{sparsity}} .$$

The $\ell_1$ term is the convex surrogate for "few features active"; weighting it by the decoder column norms blocks the cheat of shrinking activations while inflating the columns. The learned columns are estimates of the feature directions $\mathbf d_i$ that the superposition model merely assumed.

Scale and diagnostics from Templeton et al., on the residual stream at the middle layer of Claude 3 Sonnet with $F\in\{2^{20},2^{22},2^{25}\}$: fewer than 300 features active per token, reconstruction explaining at least 65% of activation variance, and dead-feature rates of roughly 2%, 35% and 65% as $F$ grows.

Three honest limitations. **Feature splitting**: enlarge the dictionary and one feature divides into finer variants, so "the" features depend on the dictionary size you chose. **Dead features**, above. And there is no ground truth — interpretability is scored by human and automated judgement of activation patterns, never against a known answer.

## Recall
type: mcq
Q: Why must a sparse autoencoder's dictionary be overcomplete — more features than dimensions?
- [x] The hypothesis under test is superposition — there are more feature directions than neurons, so a basis-sized dictionary could not possibly recover them.
- [ ] Because more parameters always reconstruct better — without the sparsity penalty a bigger dictionary just learns an arbitrary basis and explains nothing.
- [ ] Because activations are noisy and redundancy averages noise out — the goal is separating superposed features, not denoising.
