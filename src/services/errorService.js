export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "ApiError";
  }
}

export const errorHandler = {
  handle(error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 401:
          // Redirecionar para login
              console.error("Não autenticado");
          break;
        case 403:
          // Erro de permissão
          console.error("Acesso não autorizado");
          break;
        case 404:
          // Recurso não encontrado
          console.error("Recurso não encontrado");
          break;
        default:
          console.error("Erro na requisição:", error.message);
      }
    } else {
      console.error("Erro não esperado:", error);
    }
  },
};
