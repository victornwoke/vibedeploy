// VibeDeploy Report Results Page
// Design: Dark DevOps Command Centre

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { calculateScore, getRiskLabel, getRiskColour, getRiskIcon, getRiskSummary, decodeAnswers } from "@/scoring/engine";
import type { ScoringResult, CategoryScore, RiskLevel } from "@/scoring/types";
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
            stroke="rgba(255,255,255,0.08)"
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
            fill="white"
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
            fill="rgba(255,255,255,0.4)"
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
        background: "rgba(30, 27, 75, 0.4)",
        border: `1px solid ${open ? colour + "30" : "rgba(255,255,255,0.07)"}`,
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
            <p className="font-semibold text-sm truncate" style={{ color: "white" }}>
              {category.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Score: {category.score}/100 · Weight: {Math.round(category.weight * 100)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          {/* Mini score bar */}
          <div
            className="hidden sm:block w-24 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
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
            <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
          )}
        </div>
      </button>

      {open && (
        <div
          id={`category-${category.id}`}
          className="px-5 pb-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
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
              {category.findings.map((finding) => (
                <div
                  key={finding.questionId}
                  className="p-4 rounded-lg"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {finding.questionText}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
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
                <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
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
      <h3 className="font-bold mb-2" style={{ color: "white", fontSize: "1rem" }}>
        Get Victor to fix these issues
      </h3>
      <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
        {result.suggestedService}
      </p>
      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
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
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        View All Services
      </Link>

      <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", lineHeight: "1.5" }}>
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

  useEffect(() => {
    // Try to get answers from URL params first, then fall back to store
    const searchParams = new URLSearchParams(window.location.search);
    const encoded = searchParams.get("answers");

    let answersToScore = storeAnswers;
    if (encoded) {
      const decoded = decodeAnswers(encoded);
      if (decoded) answersToScore = decoded;
    }

    const scoring = calculateScore(answersToScore);
    setResult(scoring);
  }, [location]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!result) {
    return (
      <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Calculating your score...</p>
        </div>
      </div>
    );
  }

  const summaryMessage = getRiskSummary(result.overallRisk, result.totalScore);

  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Score header */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: "rgba(30, 27, 75, 0.5)",
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
              <h1 className="font-bold mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "white" }}>
                {result.overallRisk === "pass"
                  ? "Strong production posture. Well done."
                  : result.overallRisk === "critical"
                  ? "Your app has critical infrastructure gaps."
                  : result.overallRisk === "high"
                  ? "Significant production risks identified."
                  : result.overallRisk === "medium"
                  ? "Some gaps exist — launch with caution."
                  : "Good posture with minor gaps."}
              </h1>
              <p className="mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem" }}>
                {summaryMessage}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {result.criticalCount > 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#EF4444" }}>
                      {result.criticalCount}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Critical {result.criticalCount === 1 ? "Category" : "Categories"}
                    </p>
                  </div>
                )}
                {result.highCount > 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#F59E0B" }}>
                      {result.highCount}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      High Risk {result.highCount === 1 ? "Category" : "Categories"}
                    </p>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: "white" }}>
                    {result.categories.length}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
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
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="Copy report URL to clipboard"
                >
                  <Share2 size={14} />
                  {copied ? "Copied!" : "Share Report"}
                </button>
                <button
                  onClick={() => {
                    reset();
                    window.location.href = "/checker";
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
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
            <h2 className="font-bold mb-4" style={{ color: "white", fontSize: "1.125rem" }}>
              Category Breakdown
            </h2>
            <div className="space-y-3">
              {result.categories
                .sort((a, b) => a.score - b.score)
                .map((cat) => (
                  <CategoryAccordion key={cat.id} category={cat} />
                ))}
            </div>

            {/* Disclaimer */}
            <div
              className="mt-8 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <AlertTriangle size={14} style={{ color: "rgba(255,255,255,0.3)", marginTop: "1px", flexShrink: 0 }} />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
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
            background: "rgba(15, 15, 26, 0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          <Link
            href="/contact"
            className="block w-full text-center px-4 py-3.5 text-sm font-semibold text-white rounded-xl btn-primary"
          >
            Get Victor to Fix These Issues — {result.suggestedService}
          </Link>
        </div>
      </main>
      <div className="lg:hidden h-20" aria-hidden="true" />
      <Footer />
    </div>
  );
}
