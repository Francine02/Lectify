export const ALLOWED_MIMES_TYPES = ['text/markdown', 'application/pdf'];

/** Formato esperado pelo react-dropzone: { mime: [extensões] } */
export const DROPZONE_ACCEPT = {
  'application/pdf': ['.pdf'],
  'text/markdown': ['.md'],
};
