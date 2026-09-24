---
id: niche.games.puzzles.eight-perfect-shuffles
topic: niche.games.puzzles
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers]
tags: [faro-shuffle, permutation, orbits, cyclic-group, multiplicative-order, card-magic]
hook: "Cut a deck exactly in half and interleave it perfectly. Eight of these and every card is home. The other perfect shuffle takes 52."
prerequisites: [math.algebra.group-actions]
callback: {from: math.algebra.group-actions, to: niche.games.puzzles}
sources:
  - {title: "Faro shuffle", type: wiki, url: "https://en.wikipedia.org/wiki/Faro_shuffle"}
  - {title: "The mathematics of perfect shuffles", author: "Persi Diaconis, R. L. Graham and William M. Kantor", year: 1983, type: paper, url: "https://doi.org/10.1016/0196-8858(83)90009-X"}
dates: {written: 2026-09-23}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "First sentence rewritten so it no longer repeats the title's 'Remember group actions?'; still names the earlier idea. Out-shuffle map, order 8, orbit sizes (1+1+2+6x8) and the in-shuffle claims checked."}
---

# Remember group actions? Eight perfect shuffles put the deck back

The orbits of a group action are hiding in a magician's deck. A deck is a set of 52 positions, and a perfect shuffle is a permutation of it.

Cut the deck exactly in half and interleave the halves card by card, keeping the top card on top. Magicians call it an out-shuffle, and eight in a row restore the deck exactly. Nothing is random: one shuffle generates a cyclic group acting on the positions, and its orbits tell the story. The top and bottom cards never move, the 18th and 35th cards swap every time, and the other 48 travel in six loops of eight.

Why eight? Because $2^8 = 256$, one more than a multiple of 51.

## Rigor

Here is where 51 comes from. Number the positions $0, 1, \dots, 51$ from the top. An out-shuffle sends the card at position $k \le 25$ to $2k$, and the card at position $26 + j$ to $2j + 1$. Both cases say

$$\sigma(k) \equiv 2k \pmod{51} \quad (0 \le k \le 50), \qquad \sigma(51) = 51.$$

So $\sigma^m(k) \equiv 2^m k$, and $\sigma^m$ is the identity exactly when $2^m \equiv 1 \pmod{51}$. The order of 2 modulo 51 divides $\varphi(51) = 32$; since $2^4 = 16 \not\equiv 1$ and $256 = 5 \cdot 51 + 1$, it is 8. So $\langle \sigma \rangle \cong \mathbb{Z}/8$.

The orbits of $\langle\sigma\rangle$ are the cycles of $\sigma$, and the orbit of $k$ has size equal to the order of 2 modulo $51/\gcd(k, 51)$:

- $k = 0$, and position 51: fixed.
- $\gcd = 17$ ($k = 17, 34$): the order of 2 mod 3 is 2, the swapping pair.
- $\gcd = 1$ or $3$: the order of 2 mod 51 and mod 17 is 8 either way, giving six 8-cycles.

That is $1 + 1 + 2 + 6 \cdot 8 = 52$, and every orbit size divides $|\langle\sigma\rangle| = 8$, as orbit–stabilizer demands.

The in-shuffle, which moves the top card to second place, is $k \mapsto 2k \bmod 53$ on positions $1, \dots, 52$. Two has order 52 modulo the prime 53, so a single orbit holds every card: 52 shuffles to come home, and after 26 the deck is exactly reversed.

## Recall
type: mcq
Q: How many perfect out-shuffles bring an $n$-card deck ($n$ even) back to its starting order?
- [x] The order of 2 modulo $n-1$ — each shuffle doubles every position mod $n-1$, so you need $2^m \equiv 1$.
- [ ] $n/2$, one per pair of cards — plausible, but it predicts 26 for a standard deck instead of 8.
- [ ] The number of orbits — every loop must close at once, which takes the lcm of the orbit sizes, not their count: 52 cards give 9 orbits but order 8.
