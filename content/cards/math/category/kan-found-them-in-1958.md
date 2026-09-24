---
id: math.category.adjunctions.kan-found-them-in-1958
topic: math.category.adjunctions
format: story
difficulty: 3
language: en
weight: medium
angles: [human, history, origin]
tags: [daniel-kan, adjoint-functors, eilenberg, galois-connection, tensor-hom]
hook: "Categories were invented in 1945. The idea that now carries most of their weight arrived in 1958, from a survivor of Bergen-Belsen."
related: [math.category.adjunctions.say-where-the-generators-go, math.algebra.galois.fields-on-the-left-groups-on-the-right]
sources:
  - {title: "Adjoint functors", author: "Daniel M. Kan", year: 1958, type: paper, url: "https://doi.org/10.1090/S0002-9947-1958-0131451-0"}
  - {title: "Categories for the Working Mathematician, 2nd ed. (preface to the first edition, 1971)", author: "Saunders Mac Lane", year: 1998, type: book, url: "https://doi.org/10.1007/978-1-4757-4721-8"}
  - {title: "Daniel Kan", type: wiki, url: "https://en.wikipedia.org/wiki/Daniel_Kan"}
  - {title: "Galois connection", type: wiki, url: "https://en.wikipedia.org/wiki/Galois_connection"}
dates: {written: 2026-09-23, event: 1958-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Put Mac Lane's slogan in quotation marks with its 1971 preface and added Categories for the Working Mathematician as a source; Kan biography checked against Wikipedia/MIT."}
---

# The idea category theory runs on arrived thirteen years late

Samuel Eilenberg and Saunders Mac Lane invented categories in 1945. The notion that now carries most of the subject's weight, the adjoint functor, did not appear for another thirteen years.

It came from Daniel Kan. Born in Amsterdam in 1927, he and his family were interned at Bergen-Belsen; they survived, but his parents died of dysentery shortly after liberation. He finished a doctorate under Eilenberg at the Hebrew University in 1955, and in 1958 published *Adjoint functors*.

Mac Lane's 1971 textbook turned it into a slogan: "Adjoint functors arise everywhere." They had been arising for a century without a name. Galois's correspondence between fields and groups is one.

## Rigor

**Definition.** Functors $F:\mathcal C\to\mathcal D$ and $G:\mathcal D\to\mathcal C$ are **adjoint**, $F\dashv G$, if there are bijections
$$\operatorname{Hom}_{\mathcal D}(FC,D)\ \cong\ \operatorname{Hom}_{\mathcal C}(C,GD)$$
natural in $C$ and $D$. Equivalently, there are natural transformations $\eta:1\Rightarrow GF$ (unit) and $\varepsilon:FG\Rightarrow1$ (counit) satisfying the triangle identities $G\varepsilon\circ\eta G=1_G$ and $\varepsilon F\circ F\eta=1_F$.

**The homological-algebra example.** For abelian groups, $\operatorname{Hom}(A\otimes B,C)\cong\operatorname{Hom}(A,\operatorname{Hom}(B,C))$: a bilinear map is the same as a linear map into linear maps. So $-\otimes B\dashv\operatorname{Hom}(B,-)$.

**Galois, retroactively.** Order the intermediate fields of $L/K$ by inclusion, and the subgroups of $\operatorname{Gal}(L/K)$ by reverse inclusion. Then $E\mapsto\operatorname{Gal}(L/E)$ and $H\mapsto L^H$ satisfy
$$E\subseteq L^H\iff H\subseteq\operatorname{Gal}(L/E),$$
which is an adjunction between two posets viewed as categories. The fundamental theorem says that for a finite Galois extension it is even an equivalence.

**One payoff.** Right adjoints preserve limits and left adjoints preserve colimits. That is why forgetful functors preserve products, and why the free group on $X\sqcup Y$ is the free product $F(X)*F(Y)$.

## Recall
type: reveal
Q: What is an adjunction, in one sentence?
A: A pair of functors in opposite directions with a natural bijection $\operatorname{Hom}(FC,D)\cong\operatorname{Hom}(C,GD)$: maps out of the freely built object correspond exactly to maps into the underlying one.
