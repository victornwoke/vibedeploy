// VibeDeploy — 13-Category Readiness Questionnaire
// Based on Section 4 of the Product Documentation Pack

import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "cicd",
    label: "CI/CD Pipeline",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 4,
    upsellTrigger: 5,
    upsellMessage:
      "You have no automated deployment safety net. A single bad commit will break production with no rollback path. We recommend implementing GitHub Actions CI/CD as part of the Launch Fix package.",
    upsellService: "£500 Production Launch Fix",
    questions: [
      {
        id: "cicd_automated_build",
        text: "Do you have any automated build process?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes", score: 3 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "cicd_platform",
        text: "Where does your CI/CD run?",
        riskIfBad: "critical",
        options: [
          { value: "github_actions", label: "GitHub Actions", score: 3 },
          { value: "gitlab_ci", label: "GitLab CI", score: 3 },
          { value: "other", label: "Other platform", score: 2 },
          { value: "none", label: "None / Not set up", score: 0 },
        ],
      },
      {
        id: "cicd_tests_on_pr",
        text: "Are tests run on every pull request?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 1 },
          { value: "no_tests", label: "No tests exist", score: 0 },
        ],
      },
      {
        id: "cicd_block_failed",
        text: "Do failed builds block deployment?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "secrets",
    label: "Secrets Management",
    weight: 0.12,
    maxPoints: 12,
    criticalThreshold: 4,
    upsellTrigger: 6,
    upsellMessage:
      "One of the most common AI-app failures is leaking production secrets in a public repository. This is an active security vulnerability, not a theoretical risk. Book a £99 audit for an immediate secrets review.",
    upsellService: "£99 Production Readiness Audit",
    questions: [
      {
        id: "secrets_in_repo",
        text: "Are any API keys or passwords stored in your GitHub repository?",
        riskIfBad: "critical",
        options: [
          { value: "no", label: "No — never committed", score: 4 },
          { value: "not_sure", label: "Not sure", score: 1 },
          { value: "yes", label: "Yes", score: 0 },
        ],
      },
      {
        id: "secrets_env_vars",
        text: "Do you use environment variables for all secrets?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — all secrets in env vars", score: 3 },
          { value: "some", label: "Some — partially done", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "secrets_hosting_secure",
        text: "Does your hosting platform store secrets securely (not in code)?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 3 },
          { value: "dont_know", label: "Don't know", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "secrets_rotated",
        text: "Have you rotated API keys since initial setup?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "env_vars",
    label: "Environment Variables",
    weight: 0.08,
    maxPoints: 8,
    criticalThreshold: 3,
    upsellTrigger: 4,
    upsellMessage:
      "Mixing environment configurations is a leading cause of production incidents. A proper staging/production separation with environment variable management is essential before launch.",
    upsellService: "£99 Production Readiness Audit",
    questions: [
      {
        id: "env_staging_prod",
        text: "Do you have separate environment variables for staging and production?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — fully separated", score: 3 },
          { value: "partial", label: "Partially", score: 2 },
          { value: "no", label: "No — same config everywhere", score: 0 },
        ],
      },
      {
        id: "env_example_file",
        text: "Do you have a .env.example file committed to your repository?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes", score: 3 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "env_gitignore",
        text: "Is your .env file listed in .gitignore?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 0 },
          { value: "no_env_file", label: "I don't use a .env file", score: 1 },
        ],
      },
    ],
  },
  {
    id: "docker",
    label: "Container / Docker Readiness",
    weight: 0.07,
    maxPoints: 7,
    criticalThreshold: 2,
    upsellTrigger: 4,
    upsellMessage:
      "Containerisation is not mandatory but significantly improves deployment consistency and scalability. Without it, environment differences between development and production are a common source of failures.",
    upsellService: "£1,500+ Full MVP Production Setup",
    questions: [
      {
        id: "docker_used",
        text: "Is your application containerised with Docker?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — Dockerfile in repo", score: 3 },
          { value: "partial", label: "Partially / In progress", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "docker_compose",
        text: "Do you use Docker Compose for local development?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "docker_registry",
        text: "Are your container images stored in a private registry?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — private registry", score: 2 },
          { value: "public", label: "Public registry", score: 1 },
          { value: "no", label: "No / Not applicable", score: 0 },
        ],
      },
    ],
  },
  {
    id: "deployment",
    label: "Deployment Setup",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 4,
    upsellTrigger: 5,
    upsellMessage:
      "Manual deployments are error-prone and create risk every time you push code. Automated deployment with rollback capability is a baseline production requirement.",
    upsellService: "£500 Production Launch Fix",
    questions: [
      {
        id: "deploy_automated",
        text: "Are deployments automated (not manual FTP or copy-paste)?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — fully automated", score: 3 },
          { value: "partial", label: "Partially automated", score: 2 },
          { value: "no", label: "No — manual deployments", score: 0 },
        ],
      },
      {
        id: "deploy_rollback",
        text: "Can you roll back to a previous version within 10 minutes?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes", score: 3 },
          { value: "not_sure", label: "Not sure", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "deploy_zero_downtime",
        text: "Does your deployment process cause downtime?",
        riskIfBad: "high",
        options: [
          { value: "no_downtime", label: "No — zero-downtime deploys", score: 2 },
          { value: "brief", label: "Brief downtime (< 1 min)", score: 1 },
          { value: "yes", label: "Yes — significant downtime", score: 0 },
        ],
      },
      {
        id: "deploy_preview",
        text: "Do you have preview / staging deployments before production?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No — deploy straight to production", score: 0 },
        ],
      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & Logging",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 3,
    upsellTrigger: 5,
    upsellMessage:
      "Without monitoring, you will learn about production outages from angry users, not alerts. The DevOps Care Plan includes 24/7 uptime monitoring and incident alerting.",
    upsellService: "£500–£1,000/month DevOps Care Plan",
    questions: [
      {
        id: "monitoring_uptime",
        text: "Do you have uptime monitoring for your application?",
        riskIfBad: "high",
        options: [
          { value: "paid", label: "Yes — paid monitoring tool", score: 3 },
          { value: "free", label: "Yes — free tool (UptimeRobot etc.)", score: 2 },
          { value: "no", label: "No monitoring", score: 0 },
        ],
      },
      {
        id: "monitoring_alerts",
        text: "Do you receive alerts when your app goes down?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — immediate alerts", score: 3 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "monitoring_error_logs",
        text: "Are application errors logged and searchable?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — structured logging (Sentry, Datadog etc.)", score: 2 },
          { value: "basic", label: "Basic console logs only", score: 1 },
          { value: "no", label: "No logging", score: 0 },
        ],
      },
      {
        id: "monitoring_review",
        text: "Do you review logs and metrics at least monthly?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — regular review", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "backup",
    label: "Backup & Recovery",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 3,
    upsellTrigger: 5,
    upsellMessage:
      "Data loss is permanent. Without automated backups and a tested recovery plan, a single database failure can end your business. This is a critical gap that must be addressed before launch.",
    upsellService: "£500 Production Launch Fix",
    questions: [
      {
        id: "backup_automated",
        text: "Are your database backups automated?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — automated daily backups", score: 4 },
          { value: "manual", label: "Manual backups only", score: 2 },
          { value: "no", label: "No backups", score: 0 },
        ],
      },
      {
        id: "backup_tested",
        text: "Have you tested your backup restoration process?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — tested and documented", score: 3 },
          { value: "no", label: "No — never tested", score: 0 },
        ],
      },
      {
        id: "backup_offsite",
        text: "Are backups stored in a separate location from your primary data?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — offsite/separate region", score: 3 },
          { value: "no", label: "No — same location", score: 0 },
        ],
      },
    ],
  },
  {
    id: "staging",
    label: "Staging / Production Separation",
    weight: 0.08,
    maxPoints: 8,
    criticalThreshold: 3,
    upsellTrigger: 4,
    upsellMessage:
      "Testing directly in production is one of the most common causes of user-facing incidents. A proper staging environment is essential for safe deployments.",
    upsellService: "£1,500+ Full MVP Production Setup",
    questions: [
      {
        id: "staging_env",
        text: "Do you have a separate staging environment?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — full staging environment", score: 3 },
          { value: "local", label: "Local development only", score: 1 },
          { value: "no", label: "No — test in production", score: 0 },
        ],
      },
      {
        id: "staging_db",
        text: "Does your staging environment use a separate database from production?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — separate databases", score: 3 },
          { value: "no", label: "No — shared database", score: 0 },
          { value: "no_staging", label: "No staging environment", score: 0 },
        ],
      },
      {
        id: "staging_deploy_first",
        text: "Do you always deploy to staging before production?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — always", score: 2 },
          { value: "sometimes", label: "Sometimes", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "documentation",
    label: "Documentation",
    weight: 0.05,
    maxPoints: 5,
    criticalThreshold: 2,
    upsellTrigger: 3,
    upsellMessage:
      "Without documentation, your infrastructure knowledge lives only in your head. When something breaks at 2am, you need runbooks and architecture docs to recover quickly.",
    upsellService: "£99 Production Readiness Audit",
    questions: [
      {
        id: "docs_readme",
        text: "Does your repository have a README with deployment instructions?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — comprehensive README", score: 2 },
          { value: "basic", label: "Basic README only", score: 1 },
          { value: "no", label: "No README", score: 0 },
        ],
      },
      {
        id: "docs_runbook",
        text: "Do you have a runbook or incident response guide?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — documented runbook", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "docs_architecture",
        text: "Is your system architecture documented?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — architecture diagram/doc", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "security",
    label: "Security Basics",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 4,
    upsellTrigger: 6,
    upsellMessage:
      "Your app is exposed to common web attacks. SQL injection, API abuse, and unpatched dependencies are the top attack vectors for AI-generated apps. A security audit should happen before you take your first paying customer.",
    upsellService: "£99 Production Readiness Audit",
    questions: [
      {
        id: "security_https",
        text: "Is your application served over HTTPS only?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — HTTPS enforced", score: 3 },
          { value: "no", label: "No — HTTP accessible", score: 0 },
        ],
      },
      {
        id: "security_waf",
        text: "Do you have a Web Application Firewall (WAF)?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "dont_know", label: "Don't know", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "security_deps",
        text: "Are dependency vulnerabilities scanned automatically?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — automated scanning", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "security_rate_limit",
        text: "Do you have rate limiting on your API endpoints?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — rate limiting enabled", score: 2 },
          { value: "partial", label: "Partial / Some endpoints", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "security_review",
        text: "Has any security review been performed on your app?",
        riskIfBad: "high",
        options: [
          { value: "professional", label: "Yes — professional review", score: 3 },
          { value: "self", label: "Self-review only", score: 1 },
          { value: "no", label: "No review", score: 0 },
        ],
      },
    ],
  },
  {
    id: "error_handling",
    label: "Error Handling",
    weight: 0.05,
    maxPoints: 5,
    criticalThreshold: 2,
    upsellTrigger: 3,
    upsellMessage:
      "Unhandled errors crash your app silently. Without proper error boundaries and user-facing error messages, users experience blank screens with no explanation or recovery path.",
    upsellService: "£500 Production Launch Fix",
    questions: [
      {
        id: "error_boundaries",
        text: "Does your frontend have error boundaries to prevent full-page crashes?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "error_user_messages",
        text: "Do users see helpful error messages (not raw stack traces)?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — friendly error pages", score: 2 },
          { value: "partial", label: "Sometimes", score: 1 },
          { value: "no", label: "No — raw errors shown", score: 0 },
        ],
      },
      {
        id: "error_tracked",
        text: "Are errors automatically tracked and reported?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — Sentry or similar", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "domain_ssl",
    label: "Domain & SSL Readiness",
    weight: 0.05,
    maxPoints: 5,
    criticalThreshold: 2,
    upsellTrigger: 3,
    upsellMessage:
      "A custom domain with valid SSL is the minimum bar for a credible production application. Without it, browsers will warn users their connection is not secure.",
    upsellService: "£500 Production Launch Fix",
    questions: [
      {
        id: "domain_custom",
        text: "Does your app use a custom domain (not a platform subdomain)?",
        riskIfBad: "medium",
        options: [
          { value: "yes", label: "Yes — custom domain", score: 3 },
          { value: "no", label: "No — platform subdomain only", score: 0 },
        ],
      },
      {
        id: "domain_ssl_valid",
        text: "Is your SSL certificate valid and auto-renewing?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — auto-renewing SSL", score: 2 },
          { value: "manual", label: "Manual renewal", score: 1 },
          { value: "no", label: "No SSL / HTTP only", score: 0 },
        ],
      },
    ],
  },
  {
    id: "database",
    label: "Database Production Readiness",
    weight: 0.10,
    maxPoints: 10,
    criticalThreshold: 4,
    upsellTrigger: 5,
    upsellMessage:
      "Your database is the most critical part of your production stack. Without connection pooling, proper indexing, and access controls, database failures will be your first production incident.",
    upsellService: "£1,500+ Full MVP Production Setup",
    questions: [
      {
        id: "db_connection_pool",
        text: "Does your database use connection pooling?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes", score: 3 },
          { value: "dont_know", label: "Don't know", score: 1 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "db_access_control",
        text: "Does your database have access controls (not open to the internet)?",
        riskIfBad: "critical",
        options: [
          { value: "yes", label: "Yes — restricted access", score: 3 },
          { value: "partial", label: "Partially restricted", score: 1 },
          { value: "no", label: "No — publicly accessible", score: 0 },
        ],
      },
      {
        id: "db_migrations",
        text: "Do you use database migrations (not manual schema changes)?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — migration files in repo", score: 2 },
          { value: "no", label: "No — manual changes", score: 0 },
        ],
      },
      {
        id: "db_load_tested",
        text: "Has your database been tested under expected production load?",
        riskIfBad: "high",
        options: [
          { value: "yes", label: "Yes — load tested", score: 2 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
];

export const CATEGORY_COUNT = CATEGORIES.length;
