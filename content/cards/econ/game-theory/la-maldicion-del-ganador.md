---
id: econ.game-theory.auctions.la-maldicion-del-ganador
topic: econ.game-theory.auctions
format: idea
difficulty: 3
language: es
weight: medium
angles: [paradox, practical]
tags: [maldicion-del-ganador, valor-comun, subastas, petroleo]
hook: "Si ganó la subasta, su estimación era la más optimista de la sala. Eso casi nunca es una buena noticia."
sources:
  - {title: "Winner's curse", type: wiki, url: "https://en.wikipedia.org/wiki/Winner%27s_curse"}
  - {title: "Subasta", type: wiki, url: "https://es.wikipedia.org/wiki/Subasta"}
  - {title: "Competitive bidding in high-risk situations, Journal of Petroleum Technology 23(6)", author: "Capen, Clapp & Campbell", year: 1971, type: paper, url: "https://doi.org/10.2118/2993-PA"}
dates: {written: 2026-09-19, event: 1971-06-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Corrected casi duplica: going from 3 to 20 bidders multiplies the required shading by about 1.65, not 2."}
---

# Ganar la subasta es la primera mala noticia

En 1971 tres ingenieros de Atlantic Richfield —Capen, Clapp y Campbell— publicaron una observación incómoda sobre las subastas de bloques petroleros: año tras año, las compañías que ganaban obtenían rentabilidades muy por debajo de lo previsto. No era mala suerte. Era la estructura de la subasta.

El bloque vale lo mismo para todos, pero nadie sabe cuánto: cada empresa tiene su propia estimación geológica, unas altas y otras bajas. Gana quien más ofrece, es decir, casi siempre quien más se equivocó hacia arriba. La victoria misma es información, y es mala información.

Eso es la maldición del ganador. La defensa no consiste en estimar mejor, sino en ofertar por debajo de la propia estimación, y hacerlo más cuantos más competidores haya: con veinte rivales el máximo de las estimaciones se aleja del valor real mucho más que con tres.

La misma lógica gobierna licitaciones de obra pública, fichajes de futbolistas y compras de empresas.

## Rigor

Todo depende de un condicionamiento que casi nadie hace. Sea $V$ el valor común desconocido y $x_i=V+\varepsilon_i$ la señal del postor $i$, con errores independientes de media cero. Entonces

$$\mathbb{E}[V\mid x_i]=x_i,$$

pero lo relevante para decidir es

$$\mathbb{E}\bigl[V\ \big|\ x_i,\ x_i=\max_j x_j\bigr]<x_i .$$

Condicionar en haber ganado selecciona justamente los casos en que $\varepsilon_i$ fue grande y positivo. Con $n$ señales independientes el sesgo del máximo crece con $n$: para errores normales de desviación $\sigma$ se tiene $\mathbb{E}[\max_j \varepsilon_j]\approx \sigma\sqrt{2\ln n}$, de modo que pasar de tres a veinte competidores multiplica por más de 1,6 la corrección necesaria.

En equilibrio, por tanto, no se oferta $\mathbb{E}[V\mid x_i]$ sino $\mathbb{E}[V\mid x_i,\ \text{gano}]$, siempre menor. Quien oferta su estimación sin corregir no está siendo agresivo: está siendo ingenuo, y gana precisamente las subastas que no quería ganar.

Contraste con la subasta de Vickrey: allí los valores son privados, ganar no informa nada sobre cuánto vale el objeto para usted, y decir la verdad es dominante. Aquí el valor es común y ganar sí informa. Dos mundos, estrategias opuestas.

## Recall
type: mcq
Q: ¿Por qué ganar una subasta de valor común es mala noticia?
- [x] Porque gana quien más sobreestimó — condicionar en la victoria selecciona la señal más optimista de la sala.
- [ ] Porque el precio pagado siempre supera el valor — no siempre; el problema es el sesgo esperado, no una pérdida garantizada.
- [ ] Porque los demás postores tienen mejor información — todos tienen señales igual de buenas; el sesgo nace de la selección.
