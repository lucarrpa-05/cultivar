---
id: ai.ml-basics.dimensionality-reduction.los-mapas-de-tsne-mienten
topic: ai.ml-basics.dimensionality-reduction
format: idea
difficulty: 3
language: es
weight: medium
angles: [mistake, practical]
tags: [tsne, visualizacion, divergencia-kl, perplejidad, vecindad-local]
hook: "El tamaño de los grupos no significa nada. La distancia entre grupos tampoco. Algo sí significa, y conviene saber qué."
related: [ai.ml-basics.dimensionality-reduction.pca-is-the-svd]
sources:
  - {title: "How to Use t-SNE Effectively", author: "Wattenberg, Viégas & Johnson", year: 2016, type: article, url: "https://distill.pub/2016/misread-tsne/"}
  - {title: "Visualizing Data using t-SNE", author: "Laurens van der Maaten & Geoffrey Hinton", year: 2008, type: paper, url: "https://www.jmlr.org/papers/v9/vandermaaten08a.html"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Los mapas de t-SNE mienten, y mienten de forma predecible

Uno proyecta sus datos a dos dimensiones con t-SNE, aparecen cinco islas limpias y siente que entendió algo. A veces sí. Con bastante frecuencia lo que está viendo es un artefacto del algoritmo.

Wattenberg, Viégas y Johnson lo mostraron en 2016 corriendo t-SNE sobre figuras cuya estructura ya se conocía. Los tamaños relativos de los grupos no son informativos: el método infla las nubes densas y comprime las dispersas hasta dejarlas del mismo porte. Las distancias entre grupos tampoco: dos islas lejanas en el mapa no son necesariamente más distintas que dos vecinas. Y con una perplejidad mal elegida aparecen grupos nítidos donde solo había ruido uniforme.

Lo que sí sobrevive casi siempre es la *vecindad local*: quién está cerca de quién. Para eso, y solo para eso, fue diseñado.

La asimetría de una divergencia explica cada una de esas mentiras.

## Rigor

t-SNE convierte distancias en probabilidades. En el espacio original define $p_{j\mid i}$ con un núcleo gaussiano de ancho $\sigma_i$, ajustado para que cada punto alcance una perplejidad fija, y simetriza $p_{ij}=(p_{j\mid i}+p_{i\mid j})/2n$. En el mapa usa una $t$ de Student con un grado de libertad,

$$q_{ij}=\frac{\big(1+\|y_i-y_j\|^{2}\big)^{-1}}{\sum_{k\neq l}\big(1+\|y_k-y_l\|^{2}\big)^{-1}},$$

y minimiza $\mathrm{KL}(P\,\|\,Q)=\sum_{i\neq j}p_{ij}\log\frac{p_{ij}}{q_{ij}}$ por descenso de gradiente.

Ahí está todo. La divergencia es asimétrica: poner $q_{ij}$ pequeño cuando $p_{ij}$ es grande —separar vecinos— cuesta carísimo, mientras que poner $q_{ij}$ grande cuando $p_{ij}$ es diminuto —juntar extraños— casi no cuesta. El objetivo protege la vecindad local y le da lo mismo la geometría global; por eso la distancia entre islas no es interpretable.

El $\sigma_i$ por punto produce la segunda mentira: se calibra según la densidad, así que una nube dispersa y una apretada terminan ocupando lo mismo. Y como la solución depende de la inicialización, dos corridas dan dos mapas. Un mapa de t-SNE es una hipótesis, no una medición.

## Recall
type: mcq
Q: En un mapa de t-SNE hay dos grupos muy separados. ¿Qué se puede concluir?
- [x] Que los puntos dentro de cada grupo son vecinos entre sí — la vecindad local es lo único que el objetivo protege.
- [ ] Que los dos grupos son muy distintos entre sí — la divergencia KL casi no penaliza alejar puntos que ya estaban lejos, así que esa distancia no mide nada.
- [ ] Que un grupo es mayor que el otro si ocupa más espacio — los anchos se calibran por densidad, de modo que el tamaño en el mapa no refleja el real.
