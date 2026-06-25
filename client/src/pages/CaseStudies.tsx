// VibeDeploy Case Studies Page
// Design: Dark DevOps Command Centre

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Shield, Zap, Server, Activity, ExternalLink } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "saas-secrets",
    icon: Shield,
    colour: "#EF4444",
    tag: "Secrets Management",
    title: "SaaS Founder Discovers 3 API Keys Committed to GitHub",
    summary:
      "A solo founder building a B2B SaaS with Lovable scored 31/100 on the VibeDeploy checker. The audit revealed three live API keys committed to their public repository — including their Stripe secret key.",
    problem:
      "The founder had used Lovable to build an MVP quickly and pushed to GitHub without reviewing what the AI had generated. Three API keys, including a live Stripe secret key, were in plain text in the codebase.",
    solution:
      "Victor immediately rotated all exposed keys, implemented a secrets management strategy using environment variables, added a .gitignore to prevent future commits, and set up GitHub secret scanning alerts.",
    outcome: "Prevented potential financial fraud. Stripe key rotation completed within 2 hours of discovery.",
    service: "Production Readiness Audit (£99)",
    score: { before: 31, after: 74 },
  },
  {
    id: "no-backups",
    icon: Server,
    colour: "#F59E0B",
    tag: "Backup & Recovery",
    title: "E-Commerce App Had Zero Database Backups for 6 Months",
    summary:
      "A Bolt-generated e-commerce app had been running in production for 6 months with no automated backups. The founder assumed their hosting provider handled it automatically.",
    problem:
      "The app was deployed on a VPS with a self-managed PostgreSQL instance. No backup strategy was in place. A single disk failure would have meant complete data loss for 200+ customers.",
    solution:
      "Victor set up automated daily backups to S3, implemented point-in-time recovery, tested the restoration process, and documented the recovery procedure in a runbook.",
    outcome: "Automated backups running. Recovery tested and documented. Founder now has peace of mind.",
    service: "Production Launch Fix (£500)",
    score: { before: 42, after: 81 },
  },
  {
    id: "no-monitoring",
    icon: Activity,
    colour: "#06B6D4",
    tag: "Monitoring & Alerting",
    title: "App Was Down for 14 Hours Before the Founder Found Out",
    summary:
      "A Cursor-built productivity app went down on a Friday evening. The founder discovered the outage on Monday morning via a Twitter DM from a frustrated user.",
    problem:
      "No uptime monitoring, no error tracking, no alerting. The app had been down for 14 hours over a weekend. The founder had no visibility into their production environment.",
    solution:
      "Victor set up UptimeRobot for uptime monitoring, integrated Sentry for error tracking, configured Slack alerts for downtime and high error rates, and created a basic incident response runbook.",
    outcome: "Next outage (3 weeks later) was detected in 4 minutes. Resolved before any user noticed.",
    service: "Production Launch Fix (£500)",
    score: { before: 38, after: 77 },
  },
  {
    id: "full-setup",
    icon: Zap,
    colour: "#7C3AED",
    tag: "Full MVP Setup",
    title: "AI-Generated Fintech App Gets Production-Grade Infrastructure",
    summary:
      "A fintech startup built their MVP with an AI coding assistant and needed to onboard their first paying customers. They scored 28/100 on the checker with 4 critical gaps.",
    problem:
      "No CI/CD pipeline, secrets hardcoded, no staging environment, no monitoring, no backup strategy, and no SSL enforcement. The app was technically functional but not safe for real users.",
    solution:
      "Victor delivered the Full MVP Production Setup: GitHub Actions CI/CD, staging/production separation, secrets management via environment variables, monitoring with Datadog, automated backups, and comprehensive documentation.",
    outcome: "Onboarded first 50 paying customers 3 weeks after engagement. Zero production incidents in first 6 months.",
    service: "Full MVP Production Setup (£1,500)",
    score: { before: 28, after: 89 },
  },
];

function ScoreChange({ before, after }: { before: number; after: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-center">
        <p
          className="text-2xl font-black"
          style={{ color: before < 40 ? "#EF4444" : before < 60 ? "#F59E0B" : "#06B6D4" }}
        >
          {before}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Before</p>
      </div>
      <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
      <div className="text-center">
        <p
          className="text-2xl font-black"
          style={{ color: after >= 80 ? "#10B981" : "#06B6D4" }}
        >
          {after}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>After</p>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#0F0F1A" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(124, 58, 237, 0.12)",
                border: "1px solid rgba(124, 58, 237, 0.25)",
                color: "#A855F7",
              }}
            >
              Case Studies
            </div>
            <h1
              className="font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white", maxWidth: "700px" }}
            >
              Real gaps found in
              <br />
              <span className="gradient-text">real AI-generated apps.</span>
            </h1>
            <p className="max-w-xl" style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
              These are representative scenarios based on common patterns Victor has seen across AI-generated codebases. Details have been anonymised.
            </p>
          </div>
        </section>

        {/* Case studies */}
        <section className="pb-20" style={{ backgroundColor: "#0F0F1A" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(30, 27, 75, 0.4)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Header */}
                <div
                  className="p-6 md:p-8"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${cs.colour}15`, border: `1px solid ${cs.colour}30` }}
                    >
                      <cs.icon size={22} style={{ color: cs.colour }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: `${cs.colour}15`,
                            border: `1px solid ${cs.colour}30`,
                            color: cs.colour,
                          }}
                        >
                          {cs.tag}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {cs.service}
                        </span>
                      </div>
                      <h2 className="font-bold mb-2" style={{ color: "white", fontSize: "1.125rem" }}>
                        {cs.title}
                      </h2>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {cs.summary}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <ScoreChange before={cs.score.before} after={cs.score.after} />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      The Problem
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {cs.problem}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      The Solution
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {cs.solution}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      The Outcome
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {cs.outcome}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: "#0a0a14" }}>
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-bold mb-4" style={{ color: "white", fontSize: "1.75rem" }}>
              Could your app have similar gaps?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Most AI-generated apps score between 20 and 55 on first attempt. Find out where you stand in 5 minutes.
            </p>
            <Link
              href="/checker"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white rounded-xl btn-primary"
            >
              Check My App Now — It's Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
