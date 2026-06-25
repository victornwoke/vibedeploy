# SECTION 3 --- TECHNICAL ARCHITECTURE DOCUMENT

## 3.1 Recommended Architecture (MVP)

VibeDeploy MVP is a static React/TypeScript single-page application. There is no
backend server, no database, and no authentication layer. All logic runs
client-side. This keeps the product fast, cheap to host, and deployable within
hours while still delivering full lead-generation functionality.

## 3.2 Tech Stack

| Layer          | Technology                      | Rationale                                     |
| -------------- | ------------------------------- | --------------------------------------------- |
| Framework      | React 18 + TypeScript           | Component reuse, type safety, large ecosystem |
| Build Tool     | Vite                            | Fast HMR, optimised production bundles        |
| Styling        | Tailwind CSS v3                 | Rapid UI iteration, consistent design tokens  |
| UI Components  | shadcn/ui                       | Accessible, headless, fully customisable      |
| Animation      | Framer Motion                   | Declarative animations with gesture support   |
| Routing        | React Router v6                 | Client-side routing for multi-page feel       |
| State          | Zustand or React Context        | Lightweight checker state management          |
| Forms          | React Hook Form                 | Performant, accessible form handling          |
| Icons          | Lucide React                    | Consistent, lightweight SVG icon set          |
| Deployment     | Vercel or Azure Static Web Apps | Free tier, CDN, preview deployments           |
| CI/CD          | GitHub Actions                  | Automated build, test, and deploy on push     |
| Source Control | GitHub, public or private       | Version control and portfolio proof           |

## 3.3 Folder Structure

vibedeploy/ ├── .github/ │ └── workflows/ │ ├── ci.yml # Lint, type-check, test
on PR │ └── deploy.yml # Deploy to Vercel on merge to main ├── public/ │ └──
assets/ # Static images, favicon, og-image ├── src/ │ ├── components/ │ │ ├──
ui/ # shadcn/ui base components │ │ ├── layout/ # Navbar, Footer, PageWrapper │
│ ├── home/ # Hero, Problem, HowItWorks, Pricing │ │ ├── checker/ # CheckerForm,
CategoryCard, ProgressBar │ │ ├── report/ # ScoreGauge, RiskBadge,
CategoryAccordion │ │ └── shared/ # Button, Card, Badge, TerminalCard │ ├──
pages/ │ │ ├── Home.tsx │ │ ├── Checker.tsx │ │ ├── Report.tsx │ │ ├──
Services.tsx │ │ ├── CaseStudies.tsx │ │ ├── About.tsx │ │ └── Contact.tsx │ ├──
scoring/ │ │ ├── questions.ts # All 13 categories + questions │ │ ├──
engine.ts # Scoring calculation logic │ │ ├── recommendations.ts # Per-answer
recommendation copy │ │ └── types.ts # TypeScript interfaces │ ├── store/ │ │
└── checkerStore.ts # Zustand store for form state │ ├── hooks/ │ │ └──
useCheckerPersist.ts # localStorage sync hook │ ├── lib/ │ │ └── utils.ts # cn()
helper, formatters │ ├── styles/ │ │ └── globals.css # Tailwind base + CSS
custom properties │ ├── App.tsx │ └── main.tsx ├── .env.example # Template for
environment variables ├── .gitignore ├── index.html ├── tailwind.config.ts ├──
tsconfig.json ├── vite.config.ts └── README.md

## 3.4 Scoring Engine Design

The scoring engine is a pure TypeScript module with no side effects. It accepts
a CheckerAnswers object and returns a ScoringResult object.

// scoring/types.ts interface CheckerAnswers { [categoryId: string]: {
[questionId: string]: string | boolean } } interface CategoryScore { id: string;
label: string; score: number; // 0-100 normalised weight: number; // category
weight 0-1 riskLevel: "critical" | "high" | "medium" | "low" | "pass"; findings:
Finding[]; } interface ScoringResult { totalScore: number; // weighted average
0-100 overallRisk: string; categories: CategoryScore[]; criticalCount: number;
topRecommendations: string[]; }

## 3.5 Environment Variable Strategy

- All sensitive values stored in .env.local (never committed to git)

- .env.example committed with placeholder values and comments

- Vercel or Azure: environment variables set in dashboard UI

- GitHub Actions: secrets set in repository Settings > Secrets

- MVP has no secrets (all client-side); V2 will need VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY

> _⚑ Never prefix secrets with VITE\_ if they should remain server-only. In V2,
> move sensitive API calls to edge functions or a Node backend._

## 3.6 GitHub Actions CI/CD Strategy

Two workflows run on the public repository:

### ci.yml --- Runs on every Pull Request

- Checkout code

- Install dependencies with npm ci

- Run TypeScript type-check: npx tsc \--noEmit

- Run ESLint: npx eslint src \--max-warnings 0

- Run Vitest unit tests: npx vitest run

- Build production bundle: npm run build

- Fail PR if any step fails

### deploy.yml --- Runs on merge to main

- All CI steps (reused with workflow_call)

- Deploy to Vercel using amondnet/vercel-action or Vercel CLI

- Or deploy to Azure Static Web Apps using azure/static-web-apps-deploy action

- Post deployment URL as PR comment

- Notify on Slack or email on failure

## 3.7 Hosting Options Comparison

| Platform              | Free Tier          | Custom Domain | Preview Deployments | Best For                                         |
| --------------------- | ------------------ | ------------- | ------------------- | ------------------------------------------------ |
| Vercel                | Yes, generous      | Yes, free SSL | Yes                 | Fastest DX; recommended default                  |
| Azure Static Web Apps | Yes, F1 tier       | Yes, free SSL | Yes, staging slots  | Enterprise clients; Azure-native portfolio proof |
| GitHub Pages          | Yes                | Yes, CNAME    | No                  | Simplest static hosting; no CI dashboard         |
| Netlify               | Yes                | Yes, free SSL | Yes                 | Good alternative to Vercel                       |
| Cloudflare Pages      | Yes, very fast CDN | Yes, free SSL | Yes                 | Global performance; free analytics               |

> _⚑ Recommendation: Deploy to Vercel for speed. Create an Azure Static Web Apps
> deployment as well to demonstrate Azure knowledge to enterprise recruiters._

## 3.8 Data Model (Version 2 --- Supabase)

| Table              | Key Columns                                                             | Notes                              |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------- |
| `users`            | `id`, `email`, `created_at`, `plan`                                     | Managed by Supabase Auth           |
| `checker_sessions` | `id`, `user_id`, `answers_json`, `created_at`, `completed`              | Stores raw answers per session     |
| `reports`          | `id`, `session_id`, `total_score`, `risk_level`, `results_json`         | Stores computed scoring results    |
| `leads`            | `id`, `email`, `name`, `score`, `source`, `booked_at`, `status`         | CRM-lite table for lead management |
| `audit_bookings`   | `id`, `lead_id`, `service_tier`, `price`, `stripe_session_id`, `status` | Tracks paid bookings               |
