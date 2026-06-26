// VibeDeploy Services & Pricing Page
// Design: Dark DevOps Command Centre

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Server,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react";

const SERVICES = [
  {
    id: "audit",
    price: "£99",
    title: "Production Readiness Audit",
    tagline: "Know exactly what's broken before you launch",
    description:
      "Victor manually reviews your checker results and delivers a written traffic-light report with a 30-minute findings call. You'll know exactly what to fix and in what order.",
    delivery: "48–72 hours",
    icon: Shield,
    colour: "#06B6D4",
    highlight: false,
    includes: [
      "Manual review of your checker answers",
      "Written traffic-light report (PDF)",
      "Prioritised fix list with effort estimates",
      "30-minute findings call with Victor",
      "Follow-up Q&A by email",
    ],
    notIncluded: [
      "Hands-on infrastructure work",
      "Code changes or deployments",
    ],
    cta: "Book Audit",
  },
  {
    id: "fix",
    price: "£500",
    title: "Production Launch Fix",
    tagline: "Victor fixes your top 3 critical gaps",
    description:
      "Victor identifies and fixes your three most critical infrastructure issues. Typically covers CI/CD pipeline, secrets management, SSL configuration, and basic monitoring setup.",
    delivery: "5–7 business days",
    icon: Zap,
    colour: "#7C3AED",
    highlight: true,
    includes: [
      "Everything in the Audit",
      "Fix top 3 critical infrastructure issues",
      "CI/CD pipeline setup (GitHub Actions)",
      "Secrets management implementation",
      "Basic uptime monitoring setup",
      "SSL/HTTPS enforcement",
      "Handover documentation",
    ],
    notIncluded: [
      "Full infrastructure overhaul",
      "Ongoing maintenance",
    ],
    cta: "Book Launch Fix",
  },
  {
    id: "mvp",
    price: "£1,500+",
    title: "Full MVP Production Setup",
    tagline: "Complete DevOps infrastructure from scratch",
    description:
      "Victor builds your complete production infrastructure: CI/CD, secrets management, staging/production separation, monitoring, alerting, backup strategy, and documentation.",
    delivery: "2–4 weeks",
    icon: Server,
    colour: "#10B981",
    highlight: false,
    includes: [
      "Everything in Launch Fix",
      "Full CI/CD pipeline with staging + production",
      "Environment separation (dev/staging/prod)",
      "Comprehensive secrets management",
      "Monitoring, alerting, and dashboards",
      "Automated backup and recovery testing",
      "Security hardening review",
      "Full runbook documentation",
      "1-month post-launch support",
    ],
    notIncluded: [],
    cta: "Book MVP Setup",
  },
  {
    id: "care",
    price: "£500–£1k/mo",
    title: "DevOps Care Plan",
    tagline: "Victor as your on-call DevOps team",
    description:
      "Monthly retainer where Victor acts as your DevOps team. Covers monitoring, deployments, cost reviews, incident response, and quarterly infrastructure health checks.",
    delivery: "Monthly retainer",
    icon: Activity,
    colour: "#F59E0B",
    highlight: false,
    includes: [
      "Monthly infrastructure health review",
      "Deployment support and oversight",
      "Incident response (priority SLA)",
      "Monthly cost optimisation review",
      "Quarterly security scan",
      "Unlimited email/Slack support",
      "Access to new VibeDeploy tools",
    ],
    notIncluded: [],
    cta: "Book Care Plan",
  },
];

