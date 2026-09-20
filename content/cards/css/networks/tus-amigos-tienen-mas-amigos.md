---
id: css.networks.degree-distributions.tus-amigos-tienen-mas-amigos
topic: css.networks.degree-distributions
format: idea
difficulty: 2
language: es
weight: medium
angles: [paradox, numbers, practical]
tags: [paradoja-de-la-amistad, feld, grado, sesgo-de-muestreo, varianza]
hook: "No es inseguridad tuya: en casi cualquier red, el amigo promedio es más popular que tú."
sources:
  - {title: "Why Your Friends Have More Friends Than You Do", author: "Scott L. Feld", year: 1991, type: paper, url: "https://doi.org/10.1086/229693"}
  - {title: "Friendship paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Friendship_paradox"}
  - {title: "Social Network Sensors for Early Detection of Contagious Outbreaks", author: "Nicholas A. Christakis and James H. Fowler", year: 2010, type: paper, url: "https://doi.org/10.1371/journal.pone.0012948"}
dates: {written: 2026-09-19, event: 1991-05-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "'Semanas antes' era impreciso: Christakis y Fowler miden 13,9 dias de adelanto del grupo de amigos."}
author: author-css-1
---

# Tus amigos tienen más amigos que tú, y no es culpa tuya

Scott Feld lo publicó en 1991 con un título que es el resultado entero: casi todo el mundo tiene menos amigos que el promedio de sus amigos. No es una tragedia personal ni un sesgo cognitivo. Es aritmética, y pasa en prácticamente cualquier red real.

La razón es de muestreo. Cuando uno mira "a los amigos", no está tomando personas al azar: está tomando personas al azar *a través de una amistad*. Y alguien con cuarenta amigos aparece en cuarenta de esas listas, mientras que el que tiene dos aparece en dos. Los populares están sobrerrepresentados en el muestreo, por construcción. El promedio se corre hacia arriba sin que nadie mienta.

Lo bonito es que se puede usar. Para vigilar una epidemia sin datos de la red, basta pedirle a gente al azar que nombre a un amigo y vigilar a los amigos: uno ya está muestreando el centro. Christakis y Fowler lo hicieron en Harvard durante la gripe H1N1 de 2009: la epidemia llegó al grupo de amigos 13,9 días antes que al grupo aleatorio.

El tamaño exacto del sesgo sale en una línea.

## Rigor

Sea $G$ una red con grados $k_1,\dots,k_n$, media $\mu$ y varianza $\sigma^2$. Si se escoge una persona al azar, su grado esperado es $\mu$. Si se escoge una *arista* al azar y se mira uno de sus extremos, la probabilidad de caer en el nodo $i$ es proporcional a $k_i$:
$$P(i)=\frac{k_i}{\sum_j k_j}=\frac{k_i}{n\mu}.$$
Entonces el grado esperado de ese amigo es
$$\mathbb{E}[k_{\text{amigo}}]=\sum_i \frac{k_i}{n\mu}\,k_i=\frac{\mathbb{E}[k^2]}{\mu}=\mu+\frac{\sigma^2}{\mu}.$$

El exceso es exactamente $\sigma^2/\mu$, así que la paradoja desaparece solo si todos tienen el mismo número de amigos. Cualquier dispersión la enciende, y en redes de cola pesada —donde $\sigma^2$ es enorme— el exceso es brutal.

El mismo sesgo aparece disfrazado en otros lados: el tamaño promedio de la clase que viven los estudiantes es mayor que el promedio que reporta la universidad; el bus que uno toma va más lleno que el bus promedio. Muestrear proporcional al tamaño es el error, y $\sigma^2/\mu$ es su precio.

## Recall
type: mcq
Q: ¿Cuándo desaparece la paradoja de la amistad?
- [x] Solo cuando todos tienen exactamente el mismo grado — el exceso es $\sigma^2/\mu$, y se anula únicamente si la varianza es cero.
- [ ] Cuando la red es pequeña — el resultado no depende del tamaño, sino de la dispersión de los grados.
- [ ] Cuando las amistades son recíprocas — el cálculo de Feld ya supone una red no dirigida, con amistades mutuas.
