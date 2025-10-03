import z from 'zod';
import { passwordSchema } from './password-schema';

export const createPasswordSchema = passwordSchema
  .extend({
    confirmPassword: z.string().nonempty('Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não combinam',
    path: ['confirmPassword'],
  });

export type CreatePasswordData = z.infer<typeof createPasswordSchema>;
