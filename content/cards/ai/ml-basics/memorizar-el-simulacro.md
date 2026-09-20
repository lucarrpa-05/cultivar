---
id: ai.ml-basics.overfitting-regularization.memorizar-el-simulacro
topic: ai.ml-basics.overfitting-regularization
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, paradox]
tags: [sobreajuste, regularizacion, interpolacion, ruido]
hook: "Sacar 100 en los simulacros es una pésima noticia si lo que memorizaste fueron los simulacros."
sources:
  - {title: "Sobreajuste", type: wiki, url: "https://es.wikipedia.org/wiki/Sobreajuste"}
  - {title: "Understanding deep learning requires rethinking generalization", author: "Zhang, Bengio, Hardt, Recht & Vinyals", year: 2017, type: paper, url: "https://arxiv.org/abs/1611.03530"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Memorizar el simulacro no es estudiar

Alguien se aprende de memoria las respuestas de diez simulacros del ICFES. En esos diez saca 100. El día del examen, con preguntas nuevas, se estrella. No aprendió el material: aprendió los simulacros, erratas incluidas.

Eso es sobreajuste, y a los modelos les pasa con la misma facilidad. Con $n$ puntos y un polinomio de grado $n-1$ se puede pasar exactamente por todos —ruido de medición incluido— y entre punto y punto la curva se dispara hacia el cielo. El error de entrenamiento cae a cero mientras el error verdadero sube. Los dos números se separan justo cuando uno deja de mirar el segundo.

La defensa clásica se llama regularización: castigar la complejidad. Coeficientes grandes cuestan, el árbol se poda, el entrenamiento se detiene temprano. Todo eso dice una sola cosa: *no le creas tanto a tus datos*.

Lo raro llegó después. Las redes gigantes memorizan el ruido y generalizan igual.

## Rigor

Sea $\hat R_S(h)$ el error empírico sobre la muestra $S$ y $R(h)$ el error verdadero. Sobreajustar es quedarse con un $h$ de $\hat R_S(h)$ mínimo y brecha $R(h)-\hat R_S(h)$ grande.

**El caso polinomial.** Dados $n$ puntos con abscisas distintas existe un único polinomio de grado $\le n-1$ que los interpola. Si $y_i=f(x_i)+\varepsilon_i$, ese polinomio reproduce el ruido punto por punto: $\hat R_S=0$ y $R$ enorme. Interpolar es posible siempre; el problema es *cómo* se interpola.

**La defensa.** Regularizar es resolver

$$\hat h=\arg\min_{h\in\mathcal H}\ \hat R_S(h)+\lambda\,\Omega(h),$$

donde $\Omega$ mide complejidad: $\|w\|_2^2$ en ridge, $\|w\|_1$ en lasso, el número de hojas en un árbol. El parámetro $\lambda$ gradúa cuánto le crees a la muestra. Con $\lambda\to0$ interpolas; con $\lambda\to\infty$ te quedas con la respuesta constante; en la mitad está el fondo de la U clásica.

Y el detalle que rompió la teoría: Zhang y coautores (2017) entrenaron redes convolucionales con etiquetas completamente aleatorias. Las memorizaron todas. Las mismas redes, con etiquetas reales, generalizan bien. La U describe bien a los polinomios y bastante mal a las redes.

## Recall
type: mcq
Q: ¿Qué es exactamente el sobreajuste?
- [x] Que el error de entrenamiento sea bajo mientras el error sobre datos nuevos es alto — importa la brecha entre los dos, no el valor de ninguno por separado.
- [ ] Que el modelo tenga demasiados parámetros — un modelo enorme puede generalizar muy bien; contar parámetros no decide nada por sí solo.
- [ ] Que el error de entrenamiento sea alto — eso es subajuste, el problema contrario.
