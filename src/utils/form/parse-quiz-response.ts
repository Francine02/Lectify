import { QuizPayload, QuizQuestion, QuizResponse } from '@/types/QuizQuestion';

/**
 * A API não é consistente no formato das alternativas: às vezes vêm prefixadas
 * ("B) Google..."), e o `resposta_correta` pode chegar como a letra isolada, com
 * outro prefixo ou com pontuação/acentuação diferente do texto da alternativa.
 *
 * Comparar as strings cruas, como a UI fazia, marcava toda resposta como errada.
 * Aqui limpamos as alternativas e resolvemos a correta para exatamente uma delas.
 */
const OPTION_PREFIX = /^\s*\(?\s*([a-eA-E])\s*[)\].\-–:]\s*/;

const LETTER_ONLY =
  /^\s*(?:alternativa|letra|op[çc][ãa]o|resposta)?\s*\(?\s*([a-eA-E])\s*\)?\s*[).\]]?\s*$/i;

export const stripOptionPrefix = (text: string) => text.replace(OPTION_PREFIX, '').trim();

/** Minúsculas, sem acento e sem pontuação — só para comparar. */
const normalize = (text: string) =>
  stripOptionPrefix(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const words = (text: string) => normalize(text).split(' ').filter(Boolean);

/** Última tentativa: escolhe a alternativa com maior sobreposição de palavras. */
const bestOverlap = (target: string, options: string[]) => {
  const targetWords = words(target);

  if (targetWords.length === 0) return null;

  let bestOption = '';
  let bestScore = 0;

  for (const option of options) {
    const optionWords = words(option);

    if (optionWords.length === 0) continue;

    const shared = optionWords.filter((word) => targetWords.includes(word)).length;
    const score = shared / Math.max(optionWords.length, targetWords.length);

    if (score > bestScore) {
      bestScore = score;
      bestOption = option;
    }
  }

  return bestScore >= 0.6 ? bestOption : null;
};

/** Devolve o texto exato da alternativa correta, do jeito que a UI a exibe. */
export const resolveCorrectAnswer = (raw: string | undefined, options: string[]) => {
  const answer = (raw ?? '').trim();

  if (!answer) return '';

  // "B", "letra B", "(b)" — a resposta veio como índice
  const letter = answer.match(LETTER_ONLY);

  if (letter) {
    const index = letter[1].toUpperCase().charCodeAt(0) - 65;
    if (options[index]) return options[index];
  }

  const target = normalize(answer);

  const exact = options.find((option) => normalize(option) === target);
  if (exact) return exact;

  const contained = options.find((option) => {
    const normalized = normalize(option);
    return !!normalized && (target.includes(normalized) || normalized.includes(target));
  });
  if (contained) return contained;

  return bestOverlap(answer, options) ?? stripOptionPrefix(answer);
};

/**
 * O `POST /questions` devolve o mapa de questões puro e o `GET /questions/{id}`
 * devolve o mesmo mapa dentro de `questions`, ao lado dos metadados do quiz.
 * Aqui os dois formatos viram um só, para a UI não precisar saber a origem.
 */
export const extractQuestionMap = (payload?: QuizPayload | null): QuizResponse => {
  if (!payload || typeof payload !== 'object') return {};

  const enveloped = (payload as { questions?: unknown }).questions;

  if (enveloped && typeof enveloped === 'object') return enveloped as QuizResponse;

  return payload as QuizResponse;
};

/** Converte { questao1: {...} } na lista usada pela UI, descartando itens malformados. */
export const parseQuizResponse = (payload?: QuizPayload | null): QuizQuestion[] => {
  const response = extractQuestionMap(payload);

  return Object.entries(response)
    .filter(([, value]) => value && Array.isArray(value.alternativas) && !!value.pergunta)
    .map(([key, value]) => {
      const options = value.alternativas
        .filter((option) => typeof option === 'string')
        .map(stripOptionPrefix);

      return {
        id: key,
        question: value.pergunta.trim(),
        options,
        hint: value.dica,
        correctAnswer: resolveCorrectAnswer(value.resposta_correta, options),
        explanation: value.justificativa,
        difficulty: value.Dificuldade,
      };
    });
};
