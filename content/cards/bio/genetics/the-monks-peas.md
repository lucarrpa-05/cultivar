---
id: bio.genetics.mendel.the-monks-peas
topic: bio.genetics.mendel
format: series
difficulty: 1
language: en
weight: medium
angles: [mistake, connection]
tags: [mendel, blending-inheritance, jenkin, segregation, variance]
hook: "If inheritance blended like paint, natural selection would run out of material in ten generations. Darwin never learned why it does not."
series: {id: bio.evolution.precisely, index: 2, total: 5, title: "Evolution, precisely"}
sources:
  - {title: "Blending inheritance", type: wiki, url: "https://en.wikipedia.org/wiki/Blending_inheritance"}
  - {title: "Fleeming Jenkin", type: wiki, url: "https://en.wikipedia.org/wiki/Fleeming_Jenkin"}
  - {title: "Mendelian inheritance", type: wiki, url: "https://en.wikipedia.org/wiki/Mendelian_inheritance"}
  - {title: "Experiments on Plant Hybridization (Versuche über Pflanzen-Hybriden)", author: "Gregor Mendel", year: 1866, type: paper, url: "https://en.wikipedia.org/wiki/Experiments_on_Plant_Hybridization"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The monk's peas saved an argument Darwin never knew was broken

In 1867 a Scottish engineer named Fleeming Jenkin reviewed the *Origin* and pointed at a hole. Suppose inheritance blends, as nearly everyone then assumed, so that a child is the average of its parents. Then any new variant is halved every generation. After ten generations it is a thousandth of itself. Selection would arrive to find nothing left to select.

Darwin worried about this for the rest of his life. The answer had already been printed, in 1866, in the proceedings of a natural history society in Brünn, by an Augustinian friar counting peas.

Mendel's point is that inheritance is not paint. It is cards. Cross a tall plant with a short one and the offspring are tall, but they still hold the short card, unchanged, and a quarter of the *grand*children come out short again. Nothing is averaged. Nothing is diluted. Variation is stored, not blended away.

That repairs Darwin's third premise, and immediately raises a harder question: if transmission by itself changes nothing, what does a population of cards do when nobody is pushing it?

## Rigor

Blending, made precise. If an offspring's trait is $z_o=\tfrac12(z_m+z_f)$ with parents drawn independently from a population of variance $V$, then

$$\operatorname{Var}(z_o)=\tfrac14\left(V+V\right)=V/2 .$$

So $V_t = V_0\,2^{-t}$: variance dies exponentially. Selection consumes variance and blending manufactures none, which is why Jenkin's objection had teeth.

Particulate inheritance loses nothing. Mendel's law of segregation says a diploid parent carrying $A$ and $a$ puts one of them into each gamete, each with probability $\tfrac12$, and copies it exactly. His law of independent assortment adds that alleles at different loci are transmitted independently — true for loci on different chromosomes, and Mendel was lucky in his choice of traits.

The 3:1 ratio is then just two fair coins. The cross $Aa \times Aa$ gives $AA$, $Aa$, $aA$, $aa$ each with probability $\tfrac14$, and if $A$ is dominant, three of the four look identical. Across his seven traits Mendel counted 14,949 dominant to 5,010 recessive: 2.98 to 1.

Cards, not paint. Next: what a population of cards does when left alone.

## Recall
type: mcq
Q: Why would blending inheritance have destroyed Darwin's argument?
- [x] It halves the population's variance every generation, so novel variants fade away before selection can amplify them — no variation, no selection.
- [ ] It makes offspring identical to their parents, so nothing new ever appears — blending does the opposite: it averages away what is new.
- [ ] It prevents dominant traits from spreading — dominance is about how a genotype looks, not about whether a variant persists.
- [ ] It makes inheritance random rather than faithful — the problem is not noise, it is the systematic shrinkage of differences.
