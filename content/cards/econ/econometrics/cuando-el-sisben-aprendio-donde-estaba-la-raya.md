---
id: econ.econometrics.rdd.cuando-el-sisben-aprendio-donde-estaba-la-raya
topic: econ.econometrics.rdd
topics: [econ.macro.development]
format: story
difficulty: 3
language: es
weight: medium
angles: [mistake, practical]
tags: [sisben, manipulacion, test-de-mccrary, densidad, focalizacion]
hook: "El día en que los alcaldes conocieron la fórmula del Sisbén, la pobreza colombiana cambió de forma justo en el umbral."
sources:
  - {title: "Manipulation of Social Program Eligibility", author: "Adriana Camacho & Emily Conover", year: 2011, type: paper, url: "https://doi.org/10.1257/pol.3.2.41"}
  - {title: "Manipulation of the running variable in the regression discontinuity design: A density test", author: "Justin McCrary", year: 2008, type: paper, url: "https://doi.org/10.1016/j.jeconom.2007.05.005"}
  - {title: "Regression discontinuity design — manipulation and the density test", type: wiki, url: "https://en.wikipedia.org/wiki/Regression_discontinuity_design"}
dates: {written: 2026-09-19, event: 2011-05-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Cuando el Sisbén aprendió dónde estaba la raya

El Sisbén le pone un puntaje a cada hogar colombiano, y por debajo de cierto número aparecen el régimen subsidiado de salud y una fila de programas sociales. Un número, un umbral, una vida distinta a cada lado.

Adriana Camacho y Emily Conover (2011) hicieron algo sencillo: graficaron la distribución de esos puntajes. Encontraron dos cosas feas. Primero, que algunos políticos locales acomodaban las encuestas alrededor de las elecciones. Segundo, que cuando el algoritmo se compartió con las autoridades municipales apareció un salto abrupto justo en el umbral: demasiados hogares quedaron "justo pobres". El salto crece donde la elección estaba más reñida.

Para un economista aplicado la noticia es doble: hay corrupción y, de paso, se murió un diseño de investigación. Si alguien puede empujar el puntaje al otro lado de la raya, los hogares vecinos al corte dejan de ser comparables.

De ahí sale la prueba de McCrary (2008): mirar cuánta gente hay a cada lado. Si la densidad salta en el corte, alguien está clasificando, no el azar. La regla que fabrica el experimento también fabrica el incentivo para romperla.

## Recall
type: reveal
Q: ¿Por qué un salto en la *densidad* de puntajes en el corte arruina una regresión discontinua?
A: Porque el diseño se sostiene en que nadie controla su posición exacta alrededor del corte. Si hay un amontonamiento justo del lado elegible, quienes cruzaron lo hicieron por algo —influencia, información, un encuestador amable— y ese algo también afecta el resultado.
