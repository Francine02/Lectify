/**
 * O backend responde sempre em inglês. Aqui traduzimos as mensagens conhecidas
 * para pt-BR antes de mostrar ao usuário. Regras com grupo de captura reaproveitam
 * o valor dinâmico (minutos, período da cota, tamanho de arquivo).
 */
type ErrorRule = {
  match: RegExp;
  message: string | ((match: RegExpMatchArray) => string);
};

const QUOTA_PERIODS: Record<string, string> = {
  Weekly: 'semanal',
  Monthly: 'mensal',
};

export const API_ERROR_RULES: ErrorRule[] = [
  {
    match: /temporarily blocked.*?try again in (\d+) minute/i,
    message: ([, minutes]) =>
      `Sua conta foi bloqueada temporariamente por excesso de tentativas. Tente de novo em ${minutes} minuto(s).`,
  },
  {
    match: /temporarily blocked/i,
    message: 'Sua conta foi bloqueada temporariamente por excesso de tentativas.',
  },
  {
    match: /approaching the rate limit/i,
    message:
      'Você está perto do limite de requisições. Mais uma tentativa e sua conta fica bloqueada por 30 minutos.',
  },
  {
    match: /(Weekly|Monthly) lectify (summarize|questions) quota reached/i,
    message: ([, period, feature]) =>
      `Você atingiu a cota ${QUOTA_PERIODS[period] ?? period.toLowerCase()} de ${
        feature.toLowerCase() === 'summarize' ? 'resumos' : 'questões'
      } do seu plano. Faça upgrade para continuar.`,
  },
  {
    match: /Upgrade your plan to continue/i,
    message: 'Seu plano não inclui esse recurso. Escolha um plano para continuar.',
  },
  { match: /Too many requests/i, message: 'Muitas requisições seguidas. Aguarde um instante.' },
  { match: /Invalid email or password/i, message: 'E-mail ou senha inválidos.' },
  { match: /User not found/i, message: 'Usuário não encontrado.' },
  {
    match: /already being processed for this request/i,
    message: 'Já existe um resumo desse vídeo em processamento. Aguarde a geração terminar.',
  },
  { match: /Invalid YouTube URL/i, message: 'URL do YouTube inválida.' },
  { match: /URL exceeds maximum length/i, message: 'A URL é longa demais.' },
  {
    match: /File size exceeds the maximum limit of (\d+) MB/i,
    message: ([, size]) => `O arquivo passa do limite de ${size} MB.`,
  },
  { match: /Exactly one file must be uploaded/i, message: 'Envie exatamente um arquivo.' },
  { match: /No files received/i, message: 'Nenhum arquivo foi recebido.' },
  {
    match: /No extractable text found/i,
    message: 'Não foi possível extrair texto desse arquivo. Ele pode estar vazio ou ser só imagem.',
  },
  {
    match: /Invalid format. Supported formats: (.+)/i,
    message: ([, formats]) => `Formato inválido. Aceitos: ${formats}.`,
  },
  {
    match: /Invalid file type/i,
    message: 'O conteúdo do arquivo não corresponde à extensão enviada.',
  },
  {
    match: /Error during chat generation/i,
    message: 'Não conseguimos gerar o conteúdo agora. Tente novamente em instantes.',
  },
  {
    match: /queue is empty, summarize not started/i,
    message: 'A geração ainda não começou. Aguarde alguns segundos.',
  },
  { match: /Email already registered/i, message: 'Esse e-mail já está cadastrado.' },
  { match: /Username already registered/i, message: 'Esse nome de usuário já está em uso.' },
  { match: /Invalid verification (Token|code)/i, message: 'Código de verificação inválido.' },
  {
    match: /not authorized to access this resource/i,
    message: 'Sua sessão expirou. Entre novamente.',
  },
  {
    match: /(quiz|questions|file).*not found|not found.*(quiz|questions|file)/i,
    message: 'Não encontramos esse conteúdo na sua conta. Ele pode ter expirado.',
  },
  {
    match: /An error occurred while processing the request/i,
    message: 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
  },
];

export const DEFAULT_API_ERROR =
  'Ocorreu um erro! Por favor, tente novamente mais tarde';

export const translateApiError = (message?: string) => {
  if (!message) return DEFAULT_API_ERROR;

  for (const rule of API_ERROR_RULES) {
    const found = message.match(rule.match);

    if (found) return typeof rule.message === 'function' ? rule.message(found) : rule.message;
  }

  return message;
};
