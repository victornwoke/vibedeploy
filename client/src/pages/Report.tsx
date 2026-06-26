// VibeDeploy Report Results Page
// Design: Dark DevOps Command Centre

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { calculateScore, getRiskLabel, getRiskColour, getRiskIcon, getRiskSummary } from "@/scoring/engine";
import type { ScoringResult, CategoryScore, RiskLevel, Finding, CheckerAnswers } from "@/scoring/types";

// ─── Report Storage Utility ─────────────────────────────────────────────────────
const REPORT_STORAGE_KEY = "vibedeploy:last-report";
const REPORT_TTL_MS = 60 * 60 * 1000; // 60 minutes

function loadReport(): CheckerAnswers | null {
  try {
    const stored = sessionStorage.getItem(REPORT_STORAGE_KEY);
    if (!stored) return null;
    const payload = JSON.parse(stored);
    const now = Date.now();
    if (now - payload.timestamp > REPORT_TTL_MS) {
      sessionStorage.removeItem(REPORT_STORAGE_KEY);
      return null;
    }
    return payload.answers;
  } catch {
    return null;
  }
}
import { useCheckerStore } from "@/store/checkerStore";
import {
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// ─── Animated Score Gauge ─────────────────────────────────────────────────────
function ScoreGauge({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const [displayScore, setDisplayScore] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 1500;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [score]);

  // SVG arc parameters
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const strokeWidth = 12;
  const startAngle = -220;
  const endAngle = 40;
  const totalAngle = endAngle - startAngle;
  const scoreAngle = startAngle + (displayScore / 100) * totalAngle;

  function polarToCartesian(angle: number) {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeArc(start: number, end: number) {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }

  const colour = getRiskColour(riskLevel);

  return (
    <div className="flex flex-col items-center" aria-label={`Production readiness score: ${score} out of 100`}>
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {/* Track */}
          <path
            d={describeArc(startAngle, endAngle)}
            fill="none"
            stroke="var(--vd-border)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Score arc */}
          {displayScore > 0 && (
            <path
              d={describeArc(startAngle, scoreAngle)}
              fill="none"
              stroke={`url(#gauge-gradient-${riskLevel})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gauge-gradient-${riskLevel}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor={colour} />
            </linearGradient>
          </defs>
          {/* Score text */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fill="var(--vd-heading)"
            fontSize="36"
            fontWeight="800"
            fontFamily="Inter, sans-serif"
          >
            {displayScore}
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            fill="var(--vd-faint)"
            fontSize="13"
            fontFamily="Inter, sans-serif"
          >
            out of 100
          </text>
        </svg>
      </div>
    </div>
  );
}

// ─── Risk Badge ───────────────────────────────────────────────────────────────
function RiskBadge({ level, size = "lg" }: { level: RiskLevel; size?: "sm" | "lg" }) {
  const colour = getRiskColour(level);
  const label = getRiskLabel(level);
  const icon = getRiskIcon(level);

  const classes = size === "lg"
    ? "px-4 py-2 text-sm font-bold tracking-wider"
    : "px-2.5 py-1 text-xs font-semibold tracking-wide";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg ${classes}`}
      style={{
        background: `${colour}18`,
        border: `1px solid ${colour}40`,
        color: colour,
      }}
      role="status"
      aria-label={`Risk level: ${label}`}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}

// ─── Category Accordion ───────────────────────────────────────────────────────
function CategoryAccordion({ category }: { category: CategoryScore }) {
  const [open, setOpen] = useState(false);
  const colour = getRiskColour(category.riskLevel);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--vd-panel)",
        border: `1px solid ${open ? colour + "30" : "var(--vd-border)"}`,
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-inset"
        style={{ focusRingColor: "#7C3AED" } as React.CSSProperties}
        aria-expanded={open}
        aria-controls={`category-${category.id}`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex-shrink-0">
            <RiskBadge level={category.riskLevel} size="sm" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate" style={{ color: "var(--vd-heading)" }}>
              {category.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--vd-faint)" }}>
              Score: {category.score}/100 · Weight: {Math.round(category.weight * 100)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          {/* Mini score bar */}
          <div
            className="hidden sm:block w-24 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--vd-border)" }}
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${category.score}%`,
                background: `linear-gradient(90deg, #7C3AED, ${colour})`,
              }}
            />
          </div>
          {open ? (
            <ChevronUp size={16} style={{ color: "var(--vd-faint)" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "var(--vd-faint)" }} />
          )}
        </div>
      </button>

      {open && (
        <div
          id={`category-${category.id}`}
          className="px-5 pb-5"
          style={{ borderTop: "1px solid var(--vd-button-bg)" }}
        >
          {category.findings.length === 0 ? (
            <div className="flex items-center gap-2 py-3">
              <CheckCircle2 size={15} style={{ color: "#10B981" }} />
              <p className="text-sm" style={{ color: "#10B981" }}>
                No gaps found in this category. Well done.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              {category.findings.map((finding: Finding) => (
                <div
                  key={finding.questionId}
                  className="p-4 rounded-lg"
                  style={{
                    background: "var(--vd-button-bg)",
                    border: "1px solid var(--vd-button-bg)",
                  }}
                >
                  <p className="text-xs font-medium mb-1.5" style={{ color: "var(--vd-muted)" }}>
                    {finding.questionText}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text)" }}>
                    {finding.recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Upsell */}
          {category.upsell && (
            <div
              className="mt-4 p-4 rounded-lg flex items-start gap-3"
              style={{
                background: "rgba(124, 58, 237, 0.08)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
              }}
            >
              <AlertTriangle size={14} style={{ color: "#A855F7", marginTop: "1px", flexShrink: 0 }} />
              <div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--vd-muted)" }}>
                  {category.upsell}
                </p>
                <Link
                  href="/contact"
                  className="text-xs font-semibold inline-flex items-center gap-1"
                  style={{ color: "#A855F7" }}
                >
                  Book {category.upsellService}
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Booking CTA ──────────────────────────────────────────────────────────────
function BookingCTA({ result }: { result: ScoringResult }) {
  return (
    <div
      className="p-6 rounded-xl sticky top-24"
      style={{
        background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(37, 99, 235, 0.15))",
        border: "1px solid rgba(124, 58, 237, 0.3)",
      }}
    >
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#A855F7" }}>
        Recommended Action
      </p>
      <h3 className="font-bold mb-2" style={{ color: "var(--vd-heading)", fontSize: "1rem" }}>
        Get Victor to fix these issues
      </h3>
      <p className="text-sm mb-1" style={{ color: "var(--vd-muted)" }}>
        {result.suggestedService}
      </p>
      <p className="text-xs mb-5" style={{ color: "var(--vd-faint)" }}>
        {result.overallRisk === "critical" || result.overallRisk === "high"
          ? "30-minute findings call included. Delivered within 48 hours."
          : "Personalised review of your specific gaps."}
      </p>
      <Link
        href="/contact"
        className="block w-full text-center px-4 py-3 text-sm font-semibold text-white rounded-lg btn-primary mb-3"
      >
        Book Your Fix Now
        <ArrowRight size={14} className="inline ml-1.5" />
      </Link>
      <Link
        href="/services"
        className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
        style={{
          background: "var(--vd-button-bg)",
          border: "1px solid var(--vd-border)",
          color: "var(--vd-muted)",
        }}
      >
        View All Services
      </Link>

      <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--vd-border)" }}>
        <p className="text-xs" style={{ color: "var(--vd-faint)", lineHeight: "1.5" }}>
          Results are based on self-reported answers. Not a professional security audit.
        </p>
      </div>
    </div>
  );
}

// ─── Main Report Page ─────────────────────────────────────────────────────────
export default function Report() {
  const [location] = useLocation();
  const { answers: storeAnswers, reset } = useCheckerStore();
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [noReport, setNoReport] = useState(false);
  const [expiredReport, setExpiredReport] = useState(false);

  useEffect(() => {
    // Load answers from store first, then fallback to sessionStorage
    try {
      // Detect expired report session (so we can show an expiration message)
      try {
        const raw = sessionStorage.getItem(REPORT_STORAGE_KEY);
        if (raw) {
          const payload = JSON.parse(raw);
          if (payload && payload.timestamp && Date.now() - payload.timestamp > REPORT_TTL_MS) {
            setExpiredReport(true);
            try { sessionStorage.removeItem(REPORT_STORAGE_KEY); } catch {}
          }
        }
      } catch {}
      const hasStoreAnswers = storeAnswers && Object.keys(storeAnswers).length > 0;
      let answersToScore: CheckerAnswers | null = null;

      if (hasStoreAnswers) {
        answersToScore = storeAnswers;
      } else {
        // sessionStorage fallback (private, short-lived)
        const loaded = loadReport();
        if (loaded && Object.keys(loaded).length > 0) answersToScore = loaded;
      }

      if (!answersToScore) {
        setNoReport(true);
        setResult(null);
        return;
      }

      const scoring = calculateScore(answersToScore);
      setResult(scoring);
      setNoReport(false);
    } catch (err) {
      setNoReport(true);
      setResult(null);
    }
  }, [location, storeAnswers]);

  function handleShare() {
    if (!result) return;
    const summary = `VibeDeploy Readiness Summary — Score: ${result.totalScore}/100 · ${getRiskLabel(result.overallRisk)}\n${getRiskSummary(result.overallRisk, result.totalScore)}\n\nThis report is generated from the answers submitted in this session. VibeDeploy does not automatically scan your repository in this MVP.`;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (noReport) {
    return (
      <div style={{ backgroundColor: "var(--vd-bg)", minHeight: "100vh" }}>
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-xl text-center">
            <h2 className="font-bold mb-4" style={{ color: "var(--vd-heading)", fontSize: "1.25rem" }}>
              {expiredReport ? "Report session expired" : "No report found"}
            </h2>
            <p className="mb-6" style={{ color: "var(--vd-muted)" }}>
              {expiredReport
                ? "Your report session has expired. Please run a new readiness check."
                : "No report found. Please run a new readiness check."}
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/checker"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg btn-primary"
              >
                Start Checker
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ backgroundColor: "var(--vd-bg)", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p style={{ color: "var(--vd-faint)" }}>Calculating your score...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const summaryMessage = getRiskSummary(result.overallRisk, result.totalScore);

  return (
    <div style={{ backgroundColor: "var(--vd-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Score header */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: "var(--vd-panel)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Gauge */}
            <div className="flex-shrink-0">
              <ScoreGauge score={result.totalScore} riskLevel={result.overallRisk} />
            </div>

            {/* Summary */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3">
                <RiskBadge level={result.overallRisk} size="lg" />
              </div>
              <h1 className="font-bold mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--vd-heading)" }}>
                {result.overallRisk === "pass"
                  ? "Strong production posture. Well done."
                  : result.overallRisk === "critical"
                  ? "Your app has critical infrastructure gaps."
                  : result.overallRisk === "high"
                  ? "Significant production risks identified."
                  : result.overallRisk === "medium"
                  ? "Some gaps exist, launch with caution."
                  : "Good posture with minor gaps."}
              </h1>
              <p className="mb-5 leading-relaxed" style={{ color: "var(--vd-muted)", fontSize: "0.9375rem" }}>
                {summaryMessage}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {result.criticalCount > 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#EF4444" }}>
                      {result.criticalCount}
                    </p>
                    <p className="text-xs" style={{ color: "var(--vd-faint)" }}>
                      Critical {result.criticalCount === 1 ? "Category" : "Categories"}
                    </p>
                  </div>
                )}
                {result.highCount > 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#F59E0B" }}>
                      {result.highCount}
                    </p>
                    <p className="text-xs" style={{ color: "var(--vd-faint)" }}>
                      High Risk {result.highCount === 1 ? "Category" : "Categories"}
                    </p>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: "var(--vd-heading)" }}>
                    {result.categories.length}
                  </p>
                  <p className="text-xs" style={{ color: "var(--vd-faint)" }}>
                    Categories Assessed
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                  style={{
                    background: "var(--vd-button-bg)",
                    border: "1px solid var(--vd-border)",
                    color: "var(--vd-text)",
                  }}
                  aria-label="Copy report summary to clipboard"
                >
                  <Share2 size={14} />
                  {copied ? "Copied!" : "Copy Summary"}
                </button>
                <button
                  onClick={() => {
                    reset();
                    try { sessionStorage.removeItem(REPORT_STORAGE_KEY); } catch {}
                    window.location.href = "/checker";
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                  style={{
                    background: "var(--vd-button-bg)",
                    border: "1px solid var(--vd-border)",
                    color: "var(--vd-text)",
                  }}
                >
                  <RefreshCw size={14} />
                  Retake Checker
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content: categories + sidebar CTA */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category breakdown */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold mb-4" style={{ color: "var(--vd-heading)", fontSize: "1.125rem" }}>
              Category Breakdown
            </h2>
            <div className="space-y-3">
              {result.categories
                .sort((a: CategoryScore, b: CategoryScore) => a.score - b.score)
                .map((cat: CategoryScore) => (
                  <CategoryAccordion key={cat.id} category={cat} />
                ))}
            </div>

            {/* Disclaimer */}
            <div
              className="mt-8 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "var(--vd-button-bg)",
                border: "1px solid var(--vd-button-bg)",
              }}
            >
              <AlertTriangle size={14} style={{ color: "var(--vd-faint)", marginTop: "1px", flexShrink: 0 }} />
              <p className="text-xs leading-relaxed" style={{ color: "var(--vd-faint)" }}>
                This report is based entirely on your self-reported answers and is intended as a starting point for identifying infrastructure gaps. It does not constitute a professional security audit and does not involve any access to your codebase, infrastructure, or repositories. For a thorough assessment, book a manual audit with Victor.
              </p>
            </div>
          </div>

          {/* Sticky booking CTA — desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <BookingCTA result={result} />
          </div>
        </div>

        {/* Mobile booking CTA */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-40"
          style={{
            background: "rgba(var(--vd-bg-rgb), 0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          <Link
            href="/contact"
            className="block w-full text-center px-4 py-3.5 text-sm font-semibold text-white rounded-xl btn-primary"
          >
            Get Victor to Fix These Issues - {result.suggestedService}
          </Link>
        </div>
      </main>
      <div className="lg:hidden h-20" aria-hidden="true" />
      <Footer />
    </div>
  );
}
