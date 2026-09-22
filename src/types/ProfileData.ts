import { PlanId } from './Plan';

export interface ProfileData {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  is_free: boolean;
  created_at: string;
  image_profile?: string;
  /** Presentes apenas em contas pagas. */
  plan?: PlanId | null;
  subscription_end?: string | null;
}
