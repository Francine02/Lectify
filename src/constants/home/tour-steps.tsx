import {
  BookMarked,
  Clock3,
  Crown,
  ListChecks,
  ListVideo,
  NotebookPen,
  Sparkles,
  Timer,
  Youtube,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TourAccent = 'purple' | 'sky' | 'mint' | 'sun';

export type TourStep = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon: LucideIcon;
  accent: TourAccent;
  /** Mini demonstração da tela real, para o guia mostrar e não só contar. */
  preview: React.ReactNode;
  cta?: { label: string; href: string };
};

/* ------------------------------------------------------------------ *
 * Peças das demonstrações — versões estáticas e reduzidas das telas
 * ------------------------------------------------------------------ */

const Mock = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full space-y-2.5 rounded-2xl border border-line bg-surface p-4 shadow-soft">
    {children}
  </div>
);

const MockBar = ({ className = '' }: { className?: string }) => (
  <div className={`h-2 rounded-full bg-line ${className}`} />
);

const SummaryPreview = (
  <Mock>
    <p className="text-[11px] font-bold text-subtle">Link do vídeo</p>

    <div className="flex items-center gap-2 rounded-xl border border-purple-300 bg-purple-50/60 px-3 py-2.5">
      <Youtube size={14} className="shrink-0 text-coral-500" />
      <span className="truncate text-[11px] text-ink">youtube.com/watch?v=aula-de-biologia</span>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2 rounded-xl border border-purple-500 bg-purple-50 px-2.5 py-2">
        <span className="size-3 rounded-full bg-purple-600" />
        <span className="text-[11px] font-bold">PDF</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
        <span className="size-3 rounded-full bg-line-strong" />
        <span className="text-[11px] font-semibold text-subtle">Markdown</span>
      </div>
    </div>

    <div className="rounded-xl bg-brand py-2.5 text-center text-[11px] font-bold text-white">
      Gerar resumo
    </div>
  </Mock>
);

const BackgroundPreview = (
  <div className="w-full space-y-3">
    <div className="space-y-2 rounded-2xl border border-line bg-surface p-4 opacity-60">
      <MockBar className="w-1/3" />
      <MockBar className="w-full" />
      <MockBar className="w-4/5" />
      <p className="pt-1 text-[10px] font-semibold text-faint">
        você segue navegando pelo app normalmente
      </p>
    </div>

    <div className="ml-auto w-[210px] rounded-2xl border border-line bg-surface p-3 shadow-float">
      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-subtle">
        <Sparkles size={10} className="text-purple-600" />
        Gerando resumo
      </p>

      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full border-4 border-purple-100 border-t-purple-600 text-[9px] font-bold text-purple-700">
          62%
        </span>
        <span className="text-[10px] font-semibold leading-tight">
          Pode continuar
          <br />
          navegando
        </span>
      </div>
    </div>
  </div>
);

const QueuePreview = (
  <Mock>
    <p className="text-[11px] font-bold">Fila de vídeos</p>

    <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
      <span className="chip bg-purple-50 text-purple-700">Gerando</span>
      <MockBar className="flex-1" />
    </div>

    <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
      <span className="chip bg-canvas text-subtle">Na fila</span>
      <MockBar className="flex-1" />
    </div>

    <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
      <span className="chip bg-mint-50 text-mint-700">Pronto</span>
      <MockBar className="flex-1" />
      <span className="text-[9px] font-bold text-purple-700">Ler</span>
    </div>

    <p className="flex items-center gap-1.5 text-[10px] text-faint">
      <Clock3 size={10} />
      Próximo vídeo em 1:42
    </p>
  </Mock>
);

const QuizPreview = (
  <Mock>
    <div className="flex gap-1 rounded-xl border border-line p-1">
      <span className="flex-1 rounded-lg py-1.5 text-center text-[10px] font-bold text-subtle">
        Resumo
      </span>
      <span className="flex-1 rounded-lg bg-purple-50 py-1.5 text-center text-[10px] font-bold text-purple-700">
        Questões · 5
      </span>
    </div>

    <p className="text-[11px] font-bold leading-snug">Qual organela produz energia na célula?</p>

    <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
      <span className="flex size-4 items-center justify-center rounded bg-canvas text-[9px] font-bold text-subtle">
        A
      </span>
      <span className="text-[10px] text-subtle">Ribossomo</span>
    </div>

    <div className="flex items-center gap-2 rounded-xl border border-mint-500 bg-mint-50 px-2.5 py-2">
      <span className="flex size-4 items-center justify-center rounded bg-mint-500 text-[9px] font-bold text-white">
        B
      </span>
      <span className="text-[10px] font-semibold text-mint-700">Mitocôndria</span>
    </div>

    <p className="rounded-lg bg-sun-50 px-2.5 py-1.5 text-[10px] text-sun-700">
      Cada questão traz dica e justificativa.
    </p>
  </Mock>
);

