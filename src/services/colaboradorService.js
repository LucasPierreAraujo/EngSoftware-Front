import { api } from "./apiService";
import { errorHandler } from "./errorService";

export const colaboradorService = {
  // Lista todos os colaboradores
  async listar() {
    try {
      return await api.get("colaboradores");
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  // Adiciona um novo colaborador no banco de dados
  // Esta função será usada no modal AdicionarColaborador.jsx
  async adicionar(data) {
    try {
      return await api.post("colaboradores", data);
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  // Atualiza os dados de um colaborador pelo ID
  async atualizar(id, data) {
    try {
      return await api.update("colaboradores", id, data);
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  // Deleta um colaborador pelo ID
  async deletar(id) {
    try {
      return await api.delete("colaboradores", id);
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
};
