export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  /**
   * Status HTTP da resposta. Importa para a regra de cota: em `/questions` e
   * `/summarize`, 201 significa geração nova (debita cota) e 200 veio do cache
   * ou do acervo (não debita).
   */
  status?: number;
  error?: {
    code: string;
    message: string;
  };
}
