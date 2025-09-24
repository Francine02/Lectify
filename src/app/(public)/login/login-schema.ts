import { credentialsSchema } from 'schemas/credentials-schema';
import { z } from 'zod';

export const loginSchema = credentialsSchema;

export type LoginData = z.infer<typeof loginSchema>;
