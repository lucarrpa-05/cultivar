---
id: math.probability.markov-chains.cuanto-vale-un-pase
topic: math.probability.markov-chains
topics: [sports.football-analytics.possession-value]
format: callback
difficulty: 3
language: es
weight: medium
angles: [connection, practical, tool]
tags: [valor-de-posesion, cadena-absorbente, futbol, vaep, pases]
hook: "Si una posesión es una cadena de Markov, un pase no vale por bonito: vale por cuánto mueve la probabilidad de gol."
callback: {from: math.probability.markov-chains, to: sports.football-analytics.possession-value}
sources:
  - {title: "Actions Speak Louder Than Goals: Valuing Player Actions in Soccer", author: "Decroos, Bransen, Van Haaren and Davis", year: 2019, type: paper, url: "https://arxiv.org/abs/1802.07127"}
  - {title: "Absorbing Markov chain", type: wiki, url: "https://en.wikipedia.org/wiki/Absorbing_Markov_chain"}
  - {title: "Expected goals", type: wiki, url: "https://en.wikipedia.org/wiki/Expected_goals"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "La matriz canónica tenía una sola barra donde va el salto de fila, así que se renderizaba en una línea."}
---

# ¿Te acuerdas de la cadena que olvida dónde empezó? Un pase es un paso

Una cadena de Markov solo necesita saber dónde está ahora. Una posesión de fútbol se parece muchísimo a eso: dónde está el balón, quién lo tiene, con qué presión encima. De dónde venía importa bastante menos de lo que cuenta la narración.

Modelas entonces la posesión como una cadena con dos estados absorbentes: gol, o pérdida. Cada zona de la cancha se vuelve un estado ordinario, y cada acción —pase, conducción, centro— una transición entre estados.

Y ahora sale gratis lo importante. El **valor** de un estado es la probabilidad de terminar en gol antes de perder el balón, empezando ahí. El valor de una acción es la resta: valor del estado nuevo menos valor del estado viejo. Un pase hacia atrás que abre la cancha puede valer más que un centro espectacular que baja la probabilidad de gol.

Es la misma cuenta del ranking de páginas, con la cancha en lugar de la web, y con absorción en lugar de teletransporte.

## Rigor

Ordena los estados como transitorios $T$ (zonas, situaciones) y absorbentes $\{\text{gol},\text{pérdida}\}$, y escribe la matriz en forma canónica
$$P=\begin{pmatrix} Q & R\\ 0 & I\end{pmatrix},$$
con $Q$ las transiciones entre estados transitorios y $R$ las que absorben.

**Probabilidad de absorción.** Como $Q^{k}\to 0$ (desde cualquier estado transitorio se acaba absorbiendo con probabilidad 1), la matriz fundamental $N=(I-Q)^{-1}=\sum_{k\ge0}Q^{k}$ converge, y
$$B=NR$$
da, en la columna del gol, el vector $v$ de **valor de posesión**: $v_i=P(\text{gol antes de pérdida}\mid \text{estado } i)$. Equivalentemente $v$ resuelve $v=Qv+r_{\text{gol}}$: una ecuación de Bellman sin descuento.

**Valor de una acción.** Si la acción lleva de $i$ a $j$, su aporte es $v_j-v_i$; si termina en pérdida, es $0-v_i$, un castigo proporcional a lo que se desperdició. Sumar esos incrementos por jugador a lo largo de una temporada es exactamente lo que hacen los marcos tipo VAEP.

**Dónde falla.** El supuesto de Markov es fuerte: la fatiga, el marcador y la estructura defensiva sí dependen de la historia. Por eso los modelos serios llenan el estado con contexto (tiempo, diferencia de goles, posiciones) en vez de creer que la zona basta.

## Recall
type: mcq
Q: En este modelo, ¿qué es exactamente el valor de una zona de la cancha?
- [x] La probabilidad de terminar la posesión en gol antes de perderla, empezando desde ahí — una probabilidad de absorción, calculada con $(I-Q)^{-1}R$.
- [ ] El promedio de goles marcados históricamente desde esa zona — eso ignora que muchas posesiones pasan por la zona sin terminar ahí.
- [ ] El xG del remate más probable desde esa zona — el xG valora remates; aquí se valora el estado antes de rematar.
- [ ] El número esperado de pases hasta el gol — eso es el tiempo de absorción, que sale de $N\mathbf{1}$, no la probabilidad.
