import { passwordSchema } from '@/schemas/password-schema';
import { profileSchema } from '@/schemas/profile-schema';
import z from 'zod';

export const personalInformationSchema = profileSchema.merge(passwordSchema);

export type PersonalInformationData = z.infer<typeof personalInformationSchema>;
