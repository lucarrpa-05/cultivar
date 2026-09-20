---
id: ai.ml-basics.kernels-svm.a-million-dimensions-for-free
topic: ai.ml-basics.kernels-svm
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [kernel-trick, mercer, rkhs, representer-theorem, feature-map]
prerequisites: [ai.ml-basics.linear-models, math.linear-algebra.inner-products]
hook: "The algorithm never touches the expanded features. It only ever asks for inner products between pairs."
related: [ai.ml-basics.linear-models.linear-in-the-parameters]
sources:
  - {title: "Kernel method", type: wiki, url: "https://en.wikipedia.org/wiki/Kernel_method"}
  - {title: "Mercer's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Mercer%27s_theorem"}
  - {title: "Support-Vector Networks", author: "Corinna Cortes & Vladimir Vapnik", year: 1995, type: paper, url: "https://doi.org/10.1007/BF00994018"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How to compute in a million dimensions without going there

Expanding features to fit curves leaves you with a bill. All the degree-two products of a thousand inputs is half a million features; degree five is astronomical. Building that vector for every data point is out of the question, and for a while that looked like the ceiling on what linear methods could do.

Then someone noticed the algorithm never actually uses the expanded vectors. It only ever uses *inner products between pairs of them*. And for the right expansions, the inner product has a shortcut: for degree-two polynomial features, $\varphi(x)^{\top}\varphi(z)$ is exactly $(x^{\top}z)^{2}$ — a dot product in the original space, squared. One multiplication instead of half a million.

So you never build the space at all. You write down the shortcut and run the algorithm as though you had. The Gaussian kernel does this for a feature space with *infinitely* many dimensions, which you could not have built at any price.

The catch is that shortcuts only exist for a very particular kind of function.

## Rigor

$K:\mathcal X\times\mathcal X\to\mathbb R$ is a **kernel** if $K(x,z)=\langle\varphi(x),\varphi(z)\rangle$ for some map $\varphi$ into a Hilbert space. Mercer's condition makes that checkable without ever exhibiting $\varphi$: $K$ works iff it is symmetric and positive semi-definite, i.e. every Gram matrix $[K(x_i,x_j)]_{i,j}$ has no negative eigenvalue.

The degree-two case in two dimensions: with $\varphi(x)=(x_1^{2},\sqrt2\,x_1x_2,x_2^{2})$,

$$(x^{\top}z)^{2}=(x_1z_1+x_2z_2)^{2}=x_1^{2}z_1^{2}+2x_1x_2z_1z_2+x_2^{2}z_2^{2}=\varphi(x)^{\top}\varphi(z).$$

For the Gaussian kernel $K(x,z)=\exp\!\big(-\|x-z\|^{2}/2\sigma^{2}\big)$, expanding $e^{x^{\top}z/\sigma^{2}}=\sum_{k\ge0}(x^{\top}z)^{k}/(k!\,\sigma^{2k})$ shows $\varphi$ carries every polynomial degree at once: an infinite-dimensional target.

What rescues this from being a curiosity is the **representer theorem**: for $\min_f\sum_i\ell(f(x_i),y_i)+\lambda\|f\|_{\mathcal H}^{2}$ over the RKHS of $K$, every minimiser has the form $\hat f(\cdot)=\sum_{i=1}^{n}\alpha_i K(x_i,\cdot)$. The answer lives in the span of your $n$ training points however infinite the space is. You optimise $n$ numbers, not $p$ — the cost moves off the dimension you imagined and onto the sample you actually have.

## Recall
type: mcq
Q: What does the kernel trick avoid computing?
- [x] The expanded feature vectors themselves — the algorithm only needs pairwise inner products, and a kernel returns those directly.
- [ ] The training labels — kernels change how inputs are compared, not what is being predicted.
- [ ] The optimisation — you still solve one, now over $n$ coefficients rather than $p$ weights.
