"use client";

import { api } from "@/services/apiService";
import { errorHandler } from "@/services/errorService";

export const tarefasService = {
  base_url: "tarefas",

  async list(etapa_id) {
    try {
      const response = await api.get(`${this.base_url}?etapa_id=${etapa_id}`);
      console.log(response);
      return response?.data || [];
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  async store(data = {}) {
    try {
      const response = await api.post(this.base_url, data);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  async view(id) {
    try {
      const response = await api.get(`${this.base_url}/${id}`);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await api.patch(`${this.base_url}/${id}`, data);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`${this.base_url}/${id}`);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
async updateStatus(id, data) {
  try {
    const response = await api.patch(`${this.base_url}/${id}`, data);
    return response || {};
  } catch (error) {
    errorHandler.handle(error);
    throw error;
  }
},  
  async iniciar(id) {
    try {
      const response = await api.patchByUrl(this.base_url, id, "iniciar");
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
  async concluir(id) {
    try {
      const response = await api.patchByUrl(this.base_url, id, "concluir");
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

    async pendente(id) {
    try {
      const response = await api.patchByUrl(this.base_url, id, "pendente");
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
};
