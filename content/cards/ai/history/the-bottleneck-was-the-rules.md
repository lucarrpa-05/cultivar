---
id: ai.history.winters-expert-systems.the-bottleneck-was-the-rules
topic: ai.history.winters-expert-systems
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, tool, numbers]
tags: [expert-systems, xcon, mycin, knowledge-acquisition, fifth-generation]
hook: "An expert system saved one company an estimated 25 million dollars a year. Five years later the whole industry was gone."
sources:
  - {title: "Xcon", type: wiki, url: "https://en.wikipedia.org/wiki/Xcon"}
  - {title: "Mycin", type: wiki, url: "https://en.wikipedia.org/wiki/Mycin"}
  - {title: "AI winter", type: wiki, url: "https://en.wikipedia.org/wiki/AI_winter"}
  - {title: "Fifth Generation Computer Systems", type: wiki, url: "https://en.wikipedia.org/wiki/Fifth_Generation_Computer_Systems"}
dates: {written: 2026-09-19, event: 1987-01-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The second AI boom died of maintenance

Expert systems were the comeback. Instead of general intelligence, bottle one specialist's knowledge as if-then rules and run it. It genuinely worked. MYCIN diagnosed bacterial infections about as well as Stanford faculty. XCON, written by John McDermott at Carnegie Mellon in 1978 and running at Digital Equipment from 1980, configured VAX orders: roughly 2,500 rules, 80,000 orders processed, and an estimated saving of \$25 million a year by 1986.

Then it collapsed. The specialised Lisp hardware market died in 1987, Japan's decade-long Fifth Generation project ended without its goals, and "expert system" became a word you did not put in a grant application.

The cause was not intelligence. It was upkeep. Every awkward new case needs a new rule, someone has to sit with an expert to extract it, and each rule can interact with every rule already there. The knowledge base grows linearly and the cost of owning it does not.

## Rigor

Two scaling arguments, neither fixed by a faster machine.

**Search.** Chaining rules to depth $d$ with branching factor $b$ explores $O(b^d)$ states. With $b=10$ and $d=10$ that is $10^{10}$ — Lighthill's combinatorial explosion. Pruning it requires knowing which branches are hopeless, which is more knowledge, which is more rules.

**Maintenance.** A base of $n$ rules has $\binom{n}{2} = \Theta(n^2)$ potential pairwise interactions: contradictions, shadowing, ordering effects. If validating a new rule means checking it against what is already there, adding rule $n+1$ costs $\Theta(n)$ and building the base from scratch costs
$$\sum_{k=1}^{n} \Theta(k) = \Theta(n^2).$$
Doubling the knowledge quadruples the work of keeping it consistent.

Both are the same complaint the intuition made: the upkeep, not the reasoning. And both point at the same exit. You cannot out-write $n^2$ by hiring more knowledge engineers; you have to get the rules from data instead of from people. That exit is machine learning, and it took another twenty-five years to become affordable.

## Recall
type: mcq
Q: Why did expert systems stall even though individual systems worked?
- [ ] The inference engines were too slow for real problems — hardware speed was not the binding constraint; rule bases were small by modern standards.
- [x] The cost of writing and reconciling rules grew faster than the knowledge did — roughly $n^2$ interactions for $n$ rules, all of it hand-checked.
- [ ] They were provably unable to represent expert knowledge — rule bases did capture real expertise; MYCIN matched faculty diagnosticians.
