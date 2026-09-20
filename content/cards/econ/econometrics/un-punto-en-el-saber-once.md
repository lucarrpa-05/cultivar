---
id: econ.econometrics.rdd.un-punto-en-el-saber-once
topic: econ.econometrics.rdd
format: idea
difficulty: 3
language: es
weight: heavy
angles: [tool, practical]
tags: [regresion-discontinua, ser-pilo-paga, saber-11, sisben, colombia]
hook: "Dos estudiantes separados por un punto en el Saber 11. Uno recibió beca completa y el otro no, y esa arbitrariedad es un experimento."
diagram: {file: econ/rdd-salto-en-el-corte.svg, caption: "A cada lado del corte se ajusta una recta local; la distancia vertical entre las dos en el corte es la estimación.", alt: "Nube de puntos que sube con el puntaje, cortada por una línea vertical; a la derecha del corte la nube salta hacia arriba y dos rectas locales marcan la distancia"}
sources:
  - {title: "Upstream and Downstream Impacts of College Merit-Based Financial Aid for Low-Income Students: Ser Pilo Paga in Colombia", author: "Juliana Londoño-Vélez, Catherine Rodríguez & Fabio Sánchez", year: 2020, type: paper, url: "https://doi.org/10.1257/pol.20180131"}
  - {title: "Juliana Londoño-Vélez — página de investigación con el resumen del artículo", type: primary, url: "https://sites.google.com/site/julianalondonovelez/research"}
  - {title: "Regression discontinuity design", type: wiki, url: "https://en.wikipedia.org/wiki/Regression_discontinuity_design"}
dates: {written: 2026-09-19, event: 2020-05-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Author order fixed to Londono-Velez, Rodriguez y Sanchez per Crossref. Dropped the unverified 317/318 cutoff; the 56,5-86,5 % and 46 % figures match the abstract."}
---

# Un punto en el Saber 11 y dos vidas distintas

Dos muchachos del mismo colegio, el mismo barrio y el mismo Sisbén sacan en el Saber 11 puntajes que se diferencian en uno, y el corte del programa cae justo entre los dos: uno entra a Ser Pilo Paga —matrícula completa en una universidad acreditada— y el otro se queda por fuera. Ese punto de diferencia es ruido: nadie afina su examen al punto exacto.

Ahí está el experimento. Cuando una regla administrativa parte a la gente en dos según una variable continua, los que quedan pegados a cada lado de la raya son comparables en todo lo demás. No hay que suponer nada sobre talento, disciplina ni plata en la casa; basta con que nadie pueda ubicarse con precisión milimétrica alrededor del corte.

Londoño-Vélez, Rodríguez y Sánchez (2020) midieron así el programa: la elegibilidad subió la matrícula inmediata entre 56,5 % y 86,5 % según la población de cumplidores, y la diversidad socioeconómica en las universidades privadas acreditadas creció 46 %.

El precio de este diseño está escondido en la palabra "pegados".

## Rigor

Diseño nítido: $D_i=\mathbf{1}\{X_i\ge c\}$, con $X$ el puntaje y $c$ el corte. El estimando es

$$\tau=\lim_{x\downarrow c}\mathbb{E}[Y\mid X=x]-\lim_{x\uparrow c}\mathbb{E}[Y\mid X=x].$$

Hahn, Todd y van der Klaauw (2001) mostraron la condición: si $\mathbb{E}[Y(1)\mid X=x]$ y $\mathbb{E}[Y(0)\mid X=x]$ son continuas en $c$, entonces $\tau$ es el efecto causal promedio **en el corte**. La continuidad hace el trabajo que en un experimento hace el azar.

En la práctica no se ajusta un polinomio global sino dos rectas locales, una a cada lado, con ancho de banda $h$ y núcleo triangular:

$$\min_{a,b}\sum_{i:\,c\le X_i<c+h}\big(Y_i-a-b(X_i-c)\big)^2 K\!\Big(\tfrac{X_i-c}{h}\Big),$$

y $\hat\tau=\hat a_{+}-\hat a_{-}$. El ancho de banda es el compromiso clásico: $h$ grande baja la varianza y mete sesgo por curvatura; $h$ pequeño hace lo contrario.

Dos advertencias. El efecto es local: no dice nada sobre un estudiante de 250 puntos. Y todo se cae si alguien puede empujar su propio $X$ por encima del corte.

## Recall
type: mcq
Q: ¿Qué supuesto sostiene una regresión discontinua nítida?
- [x] Que todo lo demás que afecta al resultado varía de forma continua en el corte, así que el único salto es el del tratamiento. — por eso el azar se reemplaza por continuidad.
- [ ] Que los tratados y los no tratados son iguales en promedio en toda la muestra. — lejos del corte son muy distintos, y el método no los usa.
- [ ] Que la relación entre el puntaje y el resultado es lineal. — la linealidad es solo una aproximación local; lo que importa es la continuidad.
- [ ] Que el tratamiento se asignó al azar entre los elegibles. — se asignó por una regla determinista, y esa regla es justamente lo que se explota.
