// VibeDeploy Scoring Engine
// Pure TypeScript functions - no side effects, fully unit-testable
// Based on Section 4 of the Product Documentation Pack

import { CATEGORIES } from "./questions";
import type {
  CheckerAnswers,
  CategoryScore,
  ScoringResult,
  RiskLevel,
  Finding,
} from "./types";

/**
 * Determine risk level from a normalised score (0–100)
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score <= 30) return "critical";
  if (score <= 50) return "high";
  if (score <= 70) return "medium";
  if (score <= 85) return "low";
  return "pass";
}

/**
 * Get the display label for a risk level
 */
export function getRiskLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    critical: "CRITICAL",
    high: "HIGH RISK",
    medium: "MEDIUM RISK",
    low: "LOW RISK",
    pass: "PRODUCTION READY",
  };
  return labels[level];
}

/**
 * Get the colour hex for a risk level
 */
export function getRiskColour(level: RiskLevel): string {
  const colours: Record<RiskLevel, string> = {
    critical: "#EF4444",
    high: "#F59E0B",
    medium: "#60A5FA",
    low: "#06B6D4",
    pass: "#10B981",
  };
  return colours[level];
}

/**
 * Get the icon character for a risk level
 */
export function getRiskIcon(level: RiskLevel): string {
  const icons: Record<RiskLevel, string> = {
    critical: "✕",
    high: "⚠",
    medium: "⚑",
    low: "↑",
    pass: "✓",
  };
  return icons[level];
}

/**
 * Get the summary message for a risk level
 */
export function getRiskSummary(level: RiskLevel, score: number): string {
  const messages: Record<RiskLevel, string> = {
    critical: `You scored ${score}/100. Your app has critical infrastructure gaps. Do not launch to paying customers yet.`,
    high: `You scored ${score}/100. Significant production risks identified. Several issues need urgent attention before launch.`,
    medium: `You scored ${score}/100. Some gaps exist. Launching is possible but carries real risk without fixing these issues.`,
    low: `You scored ${score}/100. Good posture with minor gaps. Monitor closely post-launch and address remaining issues.`,
    pass: `You scored ${score}/100. Strong production readiness. Keep monitoring and schedule quarterly reviews.`,
  };
  return messages[level];
}

/**
 * Calculate the score for a single category
 */
export function calculateCategoryScore(
  categoryId: string,
  answers: CheckerAnswers[string] | undefined
): CategoryScore {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    throw new Error(`Unknown category: ${categoryId}`);
  }

  let rawScore = 0;
  const findings: Finding[] = [];

  for (const question of category.questions) {
    const answer = answers?.[question.id] ?? null;
    const selectedOption = question.options.find((o) => o.value === answer);
    const points = selectedOption?.score ?? 0;
    rawScore += points;

    // Only add a finding if the answer is not the best possible answer
    const maxOptionScore = Math.max(...question.options.map((o) => o.score));
    if (points < maxOptionScore) {
      findings.push({
        questionId: question.id,
        questionText: question.text,
        answer,
        riskLevel: question.riskIfBad,
        recommendation: getQuestionRecommendation(categoryId, question.id, answer),
      });
    }
  }

  const normalisedScore = Math.round((rawScore / category.maxPoints) * 100);
  const riskLevel = getRiskLevel(normalisedScore);

  return {
    id: category.id,
    label: category.label,
    score: normalisedScore,
    rawScore,
    maxScore: category.maxPoints,
    weight: category.weight,
    riskLevel,
    findings,
    upsell: rawScore < category.upsellTrigger ? category.upsellMessage : "",
    upsellService: rawScore < category.upsellTrigger ? category.upsellService : "",
  };
}

/**
 * Main scoring function - accepts all answers, returns full ScoringResult
 */
