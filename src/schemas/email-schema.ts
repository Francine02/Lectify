import z from 'zod';

export const emailSchema = z.object({
  email: z
    .email({ message: 'Email inválido' })
    .max(130, 'Email precisa ser menor que 130 caracteres'),
});

export type EmailData = z.infer<typeof emailSchema>;
