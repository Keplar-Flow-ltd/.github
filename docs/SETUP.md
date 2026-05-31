# Decent Work Memo Flow Setup Guide

This directory contains the Keplar Flow landing page and Decent Work memo request flow hosted on GitHub Pages.

## Configuration

The flow is designed to send users from the landing page to a Google Form before they can access the memo PDF.

### Setup Instructions

1. **Create a Google Form**
   - Include fields you need for memo requests (recommended: Full Name, Email, Organization, Role, Country, Use Case, Consent).
   - In Form settings, enable "Collect email addresses".

2. **Configure post-submit memo access**
   - Host your memo PDF at a stable HTTPS URL (for example in GitHub Pages under `docs/assets/decent-work-memo.pdf`).
   - In Form settings, add a confirmation message with a direct link to the memo PDF, for example:
     `Thanks. Download the Decent Work Memo here: https://your-domain/path/decent-work-memo.pdf`
   - Optional: enable "Send responders a copy of their response" so the link is also delivered to email.

3. **Publish and copy the Google Form URL**
   - Click "Send" in Google Forms and copy the public form link.

4. **Add the Form URL as a Repository Secret**
   - Go to Repository Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `GOOGLE_FORM_URL`
   - Value: Paste your Google Form public URL
   - Click "Add secret"

5. **Enable GitHub Pages**
   - Go to Repository Settings > Pages
   - Select Source: "GitHub Actions"
   - The workflow will automatically deploy to GitHub Pages

## GitHub Pages Hosting

The content is automatically hosted on GitHub Pages at:
```
https://keplar-flow-ltd.github.io/.github/         (landing)
https://keplar-flow-ltd.github.io/.github/form/    (form)
```

The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) automatically:
1. Reads the `GOOGLE_FORM_URL` secret from repository settings
2. Injects it into `docs/form/index.html`
3. Deploys to GitHub Pages on every push to main

## Custom Domains

- Apex landing domain: `keplarflow.org` (configured via `docs/CNAME`)
- Recommended `www` behavior: CNAME `www` to `keplar-flow-ltd.github.io` (GitHub will serve/redirect for the configured custom domain)
- Preferred `form.keplarflow.org` behavior: host it as a dedicated GitHub Pages site/repository if you need that exact hostname to remain in the browser with HTTPS.
- Transitional option for `form.keplarflow.org`: configure a URL redirect to `https://keplarflow.org/form/` if you do not need the `form.` hostname to stay visible after navigation.

## Testing

1. Visit the landing URL
2. Click **Download the Decent Work Memo**
3. Confirm the Google Form opens
4. Submit a test response and verify the memo link appears in the confirmation step

## Troubleshooting

- **Form does not open**: Verify the `GOOGLE_FORM_URL` secret is set correctly
- **No memo link after submit**: Recheck the Google Form confirmation message
- **No email copy**: Recheck Form settings for response receipt/email copy
