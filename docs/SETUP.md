# Site setup notes

This repository hosts the Keplar Flow website. The `docs/` directory deploys to
GitHub Pages on every push to `main`.

## Deployment

- Pages source is the `deploy-pages.yml` workflow (Settings > Pages > Source:
  GitHub Actions).
- `docs/CNAME` points Pages at the custom domain `keplarflow.org`.
- For a `www` host, CNAME it to `keplar-flow-ltd.github.io`; GitHub serves and
  redirects for the configured domain.

## Contact paths

There is no form backend anywhere on this site. Every contact path is a plain
mailto to hello@keplarflow.org. The earlier Google Form memo funnel was retired;
the workflow step that injected it now skips when no form page exists, and the
`GOOGLE_FORM_URL` secret is no longer read.

## Running locally

Serve the `docs/` folder with any static file server and open the root page.
There is no build step.
