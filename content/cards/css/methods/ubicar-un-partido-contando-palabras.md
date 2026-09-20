---
id: css.methods.computational-politics.ubicar-un-partido-contando-palabras
topic: css.methods.computational-politics
format: idea
difficulty: 2
language: es
weight: medium
angles: [tool, practical, numbers]
tags: [wordscores, wordfish, manifiestos, escalamiento, posiciones-politicas]
hook: "¿Dónde queda un partido en el eje izquierda-derecha? Hay una respuesta que solo cuenta palabras."
sources:
  - {title: "Extracting Policy Positions from Political Texts Using Words as Data", author: "Michael Laver, Kenneth Benoit and John Garry", year: 2003, type: paper, url: "https://kenbenoit.net/pdfs/WORDSCORESAPSR.pdf"}
  - {title: "A Scaling Model for Estimating Time-Series Party Positions from Texts", author: "Jonathan B. Slapin and Sven-Oliver Proksch", year: 2008, type: paper, url: "https://doi.org/10.1111/j.1540-5907.2008.00338.x"}
  - {title: "Manifesto Project Database", type: wiki, url: "https://en.wikipedia.org/wiki/Manifesto_Project_Database"}
  - {title: "Content analysis", type: wiki, url: "https://en.wikipedia.org/wiki/Content_analysis"}
dates: {written: 2026-09-19, event: 2003-05-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Se anadio la fuente de Wordscores (Laver, Benoit y Garry 2003), que el cuerpo citaba sin respaldo."}
author: author-css-1
---

# Ubicar un partido en el eje izquierda-derecha contando palabras

Los politólogos llevan décadas peleando por lo mismo: ¿qué tan a la izquierda está un partido, y cuánto se movió entre una elección y otra? Las encuestas a expertos son caras, llegan tarde y miden reputaciones. Los manifiestos, en cambio, están escritos, fechados y completos.

Laver, Benoit y Garry propusieron en 2003 tratarlos como datos. Se toman unos pocos textos de referencia cuya posición uno ya conoce —por encuesta de expertos o por consenso histórico—, se calcula qué tan característica es cada palabra de cada extremo, y con eso se puntúa cualquier texto nuevo. Es un clasificador, pero devuelve un número en una escala continua en vez de una etiqueta. Lo llamaron Wordscores.

Slapin y Proksch dieron el paso siguiente en 2008 con Wordfish: nada de textos de referencia. Se supone que las frecuencias de palabras dependen de una posición latente y se estima todo a la vez, lo que permite series de tiempo comparables.

Ambos comparten un supuesto que conviene decir en voz alta.

## Rigor

Wordfish modela el conteo de la palabra $j$ en el texto $i$ como
$$y_{ij}\sim \text{Poisson}(\lambda_{ij}),\qquad \log\lambda_{ij}=\alpha_i+\psi_j+\beta_j\,\omega_i,$$
donde $\alpha_i$ absorbe la longitud del documento, $\psi_j$ la frecuencia general de la palabra, $\omega_i$ es la posición latente del texto y $\beta_j$ mide cuánto discrimina esa palabra. Se estima por máxima verosimilitud y se fija la escala normalizando $\omega$.

El supuesto fuerte es que existe *una* dimensión y que el vocabulario la refleja de manera estable. Tres maneras de romperlo, todas comunes. Primera: si el debate cambia de tema —de economía a migración— el modelo mezcla dos dimensiones en un solo eje y el movimiento aparente de un partido puede ser un cambio de agenda. Segunda: las palabras cambian de connotación con el tiempo, así que una serie larga compara escalas distintas. Tercera: el resultado no tiene unidades; $\omega$ solo es interpretable frente a otros textos del mismo corpus.

Por eso el paso obligatorio es el mismo de siempre: mirar cuáles palabras cargan más en $\beta_j$ y comprobar que sean las que uno esperaría. Si el eje lo definen tecnicismos administrativos, el modelo encontró algo, pero no era ideología.

## Recall
type: mcq
Q: ¿Cuál es el supuesto central de los modelos de escalamiento tipo Wordfish?
- [x] Que existe una sola dimensión latente y que el vocabulario la refleja de forma estable — si cambia la agenda, el eje mezcla dos cosas distintas.
- [ ] Que los partidos dicen la verdad en sus manifiestos — el modelo mide posiciones declaradas, y eso es explícito desde el principio.
- [ ] Que hace falta un conjunto de textos de referencia — eso es Wordscores; Wordfish estima la escala sin anclas externas.