const LibraryPreview = (
  <Mock>
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="flex h-14 items-center justify-between bg-purple-900 px-2.5">
        <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[9px] font-bold uppercase text-coral-700">
          pdf
        </span>
        <span className="flex items-center gap-1 rounded-full bg-sun-50 px-2 py-0.5 text-[9px] font-bold text-sun-700">
          <Clock3 size={9} />
          Expira em 2 dias
        </span>
      </div>

      <div className="space-y-2 p-2.5">
        <MockBar className="w-2/3" />
        <div className="flex gap-1.5">
          <span className="flex-1 rounded-lg bg-brand py-1.5 text-center text-[9px] font-bold text-white">
            Questões
          </span>
          <span className="rounded-lg border border-line px-2.5 py-1.5 text-[9px] font-semibold text-subtle">
            Baixar
          </span>
          <span className="rounded-lg border border-line px-2.5 py-1.5 text-[9px] font-semibold text-coral-700">
            Excluir
          </span>
        </div>
      </div>
    </div>

    <p className="text-[10px] text-subtle">
      Excluir um resumo apaga também as questões geradas a partir dele.
    </p>
  </Mock>
);

const CachePreview = (
  <Mock>
    <p className="text-[11px] font-bold">Resumo salvo → questões em 1 clique</p>

    <div className="flex items-center gap-2 rounded-xl border border-line px-2.5 py-2">
      <span className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
        <BookMarked size={13} />
      </span>
      <MockBar className="flex-1" />
      <span className="rounded-lg bg-brand px-2 py-1 text-[9px] font-bold text-white">
        Questões
      </span>
    </div>

    <p className="flex items-center gap-1.5 rounded-lg bg-mint-50 px-2.5 py-1.5 text-[10px] font-semibold text-mint-700">
      <Zap size={10} />
      Já gerado antes? Volta na hora, sem gastar cota.
    </p>
  </Mock>
);

const NotebookPreview = (
  <Mock>
    <div className="space-y-2 rounded-xl border border-line border-t-4 border-t-sun-500 p-3">
      <p className="text-[11px] font-extrabold">Revisar antes da prova</p>
      <MockBar className="w-full" />
      <MockBar className="w-3/4" />

      <span className="inline-flex items-center gap-1 rounded-lg bg-sun-50 px-2 py-1 text-[9px] font-semibold text-sun-700">
        khanacademy.org/mitocondria
      </span>
    </div>

    <p className="text-[10px] text-subtle">
      Tópicos, dúvidas e links ficam salvos no seu navegador — e a captura rápida fica no canto da
      tela.
    </p>
  </Mock>
);

const PomodoroPreview = (
  <Mock>
    <div className="flex gap-1 rounded-xl bg-canvas p-1">
      <span className="flex-1 rounded-lg bg-surface py-1.5 text-center text-[10px] font-bold text-purple-700">
        Foco
      </span>
      <span className="flex-1 py-1.5 text-center text-[10px] font-semibold text-subtle">Pausa</span>
      <span className="flex-1 py-1.5 text-center text-[10px] font-semibold text-subtle">Longa</span>
    </div>

    <p className="text-center font-display text-3xl font-extrabold tabular-nums">24:13</p>

    <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
      <div className="h-full w-1/5 rounded-full bg-purple-600" />
    </div>

    <div className="rounded-xl bg-brand py-2 text-center text-[11px] font-bold text-white">
      Pausar
    </div>
  </Mock>
);

const UsagePreview = (
  <Mock>
    <p className="text-[11px] font-extrabold">Sua cota</p>

    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px]">
        <span className="font-semibold">Resumos</span>
        <span className="text-subtle">
          <strong className="text-ink">8</strong> de 12 nos 7 dias
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
        <div className="h-full w-1/3 rounded-full bg-purple-600" />
      </div>
    </div>

    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px]">
        <span className="font-semibold">Questões</span>
        <span className="text-subtle">
          <strong className="text-ink">10</strong> de 12 nos 7 dias
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
        <div className="h-full w-1/6 rounded-full bg-purple-600" />
      </div>
    </div>

    <p className="text-[10px] text-subtle">O ciclo de 7 dias reseta junto com a validade dos resumos.</p>
  </Mock>
);

