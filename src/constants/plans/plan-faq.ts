export const PLAN_FAQ = [
  {
    question: 'Por quanto tempo os resumos ficam salvos?',
    answer:
      'Todo resumo fica disponível por 7 dias, em qualquer plano. Baixe o PDF ou o Markdown para guardar por tempo indeterminado — as questões geradas a partir dele seguem a mesma validade.',
  },
  {
    question: 'A cota de resumos e a de questões são a mesma?',
    answer:
      'Não. Cada funcionalidade tem o próprio contador: gastar um resumo não consome nada da cota de questões. O painel de cota mostra as duas barras separadas, com o restante do ciclo de 7 dias e o teto do mês.',
  },
  {
    question: 'O que acontece quando eu atinjo o limite?',
    answer:
      'A geração daquela funcionalidade fica indisponível até a virada do ciclo, que é de 7 dias — a outra continua liberada. Existe ainda um teto mensal. As datas exatas aparecem no painel de cota, dentro do seu perfil.',
  },
  {
    question: 'O plano anual processa mais rápido?',
    answer:
      'O processamento é sempre um resumo por vez, mas quem assina o plano anual é atendido primeiro na fila. Não é processamento simultâneo: é prioridade de atendimento.',
  },
  {
    question: 'Todo vídeo rende o mesmo resumo?',
    answer:
      'Não. Quando o vídeo tem legenda, a transcrição inteira é usada e o resumo cobre a aula toda. Sem legenda, transcrevemos o áudio dos 3min40 iniciais — o resumo cobre a abertura, não o conteúdo completo.',
  },
  {
    question: 'Reabrir um quiz já gerado consome cota?',
    answer:
      'Não. Todo quiz fica salvo em "Meus quizzes" por 7 dias e reabrir de lá não debita nada. Pedir de novo o mesmo material também volta do cache na hora, sem consumir cota.',
  },
  {
    question: 'Como funciona a renovação?',
    answer:
      'A assinatura não é recorrente: nos últimos 30 dias de validade você pode renovar, e o tempo restante é somado ao novo período. Os pagamentos são processados pelo Mercado Pago.',
  },
];