export function calculateScore(answers: CheckerAnswers): ScoringResult {
  const categoryScores: CategoryScore[] = [];
  let weightedTotal = 0;
  let criticalCount = 0;
  let highCount = 0;

  for (const category of CATEGORIES) {
    const categoryAnswers = answers[category.id];
    const categoryScore = calculateCategoryScore(category.id, categoryAnswers);
    categoryScores.push(categoryScore);

    // Weighted contribution to total
    weightedTotal += (categoryScore.score / 100) * category.weight;

    if (categoryScore.riskLevel === "critical") criticalCount++;
    if (categoryScore.riskLevel === "high") highCount++;
  }

  // Normalise to 0–100
  const totalScore = Math.round(weightedTotal * 100);
  const overallRisk = getRiskLevel(totalScore);

// Collect top recommendations from worst categories
   const topRecommendations: string[] = categoryScores
     .filter((c) => c.upsell)
     .sort((a, b) => a.score - b.score)
     .slice(0, 3)
     .map((c) => c.upsell!)
     .filter((u): u is string => Boolean(u));

  // Suggest the most relevant service
  const suggestedService = getSuggestedService(totalScore, criticalCount, categoryScores);

  return {
    totalScore,
    overallRisk,
    categories: categoryScores,
    categoryScores,
    criticalCount,
    highCount,
    topRecommendations,
    suggestedService,
  };
}

/**
 * Determine the most relevant service to suggest based on results
 */
function getSuggestedService(
  totalScore: number,
  criticalCount: number,
  categories: CategoryScore[]
): string {
  if (totalScore < 30 || criticalCount >= 3) {
    return "£99 Production Readiness Audit";
  }
  if (totalScore < 50) {
    return "£500 Production Launch Fix";
  }
  if (totalScore < 70) {
    return "£1,500+ Full MVP Production Setup";
  }
  // Check if monitoring is weak - suggest care plan
  const monitoringCat = categories.find((c) => c.id === "monitoring");
  if (monitoringCat && monitoringCat.score < 50) {
    return "£500–£1,000/month DevOps Care Plan";
  }
  return "£99 Production Readiness Audit";
}

/**
 * Per-question recommendation copy
 */
