---
id: math.probability.markov-chains.el-mensaje-de-la-carcel
topic: math.probability.markov-chains
format: story
difficulty: 3
language: es
weight: medium
angles: [human, tool, practical]
tags: [mcmc, metropolis, criptografia, sustitucion, balance-detallado]
hook: "Un psicólogo llevó a Stanford mensajes cifrados de presos. Una cadena de Markov que solo sabía qué letra sigue a cuál los descifró."
related: [math.probability.markov-chains.markov-counted-pushkins-vowels, math.probability.markov-chains.where-a-chain-forgets-where-it-started]
sources:
  - {title: "The Markov chain Monte Carlo revolution", author: "Persi Diaconis", year: 2009, type: paper, url: "https://doi.org/10.1090/S0273-0979-08-01238-X"}
  - {title: "Equation of State Calculations by Fast Computing Machines", author: "Metropolis, Rosenbluth, Rosenbluth, Teller y Teller", year: 1953, type: paper, url: "https://doi.org/10.1063/1.1699114"}
  - {title: "Algoritmo Metropolis-Hastings", type: wiki, url: "https://es.wikipedia.org/wiki/Algoritmo_Metropolis-Hastings"}
dates: {written: 2026-09-23, event: 2009-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "checked against Diaconis (2009). 'A few thousand steps' was his Hamlet test, not the prison text, so now said as such. War and Peace is only his 'e.g.', so hedged in body and hook. Cut 'most of its time near the mode' (he says only that the algorithm finds the mode). Fixed 'las unas 40! claves'. New title (was a list, not a hook)."}
---

# Una cadena de Markov descifró los mensajes de unos presos

Un psicólogo de prisiones llegó al servicio de consultoría estadística de Stanford con mensajes cifrados entre presos. Marc Coram, estudiante, supuso una sustitución simple: cada símbolo, una letra.

Había unas $40!$ claves. Coram contó en un texto largo (Diaconis cita *Guerra y paz*) cuánto sigue cada letra a cada otra, y soltó una cadena de Markov sobre las claves: intercambia dos letras al azar, acepta si el texto suena más a idioma, y a veces acepta aunque suene peor.

Con *Hamlet* revuelto, de prueba, bastaron dos mil pasos. El mensaje salió en inglés, español y jerga carcelaria. Diaconis lo contó en 2009.

El truco invierte la pregunta: no preguntas dónde se asienta una cadena, eliges dónde quieres que se asiente.

## Rigor

Sea $M(x,y)$ la frecuencia con que la letra $y$ sigue a $x$ en el texto de referencia, y para una clave $f$ y el mensaje $s_1s_2\cdots$ define la **plausibilidad**
$$\mathrm{Pl}(f)=\prod_i M\big(f(s_i),f(s_{i+1})\big).$$

**Metropolis (1953).** Desde $f$, propón $f^*$ intercambiando los valores de dos símbolos elegidos al azar (propuesta simétrica, $q(f,f^*)=q(f^*,f)$). Acepta con probabilidad $\min\{1,\mathrm{Pl}(f^*)/\mathrm{Pl}(f)\}$; si no, quédate en $f$.

**Por qué funciona: balance detallado.** Sea $\pi(f)\propto\mathrm{Pl}(f)$. Para $f\ne f^*$,
$$\pi(f)\,K(f,f^*)=q\,\min\{\pi(f),\pi(f^*)\}=\pi(f^*)\,K(f^*,f),$$
que es simétrico. Sumando sobre $f$ se obtiene $\pi K=\pi$: la cadena tiene como distribución estacionaria exactamente la plausibilidad normalizada, sin calcular nunca la constante de normalización, que es una suma sobre todas las claves. Es el problema inverso de la tarjeta sobre dónde una cadena olvida su origen: allí la cadena era dato y $\pi$ la incógnita; aquí $\pi$ es dato y la cadena se fabrica.

Diaconis añade que, con una distribución a priori uniforme sobre $f$, $\pi$ es la posterior bayesiana, y el algoritmo está hallando su moda.

## Recall
type: mcq
Q: ¿Por qué el algoritmo acepta a veces una clave que suena peor?
- [x] Para no quedarse atrapado en un máximo local — y justo esa regla hace que la distribución estacionaria sea proporcional a la plausibilidad.
- [ ] Por error de redondeo — no, la moneda con probabilidad $\mathrm{Pl}(f^*)/\mathrm{Pl}(f)$ es deliberada.
- [ ] Para converger a la clave exacta en un solo paso — la cadena explora; ninguna cadena de este tipo acierta en un paso.
