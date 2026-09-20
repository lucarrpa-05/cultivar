---
id: ai.llm.positional-encoding.sines-and-cosines-for-where-you-are
topic: ai.llm.positional-encoding
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [positional-encoding, fourier, sinusoids, shift-equivariance, permutation]
callback: {from: math.analysis.fourier, to: ai.llm.positional-encoding}
prerequisites: [math.analysis.fourier, ai.llm.attention]
hook: "Attention cannot tell a sentence from its own shuffled anagram. The 2017 fix was to hand every position a Fourier expansion."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Fourier series", type: wiki, url: "https://en.wikipedia.org/wiki/Fourier_series"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Fourier? Position is written in sines and cosines

The reason you met Fourier series is that shifts are horrible in the time domain and trivial in the frequency domain: translate a function and every coefficient just picks up a phase. The transformer has exactly that problem, and reached for exactly that solution.

Here is the problem. Attention averages over positions with learned weights, and an average does not care about order. Shuffle the words of a sentence and a bare attention layer returns the same set of vectors, permuted. The architecture is blind to word order by construction, which is a strange property for something that reads.

So order has to be written into the vectors themselves before the first layer. Vaswani and colleagues gave each position a vector of sines and cosines at geometrically spaced frequencies — a position expanded in a Fourier basis, a point on a stack of circles each spinning at its own rate. Slow circles distinguish "beginning of the paragraph" from "end"; fast ones distinguish neighbours.

And the reason they chose it is the reason you care about Fourier at all.

## Rigor

For position $pos$ and dimension index $i$ (Vaswani et al. 2017, §3.5):

$$PE_{(pos,\,2i)} = \sin\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right), \qquad PE_{(pos,\,2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right),$$

so the wavelengths form a geometric progression from $2\pi$ to $10000\cdot 2\pi$. This vector is *added* to the token embedding.

The paper's stated reason, verbatim: "We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions, since for any fixed offset $k$, $PE_{pos+k}$ can be represented as a linear function of $PE_{pos}$."

That linear function is the rotation you already know. For the pair at frequency $\omega$, the angle-addition formulae give

$$\begin{pmatrix}\sin\omega(pos+k)\\ \cos\omega(pos+k)\end{pmatrix} = \begin{pmatrix}\cos\omega k & \sin\omega k\\ -\sin\omega k & \cos\omega k\end{pmatrix}\begin{pmatrix}\sin\omega\, pos\\ \cos\omega\, pos\end{pmatrix}.$$

Translation acts *block-diagonally* on this basis, one rotation per frequency — the real form of "shifting multiplies each Fourier coefficient by a phase". A relative offset is a fixed linear map, which is something a linear layer can learn; a relative offset in raw position numbers is not.

## Recall
type: mcq
Q: Why does a transformer need positional information injected at all?
- [ ] Because the softmax cannot represent long distances — softmax weights are unbounded in reach; distance is not the issue.
- [x] Because attention is an average over positions, so permuting the tokens permutes the output and nothing else. — order is invisible to the architecture unless it is written into the vectors.
- [ ] Because the tokenizer discards whitespace — whitespace is kept inside the tokens; word order is a separate matter entirely.
