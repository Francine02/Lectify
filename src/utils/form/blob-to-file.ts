const MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  md: 'text/markdown',
};

export const blobToFile = (blob: Blob, filename: string, format: 'pdf' | 'md') => {
  return new File([blob], filename, { type: MIME_TYPES[format] ?? blob.type });
};
