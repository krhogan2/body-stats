# body-stats

Kevin Hogan’s personal weight dashboard. Bubbly cards, big numbers, date + pounds only. No backend, no Node server, no paid hosting.

**Live site:** https://krhogan2.github.io/body-stats/

## Add a weigh-in

1. Open `js/data.js` and find the block marked `ADD A NEW WEIGH-IN HERE`.
2. Add a line like `{ date: "2026-09-01", lb: 184.6 },` (YYYY-MM-DD, pounds). Newest can go at the top or bottom.
3. Commit and push to `main`. The live site updates after Pages deploys.

Height is locked at **5′6″ (66 in)**. There is no height field.

## What it calculates

From weight only:

- **Body fat %** = `(weight − 115) / weight` (shown as a percent). Dash when weight is 115 lb or under.
- **BMI** = `(weight_lb / 66²) × 703`

The dashboard also plots weight, body fat %, BMI, and a ±10% progress band, plus 7-day / 30-day / all-time change.

## Open locally

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

Asset paths are relative so the site works at the domain root and under `/body-stats/`.

## Deploy

The site is static (`index.html`, `css/`, `js/`). GitHub Pages is deployed from `main` by [`.github/workflows/pages.yml`](.github/workflows/pages.yml). After merge, the workflow enables Pages (Actions source) and publishes the artifact to https://krhogan2.github.io/body-stats/
