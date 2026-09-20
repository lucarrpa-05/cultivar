---
id: math.foundations.logic-proofs.a-proof-with-no-example
topic: math.foundations.logic-proofs
topics: [math.number-theory.transcendence]
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, beautiful]
tags: [non-constructive, excluded-middle, existence-proof, gelfond-schneider]
hook: "Two irrationals whose power is rational. The proof takes four lines and never tells you which two."
sources:
  - {title: "Gelfond–Schneider theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Gelfond%E2%80%93Schneider_theorem"}
  - {title: "Constructive Mathematics", type: encyclopedia, url: "https://plato.stanford.edu/entries/mathematics-constructive/"}
  - {title: "Constructive proof", type: wiki, url: "https://en.wikipedia.org/wiki/Constructive_proof"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 2→3: the rigor leans on Gelfond–Schneider and on excluded middle, not on first-year material."}
---

# A proof that something exists without showing you one

Are there irrational numbers $a$ and $b$ with $a^b$ rational?

Look at $\sqrt{2}^{\sqrt{2}}$. Either it is rational, and we are done: take $a=b=\sqrt{2}$. Or it is irrational, and then take $a=\sqrt{2}^{\sqrt{2}}$ and $b=\sqrt{2}$, so $a^b=\sqrt{2}^{2}=2$. Rational either way. Question answered.

Notice what happened. You now know such a pair exists and you cannot point at one. The argument walked down both branches of a fork without ever choosing a branch.

Most existence theorems in your degree are like this: "there exists" usually means "assuming otherwise leads to nonsense," not "here it is." Constructivists refuse the move — for them, to exist is to be built. Everyone else shrugs and uses the theorem.

The fork, as it happens, has been settled, by a theorem with nothing to do with the question.

## Rigor

**The argument.** Let $x=\sqrt{2}^{\sqrt{2}}$. If $x\in\mathbb{Q}$, take $(a,b)=(\sqrt{2},\sqrt{2})$. If $x\notin\mathbb{Q}$, take $(a,b)=(x,\sqrt{2})$, and then
$$a^{b}=\left(\sqrt{2}^{\sqrt{2}}\right)^{\sqrt{2}}=\sqrt{2}^{\,\sqrt{2}\cdot\sqrt{2}}=\sqrt{2}^{\,2}=2 .$$
A valid pair exists in both cases. Classically this closes the question, because $x\in\mathbb{Q}\lor x\notin\mathbb{Q}$ is an instance of excluded middle. Intuitionistically it closes nothing: no witness was produced.

**Which branch is real.** Gelfond and Schneider proved in 1934 (Hilbert's seventh problem) that if $a$ is algebraic with $a\neq 0,1$ and $b$ is algebraic and irrational, then $a^{b}$ is transcendental. With $a=b=\sqrt{2}$ this makes $\sqrt{2}^{\sqrt{2}}$ transcendental, hence irrational: the second branch is the true one. So the fork is decidable — by machinery far heavier than the statement it decides.

If you only want a witness, there is a cheap constructive one: $a=\sqrt{2}$, $b=2\log_{2}3$, both irrational, with $a^{b}=2^{\log_{2}3}=3$.

## Recall
type: mcq
Q: What makes the $\sqrt{2}^{\sqrt{2}}$ argument non-constructive?
- [x] It proves a pair exists without identifying which of two candidate pairs works — the case split is never resolved inside the proof.
- [ ] It uses irrational numbers, which cannot be written down exactly — irrationals are fine constructively; $\sqrt{2}$ has a perfectly good construction.
- [ ] It assumes the conclusion and derives a contradiction — there is no contradiction anywhere in it; it is a case split, not a reductio.
- [ ] It relies on the axiom of choice — no choice is used; only excluded middle on a single statement.
