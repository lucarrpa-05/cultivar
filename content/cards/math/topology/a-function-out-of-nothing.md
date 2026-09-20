---
id: math.topology.separation-axioms.a-function-out-of-nothing
topic: math.topology.separation-axioms
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, human]
tags: [urysohn-lemma, normal-space, dyadic-rationals, tietze]
hook: "No distance, no formula, nothing to compute with — and out comes a continuous function. Urysohn was 26 when he drowned."
sources:
  - {title: "Urysohn's lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Urysohn%27s_lemma"}
  - {title: "Pavel Urysohn", type: wiki, url: "https://en.wikipedia.org/wiki/Pavel_Urysohn"}
  - {title: "Topology, 2nd ed., §33", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A continuous function built out of nothing but open sets

Suppose the only thing you know about a space is that any two disjoint closed sets can be wrapped in disjoint open sets. That is called normality, and it is a statement about open sets and nothing else. No distance. No coordinates. No arithmetic.

Now build a continuous function that is $0$ on one closed set and $1$ on the other.

There is nothing to build it from. In a metric space you would write $f(x)=d(x,A)/(d(x,A)+d(x,B))$ and be done in one line, but here there is no $d$. Urysohn's answer is to manufacture the function out of a nested family of open sets, one for each rational number between $0$ and $1$, each squeezed inside the next. The function is then defined by asking: how far down that family do you have to go before this point appears?

Pavel Urysohn drowned off the Brittany coast in August 1924, aged 26, a year after he and Alexandrov gave compactness its modern definition. His lemma is the hinge the second half of point-set topology turns on.

## Rigor

**Urysohn's lemma.** If $X$ is normal and $A, B \subseteq X$ are disjoint closed sets, there is a continuous $f : X \to [0,1]$ with $f \equiv 0$ on $A$ and $f \equiv 1$ on $B$.

The construction. Normality is equivalent to: for $A$ closed inside $U$ open, there is open $V$ with $A \subseteq V \subseteq \overline{V}\subseteq U$. Index the dyadic rationals $q \in [0,1]$ and build open sets $U_q$ with
$$q < r \implies \overline{U_q}\subseteq U_r,$$
starting from $U_1 = X \setminus B$ and $A \subseteq U_0$, inserting each new dyadic between its neighbours by the equivalent form. Then set
$$f(x)=\inf\{q : x \in U_q\}\quad (\text{and } f(x)=1 \text{ if } x \in \text{no } U_q).$$
Continuity comes from the nesting: $f(x)<a$ iff $x \in U_q$ for some $q<a$, an open condition; $f(x)>a$ iff $x \notin \overline{U_q}$ for some $q>a$, also open. Preimages of subbasic rays are open, so $f$ is continuous.

The lemma is what makes the Tietze extension theorem and the Urysohn metrization theorem possible: both need a supply of continuous functions, and normality is where that supply comes from.

## Recall
type: mcq
Q: What do the dyadic rationals do in the proof of Urysohn's lemma?
- [x] They index a nested family of open sets whose nesting order becomes the ordering of function values — the function is built from the family, not from a formula.
- [ ] They approximate the distance between the two closed sets — there is no distance available; normality mentions only open sets.
- [ ] They make the function take only dyadic values — the function is onto a full interval; the dyadics are scaffolding that disappears.
