# SECTION 4 -- READINESS SCORING SPECIFICATION

## 4.1 Overview

The scoring engine evaluates 13 DevOps categories. Each category has a weight, a
set of questions, and per-answer score deductions. The total score is a weighted
average across all categories, normalised to 0--100. Higher is better. The model
is intentionally conservative: most real-world AI-generated apps score between
20 and 55 on first attempt.

## 4.2 Category Weights and Score Bands

| #   | Category                      | Weight | Max Pts | Critical Threshold | Questions | Upsell Trigger       |
| --- | ----------------------------- | ------ | ------- | ------------------ | --------- | -------------------- |
| 1   | CI/CD Pipeline                | 10%    | 10      | < 4                | 4         | < 5 pts → Launch Fix |
| 2   | Secrets Management            | 12%    | 12      | < 4                | 4         | < 6 pts → Audit      |
| 3   | Environment Variables         | 8%     | 8       | < 3                | 3         | < 4 pts → Audit      |
| 4   | Container/Docker Readiness    | 7%     | 7       | < 2                | 3         | < 4 pts → Setup      |
| 5   | Deployment Setup              | 10%    | 10      | < 4                | 4         | < 5 pts → Launch Fix |
| 6   | Monitoring & Logging          | 10%    | 10      | < 3                | 4         | < 5 pts → Care Plan  |
| 7   | Backup & Recovery             | 10%    | 10      | < 3                | 3         | < 5 pts → Launch Fix |
| 8   | Staging/Production Separation | 8%     | 8       | < 3                | 3         | < 4 pts → Setup      |
| 9   | Documentation                 | 5%     | 5       | < 2                | 3         | < 3 pts → Audit      |
| 10  | Security Basics               | 10%    | 10      | < 4                | 4         | < 6 pts → Audit      |
| 11  | Error Handling                | 5%     | 5       | < 2                | 3         | < 3 pts → Launch Fix |
| 12  | Domain & SSL Readiness        | 5%     | 5       | < 2                | 2         | < 3 pts → Launch Fix |
| 13  | Database Production Readiness | 10%    | 10      | < 4                | 4         | < 5 pts → Setup      |

## 4.3 Category 1 -- CI/CD Pipeline (Weight 10%)

| Question                                 | Answer Options                            | Score                             | Risk if No/None |
| ---------------------------------------- | ----------------------------------------- | --------------------------------- | --------------- |
| Do you have any automated build process? | Yes / No                                  | Yes=3, No=0                       | CRITICAL        |
| Where does your CI/CD run?               | GitHub Actions / GitLab CI / None / Other | Actions/GitLab=3, Other=2, None=0 | CRITICAL        |
| Are tests run on every pull request?     | Yes / No / No tests                       | Yes=2, No=1, None=0               | HIGH            |
| Do failed builds block deployment?       | Yes / No                                  | Yes=2, No=0                       | HIGH            |

- Recommendation (score \< 5): "You have no automated deployment safety net. A
  single bad commit will break production with no rollback path. We recommend
  implementing GitHub Actions CI/CD as part of the Launch Fix package."

- Upsell: £500 Production Launch Fix

## 4.4 Category 2 -- Secrets Management (Weight 12%)

| Question                                           | Answer Options        | Score                     | Risk if No/None |
| -------------------------------------------------- | --------------------- | ------------------------- | --------------- |
| Are any API keys or passwords in your GitHub repo? | Yes / No / Not Sure   | No=4, Not Sure=1, Yes=0   | CRITICAL        |
| Do you use environment variables for all secrets?  | Yes / No / Some       | Yes=3, Some=2, No=0       | CRITICAL        |
| Does your hosting platform store secrets securely? | Yes / No / Don't Know | Yes=3, Don't Know=1, No=0 | HIGH            |
| Have you rotated keys since initial setup?         | Yes / No              | Yes=2, No=0               | MEDIUM          |

- Recommendation (score \< 6): "One of the most common AI-app failures is
  leaking production secrets in a public repository. This is an active security
  vulnerability, not a theoretical risk. Book a £99 audit for an immediate
  secrets review."

- Upsell: £99 Audit → leads to £500 Fix

## 4.5 Category 6 -- Monitoring & Logging (Weight 10%)

| Question                                       | Answer Options                         | Score                | Risk if No/None |
| ---------------------------------------------- | -------------------------------------- | -------------------- | --------------- |
| Do you have uptime monitoring?                 | Yes (paid tool) / Yes (free tool) / No | Paid=3, Free=2, No=0 | HIGH            |
| Do you receive alerts when your app goes down? | Yes / No                               | Yes=3, No=0          | HIGH            |
| Are application errors logged and searchable?  | Yes / No / Basic console only          | Yes=2, Basic=1, No=0 | HIGH            |
| Do you review logs at least monthly?           | Yes / No                               | Yes=2, No=0          | MEDIUM          |

- Recommendation (score \< 5): "Without monitoring, you will learn about
  production outages from angry users, not alerts. The DevOps Care Plan includes
  24/7 uptime monitoring and incident alerting."

- Upsell: £500--£1,000/month Care Plan

## 4.6 Category 10 -- Security Basics (Weight 10%)

| Question                                              | Answer Options                        | Score                        | Risk if No/None |
| ----------------------------------------------------- | ------------------------------------- | ---------------------------- | --------------- |
| Is your app served over HTTPS only?                   | Yes / No                              | Yes=3, No=0                  | CRITICAL        |
| Do you have a Web Application Firewall (WAF)?         | Yes / No / Don't Know                 | Yes=2, Don't Know=1, No=0    | HIGH            |
| Are dependency vulnerabilities scanned automatically? | Yes / No                              | Yes=2, No=0                  | HIGH            |
| Do you have rate limiting on your API?                | Yes / No / Partial                    | Yes=2, Partial=1, No=0       | HIGH            |
| Has any security review been performed?               | Yes (professional) / Self-review / No | Professional=3, Self=1, No=0 | HIGH            |

- Recommendation (score \< 6): "Your app is exposed to common web attacks. SQL
  injection, API abuse, and unpatched dependencies are the top attack vectors
  for AI-generated apps. A security audit should happen before you take your
  first paying customer."

- Upsell: £99 Audit

## 4.7 Score Interpretation Table

| Total Score | Risk Level       | Badge Colour | Summary Message                                                                    |
| ----------- | ---------------- | ------------ | ---------------------------------------------------------------------------------- |
| 0--30       | CRITICAL         | Red          | Your app has critical infrastructure gaps. Do not launch to paying users yet.      |
| 31--50      | HIGH RISK        | Amber        | Significant production risks identified. Several issues need urgent attention.     |
| 51--70      | MEDIUM RISK      | Blue         | Some gaps exist. Launching is possible but carries real risk without fixing these. |
| 71--85      | LOW RISK         | Cyan         | Good posture with minor gaps. Monitor closely post-launch.                         |
| 86--100     | PRODUCTION READY | Green        | Strong production readiness. Keep monitoring and schedule quarterly reviews.       |
