# VibeDeploy

Production readiness checker for AI-built apps. VibeDeploy helps founders and
builders assess whether an app is safe to launch across DevOps, security,
monitoring, backup, deployment, and environment-management categories.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (with localStorage persistence)
- Express static server

## Scripts

```bash
corepack pnpm install
corepack pnpm dev      # Runs dev server on localhost:3000
corepack pnpm build    # Builds to dist/public and bundles server to dist/
corepack pnpm start    # Runs production server
corepack pnpm check    # TypeScript type check
corepack pnpm format   # Format with Prettier
```

## Development

The dev server runs on `localhost:3000` by default. No environment variables
are required for local development.

## Production Deployment

1. Run `corepack pnpm install && corepack pnpm build`
2. Start the server: `corepack pnpm start` or `node dist/index.js`
3. The app serves static files from `dist/public`

## Security Notes

- All scoring runs client-side - no data is sent to external services
- Report data is stored in localStorage and passed via URL for sharing
- The Express server serves only static files with no API endpoints
- For production deployment, consider adding security headers (CSP, HSTS)

## Services

- £99 Production Readiness Audit
- £500 Production Launch Fix
- £1,500+ Full MVP Production Setup
- £500–£1,000/month DevOps Care Plan

Contact: hello@victornwoke.com

## Documentation

- [Product requirements](docs/01-product-prd.md)
- [UI/UX specification](docs/02-ui-ux-spec.md)
- [Technical architecture](docs/03-technical-architecture.md)
- [Readiness scoring specification](docs/04-readiness-scoring-spec.md)
- [Page copy and microcopy](docs/05-page-copy.md)
- [Build roadmap](docs/06-build-roadmap.md)
- [Portfolio integration plan](docs/07-portfolio-integration-plan.md)
- [Go-to-market plan](docs/08-go-to-market-plan.md)