/* ------------------------------------------------------------------ *
 * Roteiro do guia
 * ------------------------------------------------------------------ */

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'summary',
    title: 'Comece colando um link',
    description:
      'Em "Gerar resumo", cole o endereço de uma aula do YouTube e escolha o formato (PDF ou Markdown) e o idioma do material.',
    bullets: [
      'Vídeo com legenda rende o resumo da aula inteira',
      'Sem legenda, só os 3min40 iniciais são transcritos',
    ],
    icon: Sparkles,
    accent: 'purple',
    preview: SummaryPreview,
    cta: { label: 'Abrir gerar resumo', href: '/gerar-resumo' },
  },
  {
    id: 'background',
    title: 'Não precisa esperar parado',
    description:
      'Assim que a geração começa, ela roda em segundo plano. Um popup no canto mostra o progresso enquanto você usa o resto do app — e avisa quando ficar pronto.',
    bullets: ['Pode minimizar o popup', 'Se recarregar a página, o acompanhamento continua'],
    icon: Clock3,
    accent: 'sky',
    preview: BackgroundPreview,
  },
  {
    id: 'queue',
    title: 'Vários vídeos de uma vez',
    description:
      'Na tela de resumo, cole uma lista de links na fila. O app gera um por vez, com dois minutos de intervalo, e vai enchendo sua biblioteca enquanto você estuda.',
    bullets: [
      'O intervalo existe para nunca chegar perto do limite do plano',
      'A fila não gera questões sozinha, para poupar sua cota',
      'Dá para pausar, remover um item ou tentar de novo o que falhou',
    ],
    icon: ListVideo,
    accent: 'sky',
    preview: QueuePreview,
    cta: { label: 'Montar minha fila', href: '/gerar-resumo' },
  },
  {
    id: 'study',
    title: 'Resumo e questões na mesma tela',
    description:
      'Quando termina, o material abre com as questões já prontas na aba ao lado. Dá para responder consultando o resumo lado a lado.',
    bullets: ['5 questões com dica e justificativa', 'Ao final, uma revisão do que você errou'],
    icon: ListChecks,
    accent: 'sky',
    preview: QuizPreview,
  },
  {
    id: 'library',
    title: 'Sua biblioteca dura 7 dias',
    description:
      'Todo resumo fica salvo por 7 dias. A etiqueta de validade avisa o que está perto de vencer — baixe o arquivo para guardar em definitivo.',
    bullets: [
      'Filtre por formato ou pelo que está vencendo',
      'Excluir um resumo apaga as questões dele junto',
    ],
    icon: BookMarked,
    accent: 'mint',
    preview: LibraryPreview,
    cta: { label: 'Ver meus resumos', href: '/meus-resumos' },
  },
  {
    id: 'quiz-cache',
    title: 'Questões sem gastar cota',
    description:
      'Na biblioteca, o botão "Questões" gera a partir do resumo salvo, sem upload. Se aquele material já tiver questões, elas voltam na hora e não debitam nada do seu plano.',
    bullets: ['Também aceita upload de um PDF ou Markdown seu, até 5 MB'],
    icon: Zap,
    accent: 'mint',
    preview: CachePreview,
    cta: { label: 'Abrir gerar questões', href: '/gerar-quiz' },
  },
  {
    id: 'notebook',
    title: 'Escreva ao lado do resumo',
    description:
      'No caderno você puxa um resumo da biblioteca e escreve ao lado dele. No fim, baixa um documento único com as suas anotações e o resumo juntos.',
    bullets: [
      'Botão "Anotar" na tela de leitura já abre a folha daquele resumo',
      'Exporta em .md ou imprime/salva em PDF pelo navegador',
      'Tudo fica salvo no seu dispositivo, sem passar pela nossa API',
    ],
    icon: NotebookPen,
    accent: 'sun',
    preview: NotebookPreview,
    cta: { label: 'Abrir caderno', href: '/caderno' },
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro para manter o ritmo',
    description:
      'O timer fica no canto da tela e continua rodando enquanto você navega ou gera um resumo. Ciclos de 25 minutos de foco com pausas automáticas.',
    bullets: ['A cada 4 ciclos, a pausa longa entra sozinha'],
    icon: Timer,
    accent: 'purple',
    preview: PomodoroPreview,
  },
  {
    id: 'usage',
    title: 'Acompanhe sua cota',
    description:
      'No seu perfil você vê quantas gerações restam nos 7 dias e no mês, e a data exata em que o limite renova.',
    bullets: ['Só geração nova debita cota', 'Conteúdo vindo do cache é sempre gratuito'],
    icon: Crown,
    accent: 'sun',
    preview: UsagePreview,
    cta: { label: 'Ver meu perfil', href: '/minha-conta' },
  },
];
