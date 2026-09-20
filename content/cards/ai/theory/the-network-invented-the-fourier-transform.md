---
id: ai.theory.grokking.the-network-invented-the-fourier-transform
topic: ai.theory.grokking
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [mechanistic-interpretability, progress-measures, fourier, modular-addition, nanda-2023]
prerequisites: [ai.theory.grokking, math.analysis.fourier]
hook: "It learned modular addition by rotating around a circle. The algorithm is sitting in the weights, in Fourier space."
related: [ai.theory.grokking.it-kept-training-long-after-it-had-won]
sources:
  - {title: "Progress measures for grokking via mechanistic interpretability", author: "Nanda, Chan, Lieberum, Smith & Steinhardt", year: 2023, type: paper, url: "https://arxiv.org/abs/2301.05217"}
  - {title: "Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets", author: "Power, Burda, Edwards, Babuschkin & Misra", year: 2022, type: paper, url: "https://arxiv.org/abs/2201.02177"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Reverse-engineer a grokked network and you find trigonometry

Grokking is only spooky while the network is a black box. Neel Nanda, Lawrence Chan, Tom Lieberum, Jess Smith and Jacob Steinhardt opened one up in 2023 and read the algorithm off the weights.

The task is $a+b \bmod p$. The algorithm the network found: embed each number as a point on a circle — that is, take cosines and sines of a few multiples of it — then use the angle-addition identities to rotate, then read off which residue the resulting angle belongs to. A discrete Fourier transform followed by trigonometry. Nobody taught it this. It is the natural algorithm if your primitives are matrix multiplications.

And once you know the algorithm, you can measure how much of it exists at any point in training. Do that and grokking dissolves. It was never a sudden shift; it is three overlapping phases — memorise, grow the circuit quietly underneath, then delete the memorisation.

## Rigor

Setup: a one-layer transformer on $(a,b)\mapsto a+b\bmod p$ with $p=113$. Nanda et al. show the learned computation is, for a handful of key frequencies $k$ with $\omega_k=2\pi k/p$:

1. embed $a\mapsto(\cos\omega_k a,\ \sin\omega_k a)$;
2. combine using $\cos\big(\omega_k(a+b)\big)=\cos\omega_ka\cos\omega_kb-\sin\omega_ka\sin\omega_kb$, which products of attention and MLP terms compute;
3. produce the logit for candidate $c$ as $\sum_k\cos\big(\omega_k(a+b-c)\big)$, maximal exactly when $c\equiv a+b$.

The evidence is not narrative. The discrete Fourier transform of the embedding matrix is sparse, concentrated on those frequencies, and ablating every other frequency leaves performance intact.

Knowing the algorithm buys **progress measures**: continuous quantities that track the circuit while accuracy shows nothing. Two of theirs are *restricted loss* (after ablating everything except the key frequencies) and *excluded loss* (after ablating the key frequencies). Their trajectories cut training into three phases — **memorisation**, **circuit formation** (restricted loss falls while the memorising components are still there), and **cleanup** (weight decay removes the memorisation, and test accuracy jumps).

So the discontinuity was in the metric, not in the network. The structure had been amplifying smoothly the whole time.

## Recall
type: mcq
Q: What did reverse-engineering a grokked network reveal about the "sudden" jump in test accuracy?
- [x] It was not sudden — the Fourier circuit grows gradually underneath the memorisation, and accuracy only moves when weight decay finally strips the memorising components away.
- [ ] The network swapped algorithms in a single step — the progress measures show smooth amplification over tens of thousands of steps.
- [ ] Nothing real was learned; the jump is a measurement artifact — the circuit is real and survives ablation of every other Fourier frequency.
