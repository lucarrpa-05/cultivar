---
id: math.topology.quotients.una-botella-de-cuatro-dimensiones
topic: math.topology.quotients
format: idea
difficulty: 3
language: es
weight: medium
angles: [weird, origin]
tags: [botella-de-klein, no-orientable, cociente, inmersion]
hook: "No es una botella, y el nombre probablemente venga de una palabra mal traducida. Lo que sí es seguro es que no cabe en tres dimensiones."
sources:
  - {title: "Botella de Klein", type: wiki, url: "https://es.wikipedia.org/wiki/Botella_de_Klein"}
  - {title: "Klein bottle", type: wiki, url: "https://en.wikipedia.org/wiki/Klein_bottle"}
  - {title: "Banda de Möbius", type: wiki, url: "https://es.wikipedia.org/wiki/Banda_de_M%C3%B6bius"}
dates: {written: 2026-09-19, event: 1882-01-01}
diagram: {file: math/cuadrado-toro-klein.svg, caption: "El mismo cuadrado con dos instrucciones de pegado: a la izquierda el toro, a la derecha la botella de Klein.", alt: "Dos cuadrados con flechas en los lados; en el segundo, las flechas de arriba y abajo apuntan en sentidos opuestos"}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "La etimologia Flaeche/Flasche no esta documentada (la Wikipedia inglesa ya no la recoge); ahora va marcada como leyenda."}
---

# Una botella que solo cabe en cuatro dimensiones

Felix Klein la describió en 1882 y no la llamó botella. Le puso *Kleinsche Fläche*, superficie de Klein. Lo que se cuenta después —y conviene tomarlo como leyenda, porque nadie ha identificado al culpable— es que un traductor confundió *Fläche* con *Flasche*, botella, y como el dibujo se parecía a una, el error se quedó.

La construcción es la misma receta con la que se arma un toro: tomas un cuadrado y pegas sus lados de dos en dos. Si pegas las dos parejas respetando el sentido, sale un toro. Si volteas una de las dos parejas antes de pegar, sale la botella de Klein: una superficie cerrada, sin borde, sin adentro ni afuera.

Y ahí aparece el problema. En el espacio de tres dimensiones no cabe sin atravesarse a sí misma. Los objetos de vidrio que venden en las tiendas de museo no son botellas de Klein: son inmersiones, con un agujero falso donde el tubo se cruza. En cuatro dimensiones el cruce se evita levantando un trozo en la dirección extra, igual que un nudo en el plano se desanuda saliendo al espacio.

## Rigor

Formalmente es un cociente del cuadrado. En $[0,1]\times[0,1]$ se identifican
$$(0,y)\sim(1,y), \qquad (x,0)\sim(1-x,1),$$
y se le da al conjunto cociente $K$ la topología cociente: un conjunto es abierto si su preimagen bajo la proyección lo es. El $1-x$ de la segunda relación es el volteo.

Como el cuadrado es compacto y conexo, $K$ también lo es, y resulta ser Hausdorff. Es **no orientable**: contiene una banda de Möbius, y de hecho $K$ es la unión de dos bandas de Möbius pegadas por su borde. Su característica de Euler es $0$, igual que la del toro, así que la característica no basta para distinguirlos; la orientabilidad sí.

El grupo fundamental es $\pi_1(K)=\langle a,b \mid abab^{-1}\rangle$, no abeliano, mientras que el del toro es $\mathbb{Z}^2$. Y sobre la dimensión: existe una inmersión $K \to \mathbb{R}^3$ (localmente inyectiva, globalmente no) y un encaje $K \hookrightarrow \mathbb{R}^4$. En $\mathbb{R}^3$ no hay encaje posible, porque toda superficie cerrada encajada en $\mathbb{R}^3$ es orientable.

## Recall
type: mcq
Q: ¿Por qué la botella de Klein no cabe en $\mathbb{R}^3$ sin atravesarse?
- [x] Porque toda superficie cerrada encajada en $\mathbb{R}^3$ es orientable, y la botella no lo es — lo que se ve en vidrio es una inmersión con autointersección.
- [ ] Porque su característica de Euler es cero — la del toro también es cero, y el toro sí cabe en $\mathbb{R}^3$.
- [ ] Porque es infinita — es compacta: sale de pegar los lados de un cuadrado, que es un conjunto acotado.
