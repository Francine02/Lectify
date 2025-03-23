/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/pages/api-reference/config/typescript for more information.

interface ImportMetaEnv {
    readonly NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
    readonly NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
    readonly NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
    readonly NEXT_PUBLIC_LECTIFY_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  