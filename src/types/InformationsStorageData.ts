import { PlanId } from './Plan';

export interface InformationsStorageData {
  created_at?: string;
  email?: string;
  firstname?: string;
  image_profile?: string;
  is_free?: boolean;
  lastname?: string;
  username?: string;
  plan?: PlanId | null;
  subscription_end?: string | null;
}
