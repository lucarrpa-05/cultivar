---
id: ai.theory.information-bottleneck.the-two-phases-that-might-not-exist
topic: ai.theory.information-bottleneck
format: idea
difficulty: 4
language: en
weight: heavy
angles: [feud, open-problem]
tags: [information-bottleneck, mutual-information, tishby, saxe-critique, contested]
hook: "Tishby said training has two phases: fit, then forget. Then somebody re-ran it with a different activation function."
sources:
  - {title: "Deep Learning and the Information Bottleneck Principle", author: "Naftali Tishby & Noga Zaslavsky", year: 2015, type: paper, url: "https://arxiv.org/abs/1503.02406"}
  - {title: "Opening the Black Box of Deep Neural Networks via Information", author: "Ravid Shwartz-Ziv & Naftali Tishby", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.00810"}
  - {title: "On the Information Bottleneck Theory of Deep Learning", author: "Saxe, Bansal, Dapello, Advani, Kolchinsky, Tracey & Cox", year: 2018, type: paper, url: "https://openreview.net/forum?id=ry_WPG-A-"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The claim that networks learn by forgetting, and the fight about it

Naftali Tishby proposed a striking account of what training does. Treat each layer as a random variable and measure two things about it: how much it knows about the input, $I(T;X)$, and how much it knows about the label, $I(T;Y)$. Plot the layers' trajectories in that plane during training and, Shwartz-Ziv and Tishby reported in 2017, you see two distinct phases. A short *fitting* phase where $I(T;Y)$ rises. Then a long *compression* phase where $I(T;X)$ falls — the network discarding whatever it knows about the input that is not about the label. On this account, generalisation is forgetting.

It is a lovely theory and it was attacked hard. Saxe and colleagues rebuilt the experiments and found the compression phase came and went with the choice of nonlinearity: present with saturating $\tanh$ units, absent with ReLUs, while generalisation was unaffected either way.

So this one is unresolved, and it is a good case study in how hard "what is the network doing" is to answer.

## Rigor

The **information bottleneck** (Tishby, Pereira, Bialek, 1999): find a representation $T$ of $X$ that is maximally informative about $Y$ at bounded complexity,

$$\min_{p(t\mid x)}\ I(T;X)-\beta\,I(T;Y).$$

Applied to deep networks (Tishby & Zaslavsky, 2015), each layer is a $T$, and the data-processing inequality forces $I(T_1;Y)\ge I(T_2;Y)\ge\cdots$ down the stack: a layer can only lose information about $Y$, so the goal is to shed as much about $X$ as possible while keeping it.

The empirical claim (Shwartz-Ziv & Tishby, 2017) is that SGD moves layers up and then left in the $(I(T;X),\,I(T;Y))$ plane, the leftward phase coinciding with the small-gradient, high-noise regime late in training.

The objection (Saxe et al., 2018) has a sharp technical core. For a *deterministic* network with continuous activations, $I(T;X)$ is infinite; it only becomes finite once you bin the activations, and the reported compression tracks the binning. With saturating $\tanh$ units the activations pile into the extreme bins and measured $I(T;X)$ falls; with ReLU it does not. They further show compression is not necessary for good generalisation, and that when it happens it can be driven by saturation rather than by SGD noise.

What survives in practice is the bottleneck *objective* as a design tool. What is contested is the descriptive claim about ordinary training.

## Recall
type: mcq
Q: What is the technical core of the objection to the information-bottleneck story of deep learning?
- [x] For a deterministic network with continuous activations $I(T;X)$ is infinite and only becomes finite after binning — and the measured "compression" can be an artifact of saturating units filling the extreme bins.
- [ ] The data-processing inequality fails for deep networks — it holds; the dispute is over how the mutual information is estimated.
- [ ] Networks do not generalize well enough for the question to matter — generalization is not in dispute, only the explanation of it.
