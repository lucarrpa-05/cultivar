---
id: math.algebra.group-actions.la-alhambra-y-los-diecisiete
topic: math.algebra.group-actions
format: idea
difficulty: 3
language: es
weight: medium
angles: [beautiful, history]
tags: [grupos-de-papel-tapiz, alhambra, restriccion-cristalografica, simetria, teselados]
hook: "Solo hay diecisiete maneras de repetir un patrón hasta llenar el plano. Cuántas hay en la Alhambra es una pelea abierta."
sources:
  - {title: "Alhambra", type: wiki, url: "https://es.wikipedia.org/wiki/Alhambra"}
  - {title: "Arte nazarí", type: wiki, url: "https://es.wikipedia.org/wiki/Arte_nazar%C3%AD"}
  - {title: "Wallpaper group", type: wiki, url: "https://en.wikipedia.org/wiki/Wallpaper_group"}
  - {title: "What groups are present in the Alhambra?", author: "Branko Grünbaum", year: 2006, type: article, url: "https://faculty.washington.edu/moishe/Groups%20in%20Alhambra.3.pdf"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "All four counts (Muller 12, the 14 misreading, Montesinos 17, Grunbaum 13) verified against Grunbaum 2006."}
---

# Los diecisiete grupos del plano y la cuenta que nadie cierra

Hay exactamente diecisiete maneras de repetir un motivo hasta llenar el plano. No dieciséis ni dieciocho: diecisiete. Lo demostró Evgraf Fiódorov en 1891 y lo volvió a demostrar George Pólya en 1924, y la prueba es pura teoría de grupos.

La frase que todo el mundo repite es que los diecisiete están en la Alhambra. La cuenta real es un desastre educado. Edith Müller, en su tesis de Zúrich de 1944, documentó doce. Un malentendido sobre un comentario suyo convirtió ese doce en catorce, y de ahí pasó a los libros. José María Montesinos sostuvo en 1987 que están los diecisiete. Branko Grünbaum fue en 1983, encontró los doce de Müller y uno que a ella se le escapó: trece.

Y Grünbaum añadió lo incómodo: a los artesanos nazaríes los grupos de simetría no les importaban nada, porque nadie los conocería hasta cinco siglos después. La obsesión por encontrarlos allí es nuestra, no suya.

## Rigor

Un **grupo de papel tapiz** es un subgrupo discreto de las isometrías de $\mathbb{R}^2$ cuyas traslaciones forman un retículo de rango 2. Hay diecisiete clases de isomorfismo.

El paso decisivo es la **restricción cristalográfica**: una rotación de un grupo así solo puede tener orden 1, 2, 3, 4 o 6. La razón es corta. La rotación permuta el retículo de traslaciones, así que en una base del retículo se escribe como una matriz con entradas enteras, y por tanto su traza es un entero. Pero la traza de una rotación de ángulo $\theta$ vale $2\cos\theta$, y
$$2\cos\theta\in\{-2,-1,0,1,2\}$$
obliga a $\theta\in\{\pi,\ 2\pi/3,\ \pi/2,\ \pi/3,\ 0\}$, es decir a órdenes $2,3,4,6,1$.

De ahí sale que no existe ningún mosaico periódico con simetría de orden cinco. Y de ahí también el escándalo de 1982, cuando Dan Shechtman midió difracción con simetría quíntuple en una aleación: no había roto el teorema, había encontrado algo que no era periódico.

## Recall
type: mcq
Q: ¿Por qué ningún mosaico periódico del plano puede tener simetría de orden 5?
- [x] Porque la rotación tiene que ser una matriz entera en el retículo — su traza $2\cos\theta$ debe ser un entero, y eso solo deja los órdenes 1, 2, 3, 4 y 6.
- [ ] Porque los pentágonos regulares no teselan el plano — cierto, pero el patrón no tiene por qué estar hecho de pentágonos; el argumento va sobre el retículo.
- [ ] Porque cinco no divide a 360 — sí lo divide ($360/5=72$); el obstáculo es la condición entera sobre el retículo, no la divisibilidad del ángulo.
