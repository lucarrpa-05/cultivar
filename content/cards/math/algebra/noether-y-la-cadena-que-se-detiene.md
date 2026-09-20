---
id: math.algebra.rings-ideals.noether-y-la-cadena-que-se-detiene
topic: math.algebra.rings-ideals
format: story
difficulty: 3
language: es
weight: medium
angles: [human, history]
tags: [emmy-noether, anillos-noetherianos, cadena-ascendente, gotinga, base-de-hilbert]
hook: "Noether cambió el álgebra con una sola hipótesis: que ninguna cadena creciente de ideales pueda seguir para siempre."
sources:
  - {title: "Emmy Noether", type: wiki, url: "https://es.wikipedia.org/wiki/Emmy_Noether"}
  - {title: "Anillo noetheriano", type: wiki, url: "https://es.wikipedia.org/wiki/Anillo_noetheriano"}
  - {title: "Emmy Noether", type: wiki, url: "https://en.wikipedia.org/wiki/Emmy_Noether"}
dates: {written: 2026-09-19, event: 1921-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Noether drew no salary until 1922, not a year after her 1919 habilitation. The Hilbert bathhouse line was already flagged as undocumented."}
---

# Emmy Noether y la cadena que tiene que detenerse

En 1915 Hilbert y Klein la llevaron a Gotinga y la facultad se negó a habilitarla por ser mujer. Se cuenta —y conviene decir que la frase exacta no está documentada— que Hilbert contestó que la universidad no era una casa de baños. Ella dictó clases cuatro años anunciadas bajo el nombre de él, sin sueldo. Se habilitó en 1919 y siguió sin cobrar hasta 1922, cuando por fin le dieron un encargo pago de álgebra.

En 1921 publicó *Idealtheorie in Ringbereichen* y cambió el oficio entero. Hasta ahí, la teoría de anillos consistía en calcular con polinomios concretos y esperar que saliera. Noether propuso una sola hipótesis abstracta: que toda cadena creciente de ideales termine por detenerse. De ahí salen los teoremas de descomposición sin tocar un solo polinomio. Hoy esos anillos se llaman noetherianos y son el ambiente por defecto del álgebra conmutativa y de la geometría algebraica.

En abril de 1933 el régimen nazi le retiró la licencia para enseñar. Se fue a Bryn Mawr, en Pensilvania, y murió allí en 1935, a los 53 años.

## Rigor

Un anillo conmutativo $R$ es **noetheriano** si cumple una de estas tres condiciones, que son equivalentes:

1. toda cadena $I_1\subseteq I_2\subseteq\cdots$ de ideales se estabiliza;
2. todo ideal de $R$ está generado por finitos elementos;
3. toda familia no vacía de ideales tiene un elemento maximal.

De (1) a (2): si un ideal $I$ no fuera finitamente generado, se eligen $a_1,a_2,\dots$ con $a_{n+1}\notin(a_1,\dots,a_n)$ y la cadena no para nunca. De (2) a (1): la unión de una cadena creciente es un ideal, y sus finitos generadores ya viven en algún $I_N$, así que la cadena se detiene en $N$.

Lo que vuelve útil todo esto es el **teorema de la base de Hilbert** (1890): si $R$ es noetheriano, $R[x]$ también lo es. Por inducción, $k[x_1,\dots,x_n]$ es noetheriano, y entonces cualquier sistema de ecuaciones polinómicas, por infinito que sea el conjunto de ecuaciones, equivale a uno finito.

## Recall
type: reveal
Q: ¿Qué gana uno al pedir que las cadenas crecientes de ideales se detengan?
A: Que todo ideal sea finitamente generado, y con eso los teoremas de descomposición salen de una hipótesis abstracta en vez de un cálculo. Con el teorema de la base de Hilbert, todo sistema de ecuaciones polinómicas equivale a uno finito.
