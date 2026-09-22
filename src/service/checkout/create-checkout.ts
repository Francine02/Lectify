import { ApiResponse } from '@/types/ApiResponse';
import { PlanId } from '@/types/Plan';
import { baseRequest } from '../base-request';

type CheckoutResponse = {
  checkout_url: string;
};

/**
 * O backend exige que as URLs de retorno sejam https (validate_user_data),
 * então em desenvolvimento usamos NEXT_PUBLIC_CHECKOUT_RETURN_URL.
 */
const RETURN_BASE_URL = process.env.NEXT_PUBLIC_CHECKOUT_RETURN_URL ?? process.env.NEXT_PUBLIC_URL;

export const createCheckout = (plan: PlanId): Promise<ApiResponse<CheckoutResponse>> => {
  const payload = {
    plan,
    success_url: `${RETURN_BASE_URL}/planos?status=sucesso`,
    failure_url: `${RETURN_BASE_URL}/planos?status=falha`,
    pending_url: `${RETURN_BASE_URL}/planos?status=pendente`,
  };

  return baseRequest<CheckoutResponse>('post', '/checkout', payload);
};
