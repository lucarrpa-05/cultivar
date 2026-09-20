---
id: physics.em.circuits.los-electrones-van-a-paso-de-caracol
topic: physics.em.circuits
format: idea
difficulty: 1
language: es
weight: medium
angles: [paradox, practical]
tags: [circuitos, velocidad-de-arrastre, campo-electrico, poynting, corriente]
hook: "Los electrones en el cable de tu lámpara avanzan más lento que un caracol. La luz se prende de todos modos al instante."
sources:
  - {title: "Drift velocity", type: wiki, url: "https://en.wikipedia.org/wiki/Drift_velocity"}
  - {title: "Corriente eléctrica", type: wiki, url: "https://es.wikipedia.org/wiki/Corriente_el%C3%A9ctrica"}
  - {title: "Poynting vector", type: wiki, url: "https://en.wikipedia.org/wiki/Poynting_vector"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Los electrones van a paso de caracol y la luz se prende ya

Prendes el interruptor y el bombillo se enciende sin demora perceptible. La explicación obvia —los electrones corren por el cable hasta el bombillo— es falsa por varios órdenes de magnitud.

En un cable de cobre normal, con un amperio de corriente, cada electrón avanza a unos $0{,}07$ milímetros por segundo. Más lento que un caracol. Si el encendido dependiera de que un electrón viaje del interruptor al bombillo, tendrías que esperar horas.

Lo que sí viaja rápido es el campo eléctrico: se establece a lo largo del cable a una fracción grande de la velocidad de la luz. Los electrones ya estaban ahí, repartidos por todo el conductor; el campo simplemente les avisa, casi simultáneamente, que empiecen a arrastrarse.

La analogía útil es una manguera ya llena de agua. Abres la llave y sale agua por el otro extremo de inmediato, aunque ninguna molécula haya recorrido la manguera. Donde falla: en el cable no hay nada incompresible empujando; lo que se propaga es un campo.

## Rigor

La velocidad de arrastre sale de contar portadores. Si hay $n$ electrones libres por metro cúbico, cada uno con carga $q$, en un cable de sección $A$:

$$I = nqAv_d \quad\Longrightarrow\quad v_d = \frac{I}{nqA}.$$

Para el cobre $n \approx 8{,}5\times10^{28}\ \mathrm{m^{-3}}$. Con $I = 1$ A y $A = 1\ \mathrm{mm^2} = 10^{-6}\ \mathrm{m^2}$:

$$v_d = \frac{1}{(8{,}5\times10^{28})(1{,}6\times10^{-19})(10^{-6})} \approx 7\times10^{-5}\ \mathrm{m/s}.$$

Setenta micras por segundo. Mientras tanto, la perturbación electromagnética recorre el cable a $v = c/\sqrt{\varepsilon_r\mu_r}$, típicamente entre $0{,}6c$ y $0{,}9c$.

Y hay una vuelta de tuerca que incomoda a todo el mundo la primera vez: la energía no viaja *dentro* del cable. El vector de Poynting $\mathbf{S} = \mathbf{E}\times\mathbf{H}$ apunta hacia adentro del conductor desde el espacio que lo rodea. La energía fluye por el campo alrededor del cable y entra lateralmente; el cobre sirve de guía, no de tubería. El caracol nunca fue el mensajero.

## Recall
type: mcq
Q: ¿Por qué se enciende el bombillo casi al instante si los electrones se arrastran tan lento?
- [ ] Porque los electrones aceleran hasta casi la velocidad de la luz al cerrar el circuito. — chocan con la red del metal constantemente; su velocidad media de arrastre se queda en micras por segundo.
- [x] Porque lo que se propaga es el campo electromagnético, y los electrones ya estaban repartidos por todo el cable. — el campo los pone en movimiento casi simultáneamente en toda su longitud.
- [ ] Porque la corriente alterna no necesita que los electrones se desplacen. — también ocurre en corriente continua, donde sí hay desplazamiento neto.
- [ ] Porque el cable es muy corto y la distancia no importa. — funciona igual con cables de kilómetros, con un retardo de microsegundos.
