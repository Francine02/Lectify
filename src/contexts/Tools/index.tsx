'use client';

import { createContext, useCallback, useContext, useState } from 'react';

export type ToolId = 'pomodoro' | 'note';

type ToolsValue = {
  /** Qual painel do canto está aberto — um de cada vez. */
  openTool: ToolId | null;
  toggle: (tool: ToolId) => void;
  open: (tool: ToolId) => void;
  close: () => void;
};

const ToolsContext = createContext<ToolsValue | null>(null);

/**
 * Painéis de ferramenta (pomodoro e anotação rápida) vivem no canto da tela,
 * mas quem abre pode ser a barra lateral — por isso o estado fica aqui.
 */
export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const [openTool, setOpenTool] = useState<ToolId | null>(null);

  const toggle = useCallback(
    (tool: ToolId) => setOpenTool((previous) => (previous === tool ? null : tool)),
    []
  );

  return (
    <ToolsContext.Provider
      value={{
        openTool,
        toggle,
        open: (tool) => setOpenTool(tool),
        close: () => setOpenTool(null),
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);

  if (!context) throw new Error('useTools precisa estar dentro de ToolsProvider');

  return context;
}
