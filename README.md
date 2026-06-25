# VibeDeploy

A production readiness checker for early-stage web apps.

VibeDeploy helps founders and builders validate deployment, security, monitoring, and operations readiness before launching a production app.

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

- Build a static production package with Vite
- Serve using a dedicated static host or the Express static server in `server/index.ts`
- For deployment header guidance, see `docs/deployment.md`
- Do not use `vite preview` as a production-grade server
- Keep production credentials out of the repo

## Security and privacy

- Report data is stored only for the current browser session
- No user answers are persisted across sessions in local storage
- The contact form opens the user's email client
- No backend email service is used in this MVP
- Do not upload production secrets into the app form

## Documentation

See the `docs/` folder for full product, design, architecture, scoring, roadmap, and go-to-market documentation.

## Contact

Email: [victornwoke147@outlook.com](mailto:victornwoke147@outlook.com)
