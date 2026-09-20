---
id: math.probability.basics.cumpleanos-de-la-seleccion
topic: math.probability.basics
format: idea
difficulty: 2
language: es
weight: medium
angles: [paradox, numbers, practical]
tags: [problema-del-cumpleanos, parejas, mundial-2014, coincidencias]
hook: "Una convocatoria mundialista tiene 23 jugadores. La probabilidad de que dos cumplan el mismo día pasa del 50 %."
diagram: {file: math/birthday-curve.svg, caption: "La curva sube mucho más rápido de lo que dicta la intuición: cruza el 50 % justo en 23.", alt: "Curva creciente de la probabilidad de cumpleaños compartido contra el número de personas, con el punto de 23 personas marcado en el 50,7 por ciento"}
sources:
  - {title: "Birthday problem", type: wiki, url: "https://en.wikipedia.org/wiki/Birthday_problem"}
  - {title: "Problema del cumpleaños", type: wiki, url: "https://es.wikipedia.org/wiki/Problema_del_cumplea%C3%B1os"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# El cumpleaños compartido de la Selección

Una lista mundialista tiene 23 jugadores. La probabilidad de que dos de ellos cumplan años el mismo día es del 50,7 %: más probable que no. En el Mundial de 2014, de las 32 nóminas, 16 tenían al menos una pareja de cumpleaños repetido, y cinco tenían dos parejas. Exactamente lo que predice la cuenta.

La intuición falla por una razón concreta y corregible. No estás comparando 23 personas contra 365 días. Estás comparando parejas, y con 23 jugadores hay $\binom{23}{2}=253$ parejas: 253 oportunidades de coincidir. Con esa lente, el 50 % deja de ser raro.

La pregunta que sí se comporta como espera la intuición es otra: *¿alguien cumple el mismo día que yo?* Ahí las oportunidades son 22, no 253, y para llegar al 50 % necesitas unas 253 personas.

Un detalle honesto antes de la fórmula: los cumpleaños reales no están repartidos de forma uniforme.

## Rigor

Con $n$ personas y 365 días equiprobables, la probabilidad de que **no** haya coincidencias es
$$\bar{p}(n)=\prod_{k=0}^{n-1}\frac{365-k}{365}=\frac{365!}{(365-n)!\,365^{\,n}},$$
y la respuesta es $p(n)=1-\bar{p}(n)$. Para $n=23$, $p=0{,}5073$; para $n=50$, $0{,}970$; para $n=70$, $0{,}9992$.

**De dónde sale el 23.** Usando $1-x\approx e^{-x}$ para $x$ pequeño,
$$\bar{p}(n)\approx\exp\!\left(-\sum_{k=1}^{n-1}\frac{k}{365}\right)=\exp\!\left(-\frac{n(n-1)}{730}\right).$$
Igualar a $1/2$ da $n(n-1)\approx 730\ln 2\approx 506$, es decir $n\approx 23$. El crecimiento es cuadrático en $n$, y ahí está toda la sorpresa: 253 parejas contra 365 días.

**La variante personal.** $P(\text{alguien coincide conmigo})=1-(364/365)^{n}$, que con $n=23$ vale apenas $6{,}1\,\%$ y necesita $n\approx 253$ para llegar al 50 %.

**La no uniformidad.** Los nacimientos reales no se reparten de forma pareja en el año. Cualquier desviación de la uniformidad **aumenta** la probabilidad de coincidencia: la uniforme es la que la minimiza, por convexidad de $\sum_i p_i^{2}$. Así que el 50,7 % es una cota inferior, y el 23 se sostiene.

## Recall
type: mcq
Q: ¿Por qué bastan 23 personas para llegar al 50 %?
- [x] Porque lo que crece es el número de parejas — con 23 personas hay 253 parejas, y cada una es una oportunidad de coincidir.
- [ ] Porque 23 es aproximadamente $\sqrt{365}$ por casualidad — la raíz aparece, pero por el conteo de parejas $n^2/2$, no por casualidad.
- [ ] Porque los cumpleaños no son uniformes — la no uniformidad ayuda un poco, pero el 50,7 % ya sale suponiendo uniformidad.
- [ ] Porque se cuenta también el 29 de febrero — ignorarlo o incluirlo cambia el resultado en menos de una décima de punto.
