// VibeDeploy Homepage — All sections
// Design: Dark DevOps Command Centre

import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Zap,
  BarChart3,
  Terminal,
  ChevronRight,
  Lock,
  Database,
  GitBranch,
  Activity,
  Server,
  FileText,
  ExternalLink,
} from "lucide-react";

// ─── Hero Section ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: "#0F0F1A",
      }}
    >
      {/* Background image + mesh overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/manus-storage/vibedeploy-hero-bg_f49e3d74.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,26,0.3) 0%, rgba(15,15,26,0.7) 60%, #0F0F1A 100%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              color: "#A855F7",
            }}
          >
            <Zap size={11} />
            Production Readiness for AI-Built Apps
          </div>

          {/* H1 */}
          <h1
            className="font-extrabold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.1 }}
          >
            <span style={{ color: "white" }}>AI can build the demo.</span>
            <br />
            <span className="gradient-text">VibeDeploy makes it</span>
            <br />
            <span className="gradient-text">production-ready.</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mb-8 leading-relaxed"
            style={{
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "580px",
            }}
          >
            You built something impressive with Lovable, Bolt, or Cursor. Now find out if it's safe to launch. Get a free production readiness score in 5 minutes — no engineering background required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              href="/checker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white rounded-lg btn-primary focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0F0F1A]"
            >
              Check My App Now — It's Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-lg transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
            >
              See How It Works
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            No account required. No GitHub access needed. Results in under 5 minutes.
          </p>
        </div>

        {/* Score preview card — right column on desktop */}
        <div
          className="hidden lg:flex justify-end"
          aria-hidden="true"
        >
        <div
          className="w-80 rounded-xl overflow-hidden"
          style={{
            background: "rgba(30, 27, 75, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            boxShadow: "0 0 40px rgba(124, 58, 237, 0.15)",
          }}
          aria-hidden="true"
        >
          <img
            src="/manus-storage/vibedeploy-score-preview_84cb24bf.jpg"
            alt="Sample production readiness report preview"
            className="w-full h-48 object-cover opacity-80"
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                Sample Report
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", border: "1px solid rgba(245, 158, 11, 0.3)" }}
              >
                HIGH RISK
              </span>
            </div>
            <div className="text-2xl font-bold" style={{ color: "white" }}>
              47<span className="text-base font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>/100</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              3 critical gaps found
            </p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: Lock,
    colour: "#EF4444",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.2)",
    title: "Secrets in Plain Sight",
    description:
      "AI coding tools often commit environment variables and API keys to public repositories. One scan by a malicious bot can expose your entire infrastructure.",
  },
  {
    icon: Database,
    colour: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.2)",
    title: "No Recovery Plan",
    description:
      "When (not if) something breaks, founders with no backup strategy face complete data loss. Most vibe-coded apps have never been tested for failure scenarios.",
  },
  {
    icon: Eye,
    colour: "#EF4444",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.2)",
    title: "Zero Monitoring",
    description:
      "Your app goes down at 2am on a Saturday. You find out on Monday from an angry user. Without uptime monitoring and alerting, you're flying blind.",
  },
];

function ProblemSection() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#EF4444",
            }}
          >
            <ShieldAlert size={11} />
            The Risk is Real
          </div>
          <h2
            id="problem-heading"
            className="font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white" }}
          >
            Most AI-generated apps are not production-ready.
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Here's why that matters.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-xl card-hover"
              style={{
                background: p.bg,
                border: `1px solid ${p.border}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${p.colour}20` }}
              >
                <p.icon size={20} style={{ color: p.colour }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "white", fontSize: "1.05rem" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: FileText,
    title: "Answer 13 Questions",
    description:
      "No technical knowledge needed. We ask plain-English questions about your setup and you tell us what you have or don't have.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your Score",
    description:
      "Our scoring engine analyses your answers against real production standards and returns a score out of 100 with colour-coded risk flags.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Fix What Matters",
    description:
      "Every risk category comes with a clear recommendation. Book Victor directly to fix the issues found — no vague agency proposals, just specific actionable work.",
  },
];

