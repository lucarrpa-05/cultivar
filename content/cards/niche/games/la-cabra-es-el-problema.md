---
id: niche.games.puzzles.la-cabra-es-el-problema
topic: niche.games.puzzles
format: idea
difficulty: 1
language: es
weight: medium
angles: [tool, beautiful]
tags: [rio, lobo, cabra, repollo, grafo-de-estados, minimo]
hook: "Siete viajes, y no se puede en menos. El lobo y el repollo se aguantan; la que choca con todos es la cabra."
related: [niche.games.puzzles.el-paseo-de-la-cabra]
answersQuestion: q-2026-09-20-2pqi
sources:
  - {title: "Acertijo del lobo, la cabra y la col", type: wiki, url: "https://es.wikipedia.org/wiki/Acertijo_del_lobo,_la_cabra_y_la_col"}
  - {title: "Wolf, goat and cabbage problem", type: wiki, url: "https://en.wikipedia.org/wiki/Wolf,_goat_and_cabbage_problem"}
dates: {written: 2026-09-23}
diagram: {file: niche/cabra-estados.svg, caption: "Los diez estados seguros del cruce; cada línea es un viaje. Los dos caminos se separan en el tercer viaje (lobo o repollo) y se vuelven a juntar en el quinto: ambos miden siete.", alt: "Grafo vertical de estados del cruce, de todos a la izquierda a todos a la derecha, con siete viajes y una sola bifurcación: llevar el lobo o el repollo."}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Caption fixed: the branch rejoins after trip 5, not 'enseguida', and 'todo camino' overclaimed (back-and-forth paths are longer). Checked the 10 safe states, every diagram box, and the 7-trip lower bound."}
---

# La cabra va primero, se devuelve una vez y llega de última

Son siete viajes: llevas la cabra, vuelves solo, llevas el lobo, te devuelves con la cabra, llevas el repollo, vuelves solo y llevas la cabra. Si cambias lobo por repollo, sale la otra solución.

La clave es ver quién es el problema. El lobo y el repollo pueden quedarse juntos sin drama; la cabra no puede quedarse sola con ninguno de los dos. Por eso tiene que viajar en el primer cruce y también en el último. Y si cruza al principio y al final, en algún momento tiene que devolverse. Ese regreso, que parece un paso atrás, es obligatorio.

¿Por qué no alcanza con menos de siete? Porque los viajes de la cabra ya fijan la cuenta.

## Rigor

Contemos. El primer viaje tiene que llevar la cabra: si llevas el lobo, la cabra se come el repollo; si llevas el repollo, el lobo se come la cabra; si vas solo, pasan las dos cosas.

El último viaje también. Justo antes de él, dos cosas esperan solas en la orilla de llegada, sin el campesino. Esa pareja no puede incluir a la cabra, así que son el lobo y el repollo, y lo que viaja al final es la cabra. (Un último viaje vacío tampoco sirve: dejaría las tres cosas solas del otro lado.)

Si la cabra va en el primer viaje de ida y en el último, entre ambos tuvo que volver: hace al menos dos idas. El lobo y el repollo hacen al menos una ida cada uno. En cada ida cabe una sola cosa, así que hay al menos $2 + 1 + 1 = 4$ idas. Los viajes alternan ida y vuelta, empezando y terminando con ida, de modo que

$$\text{viajes} = 2\cdot(\text{idas}) - 1 \ge 7.$$

El diagrama muestra lo demás. De los 16 estados posibles (de qué lado está cada uno), solo 10 son seguros, y el único desvío es escoger lobo o repollo en el tercer viaje. Por eso hay exactamente dos soluciones de siete viajes.

## Recall
type: reveal
Q: Cambia una regla: ahora el lobo también se come el repollo. ¿Cuántos viajes hacen falta?
A: Ninguna cantidad alcanza. El primer viaje deja dos cosas solas en la orilla de partida, y ahora cualquier pareja se pelea. El acertijo original funciona porque solo la cabra choca con todos.
