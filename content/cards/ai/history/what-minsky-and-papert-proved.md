---
id: ai.history.perceptron-feud.what-minsky-and-papert-proved
topic: ai.history.perceptron-feud
topics: [ai.neural-nets.perceptron-mlp]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, beautiful, connection]
tags: [perceptrons-book, xor, parity, order, group-invariance]
related: [ai.neural-nets.perceptron-mlp.the-function-one-neuron-cannot-learn]
prerequisites: [ai.ml-basics.linear-models]
hook: "Everyone says the 1969 book proved a perceptron can't do XOR. XOR was the easy part and everyone already knew it."
sources:
  - {title: "Perceptrons (book)", type: wiki, url: "https://en.wikipedia.org/wiki/Perceptrons_(book)"}
  - {title: "Perceptrons: An Introduction to Computational Geometry", author: "Marvin Minsky & Seymour Papert", year: 1969, type: book, url: "https://archive.org/details/perceptronsintro00mins"}
diagram: {file: ai/xor-not-separable.svg, caption: "The four XOR points: any straight line puts one of them on the wrong side.", alt: "A unit square with the corners (0,0) and (1,1) marked as one class and (0,1) and (1,0) as the other, with three candidate dividing lines all failing"}
dates: {written: 2026-09-19, event: 1969-01-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added a related link to the neural-nets XOR card, which shares the impossibility proof."}
---

# What Minsky and Papert actually proved

The legend is that in 1969 two MIT professors proved a perceptron cannot compute XOR, and neural networks died of embarrassment. XOR is four points and a two-line contradiction; nobody needed a book for it, and Minsky and Papert knew perfectly well that stacking layers fixes it.

The book's real subject is *how much each feature detector has to see*. Give a perceptron any collection of little detectors, each looking at a handful of pixels, and add up their votes. The question is how big a handful you need. Their answer: for some perfectly ordinary visual predicates, you need detectors that see essentially the whole image. Parity — is the number of lit pixels odd? — requires one detector covering every pixel. Connectedness — is this shape one piece or two? — cannot be settled by detectors with bounded receptive fields at all.

That is an argument about locality and scale, and it applies to any architecture built from local parts. Their actual charge against multilayer networks was different and, in 1969, true: nobody had a learning theorem for them.

## Rigor

A perceptron computes $\psi(X) = \big[\sum_i w_i\,\varphi_i(X) > \theta\big]$, where each $\varphi_i$ is a predicate on a subset $S_i$ of the retina. The **order** of $\psi$ is the smallest $k$ with $|S_i| \le k$ for all $i$.

*XOR has order 2.* Suppose a single linear unit computed it: $w_1x_1 + w_2x_2 > \theta$ exactly on $\{(1,0),(0,1)\}$. Then $0 \le \theta$, $w_1 > \theta$, $w_2 > \theta$, and $w_1 + w_2 \le \theta$. Adding the middle two gives $w_1 + w_2 > 2\theta \ge \theta$ — a contradiction. That is the whole "XOR problem": the picture on this card is the proof.

*Parity has order $n$.* By their Group Invariance Theorem, a predicate invariant under all permutations of the retina admits a solution whose weights depend only on $|S_i|$, so $\psi$ reduces to the sign of a polynomial $p(|X|)$ of degree $\le k$. Parity must change sign at each of $|X| = 0,1,\dots,n$, forcing $n$ roots, so $k \ge n$. One detector must watch every pixel.

The order is the bound on the *handful* from the intuition — and order $n$ means there is no local shortcut, whatever the hardware.

## Recall
type: mcq
Q: What does "a predicate of order $n$" mean for a perceptron with $n$ inputs?
- [ ] It needs $n$ layers to compute — order counts how many inputs a single detector reads, not how deep the network is.
- [x] Some feature detector must look at all $n$ inputs at once — no assembly of locally-limited detectors can compute it, however many you use.
- [ ] It needs at least $n$ training examples — order is a property of the function, not of the data you fit it on.
