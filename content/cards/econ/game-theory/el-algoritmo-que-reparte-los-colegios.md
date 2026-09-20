---
id: econ.game-theory.matching.el-algoritmo-que-reparte-los-colegios
topic: econ.game-theory.matching
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, connection]
tags: [aceptacion-diferida, chile, admision-escolar, a-prueba-de-estrategias]
hook: "Desde 2016 el cupo en un colegio chileno depende de un algoritmo de 1962 y de que usted diga la verdad."
sources:
  - {title: "Algoritmo promete terminar con filas y discriminación en la admisión escolar (Universidad de Chile)", year: 2017, type: article, url: "https://www.uchile.cl/noticias/136623/algoritmo-promete-terminar-con-filas-en-la-admision-escolar"}
  - {title: "Gale–Shapley algorithm", type: wiki, url: "https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm"}
dates: {written: 2026-09-19, event: 2016-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Chile reparte sus colegios con un algoritmo de 1962

Durante décadas, conseguir cupo en un buen colegio chileno dependía de hacer fila desde la madrugada, de pagar, o de caerle bien al director. Desde 2016 —primero en Magallanes, después en el resto del país— depende de un algoritmo, y de que la familia diga la verdad.

El Sistema de Admisión Escolar usa aceptación diferida, el procedimiento que David Gale y Lloyd Shapley publicaron en 1962 pensando en matrimonios estables. Las familias ordenan los colegios por preferencia, los colegios ordenan a los postulantes según criterios públicos, y el algoritmo empareja de modo que ninguna familia y ningún colegio prefieran cambiarse mutuamente.

Lo interesante no es la eficiencia sino el incentivo. En el sistema anterior convenía mentir: postular al colegio que uno creía alcanzable en vez del que quería, para no quedarse sin nada. Con aceptación diferida y familias proponiendo, decir la verdad es la mejor estrategia posible. La primera aplicación, en Magallanes en 2016, dejó al 86,8% de los postulantes en alguna de sus preferencias declaradas.

## Rigor

La propiedad que vuelve política a esta matemática es que el mecanismo es **a prueba de estrategias** para el lado que propone.

**Teorema (Dubins y Freedman, 1981; Roth, 1982).** En aceptación diferida con los postulantes proponiendo, declarar el orden verdadero de preferencias es una estrategia dominante para cada postulante.

*Esbozo.* Supongamos que un postulante $p$ mejora reportando una lista falsa $L'$ en lugar de la verdadera $L$. El colegio que obtiene con $L'$ es estable para el perfil reportado. Pero el algoritmo con propuestas de los postulantes entrega a cada uno el mejor colegio que puede tener en *cualquier* emparejamiento estable del perfil verdadero, porque el conjunto de emparejamientos estables forma un retículo y ese es su máximo para el lado que propone. Luego lo obtenido con $L'$ no puede superarlo. $\square$

El resultado no se extiende al otro lado: los colegios sí podrían ganar manipulando, y por eso sus criterios de orden se fijan por ley en lugar de dejarlos a su criterio.

Dos límites honestos. El teorema supone preferencias estrictas y cupos fijos; los hermanos que deben quedar juntos son una restricción de pareja que puede destruir la existencia misma de un emparejamiento estable, y en la práctica se parcha. Y estabilidad no es justicia: el algoritmo respeta el orden de prioridad que se le entregue, sea bueno o malo.

## Recall
type: mcq
Q: ¿Qué gana una familia chilena diciendo la verdad en el sistema de admisión?
- [x] Lo mejor que puede conseguir — con aceptación diferida y familias proponiendo, mentir nunca mejora el resultado.
- [ ] Un cupo garantizado en su primera opción — el algoritmo garantiza estabilidad, no que todos entren donde quieren.
- [ ] Prioridad sobre las familias que mienten — no hay premio por honestidad; simplemente mentir no sirve de nada.
