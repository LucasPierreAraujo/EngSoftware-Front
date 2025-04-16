"use client";

import { api } from "@/services/apiService";
import { errorHandler } from "@/services/errorService";

export const obrasService = {
  base_url: 'obras',
  async list(status = "", page = 1) {
    try {
      let url = `${this.base_url}?page=${page}`;
      if (status != "" && status != "todas") {
        url += `&status=${status}`;
      }
      const response = await api.get(url);
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
};
