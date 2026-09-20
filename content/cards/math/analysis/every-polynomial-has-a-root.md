---
id: math.analysis.complex.every-polynomial-has-a-root
topic: math.analysis.complex
format: idea
difficulty: 4
language: en
weight: medium
angles: [beautiful, tool]
tags: [fundamental-theorem-of-algebra, liouville, entire-functions, gauss, cauchy-estimate]
hook: "The fundamental theorem of algebra has no purely algebraic proof. The shortest one takes three lines and is entirely about analysis."
sources:
  - {title: "Fundamental theorem of algebra", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_algebra"}
  - {title: "Liouville's theorem (complex analysis)", type: wiki, url: "https://en.wikipedia.org/wiki/Liouville%27s_theorem_(complex_analysis)"}
  - {title: "Entire function", type: wiki, url: "https://en.wikipedia.org/wiki/Entire_function"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "'the previous card' replaced by naming the idea, since the engine does not guarantee feed order."}
---

# Every polynomial has a root, and algebra cannot prove it

The fundamental theorem of algebra is misnamed twice over. It is not fundamental to algebra, and there is no proof of it from algebra alone. Every known argument smuggles in something analytic or topological — a completeness property of the reals, a winding number, a limit.

Gauss gave a proof in 1799 and was rightly praised for it; it leaned on a fact about how curves in the plane must cross, which nobody filled in properly until 1920.

The complex-analytic proof is the one worth carrying around, because it is three lines and each line is memorable. Suppose a non-constant polynomial had no root. Then $1/p$ would be differentiable on the entire plane. Polynomials blow up at infinity, so $1/p$ shrinks to zero out there, and a function that is differentiable everywhere and stays bounded has to be constant. But $1/p$ is not constant. Contradiction.

The load is carried by that last sentence, which is Liouville's theorem — the rigidity of complex differentiability, *one derivative buys all of them*, cashing out.

## Rigor

**Liouville.** A bounded entire function is constant. From the Cauchy estimate on a circle of radius $R$ about $z$,
$$|f'(z)|=\left|\frac{1}{2\pi i}\oint_{|w-z|=R}\frac{f(w)}{(w-z)^{2}}dw\right|\le\frac{M}{R}\xrightarrow[R\to\infty]{}0,$$
so $f'\equiv0$ and $f$ is constant. Boundedness plus the freedom to take $R$ as large as you like is the whole argument.

**FTA.** Let $p$ have degree $n\ge1$ and suppose $p(z)\ne0$ for all $z$. Then $g=1/p$ is entire. Writing $p(z)=a_nz^{n}(1+O(1/z))$ gives $|p(z)|\to\infty$, so $|g(z)|\to0$ as $|z|\to\infty$; hence $g$ is bounded on some $|z|>R$ and, by continuity, bounded on the compact disc $|z|\le R$. So $g$ is bounded and entire, so constant by Liouville, so $p$ is constant. Contradiction with $n\ge1$. $\square$

Induction then splits $p$ into $n$ linear factors.

## Recall
type: mcq
Q: Which ingredient of the Liouville proof is the genuinely non-algebraic one?
- [x] Letting the contour radius go to infinity and using a bound on the whole plane — a limiting argument, available only over a complete field.
- [ ] Factoring out a root once you have one — that step is pure algebra and works over any field.
- [ ] That $\mathbb{C}$ is a field — true and necessary, but it is exactly the algebraic part, and it alone does not give roots.
