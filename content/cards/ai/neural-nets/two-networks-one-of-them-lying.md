---
id: ai.neural-nets.gans.two-networks-one-of-them-lying
topic: ai.neural-nets.gans
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [gan, minimax, jensen-shannon, mode-collapse, adversarial-training]
hook: "The generator never sees a real image. Its only information about reality is how badly it fooled a critic."
sources:
  - {title: "Generative Adversarial Networks", author: "Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza et al.", year: 2014, type: paper, url: "https://arxiv.org/abs/1406.2661"}
  - {title: "Jensen–Shannon divergence", type: wiki, url: "https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two networks, and one of them is lying

Goodfellow and colleagues' 2014 setup has two players. A **generator** turns random noise into an image. A **discriminator** looks at an image and guesses whether it came from the dataset or from the generator. Each is trained to defeat the other.

The striking part is what the generator is denied. It never sees a single real image. Its entire contact with reality is one number per attempt: how convinced the critic was. Everything it learns about faces or bedrooms is reconstructed from a stream of verdicts.

The endpoint is clean enough to quote: "In the space of arbitrary functions $G$ and $D$, a unique solution exists, with $G$ recovering the training data distribution and $D$ equal to 1/2 everywhere." The forger wins by making the detective guess.

That sentence has a caveat in its first six words. "Arbitrary functions" is not two finite networks taking alternating gradient steps, and the gap between the two is where GANs earned their reputation for being hard to train.

## Rigor

The objective is a two-player minimax on

$$V(D,G) = \mathbb{E}_{x\sim p_{\text{data}}}\big[\log D(x)\big] + \mathbb{E}_{z\sim p_z}\big[\log\big(1 - D(G(z))\big)\big].$$

For fixed $G$, pointwise maximisation gives $D^{*}(x) = \dfrac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_g(x)}$. Substituting back,

$$C(G) = -\log 4 + 2\, D_{\mathrm{JS}}\big(p_{\text{data}} \,\|\, p_g\big),$$

so the generator is minimising the Jensen–Shannon divergence, which is zero exactly when $p_g = p_{\text{data}}$. Hence the unique optimum, and $D^{*} \equiv 1/2$ there.

Two things the derivation quietly assumes. It optimises over *distributions*, not over the parameters of a network; and it assumes $D$ is at its optimum before each generator step, which no implementation does. What you actually run is simultaneous gradient descent on a saddle-point problem, where a falling loss carries no information about progress — you are looking for an equilibrium, not a minimum, exactly as in a game with no dominant strategies. Mode collapse is the characteristic pathology: one output that reliably fools the current $D$ is a perfectly good local answer for $G$, and it wipes out diversity.

## Recall
type: mcq
Q: In the idealised GAN analysis, what is the generator actually minimising?
- [x] The Jensen–Shannon divergence between the data distribution and its own. — substituting the optimal discriminator turns the minimax value into $-\log 4 + 2D_{\mathrm{JS}}$.
- [ ] The squared error between generated and real images — the generator never sees a real image to compare against.
- [ ] The discriminator's accuracy on real images alone — the objective involves both terms; only their combination yields the divergence.
