---
id: css.opinion-dynamics.polarization.la-camara-de-eco-no-aparecio
topic: css.opinion-dynamics.polarization
format: idea
difficulty: 2
language: es
weight: medium
angles: [mistake, numbers, practical]
tags: [polarizacion, camaras-de-eco, bail, boxell, experimentos-facebook]
hook: "Todo el mundo sabe que las redes polarizan. La evidencia lleva una década sin cooperar."
sources:
  - {title: "Exposure to opposing views on social media can increase political polarization", author: "Bail, Argyle, Brown, Bumpus, Chen, Hunzaker, Lee, Mann, Merhout, Volfovsky", year: 2018, type: paper, url: "https://doi.org/10.1073/pnas.1804840115"}
  - {title: "Greater Internet use is not associated with faster growth in political polarization among US demographic groups", author: "Levi Boxell, Matthew Gentzkow, Jesse M. Shapiro", year: 2017, type: paper, url: "https://doi.org/10.1073/pnas.1706588114"}
  - {title: "Like-minded sources on Facebook are prevalent but not polarizing", author: "Nyhan, Settle, Thorson, Wojcieszak, Barberá et al.", year: 2023, type: paper, url: "https://doi.org/10.1038/s41586-023-06297-w"}
dates: {written: 2026-09-19, event: 2023-07-27}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# La cámara de eco: la historia es buena, los datos no la acompañan

La explicación estándar es limpia: los algoritmos nos encierran con gente que piensa igual, dejamos de oír al otro lado y nos radicalizamos. Tres resultados en contra, todos con datos serios.

**El antídoto no funciona.** Bail y coautores (2018) pagaron a demócratas y republicanos activos en Twitter para seguir durante un mes a un bot que les mostraba mensajes del bando contrario. Los republicanos salieron *más* conservadores; los demócratas se movieron un poco a la izquierda, sin significancia estadística. Exponer a la otra orilla no moderó a nadie.

**La polarización creció donde no había internet.** Boxell, Gentzkow y Shapiro (2017) midieron el aumento por grupos demográficos en Estados Unidos: el crecimiento más rápido fue entre los mayores de 65 años, el grupo menos conectado.

**Apagar la cámara no cambió nada.** En 2020, con acceso interno a Facebook, Nyhan y coautores redujeron en cerca de un tercio la exposición a fuentes afines de 23.377 usuarios durante la campaña presidencial. Ninguno de los ocho indicadores preregistrados de polarización se movió.

## Rigor

Vale la pena separar dos cosas que la palabra "polarización" mezcla. La **ideológica** mide qué tan lejos están las posiciones: la distancia entre las medias de los dos grupos, o la bimodalidad de la distribución. La **afectiva** mide cuánto se detestan: normalmente el termómetro de simpatía hacia el propio partido menos el termómetro hacia el contrario. En Estados Unidos la segunda creció mucho más que la primera, y casi todos los experimentos de redes apuntan a la primera.

También hay un problema de diseño. Los experimentos de plataforma duran semanas o meses y miden efectos sobre individuos; el fenómeno que se quiere explicar tomó décadas y opera sobre élites, medios y partidos a la vez. Un efecto individual nulo a tres meses es perfectamente compatible con un efecto sistémico grande a veinte años: el equilibrio general no se mide con un experimento parcial.

La conclusión honesta no es "las redes no polarizan". Es que la ruta simple —me muestran lo mío, me radicalizo— es la que lleva una década sin aparecer en los datos.

## Recall
type: mcq
Q: ¿Qué encontró el experimento de Bail y coautores (2018) al exponer a la gente a opiniones contrarias?
- [x] Los republicanos se volvieron más conservadores — la exposición al otro bando produjo reacción, no moderación.
- [ ] Ambos bandos se moderaron — es justo lo contrario de lo observado; el efecto demócrata fue pequeño y no significativo.
- [ ] No hubo ningún cambio medible — el efecto sobre los republicanos fue sustancial y estadísticamente significativo.
