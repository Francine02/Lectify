export type NoteColor = 'purple' | 'mint' | 'sun' | 'sky';

export interface NoteLink {
  id: string;
  url: string;
  label: string;
}

/** Resumo da biblioteca anexado à anotação, para escrever ao lado dele. */
export interface NoteSummaryRef {
  id: string;
  filename: string;
  filetype: 'pdf' | 'md';
  youtubeUrl?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  links: NoteLink[];
  color: NoteColor;
  isPinned: boolean;
  summary?: NoteSummaryRef;
  createdAt: string;
  updatedAt: string;
}
