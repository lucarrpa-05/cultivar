---
id: ai.theory.mdl-kolmogorov.the-shortest-program-nobody-can-find
topic: ai.theory.mdl-kolmogorov
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox]
tags: [kolmogorov-complexity, uncomputability, solomonoff, berry-paradox, occam]
callback: {from: math.foundations.computability, to: ai.theory.mdl-kolmogorov}
hook: "The perfect inductive method exists, is provably optimal, and provably cannot be run."
sources:
  - {title: "Kolmogorov complexity", type: wiki, url: "https://en.wikipedia.org/wiki/Kolmogorov_complexity"}
  - {title: "Solomonoff's theory of inductive inference", type: wiki, url: "https://en.wikipedia.org/wiki/Solomonoff%27s_theory_of_inductive_inference"}
  - {title: "Minimum description length", type: wiki, url: "https://en.wikipedia.org/wiki/Minimum_description_length"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the halting problem? It rules out the perfect learner

Remember that you cannot decide in general whether a program halts, and the corollary that an entire family of natural questions about programs is undecidable. Here is that corollary turning up inside learning theory, wearing different clothes.

Define the complexity of a string as the length of the shortest program that prints it. This is Kolmogorov complexity, and it is the right formalisation of "how much structure is in this data": a string with a short description has a pattern, a string whose shortest description is itself is noise. It even hands you the perfect learner — predict using the shortest program consistent with everything you have seen. Occam's razor, promoted to an algorithm.

Except that it is not an algorithm. The function is uncomputable, and the proof is the halting problem in a mirror.

So the ideal inductive method exists, is provably optimal, and cannot be run. Everything practical is an approximation to something we can prove we will never have.

## Rigor

Fix a universal Turing machine $U$. The **Kolmogorov complexity** of $x\in\{0,1\}^{*}$ is

$$K(x)=\min\{\,|p|\ :\ U(p)=x\,\}.$$

The choice of machine costs only a constant: for any other universal $V$, $|K_U(x)-K_V(x)|\le c_{U,V}$ independently of $x$, since you can prepend a fixed interpreter. That is the invariance theorem, and it is what makes $K$ a property of the string rather than of your taste in languages.

**$K$ is uncomputable.** Suppose some total computable $f$ equals $K$. For each $n$, write the program that enumerates strings in order until it finds the first $x$ with $f(x)>n$, then prints it. That program has length $\log n+c$, so $K(x)\le\log n+c$, while $f(x)=K(x)>n$ — a contradiction once $n>\log n+c$. This is Berry's paradox converted into a proof, and it runs on the same diagonal machinery as the halting problem; indeed a computable $K$ would decide halting.

Two escapes, both real. **MDL** (Rissanen, 1978) replaces the universal machine by a fixed restricted code and minimises $L(M)+L(D\mid M)$ — computable, because the code is fixed in advance. **Solomonoff induction** keeps the universal prior $2^{-K(\cdot)}$, proves optimal prediction, and admits it is only approximable from below.

Universality traded for computability. That trade is the shape of every learner that actually runs.

## Recall
type: reveal
Q: The ideal learner is "predict with the shortest program consistent with the data". What stops you from using it?
A: Kolmogorov complexity is uncomputable — a Berry-paradox diagonal argument, the same machinery as the halting problem, shows no total computable function equals $K$. MDL recovers usability by fixing a restricted code instead of a universal machine.
