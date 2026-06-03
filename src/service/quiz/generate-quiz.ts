import { QuizData } from '@/app/(private)/gerar-quiz/quiz-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const generateQuiz = (data: QuizData): Promise<ApiResponse> => {
    const payload = { ...data, language_select: 'pt-BR' };
    return baseRequest('post', '/questions', payload);
};
