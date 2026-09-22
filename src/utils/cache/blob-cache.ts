/**
 * Guarda os arquivos já baixados na memória da aba. Abrir um resumo, voltar e
 * abrir de novo não deve custar outro download — e Blob não cabe no
 * sessionStorage, por isso este cache é separado do de listas.
 */
const MAX_ENTRIES = 5;

const blobs = new Map<string, Blob>();

export const readBlob = (key: string) => blobs.get(key) ?? null;

export const writeBlob = (key: string, blob: Blob) => {
  // descarta o mais antigo para não segurar arquivos demais na memória
  if (blobs.size >= MAX_ENTRIES) {
    const oldest = blobs.keys().next().value;
    if (oldest) blobs.delete(oldest);
  }

  blobs.set(key, blob);
};

export const dropBlob = (key: string) => blobs.delete(key);

export const clearBlobs = () => blobs.clear();
