"use client";

import { api } from "@/services/apiService";
import { errorHandler } from "@/services/errorService";

export const clienteService = {
  base_url: 'clientes',
  async list() {
    try {
      let url = `${this.base_url}`;
      const response = await api.get(url);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
  async store(nome, data = {}) {
    try {
      const response = await api.post(this.base_url, {
        nome: nome,
        ...data,
      });
      return response || {};
    } catch (error) {
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
  async update(id, data = {}) {
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
};
