import { PlanId } from './Plan';

export interface UsageEntry {
  /** 'minute' | 'week' | 'month' */
  period: string;
  period_seconds: number;
  limit: number;
  remaining: number;
  used: number;
  reset_at: string;
}

export interface UsageData {
  is_free: boolean;
  plan: PlanId | null;
  features: {
    summarize?: UsageEntry[];
    questions?: UsageEntry[];
  };
}
