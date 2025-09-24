import z from 'zod';

export const registerSchema = z.object({
  email: z
    .email({ message: 'Email inválido' })
    .max(130, 'Email precisa ser menor que 130 caracteres'),
});

export type RegisterData = z.infer<typeof registerSchema>;
