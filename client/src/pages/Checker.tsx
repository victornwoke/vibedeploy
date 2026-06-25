// VibeDeploy Checker Page — 13-category multi-step form
// Design: Dark DevOps Command Centre

import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCheckerStore } from "@/store/checkerStore";
import { CATEGORIES } from "@/scoring/questions";
import type { Question, QuestionOption, CheckerAnswers } from "@/scoring/types";

// ─── Report Storage Utility ─────────────────────────────────────────────────────
const REPORT_STORAGE_KEY = "vibedeploy:last-report";
const REPORT_TTL_MS = 60 * 60 * 1000; // 60 minutes

function saveReport(reportsAnswers: CheckerAnswers) {
  const payload = {
    answers: reportsAnswers,
    timestamp: Date.now(),
  };
  try {
    sessionStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors
  }
}
import { ArrowLeft, ArrowRight, CheckCircle2, Shield } from "lucide-react";

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function CheckerProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
          Category {current + 1} of {total}
        </span>
        <span className="text-xs font-mono" style={{ color: "#06B6D4" }}>
          {pct}% complete
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Checker progress: ${pct}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Category Step ────────────────────────────────────────────────────────────
function CategoryStep() {
  const { currentCategoryIndex, answers, setAnswer, totalCategories } = useCheckerStore();
  const category = CATEGORIES[currentCategoryIndex];
  const categoryAnswers = answers[category.id] ?? {};

  return (
    <div>
      {/* Category header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(124, 58, 237, 0.12)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            color: "#A855F7",
          }}
        >
          Category {currentCategoryIndex + 1} of {totalCategories}
        </div>
        <h1 className="font-bold mb-2" style={{ fontSize: "1.75rem", color: "white" }}>
          {category.label}
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Weight: {Math.round(category.weight * 100)}% of total score
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {category.questions.map((question: Question, qi: number) => {
          const currentAnswer = categoryAnswers[question.id];
          return (
            <div
              key={question.id}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(30, 27, 75, 0.4)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="font-medium mb-4 leading-snug"
                style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9375rem" }}
                id={`question-${question.id}`}
              >
                <span style={{ color: "rgba(255,255,255,0.3)", marginRight: "8px", fontFamily: "monospace", fontSize: "0.75rem" }}>
                  Q{qi + 1}
                </span>
                {question.text}
              </p>

              <div
                className="flex flex-wrap gap-2.5"
                role="radiogroup"
                aria-labelledby={`question-${question.id}`}
              >
                {question.options.map((option: QuestionOption) => {
                  const isSelected = currentAnswer === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setAnswer(category.id, question.id, option.value)}
                      role="radio"
                      aria-checked={isSelected}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2"
                      style={{
                        background: isSelected
                          ? "rgba(124, 58, 237, 0.25)"
                          : "rgba(255,255,255,0.05)",
                        border: isSelected
                          ? "1px solid rgba(124, 58, 237, 0.5)"
                          : "1px solid rgba(255,255,255,0.1)",
                        color: isSelected ? "#C084FC" : "rgba(255,255,255,0.6)",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {isSelected && (
                        <span className="mr-1.5" aria-hidden="true">✓</span>
                      )}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Email Capture Step ───────────────────────────────────────────────────────
function EmailStep() {
  const { email, setEmail } = useCheckerStore();
  return (
    <div>
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            color: "#10B981",
          }}
        >
          <CheckCircle2 size={11} />
          Almost Done
        </div>
        <h1 className="font-bold mb-2" style={{ fontSize: "1.75rem", color: "white" }}>
          Your report is ready.
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          Click below to see your production readiness score. Optionally, leave your email to receive a copy of your full report.
        </p>
      </div>

      <div
        className="p-6 rounded-xl mb-6"
        style={{
          background: "rgba(30, 27, 75, 0.4)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <label
          htmlFor="email-capture"
          className="block text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Want to receive your full report by email? (Optional)
        </label>
        <input
          id="email-capture"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
          }}
          autoComplete="email"
        />
        <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          No spam. Victor may follow up with relevant infrastructure tips.
        </p>
      </div>

      <div
        className="flex items-start gap-3 p-4 rounded-lg"
        style={{
          background: "rgba(124, 58, 237, 0.08)",
          border: "1px solid rgba(124, 58, 237, 0.2)",
        }}
      >
        <Shield size={16} style={{ color: "#A855F7", marginTop: "1px", flexShrink: 0 }} />
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          Your report is based entirely on your self-reported answers. It is not a professional security audit and does not involve any access to your codebase or infrastructure.
        </p>
      </div>
    </div>
  );
}

// ─── Sidebar — Category List ──────────────────────────────────────────────────
function CategorySidebar() {
  const { currentCategoryIndex, isCategoryAnswered, goToCategory } = useCheckerStore();
  return (
    <aside
      className="hidden lg:block w-56 flex-shrink-0"
      aria-label="Category navigation"
    >
      <div
        className="sticky top-24 p-4 rounded-xl"
        style={{
          background: "rgba(30, 27, 75, 0.4)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          Categories
        </p>
        <nav>
          <ul className="space-y-1">
            {CATEGORIES.map((cat, i) => {
              const isActive = i === currentCategoryIndex;
              const isDone = isCategoryAnswered(cat.id);
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => goToCategory(i)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    style={{
                      background: isActive ? "rgba(124, 58, 237, 0.2)" : "transparent",
                      color: isActive
                        ? "#C084FC"
                        : isDone
                        ? "rgba(16, 185, 129, 0.8)"
                        : "rgba(255,255,255,0.4)",
                      border: isActive ? "1px solid rgba(124, 58, 237, 0.3)" : "1px solid transparent",
                    }}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{
                        background: isDone
                          ? "rgba(16, 185, 129, 0.2)"
                          : isActive
                          ? "rgba(124, 58, 237, 0.3)"
                          : "rgba(255,255,255,0.08)",
                        fontSize: "9px",
                      }}
                    >
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

// ─── Main Checker Page ────────────────────────────────────────────────────────
export default function Checker() {
  const [, navigate] = useLocation();
  const {
    currentCategoryIndex,
    totalCategories,
    answers,
    nextCategory,
    prevCategory,
    complete,
  } = useCheckerStore();

  const isLastCategory = currentCategoryIndex === totalCategories - 1;
  const isEmailStep = currentCategoryIndex === totalCategories; // virtual step after last category
  const showEmailStep = isLastCategory;

  const currentCategory = CATEGORIES[currentCategoryIndex];
  const categoryAnswers = answers[currentCategory?.id] ?? {};
  const allAnswered = currentCategory?.questions.every(
    (q) => categoryAnswers[q.id] !== undefined
  ) ?? false;

  function handleNext() {
    if (isLastCategory) {
      // Go to email step / submit
      handleSubmit();
    } else {
      nextCategory();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    complete();
    // Save report to sessionStorage instead of URL for privacy
    saveReport(answers);
    navigate("/report");
  }

  const nextCategoryName = !isLastCategory
    ? CATEGORIES[currentCategoryIndex + 1]?.label
    : null;

  return (
    <div style={{ backgroundColor: "#0F0F1A", minHeight: "100vh" }}>
      <Navbar />
      <main id="main-content" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="sr-only">Production Readiness Checker</h1>
          <CheckerProgressBar current={currentCategoryIndex} total={totalCategories} />
        </div>

        <div className="flex gap-8">
          <CategorySidebar />

          {/* Main form area */}
          <div className="flex-1 min-w-0">
            {showEmailStep && isLastCategory ? (
              <CategoryStep />
            ) : (
              <CategoryStep />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => {
                  prevCategory();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentCategoryIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                aria-label="Previous category"
              >
                <ArrowLeft size={15} />
                Previous Category
              </button>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg btn-primary focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2"

                aria-label={isLastCategory ? "See my production score" : `Next: ${nextCategoryName}`}
              >
                {isLastCategory ? (
                  <>
                    See My Production Score
                    <CheckCircle2 size={15} />
                  </>
                ) : (
                  <>
                    Next: {nextCategoryName}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

            {/* Skip / answer later note */}
            {!allAnswered && (
              <p className="text-center mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                You can skip unanswered questions, unanswered questions score 0.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
