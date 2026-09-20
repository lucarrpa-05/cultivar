---
id: ai.neural-nets.cnn.la-misma-ventanita-en-todas-partes
topic: ai.neural-nets.cnn
format: idea
difficulty: 2
language: es
weight: medium
angles: [tool, beautiful]
tags: [convolucion, pesos-compartidos, equivarianza, campo-receptivo, parametros]
hook: "Una capa densa sobre una foto necesita cien millones de pesos. Un filtro de nueve números hace más, porque se repite."
sources:
  - {title: "Convolutional neural network", type: wiki, url: "https://en.wikipedia.org/wiki/Convolutional_neural_network"}
  - {title: "Equivariant map", type: wiki, url: "https://en.wikipedia.org/wiki/Equivariant_map"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Rioplatense imperatives (pone, gira) replaced with the Colombian reader's usage."}
---

# La misma ventanita, repetida en todas partes

Pon una capa densa de mil unidades a mirar una foto de 224 por 224 en color. Son más de 150 millones de pesos, y cada unidad aprende algo tan específico como «hay un borde acá arriba a la izquierda», sin manera de reutilizar ese conocimiento en la esquina de abajo.

La convolución invierte la idea. Un filtro chiquito —digamos tres por tres, nueve números— recorre la imagen entera, y en cada posición se aplican exactamente los mismos nueve números. Eso es compartir pesos, y compra dos cosas a la vez: la cantidad de parámetros deja de depender del tamaño de la imagen, y el detector de bordes funciona en todas partes porque es el mismo detector.

La segunda propiedad tiene nombre: equivarianza a traslaciones. Si el gato se corre diez píxeles, la respuesta de la capa se corre diez píxeles.

Y ahí está el límite honesto: es equivarianza a traslaciones, a nada más. Gira el gato noventa grados y la red no tiene ninguna garantía.

## Rigor

Una capa convolucional calcula

$$(f * w)(i,j,c_{\text{out}}) = \sum_{c_{\text{in}}}\sum_{a,b} w(a,b,c_{\text{in}},c_{\text{out}})\, f(i+a,\, j+b,\, c_{\text{in}}).$$

Los parámetros son $C_{\text{in}}\,C_{\text{out}}\,k^2 + C_{\text{out}}$ y **no dependen de $H$ ni de $W$**. Con $C_{\text{in}}=3$, $C_{\text{out}}=64$ y $k=3$ son 1.792 pesos, frente a los 150 millones de la capa densa.

La equivarianza se verifica en una línea: si $T_v$ traslada por el vector $v$, entonces $(T_v f) * w = T_v (f * w)$, porque la suma de arriba solo depende de diferencias de índices. Es la misma razón por la que la convolución conmuta con las traslaciones en análisis de Fourier.

El costo es el campo receptivo. Un filtro de $3\times3$ solo ve tres píxeles de ancho; apilando $L$ capas iguales, el campo receptivo crece a $(2L+1)\times(2L+1)$, es decir linealmente en la profundidad. Para que una unidad «vea» la imagen completa hacen falta muchas capas, o submuestreo, o pasos mayores a uno. La ventanita chica es barata justamente porque es chica, y esa es la misma razón por la que hay que apilar tantas.

## Recall
type: mcq
Q: ¿Qué gana una capa convolucional al aplicar el mismo filtro en todas las posiciones?
- [x] Los parámetros dejan de depender del tamaño de la imagen y el detector sirve en cualquier posición. — compartir pesos da equivarianza a traslaciones casi gratis.
- [ ] Invarianza a rotaciones y escalas del objeto. — solo hay garantía para traslaciones; rotar la entrada no está contemplado.
- [ ] Un campo receptivo global desde la primera capa. — el campo receptivo crece linealmente con la profundidad, no de golpe.
