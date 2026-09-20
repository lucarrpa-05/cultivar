---
id: econ.econometrics.omitted-variable-bias.predicting-well-explaining-badly
topic: econ.econometrics.omitted-variable-bias
topics: [econ.econometrics.ml-for-econometrics]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, mistake]
tags: [prediction-vs-causation, regularization, ridge, bias-variance, r-squared]
callback: {from: ai.ml-basics.overfitting-regularization, to: econ.econometrics.omitted-variable-bias}
hook: "Regularisation makes an estimate biased on purpose. Omitted variables make it biased without asking. Only one of those has a dial."
sources:
  - {title: "Statistical Modeling: The Two Cultures", author: "Leo Breiman", year: 2001, type: paper, url: "https://doi.org/10.1214/ss/1009213726"}
  - {title: "Prediction Policy Problems", author: "Kleinberg, Ludwig, Mullainathan & Obermeyer", year: 2015, type: paper, url: "https://doi.org/10.1257/aer.p20151023"}
  - {title: "Ridge regression", type: wiki, url: "https://en.wikipedia.org/wiki/Ridge_regression"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A model can predict you perfectly and lie about why

Remember what regularisation does: it pushes your coefficients away from the values that fit the training data best, and the predictions get *better*. You accepted bias in exchange for variance, and it was a good trade.

Now the same trade from the other side of the aisle. An economist usually wants one number — the effect of a year of schooling, of a minimum wage, of a subsidy — and that number is a coefficient, not a prediction. For it, bias is not a dial. Omitted-variable bias does not shrink with more data, does not surface in cross-validation, and leaves no mark on the fit: a regression with a magnificent $R^2$ can carry a hopeless coefficient, and a clean experiment can predict individual outcomes terribly.

You can push both the wrong way at once. Add a variable that sits *between* treatment and outcome and the fit improves while the causal estimate rots. Shrink a coefficient with a lasso penalty and the forecasts improve while the coefficient stops meaning anything.

Two targets, one regression output. Telling them apart is the whole job.

## Rigor

Prediction aims at the conditional mean: choose $\hat f$ to minimise $\mathbb{E}\big[(y-\hat f(x))^2\big]$, which splits into bias squared, variance and irreducible noise — and a biased estimator can win. Ridge is frank about it:

$$\hat\beta_{\text{ridge}}=(X'X+\lambda I)^{-1}X'y,\qquad \mathbb{E}[\hat\beta_{\text{ridge}}]-\beta=-\lambda\,(X'X+\lambda I)^{-1}\beta,$$

a bias you chose, indexed by a $\lambda$ you can turn down to zero.

Causal inference aims at a parameter: $\operatorname{plim}\hat\beta=\beta+\operatorname{Cov}(x,u)/\operatorname{Var}(x)$. There is no $\lambda$ in that second term and no held-out sample that reveals it, because the held-out data come from the same broken assignment mechanism. Cross-validation ranks predictors; it cannot rank identification strategies.

Which is why machine learning entered econometrics sideways — as a flexible way to fit nuisance functions *inside* a design, never as a way to read a coefficient off a well-fitting model.

## Recall
type: mcq
Q: Two models of the same data; model A has much the better cross-validated fit. Which has the more trustworthy causal coefficient?
- [x] You cannot tell — out-of-sample fit measures prediction and says nothing about whether the coefficient is identified. — separate objectives, and only the design settles the second.
- [ ] Model A, since a better fit means the model is closer to the truth. — a model can fit superbly through variables that destroy the causal reading.
- [ ] Model B, since a worse fit means fewer controls and so less bias. — fewer controls can just as easily mean more omitted-variable bias.
- [ ] Model A, because cross-validation guards against overfitting and therefore against bias. — it guards against variance in prediction, not bias in a target parameter.
