export type ScamSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export interface ScamStep {
  step: number;
  phase: string;
  action: string;
  dangerNote?: string;
}

export interface ScamScenario {
  id: string;
  title: string;
  category: string;
  severity: ScamSeverity;
  description: string;
  signs: string[];
  prevention: string[];
  // Extended fields for rich education
  summary: string;
  scamWorkflow: ScamStep[];
  realWorldSample: string;
  commonChannels: string[];
  targetAudience: string;
  victimActionPlan: string[];
  viewsCount?: number;
  updatedDate?: string;
}

export interface AiAnalysisResult {
  riskLevel: 'CRITICAL' | 'HIGH' | 'SUSPICIOUS' | 'SAFE';
  riskScore: number; // 0 - 100
  verdictTitle: string;
  summary: string;
  matchedScamType?: string;
  redFlags: string[];
  psychologicalTricks: string[];
  recommendedActions: string[];
  safeChecklist: string[];
  analyzedAt: string;
}

export interface ReferenceSource {
  id: string;
  name: string;
  organization: string;
  description: string;
  url: string;
  badge: string;
}
