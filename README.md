# VibeDeploy

A production readiness checker for early-stage web apps.

VibeDeploy helps founders and builders validate deployment, security, monitoring, and operations readiness before launching a production app.

## License and Usage

VibeDeploy is proprietary software owned by Victor Nwoke. This public repository does not mean the project is open source.

You may view the code for portfolio, demonstration, and review purposes only. Copying, reuse, modification, redistribution, deployment, commercialization, sublicensing, sale, or creation of derivative works is not allowed without prior written permission from Victor Nwoke.

See [LICENSE](./LICENSE) for the full proprietary terms.

## Key properties

- Browser-first React + TypeScript app
- No backend report storage for MVP
- Uses `sessionStorage` only for the current report session
- Mailto-based contact flow for honest outreach
- Static-ready Vite build with a small Express host

## What it does

- Guides users through a production readiness questionnaire
- Scores readiness and surfaces key gaps
- Generates a session-only report
- Does not leak answers via URLs or persistent local storage
- Does not send emails from a backend service

## What it does not do yet

- No automatic GitHub or source code scanning
- No backend report history
- No authenticated user accounts
- No secrets management for production credentials in the browser

## Getting started

Install dependencies:

```bash
corepack pnpm install
```

Run the app locally:

```bash
corepack pnpm dev
```

## Verification

Run static checks, build, and audit:

```bash
npx -y pnpm@10.26.0 run check
npx -y pnpm@10.26.0 run build
npx -y pnpm@10.26.0 audit --audit-level=low
```

## Contact form setup

1. Create a Formspree account at https://formspree.io/ and create a new form.
2. Copy the Form ID provided by Formspree for your form.
3. Add it to your local `.env` as `VITE_FORMSPREE_CONTACT_FORM_ID=<your_form_id>`.
4. For production, add the same env variable in your hosting provider's dashboard.
5. Never commit real `.env` files to the repository.

## CI checks

Every pull request should pass:

- TypeScript check
- production build
- dependency audit

## Build

```bash
npx -y pnpm@10.26.0 run build
```

## Deployment notes

- Preferred v1 deployment: Azure Static Web Apps using the Vite static build output
- Build output is written to `dist/public`
- `staticwebapp.config.json` provides SPA fallback and global security
  headers for Azure
- The Express server in `server/index.ts` is optional for self-hosted or alternate
  Node deployments
- Avoid `vite preview` for production
- Keep production credentials out of the repo
- Supabase is not part of MVP; reserved for a later v2 architecture

## Security and privacy

- Report data is stored only for the current browser session
- No user answers are persisted across sessions in local storage
- The contact form opens the user's email client
- No backend email service is used in this MVP
- Do not upload production secrets into the app form

## Documentation

See the `docs/` folder for full product, design, architecture, scoring,
roadmap, and go-to-market documentation.

## Contact

Email: [victornwoke147@outlook.com](mailto:victornwoke147@outlook.com)

Copyright © 2026 Victor Nwoke. All rights reserved.
