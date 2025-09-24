import { credentialsSchema } from 'schemas/credentials-schema';
import z from 'zod';

export const personalInformationSchema = credentialsSchema.extend({
  firstname: z
    .string()
    .min(3, 'Nome precisa ter pelo menos 3 caracteres')
    .max(32, 'Nome precisa ser menor que 32 caracteres')
    .regex(/^[A-Za-z]{1,32}$/, 'Nome precisa conter somente letras'),
  lastname: z
    .string()
    .min(3, 'Sobrenome precisa ter pelo menos 3 caracteres')
    .max(32, 'Sobrenome precisa ser menor que 32 caracteres')
    .regex(/^[A-Za-z]{1,32}$/, 'Sobrenome precisa conter somente letras'),
});

export type PersonalInformationData = z.infer<typeof personalInformationSchema>;