function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0a0a14" }}
      aria-labelledby="how-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="how-heading"
            className="font-bold mb-3"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white" }}
          >
            Three steps to knowing exactly where you stand.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>
            From zero to a full production readiness report in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px"
            style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.4), rgba(6,182,212,0.4))" }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative p-7 rounded-xl"
              style={{
                background: "rgba(30, 27, 75, 0.4)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-4xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
              </div>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "rgba(124, 58, 237, 0.15)" }}
              >
                <step.icon size={18} style={{ color: "#A855F7" }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "white", fontSize: "1.05rem" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/checker"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg btn-primary"
          >
            Start My Free Check
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Categories Preview ───────────────────────────────────────────────────────
const CATEGORIES_PREVIEW = [
  { icon: GitBranch, label: "CI/CD Pipeline", weight: "10%" },
  { icon: Lock, label: "Secrets Management", weight: "12%" },
  { icon: Server, label: "Deployment Setup", weight: "10%" },
  { icon: Activity, label: "Monitoring & Logging", weight: "10%" },
  { icon: Database, label: "Backup & Recovery", weight: "10%" },
  { icon: ShieldAlert, label: "Security Basics", weight: "10%" },
  { icon: Terminal, label: "Environment Variables", weight: "8%" },
  { icon: BarChart3, label: "Database Readiness", weight: "10%" },
  { icon: FileText, label: "Documentation", weight: "5%" },
  { icon: AlertTriangle, label: "Error Handling", weight: "5%" },
  { icon: CheckCircle2, label: "Domain & SSL", weight: "5%" },
  { icon: Zap, label: "Container Readiness", weight: "7%" },
  { icon: Server, label: "Staging / Prod Separation", weight: "8%" },
];

function CategoriesPreview() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-labelledby="categories-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                color: "#06B6D4",
              }}
            >
              <BarChart3 size={11} />
              13 Categories
            </div>
            <h2
              id="categories-heading"
              className="font-bold mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "white" }}
            >
              Every dimension of production readiness — scored.
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem" }}>
              Our scoring model covers the 13 most critical DevOps categories, weighted by real-world impact. Most AI-generated apps score between 20 and 55 on first attempt.
            </p>
            <Link
              href="/checker"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#A855F7" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C084FC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A855F7")}
            >
              Take the free assessment
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CATEGORIES_PREVIEW.map((cat) => (
              <div
                key={cat.label}
                className="p-3 rounded-lg flex items-center gap-2.5"
                style={{
                  background: "rgba(30, 27, 75, 0.5)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <cat.icon size={14} style={{ color: "#7C3AED", flexShrink: 0 }} />
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-tight truncate" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {cat.label}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {cat.weight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Preview ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    price: "£99",
    title: "Production Readiness Audit",
    description: "Manual review of your checker results with a written traffic-light report and 30-minute findings call.",
    delivery: "48–72 hours",
    highlight: false,
  },
  {
    price: "£500",
    title: "Production Launch Fix",
    description: "Victor fixes your top 3 critical infrastructure issues — CI/CD, secrets, SSL, monitoring setup.",
    delivery: "5–7 business days",
    highlight: true,
  },
  {
    price: "£1,500+",
    title: "Full MVP Production Setup",
    description: "Complete DevOps infrastructure: CI/CD, secrets management, staging/production separation, monitoring, backups.",
    delivery: "2–4 weeks",
    highlight: false,
  },
  {
    price: "£500–£1k/mo",
    title: "DevOps Care Plan",
    description: "Victor acts as your on-call DevOps team. Monthly monitoring, deployments, cost review, and priority incident support.",
    delivery: "Monthly retainer",
    highlight: false,
  },
];

function ServicesPreview() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0a0a14" }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="font-bold mb-3"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "white" }}
          >
            Four ways to go from risky to production-ready.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)" }}>
            Start with the free checker, then choose the service that matches your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-xl flex flex-col card-hover"
              style={{
                background: s.highlight
                  ? "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(37, 99, 235, 0.15))"
                  : "rgba(30, 27, 75, 0.4)",
                border: s.highlight
                  ? "1px solid rgba(124, 58, 237, 0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: s.highlight ? "0 0 30px rgba(124, 58, 237, 0.15)" : "none",
              }}
            >
              {s.highlight && (
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-3 px-2 py-1 rounded-full self-start"
                  style={{
                    background: "rgba(124, 58, 237, 0.2)",
                    border: "1px solid rgba(124, 58, 237, 0.4)",
                    color: "#A855F7",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="text-2xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.price}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "white", fontSize: "0.9375rem" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.description}
              </p>
              <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Delivery: {s.delivery}
              </p>
              <Link
                href="/services"
                className="text-sm font-medium text-center py-2 rounded-lg transition-colors"
                style={{
                  background: s.highlight ? "rgba(124, 58, 237, 0.3)" : "rgba(255,255,255,0.06)",
                  color: s.highlight ? "#C084FC" : "rgba(255,255,255,0.6)",
                  border: s.highlight ? "1px solid rgba(124, 58, 237, 0.4)" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            View full pricing and comparison table
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Founder Proof ────────────────────────────────────────────────────────────
function FounderProof() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0F0F1A" }}
      aria-labelledby="founder-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{
            background: "rgba(30, 27, 75, 0.5)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "#10B981",
              }}
            >
              <CheckCircle2 size={11} />
              Founder Proof
            </div>
            <h2
              id="founder-heading"
              className="font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "white" }}
            >
              Built by a Cloud & DevOps engineer who has seen what breaks in production.
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem" }}>
              Victor Nwoke is a Cloud and DevOps engineer with experience building and maintaining infrastructure on Azure, AWS, and GCP. VibeDeploy was created because the gap between an AI-generated demo and a secure, production-ready application is real, consistent, and fixable — with the right guidance.
            </p>
            <a
              href="https://victornwoke.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#A855F7" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C084FC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A855F7")}
            >
              See Victor's full portfolio and experience
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.2))",
                  filter: "blur(16px)",
                }}
                aria-hidden="true"
              />
              <img
                src="/manus-storage/vibedeploy-founder_516681ca.jpg"
                alt="Victor Nwoke — Cloud and DevOps Engineer"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover"
                style={{ border: "2px solid rgba(124, 58, 237, 0.3)" }}
              />
              {/* Credential badges */}
              <div
                className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(30, 27, 75, 0.95)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  color: "#A855F7",
                  backdropFilter: "blur(8px)",
                }}
              >
                Azure · AWS · GCP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0a0a14" }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="max-w-2xl mx-auto p-10 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(37, 99, 235, 0.1))",
            border: "1px solid rgba(124, 58, 237, 0.25)",
          }}
        >
          <h2
            id="cta-heading"
            className="font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "white" }}
          >
            Ready to stop guessing?
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem" }}>
            Get your free production readiness score in 5 minutes. No account required.
          </p>
          <Link
            href="/checker"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl btn-primary"
          >
            Check My App Now — It's Free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            No account required. No GitHub access needed. Results in under 5 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <CategoriesPreview />
        <ServicesPreview />
        <FounderProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
