export enum NavView {
  DASHBOARD = 'DASHBOARD',
  FUNDRAISING = 'FUNDRAISING',
  CONTENT_OPTIMIZER = 'CONTENT_OPTIMIZER',
  MARKET_INTEL = 'MARKET_INTEL'
}

export interface ContentAnalysisResult {
  score: number;
  tone: string;
  suggestions: string[];
  improvedVersion: string;
}

export interface MarketTrend {
  trend: string;
  impact: string;
  opportunity: string;
}

export interface FundraisingGeneratedContent {
  subject?: string;
  content: string;
  type: 'email' | 'pitch_deck_outline' | 'elevator_pitch';
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  growth: number;
  sentiment: number;
}