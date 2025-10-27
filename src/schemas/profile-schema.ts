import z from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Nome de usuário precisa ter pelo menos 3 caracteres')
    .max(32, 'Nome de usuário precisa ser menor que 32 caracters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Nome de usuário precisa ter somente letras, números e sublinhado (_)'
    ),
  firstname: z
    .string()
    .trim()
    .min(3, 'Nome precisa ter pelo menos 3 caracteres')
    .max(32, 'Nome precisa ser menor que 32 caracteres')
    .regex(/^[A-Za-z]{1,32}$/, 'Nome precisa conter somente letras'),
  lastname: z
    .string()
    .trim()
    .min(3, 'Sobrenome precisa ter pelo menos 3 caracteres')
    .max(32, 'Sobrenome precisa ser menor que 32 caracteres')
    .regex(/^[A-Za-z]{1,32}$/, 'Sobrenome precisa conter somente letras'),
});

export type ProfileData = z.infer<typeof profileSchema>;
