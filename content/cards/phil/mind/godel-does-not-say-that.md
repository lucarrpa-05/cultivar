---
id: phil.mind.functionalism-computation.godel-does-not-say-that
topic: phil.mind.functionalism-computation
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, mistake]
tags: [godel, lucas, penrose, functionalism, mechanism]
hook: "Remember Gödel's unprovable sentence? Two well-known arguments use it to prove you are not a machine, and both leak in the same place."
callback: {from: math.foundations.godel, to: phil.mind.functionalism-computation}
sources:
  - {title: "The Computational Theory of Mind", type: encyclopedia, url: "https://plato.stanford.edu/entries/computational-mind/"}
  - {title: "Minds, Machines and Gödel", author: "J. R. Lucas", year: 1961, type: paper, url: "https://en.wikipedia.org/wiki/John_Lucas_(philosopher)"}
  - {title: "Penrose–Lucas argument", type: wiki, url: "https://en.wikipedia.org/wiki/Penrose%E2%80%93Lucas_argument"}
dates: {written: 2026-09-19, event: 1961-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 2 to 3: the rigor turns on Con(F) and the second incompleteness theorem."}
---

# Remember Gödel's sentence? It does not prove you are not a machine

When you met incompleteness, the headline was that any consistent formal system strong enough for arithmetic contains a true sentence it cannot prove. J. R. Lucas in 1961, and Roger Penrose in two books in 1989 and 1994, turned that into an argument about minds.

It goes: suppose your mind is some formal system $F$. Then there is a sentence $G(F)$ that $F$ cannot prove. But you, looking at $F$, can see that $G(F)$ is true. So you can do something $F$ cannot, so you are not $F$. And since $F$ was arbitrary, you are not any machine.

The leak is in "can see that it is true". Gödel's theorem does not hand you a true sentence for free; it hands you a conditional. And the condition is exactly the thing you are not in a position to check about a machine as complicated as a brain.

## Rigor

Let $F$ be a recursively axiomatised, consistent theory extending Robinson arithmetic. The first incompleteness theorem produces a sentence $G(F)$ with
$$F \nvdash G(F) \quad \text{and} \quad F \nvdash \neg G(F),$$
and what is actually provable in a weak metatheory is the conditional
$$\mathrm{Con}(F) \;\to\; G(F).$$

So to "see that $G(F)$ is true" you must first know $\mathrm{Con}(F)$. Three consequences sink the argument.

First, by the second incompleteness theorem $F$ cannot prove $\mathrm{Con}(F)$ — but neither can you, for an $F$ the size of a candidate brain-program presented as a huge axiom list. Nothing in the situation gives you the required insight.

Second, the mechanist's claim is only that *some* $F$ matches your output, not that you can identify it. Hilary Putnam's response in 1960 already made this point: you would have to know your own program, and know it to be consistent.

Third, human mathematicians are demonstrably inconsistent — they publish false proofs — and inconsistency makes $G(F)$ derivable along with everything else, so the argument's premise fails at the start.

None of this proves functionalism is right. It shows that incompleteness, which is a theorem about provability inside fixed formal systems, is not a theorem about what minds can see.

## Recall
type: mcq
Q: Where does the Lucas-Penrose argument break down?
- [ ] Gödel's theorem applies only to arithmetic, not to brains — it applies to any system interpreting enough arithmetic, so that is not the objection.
- [x] Seeing that the Gödel sentence is true requires knowing the system is consistent — and nobody can establish that for a brain-sized formal system, including themselves.
- [ ] The Gödel sentence is not really true — it is true in the standard model, given consistency; the dispute is about who can know that.
