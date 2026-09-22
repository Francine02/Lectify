/**
 * De onde o backend tirou o texto do vídeo. A diferença é grande e perceptível:
 * com legenda a transcrição inteira é usada (até 120.000 caracteres, ~2,2h de
 * vídeo); sem legenda só os 220 segundos iniciais do áudio são transcritos,
 * rendendo ~3.600 caracteres — o resumo cobre a abertura, não a aula toda.
 *
 * `null` é resumo gerado antes do campo existir: origem desconhecida, e não um
 * dos dois valores. Some sozinho em até 7 dias pela retenção.
 */
export type SummarySource = 'captions' | 'audio' | null;

export const SUMMARY_SOURCE_INFO = {
  captions: {
    label: 'Da legenda',
    detail: 'O vídeo tinha legenda, então o resumo cobre o conteúdo inteiro.',
    className: 'bg-mint-50 text-mint-700',
  },
  audio: {
    label: 'Do áudio',
    detail:
      'O vídeo não tinha legenda. Transcrevemos os 3min40 iniciais, então o resumo cobre a abertura — não a aula toda.',
    className: 'bg-sun-50 text-sun-700',
  },
} as const;
