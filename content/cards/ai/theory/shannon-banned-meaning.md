---
id: ai.theory.information-bottleneck.shannon-banned-meaning
topic: ai.theory.information-bottleneck
format: idea
difficulty: 3
language: en
weight: medium
angles: [origin, connection]
tags: [shannon-1948, relevance, rate-distortion, kl-divergence, tishby-pereira-bialek]
prerequisites: [math.probability.information-entropy]
hook: "Information theory counts the face in a photo and the grain around it as bits like any others. One extra variable changes that."
related: [ai.neural-nets.autoencoders-vae.learning-by-being-forced-to-forget, ai.theory.information-bottleneck.the-two-phases-that-might-not-exist]
sources:
  - {title: "A Mathematical Theory of Communication", author: "Claude E. Shannon", year: 1948, type: paper, url: "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x"}
  - {title: "The information bottleneck method", author: "Naftali Tishby, Fernando C. Pereira & William Bialek", year: 1999, type: paper, url: "https://arxiv.org/abs/physics/0004057"}
  - {title: "Information bottleneck method", type: wiki, url: "https://en.wikipedia.org/wiki/Information_bottleneck_method"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Rigor opener leaned on a \"close\" the body never introduced; rewrote it so the handoff reads as one thought."}
---

# Shannon banned meaning in 1948. The bottleneck let it back in

On the first page of his 1948 paper, Shannon draws a line. Messages often have meaning, he grants. Then: "These semantic aspects of communication are irrelevant to the engineering problem." His measure counts surprise, not importance: the face in a photo and the grain around it are bits like any others.

In 1999 Naftali Tishby, Fernando Pereira and William Bialek got relevance back without defining meaning. Name a second variable you care about, say the person's name for a face photo. Relevant information is whatever the signal tells you about *that*. Compress as hard as you can while keeping it, and what survives is the meaning.

The surprise is in the equations.

## Rigor

What they reveal: every lossy compressor needs someone to say what counts as "close", and here nobody has to. Let $T$ be a representation computed from $X$ alone, so $Y\to X\to T$ is a Markov chain. The information bottleneck asks for

$$\min_{p(t\mid x)}\ I(X;T)-\beta\,I(T;Y),\qquad \beta>0,$$

compression traded against relevance. Setting the variation to zero (with normalisation constraints) gives three self-consistent equations:

$$p(t\mid x)=\frac{p(t)}{Z(x,\beta)}\exp\!\Big(-\beta\,D_{\mathrm{KL}}\big[p(y\mid x)\,\big\|\,p(y\mid t)\big]\Big),$$

$$p(t)=\sum_x p(x)\,p(t\mid x),\qquad p(y\mid t)=\sum_x p(y\mid x)\,p(x\mid t).$$

Compare Shannon's rate–distortion theory, where the optimal encoder has the form $p(t\mid x)\propto p(t)\,e^{-\beta\,d(x,t)}$ for a distortion $d$ that you must supply by hand: squared error, Hamming distance, a judgement call. The bottleneck solution has exactly that form, with

$$d(x,t)=D_{\mathrm{KL}}\big[p(y\mid x)\,\big\|\,p(y\mid t)\big].$$

An input is well represented by $t$ when the two say the same thing about $Y$. Meaning re-entered through one door only: your choice of $Y$. Iterating the three equations gives a convergent re-estimation scheme that generalises the Blahut–Arimoto algorithm of rate–distortion theory.

## Recall
type: mcq
Q: In the information bottleneck, what decides which information in a signal counts as relevant?
- [x] A second variable you choose — relevant means informative about it, and the distortion measure then falls out of the joint distribution.
- [ ] The signal's entropy — entropy measures surprise, not relevance; Shannon left meaning out on purpose.
- [ ] A distortion measure the engineer picks by hand — that is classical rate–distortion; here the distortion is a KL divergence derived from $p(x,y)$.
