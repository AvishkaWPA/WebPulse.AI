export interface Score {
  overall: number;
  seo: number;
  content: number;
  ux: number;
  bestPractices: number;
}

export interface Metrics {
  wordCount: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  internalLinks: number;
  externalLinks: number;
  imageCount: number;
  missingAltPercentage: number;
  metaTitle: string;
  metaDescription: string;
  ctaCount: number;
  readingTime: number;
  textToHtmlRatio: number;
}

export interface Recommendation {
  priority: string;
  category: string;
  title: string;
  description: string;
  metricImpacted: string;
}

export interface Insights {
  seoStructure: string;
  messagingClarity: string;
  ctaUsage: string;
  contentDepth: string;
  uxConcerns: string;
}

export interface AuditResult {
  score: Score;
  metrics: Metrics;
  insights: Insights;
  recommendations: Recommendation[];
}
