---
id: math.probability.conditional-bayes.el-elo-es-bayes-en-logaritmos
topic: math.probability.conditional-bayes
topics: [sports.football-analytics.ratings-elo]
format: callback
difficulty: 2
language: es
weight: medium
angles: [connection, practical, tool]
tags: [elo, ranking-fifa, log-odds, actualizacion, ajedrez]
hook: "El puntaje Elo no mide fuerza: mide creencia. Y la actualización después de cada partido es un paso bayesiano."
callback: {from: math.probability.conditional-bayes, to: sports.football-analytics.ratings-elo}
sources:
  - {title: "Elo rating system", type: wiki, url: "https://en.wikipedia.org/wiki/Elo_rating_system"}
  - {title: "FIFA Men's World Ranking", type: wiki, url: "https://en.wikipedia.org/wiki/FIFA_Men%27s_World_Ranking"}
  - {title: "Sistema de puntuación Elo", type: wiki, url: "https://es.wikipedia.org/wiki/Sistema_de_puntuaci%C3%B3n_Elo"}
dates: {written: 2026-09-19, event: 2018-08-16}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# ¿Te acuerdas de multiplicar razones? Eso es el Elo

Bayes te dio una regla: las razones de probabilidad se multiplican, y en logaritmos se suman. El Elo es esa suma, con un nombre deportivo y una escala arbitraria.

Un puntaje Elo no es una medida de fuerza absoluta. Es una posición en una escala de logaritmo de razones: una diferencia de 400 puntos significa exactamente que uno gana diez veces más seguido que el otro. Doscientos puntos, unas tres veces. Cero puntos, apuesta pareja. Toda la información está en la diferencia, nunca en el número solo.

Y la actualización tiene la forma que ya reconoces. Después del partido, tu puntaje se mueve en proporción a la sorpresa: ganarle al favorito te sube mucho, ganarle al último te sube casi nada. Es evidencia pesada por lo improbable que era.

La FIFA lo entendió tarde: su ranking masculino usa este esquema solo desde el 16 de agosto de 2018. Antes, los puntos eran un promedio con reglas ad hoc.

## Rigor

**El modelo.** La probabilidad de que $A$ le gane a $B$ es
$$E_A=\frac{1}{1+10^{-(R_A-R_B)/400}}=\sigma\!\left(\frac{\ln 10}{400}(R_A-R_B)\right),$$
con $\sigma$ la función logística. Despejando,
$$\log\frac{E_A}{1-E_A}=\frac{\ln 10}{400}\,(R_A-R_B),$$
así que **el puntaje es log-odds reescalado**: 400 puntos equivalen a un factor 10 en la razón de probabilidades, es decir unos 3,3 bits de evidencia.

**La actualización es un gradiente.** Con resultado $S\in\{0,\tfrac12,1\}$, la log-verosimilitud de Bernoulli es $\ell=S\log E_A+(1-S)\log(1-E_A)$, y
$$\frac{\partial \ell}{\partial R_A}=\frac{\ln 10}{400}\,(S-E_A).$$
La regla de Elo, $R_A'=R_A+K(S-E_A)$, es exactamente un paso de ascenso de gradiente sobre la verosimilitud, con tasa fija $K$ (la FIFA usa un coeficiente $I$ entre 5 y 60 según la importancia del partido).

**Dónde deja de ser bayesiano.** Un posterior verdadero arrastra una *incertidumbre*, y el Elo no: un jugador con tres partidos y uno con trescientos se mueven igual. Glicko y TrueSkill arreglan justo eso, guardando media y varianza y haciendo que $K$ se encoja a medida que la creencia se afina.

## Recall
type: mcq
Q: ¿Qué significa exactamente una diferencia de 400 puntos Elo?
- [x] Que el favorito gana unas 10 veces por cada victoria del otro — la escala es logarítmica en la razón de probabilidades, con 400 puntos por factor 10.
- [ ] Que el favorito gana el 400 % más de partidos — los porcentajes no se multiplican así; la escala es de razones, no de porcentajes.
- [ ] Que el favorito gana siempre — 400 puntos dan cerca del 91 %, no del 100 %.
- [ ] Que el favorito tiene 400 puntos más de habilidad real — el puntaje solo tiene sentido como diferencia; el nivel absoluto es convención.
