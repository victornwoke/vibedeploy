# VibeDeploy

Production readiness checker for AI-built apps. VibeDeploy helps founders and
builders assess whether an app is safe to launch across DevOps, security,
monitoring, backup, deployment, and environment-management categories.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Express static server

## Scripts

```bash
corepack pnpm install
corepack pnpm dev
corepack pnpm build
corepack pnpm check
```

## Documentation

- [Product requirements](docs/01-product-prd.md)
- [UI/UX specification](docs/02-ui-ux-spec.md)
- [Technical architecture](docs/03-technical-architecture.md)
- [Readiness scoring specification](docs/04-readiness-scoring-spec.md)
- [Page copy and microcopy](docs/05-page-copy.md)
- [Build roadmap](docs/06-build-roadmap.md)
- [Portfolio integration plan](docs/07-portfolio-integration-plan.md)
- [Go-to-market plan](docs/08-go-to-market-plan.md)
- [Design brainstorm](ideas.md)

## Security Note

The current app is primarily client-side. Before production release, address the
security review findings: dependency audit results, production headers, debug
tooling, report URL data leakage, and CI/CD scanning.
