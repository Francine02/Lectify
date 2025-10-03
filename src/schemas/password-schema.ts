import z from 'zod';

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Senha precisa ter pelo menos 8 caracteres')
    .max(64, 'Senha precisa ser menor que 64 caracteres')
    .regex(/(?=.*[a-z])/, 'Senha precisa ter pelo menos uma letra minúscula')
    .regex(/(?=.*[A-Z])/, 'Senha precisa ter pelo menos uma letra maiúscula')
    .regex(/(?=.*\d)/, 'Senha precisa ter pelo menos um número')
    .regex(/(?=.*[\W_])/, 'Senha precisa ter pelo menos um caractere especial'),
});

export type CredentialsData = z.infer<typeof passwordSchema>;