function getQuestionRecommendation(
  categoryId: string,
  questionId: string,
  answer: string | null
): string {
  const recommendations: Record<string, string> = {
    "cicd_automated_build": "Set up a basic CI pipeline using GitHub Actions. Even a simple build-and-test workflow catches regressions before they reach production.",
    "cicd_platform": "GitHub Actions is the recommended CI/CD platform for most projects - it's free for public repos and integrates directly with your codebase.",
    "cicd_tests_on_pr": "Add automated tests that run on every pull request. Start with smoke tests and critical path tests if you have no test suite yet.",
    "cicd_block_failed": "Configure your CI pipeline to block merges when builds or tests fail. This prevents broken code from reaching production.",
    "secrets_in_repo": "Immediately audit your repository history for committed secrets using tools like git-secrets or GitHub's secret scanning. Rotate any exposed keys immediately.",
    "secrets_env_vars": "Move all API keys, passwords, and tokens to environment variables. Never hardcode credentials in source code.",
    "secrets_hosting_secure": "Use your hosting platform's built-in secrets management (Vercel environment variables, AWS Secrets Manager, Azure Key Vault) to store sensitive values.",
    "secrets_rotated": "Rotate all API keys and passwords, especially if they were ever committed to version control or shared in plain text.",
    "env_staging_prod": "Create separate .env files for each environment and use your CI/CD platform to inject the correct values at build time.",
    "env_example_file": "Add a .env.example file to your repository with placeholder values and comments explaining each variable.",
    "env_gitignore": "Add .env, .env.local, and .env.*.local to your .gitignore immediately. Check your git history for any accidentally committed env files.",
    "docker_used": "Consider containerising your application with Docker for consistent deployments across environments.",
    "docker_compose": "Use Docker Compose for local development to ensure your team runs the same environment configuration.",
    "docker_registry": "Store container images in a private registry (GitHub Container Registry, AWS ECR, or Azure Container Registry) to prevent unauthorised access.",
    "deploy_automated": "Set up automated deployments using GitHub Actions or your CI/CD platform. Manual deployments introduce human error and slow down your release cycle.",
    "deploy_rollback": "Ensure you can roll back to the previous version within minutes. Vercel and most platforms support instant rollbacks from the dashboard.",
    "deploy_zero_downtime": "Implement blue-green or rolling deployments to eliminate deployment downtime. Most modern platforms support this out of the box.",
    "deploy_preview": "Use preview deployments (Vercel, Netlify, or GitHub Actions) to test changes before they reach production.",
    "monitoring_uptime": "Set up uptime monitoring immediately. UptimeRobot (free) or Better Uptime (paid) will alert you when your app goes down.",
    "monitoring_alerts": "Configure alerts to notify you via email, Slack, or SMS when your app goes down or performance degrades.",
    "monitoring_error_logs": "Integrate Sentry (free tier available) for automatic error tracking and alerting. It takes 30 minutes to set up and will save you hours of debugging.",
    "monitoring_review": "Schedule a monthly infrastructure review to check error rates, uptime, and performance metrics.",
    "backup_automated": "Enable automated daily backups on your database. Supabase, PlanetScale, and most managed databases offer this by default - ensure it's turned on.",
    "backup_tested": "Test your backup restoration process now, before you need it. Document the steps so you can recover quickly under pressure.",
    "backup_offsite": "Store backups in a different cloud region or provider from your primary database to protect against regional outages.",
    "staging_env": "Create a staging environment that mirrors production. This is the single most effective way to catch issues before they affect real users.",
    "staging_db": "Use a separate database for staging. Never test against production data - a single mistake can corrupt or delete real user data.",
    "staging_deploy_first": "Always deploy to staging first and verify the deployment before pushing to production.",
    "docs_readme": "Write a comprehensive README with setup instructions, environment variable documentation, and deployment steps.",
    "docs_runbook": "Create an incident response runbook documenting how to handle common failures: database down, deployment failed, high error rate.",
    "docs_architecture": "Document your system architecture - even a simple diagram showing your frontend, backend, database, and third-party services is valuable.",
    "security_https": "Enforce HTTPS on all endpoints. Redirect HTTP to HTTPS and set HSTS headers. Most hosting platforms handle this automatically.",
    "security_waf": "Consider adding a WAF through Cloudflare (free tier available) to protect against common web attacks.",
    "security_deps": "Enable GitHub Dependabot or Snyk to automatically scan for vulnerable dependencies and create pull requests with fixes.",
    "security_rate_limit": "Implement rate limiting on all API endpoints to prevent abuse and brute-force attacks.",
    "security_review": "Book a security review before launching to paying customers. Even a basic audit will identify the most critical vulnerabilities.",
    "error_boundaries": "Add React Error Boundaries to prevent a single component crash from taking down your entire application.",
    "error_user_messages": "Implement user-friendly error pages and messages. Never show raw stack traces or technical error details to end users.",
    "error_tracked": "Integrate Sentry for automatic error tracking. It captures unhandled exceptions and provides stack traces for debugging.",
    "domain_custom": "Register a custom domain for your application. A custom domain is essential for professional credibility and brand trust.",
    "domain_ssl_valid": "Ensure your SSL certificate is valid and set to auto-renew. An expired certificate will block all users from accessing your app.",
    "db_connection_pool": "Enable connection pooling (PgBouncer, Supabase connection pooler) to prevent database connection exhaustion under load.",
    "db_access_control": "Restrict database access to only your application servers. Never expose your database directly to the internet.",
    "db_migrations": "Use a migration tool (Prisma Migrate, Flyway, Alembic) to manage schema changes. Never make manual database changes in production.",
    "db_load_tested": "Load test your database with expected production traffic before launch. Tools like k6 or Artillery can simulate concurrent users.",
  };

  return recommendations[questionId] ?? "Review this area and implement best practices before launching to production.";
}

/**
 * Encode answers to a URL-safe string for sharing
 */
export function encodeAnswers(answers: CheckerAnswers): string {
  try {
    return btoa(JSON.stringify(answers));
  } catch {
    return "";
  }
}

/**
 * Decode answers from a URL-safe string
 */
export function decodeAnswers(encoded: string): CheckerAnswers | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}
