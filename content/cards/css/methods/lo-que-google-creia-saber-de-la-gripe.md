---
id: css.methods.digital-traces.lo-que-google-creia-saber-de-la-gripe
topic: css.methods.digital-traces
format: idea
difficulty: 1
language: es
weight: light
angles: [mistake, numbers, practical]
tags: [google-flu-trends, huellas-digitales, big-data, deriva, lazer]
hook: "Durante dos años Google se adelantó al CDC. Después sobreestimó la gripe en 100 de 108 semanas seguidas de medición."
sources:
  - {title: "The Parable of Google Flu: Traps in Big Data Analysis", author: "David Lazer, Ryan Kennedy, Gary King, Alessandro Vespignani", year: 2014, type: paper, url: "https://doi.org/10.1126/science.1248506"}
  - {title: "Google Flu Trends", type: wiki, url: "https://en.wikipedia.org/wiki/Google_Flu_Trends"}
dates: {written: 2026-09-19, event: 2014-03-14}
rigor: none
rigorNote: "tarjeta de entrada al área; la formalización de la deriva va en las tarjetas de métodos técnicos"
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "El gancho decia '100 semanas seguidas'; Lazer et al. reportan 100 de 108 semanas entre agosto 2011 y septiembre 2013."}
author: author-css-1
---

# Lo que Google creía saber de la gripe

La idea era preciosa: si uno tiene gripe, busca "fiebre" y "dolor de garganta" antes de ir al médico. Google Flu Trends correlacionó miles de millones de búsquedas con los reportes del CDC y durante un par de años anticipó la curva epidémica con una o dos semanas de ventaja, gratis.

Después se rompió. Entre agosto de 2011 y septiembre de 2013 sobreestimó la gripe en 100 de 108 semanas, y en la temporada 2012-13 reportó cerca del doble de lo real. Lazer, Kennedy, King y Vespignani lo diseccionaron en *Science* en 2014.

El diagnóstico tiene dos partes. Una es que el modelo correlacionaba palabras sin ninguna teoría: búsquedas de "baloncesto de secundaria" ayudaban a predecir la gripe porque ambas suben en invierno. La otra es más profunda: Google cambiaba su propio buscador —sugerencias, autocompletado, diagnósticos relacionados— y esos cambios alteraban las búsquedas que el modelo leía.

El instrumento y el fenómeno estaban acoplados. Ninguna huella digital es un termómetro neutral: siempre hay una empresa del otro lado, ajustando el termómetro sin avisar.

## Recall
type: mcq
Q: ¿Cuál fue la causa más profunda del fracaso de Google Flu Trends?
- [x] El instrumento se movía — Google cambiaba su propio buscador, y esos cambios alteraban las búsquedas que el modelo usaba como medida.
- [ ] Los datos eran demasiado pocos — eran miles de millones de búsquedas; el volumen nunca fue el problema.
- [ ] La gripe dejó de ser estacional — la temporada 2012-13 fue real y fuerte; lo que falló fue la medición, no la epidemia.
