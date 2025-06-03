"use client";

import { api } from "@/services/apiService";
import { errorHandler } from "@/services/errorService";

export const etapasService = {
  base_url: 'etapas',
  
  async listByObra(obraId, page = 1) {
    try {
      const response = await api.get(`${this.base_url}?obra_id=${obraId}&page=${page}`);
      return response || {};
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
  
  async updateStatus(id, status_id) 
  {
    try {
      const response = await api.patch(`${this.base_url}/${id}`, { status_id });
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  }
}; 