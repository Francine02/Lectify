import type { IStaticMethods } from 'preline/dist';

declare global {
  interface Window {
    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};
