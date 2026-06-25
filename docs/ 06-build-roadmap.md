
# SECTION 6 --- BUILD ROADMAP

**6.1 Phased Roadmap Overview**

  ----------- ----------------- -------------- -------------------------------
  **Phase**   **Name**          **Duration**   **Goal**

  Phase 0     Planning & Repo   1 day          Repository, tooling,
              Setup                            environment ready

  Phase 1     Landing Page      2--3 days      Homepage live and indexed

  Phase 2     Checker Form      2--3 days      Multi-step form with state
                                               management

  Phase 3     Scoring Engine    1--2 days      Questions, weights, and scoring
                                               logic

  Phase 4     Report Results    2--3 days      Score display, badges,
                                               recommendations

  Phase 5     Services & Case   1--2 days      Pricing page and case study
              Studies                          content

  Phase 6     Portfolio         1 day          victornwoke.com cross-links
              Integration                      

  Phase 7     Deployment        1 day          Live on custom subdomain with
                                               CI/CD

  Phase 8     Outreach &        Ongoing        LinkedIn, Reddit, ProductHunt
              Monetisation                     

  Phase 9     Version 2         4--6 weeks     Auth, saved reports, Stripe, AI
              Features                         summaries
  ----------- ----------------- -------------- -------------------------------

**6.2 Phase 0 --- Planning & Repo Setup**

- Create GitHub repository: VibeDeploy (public or private)

- Scaffold project with Vite + React + TypeScript: npm create
  vite@latest

- Install dependencies: Tailwind CSS, shadcn/ui, Framer Motion, React
  Router, Zustand

- Configure tailwind.config.ts with VibeDeploy colour palette

- Create .env.example with placeholder variable comments

- Add .gitignore, README.md with project overview

- Set up ESLint + Prettier configuration

- Create GitHub Actions ci.yml workflow

**Commit message**

chore: scaffold VibeDeploy with Vite, React, TypeScript, Tailwind,
shadcn

**Acceptance criteria**

npm run dev loads a blank Vite page. npm run build completes without
errors. ESLint runs with zero warnings.

**6.3 Phase 1 --- Landing Page**

- Create Navbar component with logo, nav links, and CTA button

- Create Hero section with headline, sub-headline, and dual CTAs

- Create Problem section with 3 risk cards

- Create HowItWorks section with 3-step process

- Create Services summary section (condensed, links to /services)

- Create FounderProof section with credentials and victornwoke.com link

- Create Footer component with links and portfolio reference

- Connect all sections in Home.tsx page

- Add React Router with routes for all 7 pages

**Commit message**

feat: add homepage with hero, problem, how-it-works, and footer sections

**Acceptance criteria**

Homepage renders all sections on desktop and mobile. All navigation
links route correctly. CTA button links to /checker. Lighthouse
performance score ≥ 85.

**6.4 Phase 2 --- Checker Form**

- Create checkerStore.ts with Zustand (currentCategory, answers,
  isComplete)

- Create useCheckerPersist hook to sync store to localStorage

- Create questions.ts with all 13 categories and question definitions

- Create CheckerForm component with category-by-category rendering

- Create CategoryCard component with question list and answer inputs

- Create ProgressBar component showing completion percentage

- Create NavigationButtons component (Back / Next / Submit)

- Add email capture on final step

- Route /checker to Checker.tsx page

**Commit message**

feat: implement multi-step checker form with 13 category questionnaire
and state persistence

**Acceptance criteria**

User can complete all 13 categories. State persists on browser refresh.
Clicking Submit navigates to /report with answers encoded in URL query
parameters.

**6.5 Phase 3 --- Scoring Engine**

- Create engine.ts with calculateScore(answers) pure function

- Create recommendations.ts with per-answer recommendation text

- Implement category-level scoring with deduction logic

- Implement weighted total score calculation

- Write unit tests for scoring edge cases (all-yes, all-no, mixed)

- Add getRiskLevel() helper function

**Commit message**

feat: implement production readiness scoring engine with 13 category
weights and risk levels

**Acceptance criteria**

All-yes answers produce a score ≥ 85. All-no answers produce a score ≤
25. Unit tests pass. TypeScript compiles with no errors.

**6.6 Phase 4 --- Report Results**

- Create ScoreGauge component with animated SVG arc (Framer Motion)

- Create RiskBadge component with colour and icon

- Create CategoryAccordion component with per-category score and
  recommendations

- Create BookingCTA component (sticky sidebar desktop / fixed bottom
  mobile)

- Read URL query params or Zustand store to populate report data

- Add share button to copy current URL

**Commit message**

feat: build report results page with animated score gauge, risk badges,
and category breakdown

**Acceptance criteria**

Score gauge animates from 0 to final score. All 13 categories show
score, badge, and recommendation. Booking CTA links to contact page or
Calendly. URL sharing works correctly.

**6.7 Phase 7 --- Deployment**

- Add deploy.yml GitHub Actions workflow for Vercel deployment

- Set VERCEL_TOKEN and VERCEL_ORG_ID in GitHub repository secrets

- Configure custom domain vibedeploy.victornwoke.com in Vercel dashboard

- Add DNS CNAME record pointing to Vercel

- Test HTTPS, www redirect, and all page routes on live domain

- Submit sitemap to Google Search Console

- Add OG meta tags for social sharing

**Commit message**

chore: configure Vercel deployment with GitHub Actions and custom
subdomain

**Acceptance criteria**

vibedeploy.victornwoke.com loads over HTTPS. All 7 pages resolve
correctly. GitHub Actions deploy workflow passes. Google Search Console
shows domain is indexable.
