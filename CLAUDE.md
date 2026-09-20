# Cultivar (personal)
- Specs, style guide, reviewer/author briefs, reviews and unreviewed drafts live in the private data repo, cloned to `.data/` by `npm run pull-data` (see `.data/docs/PLAN.md`, `.data/docs/RESUME.md`).
- Cards: `content/cards/<domain>/<area>/<slug>.md`; only cards with a `reviewed:` stamp ship (`npm run build`).
- Commands: `npm run validate` · `npm run build` · `npm test` · `/refresh`.
- Never commit learning data, tokens, or downloaded sources here.
