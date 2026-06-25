export type RiskLevel = "critical" | "high" | "medium" | "low" | "pass";

export type AnswerValue = string;

export interface QuestionOption {
  label: string;
  value: AnswerValue;
  score: number;
  riskLevel?: RiskLevel;
  recommendation?: string;
  description?: string;
}

export interface Question {
  id: string;
  label?: string;
  text?: string;
  description?: string;
  type?: "select" | "radio" | "checkbox" | "text" | "textarea" | "boolean";
  required?: boolean;
  weight?: number;
  options: QuestionOption[];

  // Used by the scoring engine when a weak/bad answer is selected
  riskIfBad?: RiskLevel;

  // Optional recommendation copy attached to a question
  recommendation?: string;
  badRecommendation?: string;
  goodRecommendation?: string;
}

export interface Category {
  id: string;
  title?: string;
  label?: string;
  name?: string;
  description?: string;
  weight: number;
  maxPoints: number;
  questions: Question[];

  // Thresholds used by the scoring/questions config
  criticalThreshold?: number;
  highThreshold?: number;
  mediumThreshold?: number;
  warningThreshold?: number;

  // Upsell logic used by scoring engine
  upsellTrigger: number;
  upsellMessage?: string;
  upsellService?: string;
}

export interface CheckerAnswers {
  [categoryId: string]: {
    [questionId: string]: AnswerValue;
  };
}

export interface Finding {
  id?: string;
  title?: string;
  description?: string;
  questionId?: string;
  questionText?: string;

  // Optional because some generated findings may not set riskIfBad correctly yet.
  // The scoring engine should ideally provide a fallback later.
  riskLevel?: RiskLevel;

  recommendation: string;
  categoryId?: string;
  answer?: string | null;
}

export interface CategoryScore {
  id: string;
  categoryId?: string;
  title?: string;
  label?: string;
  name?: string;

  // Normalised score shown to the user
  score: number;

  // Raw scoring fields used internally by the scoring engine
  rawScore?: number;
  maxRawScore?: number;
  maxScore?: number;
  percentage?: number;

  weight: number;

  riskLevel: RiskLevel;
  findings: Finding[];
  recommendations?: string[];

  // Optional upsell result for weak categories
  upsell?: string;
  upsellService?: string;
}

export interface ServiceRecommendation {
  name: string;
  price?: string;
  description?: string;
  cta?: string;
}

export interface ScoringResult {
  score?: number;
  totalScore: number;
  maxScore?: number;
  percentage?: number;
  overallRisk: RiskLevel;
  riskLevel?: RiskLevel;
  summary?: string;

  categories: CategoryScore[];
  categoryScores: CategoryScore[];

  findings?: Finding[];
  recommendations?: string[];

  // Used by the generated report page/engine
  topRecommendations?: string[];

  serviceRecommendation?: ServiceRecommendation;
  suggestedService?: string;
  criticalCount: number;
  highCount: number;
}