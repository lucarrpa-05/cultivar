---
id: ai.ml-basics.kernels-svm.the-widest-street
topic: ai.ml-basics.kernels-svm
format: idea
difficulty: 3
language: en
weight: medium
angles: [beautiful, tool]
tags: [max-margin, support-vectors, hinge-loss, duality, svm]
hook: "Infinitely many lines separate the two clouds. One is the middle of the widest street you can drive between them."
sources:
  - {title: "Support-Vector Networks", author: "Corinna Cortes & Vladimir Vapnik", year: 1995, type: paper, url: "https://doi.org/10.1007/BF00994018"}
  - {title: "Support vector machine", type: wiki, url: "https://en.wikipedia.org/wiki/Support_vector_machine"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Of all the lines that separate them, take the one with room to spare

Two clouds of points, red and blue, separable by a straight line. Notice that there are infinitely many such lines, and most of them pass unnervingly close to a point or two. Which should you trust on a point you have not seen?

The support vector machine's answer is: the one that leaves the most room. Widen a street between the two clouds until it jams against points on both sides. The middle of that street is your boundary, and the points it jammed against are the only ones that matter — move any other point, even a long way, and the answer does not change. Those jamming points are the *support vectors*, usually a small minority of the data.

That is an inductive bias stated as geometry: prefer the least committed boundary. It behaves well because a wide street means a new point must travel a long way before it flips the verdict.

Maximising a width turns out to be minimising a norm.

## Rigor

Take labels $y_i\in\{-1,+1\}$ and a separating hyperplane $w^{\top}x+b=0$, rescaled so that the closest points satisfy $|w^{\top}x+b|=1$. The distance from a point to the plane is $|w^{\top}x+b|/\|w\|$, so the street has width $2/\|w\|$ and the hard-margin problem is

$$\min_{w,b}\ \tfrac12\|w\|^{2}\quad\text{subject to}\quad y_i\big(w^{\top}x_i+b\big)\ge 1\ \ \text{for all }i .$$

Widest street $=$ smallest norm: a convex quadratic program, one global optimum. Its dual is

$$\max_{\alpha\ge0}\ \sum_i\alpha_i-\tfrac12\sum_{i,j}\alpha_i\alpha_j y_iy_j\,x_i^{\top}x_j\quad\text{s.t.}\ \sum_i\alpha_iy_i=0,\qquad w=\sum_i\alpha_iy_ix_i .$$

Complementary slackness forces $\alpha_i=0$ for every point strictly outside the margin, so only the jamming points survive with $\alpha_i>0$ — the support vectors. Note also that the data enters the dual only through $x_i^{\top}x_j$: the opening a kernel walks through.

Soft margins add slack $\xi_i\ge0$ with penalty $C\sum_i\xi_i$, which is the hinge loss $\max(0,1-y_if(x_i))$ plus $\ell_2$ regularisation. Hold on to the shape of this — "fit the data, and among all fits take the smallest norm" returns later as the reason huge networks generalise.

## Recall
type: mcq
Q: Why do most training points have no influence at all on an SVM's boundary?
- [x] The optimum depends only on the points that touch the margin — the dual assigns every other point a coefficient of exactly zero.
- [ ] The rest were discarded as outliers in preprocessing — nothing is discarded; they are simply inactive constraints.
- [ ] Only points near the class means matter — the decisive points sit near the *boundary*, which usually means the least typical ones.