const COMPARISON_ROWS = [
  { label: "Written report", audit: true, fix: true, mvp: true, care: true },
  { label: "30-min findings call", audit: true, fix: true, mvp: true, care: true },
  { label: "Hands-on infrastructure work", audit: false, fix: true, mvp: true, care: true },
  { label: "CI/CD pipeline setup", audit: false, fix: true, mvp: true, care: true },
  { label: "Secrets management", audit: false, fix: true, mvp: true, care: true },
  { label: "Staging/prod separation", audit: false, fix: false, mvp: true, care: true },
  { label: "Monitoring & alerting", audit: false, fix: "Basic", mvp: true, care: true },
  { label: "Backup strategy", audit: false, fix: false, mvp: true, care: true },
  { label: "Full documentation", audit: false, fix: false, mvp: true, care: true },
  { label: "Ongoing support", audit: false, fix: false, mvp: "1 month", care: true },
  { label: "Monthly health review", audit: false, fix: false, mvp: false, care: true },
  { label: "Incident response", audit: false, fix: false, mvp: false, care: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 size={16} style={{ color: "#10B981", margin: "0 auto" }} aria-label="Included" />;
  if (value === false) return <span style={{ color: "var(--vd-faint)", display: "block", textAlign: "center" }} aria-label="Not included">—</span>;
  return <span style={{ color: "#06B6D4", fontSize: "0.75rem", display: "block", textAlign: "center" }}>{value}</span>;
}

export default function Services() {
  return (
    <div style={{ backgroundColor: "var(--vd-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "var(--vd-bg)" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(124, 58, 237, 0.12)",
                border: "1px solid rgba(124, 58, 237, 0.25)",
                color: "#A855F7",
              }}
            >
              Services & Pricing
            </div>
            <h1
              className="font-bold mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--vd-heading)" }}
            >
              Four ways to go from risky
              <br />
              <span className="gradient-text">to production-ready.</span>
            </h1>
            <p className="max-w-xl mx-auto mb-8" style={{ color: "var(--vd-muted)", fontSize: "1rem" }}>
              Start with the free checker to understand your gaps, then choose the service that matches your timeline and budget.
            </p>
            <Link
              href="/checker"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-lg btn-primary"
            >
              Take the Free Checker First
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-12" style={{ backgroundColor: "var(--vd-section)" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  className="p-7 rounded-2xl flex flex-col"
                  style={{
                    background: s.highlight
                      ? "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(37, 99, 235, 0.12))"
                      : "var(--vd-panel)",
                    border: s.highlight
                      ? "1px solid rgba(124, 58, 237, 0.4)"
                      : "1px solid var(--vd-border)",
                    boxShadow: s.highlight ? "0 0 40px rgba(124, 58, 237, 0.12)" : "none",
                  }}
                >
                  {s.highlight && (
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-4 px-2.5 py-1 rounded-full self-start"
                      style={{
                        background: "rgba(124, 58, 237, 0.2)",
                        border: "1px solid rgba(124, 58, 237, 0.4)",
                        color: "#A855F7",
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.colour}18`, border: `1px solid ${s.colour}30` }}
                    >
                      <s.icon size={18} style={{ color: s.colour }} />
                    </div>
                    <div>
                      <div
                        className="text-2xl font-black mb-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${s.colour}, #7C3AED)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {s.price}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={11} style={{ color: "var(--vd-faint)" }} />
                        <span className="text-xs" style={{ color: "var(--vd-faint)" }}>
                          {s.delivery}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-bold mb-1" style={{ color: "var(--vd-heading)", fontSize: "1.125rem" }}>
                    {s.title}
                  </h2>
                  <p className="text-sm mb-3" style={{ color: s.colour }}>
                    {s.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--vd-muted)" }}>
                    {s.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--vd-text)" }}>
                        <CheckCircle2 size={13} style={{ color: "#10B981", marginTop: "2px", flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 text-sm font-semibold text-white rounded-xl btn-primary"
                  >
                    {s.cta}
                    <ChevronRight size={14} className="inline ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16" style={{ backgroundColor: "var(--vd-bg)" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="font-bold mb-8 text-center"
              style={{ color: "var(--vd-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Full comparison
            </h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--vd-border)" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--vd-border)" }}>
                    <th
                      className="text-left p-4 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: "var(--vd-faint)", background: "var(--vd-panel-strong)", minWidth: "180px" }}
                    >
                      Feature
                    </th>
                    {["Audit", "Launch Fix", "MVP Setup", "Care Plan"].map((h) => (
                      <th
                        key={h}
                        className="p-4 text-xs font-semibold tracking-widest uppercase text-center"
                        style={{ color: "var(--vd-faint)", background: "var(--vd-panel-strong)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.label}
                      style={{
                        borderBottom: i < COMPARISON_ROWS.length - 1 ? "1px solid var(--vd-border)" : "none",
                        background: i % 2 === 0 ? "var(--vd-panel)" : "transparent",
                      }}
                    >
                      <td className="p-4 text-sm" style={{ color: "var(--vd-muted)" }}>
                        {row.label}
                      </td>
                      <td className="p-4"><Cell value={row.audit} /></td>
                      <td className="p-4"><Cell value={row.fix} /></td>
                      <td className="p-4"><Cell value={row.mvp} /></td>
                      <td className="p-4"><Cell value={row.care} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ / trust section */}
        <section className="py-16" style={{ backgroundColor: "var(--vd-section)" }}>
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-bold mb-4" style={{ color: "var(--vd-heading)", fontSize: "1.75rem" }}>
              Not sure which service you need?
            </h2>
            <p className="mb-8" style={{ color: "var(--vd-muted)" }}>
              Take the free checker first. Your score report will automatically recommend the most relevant service based on your specific gaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/checker"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg btn-primary"
              >
                Take the Free Checker
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{
                  background: "var(--vd-button-bg)",
                  border: "1px solid var(--vd-border)",
                  color: "var(--vd-text)",
                }}
              >
                Ask Victor Directly
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
