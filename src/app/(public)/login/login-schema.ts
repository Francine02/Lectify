import { emailSchema } from 'schemas/email-schema';
import { passwordSchema } from 'schemas/password-schema';
import { z } from 'zod';

export const loginSchema = emailSchema.merge(passwordSchema);

export type LoginData = z.infer<typeof loginSchema>;
