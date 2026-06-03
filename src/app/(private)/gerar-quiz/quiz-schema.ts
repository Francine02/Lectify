import { ALLOWED_MIMES_TYPES } from '@/constants/form/mime-types';
import z from 'zod';

export const quizSchema = z.object({
    file: z
        .file({ message: 'Arquivo em formato inválido.' })
        .max(1024 * 1024 * 5, 'Arquivo excede limite de 5mb.')
        .refine((file) => ALLOWED_MIMES_TYPES.includes(file.type), {
            message: 'Apenas arquivos Markdown ou PDF são permitidos.',
        }),
});

export type QuizData = z.infer<typeof quizSchema>;
