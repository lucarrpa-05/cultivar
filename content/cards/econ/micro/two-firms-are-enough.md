---
id: econ.micro.market-structures.two-firms-are-enough
topic: econ.micro.market-structures
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, feud]
tags: [bertrand, cournot, oligopoly, markup, lerner-index]
hook: "With two firms setting prices, theory says the monopoly profit vanishes completely. Nobody believes it, and the reasons why are the field."
sources:
  - {title: "Bertrand competition — the paradox and its resolutions", type: wiki, url: "https://en.wikipedia.org/wiki/Bertrand_competition"}
  - {title: "Cournot competition", type: wiki, url: "https://en.wikipedia.org/wiki/Cournot_competition"}
  - {title: "Recherches sur les principes mathématiques de la théorie des richesses", author: "Antoine Augustin Cournot", year: 1838, type: book, url: "https://en.wikipedia.org/wiki/Antoine_Augustin_Cournot"}
dates: {written: 2026-09-19, event: 1883-09-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two firms are enough to destroy a monopoly, on paper

Antoine Cournot worked out duopoly in 1838 by having firms choose *quantities*: each picks output taking the other's as given, the price lands above cost, and the markup shrinks as more firms enter. Sensible, gradual, matches intuition.

In 1883 Joseph Bertrand reviewed the book and objected that firms do not choose quantities, they post prices. Redo it that way and the gradualism collapses. If my rival prices above cost, I undercut by a cent and take the whole market. So does he. The only resting point is price equal to marginal cost — with *two* firms you already get the competitive outcome, and profits are zero.

That is the Bertrand paradox, and its value is that it is obviously false. Duopolists make money. So the assumptions must be doing the damage: unlimited capacity to serve the whole market, identical products, one-shot interaction, no search costs.

Each repair is a branch of industrial organisation, and each predicts a different markup.

## Rigor

**Bertrand.** Homogeneous good, constant marginal cost $c$, firms post $p_1,p_2$, consumers buy from the cheaper. The unique Nash equilibrium is $p_1=p_2=c$: at any common $p>c$ a firm gains by cutting to $p-\varepsilon$ and capturing the whole market, and no firm prices below $c$.

**Cournot.** With linear demand $p=a-bQ$, $n$ symmetric firms and marginal cost $c$, each firm's best response to the others' total gives the symmetric equilibrium

$$q^*=\frac{a-c}{b(n+1)},\qquad p^*=\frac{a+nc}{n+1},\qquad \frac{p^*-c}{p^*}=\frac{1}{n\,\varepsilon},$$

with $\varepsilon$ the market demand elasticity. The markup falls like $1/n$ and reaches zero only in the limit — two firms are not enough here.

Same firms, same costs, opposite predictions, and the only difference is the strategic variable. Kreps and Scheinkman's resolution is the satisfying one: choose capacity first, then prices, and the outcome is Cournot's.

## Recall
type: mcq
Q: Why do quantity competition and price competition give such different answers with two firms?
- [x] Undercutting a price steals the whole market, while adding output only shifts the market price a little — so the deviation payoff is discontinuous in one case and smooth in the other. — the strategic variable decides how brutal deviation is.
- [ ] Because Cournot firms collude and Bertrand firms do not. — neither model has collusion; both are one-shot Nash equilibria.
- [ ] Because Bertrand assumes more firms than Cournot. — both are stated for the same number of firms, which is precisely the puzzle.
- [ ] Because Cournot firms face downward-sloping demand and Bertrand firms do not. — market demand is downward-sloping in both; what differs is the demand faced by a deviator.
