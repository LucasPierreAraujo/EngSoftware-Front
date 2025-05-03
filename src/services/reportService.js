"use client";

import { api } from "@/services/apiService";
import { errorHandler } from "@/services/errorService";

export const reportService = {
  base_url: "progressOfWork",
  async list(query = {}) {
    try {
        let url = `${this.base_url}`;
        const queryString = new URLSearchParams(query).toString();
        if (queryString) {
            url += `?${queryString}`;
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
      // console.log(id, data)
      const response = await api.update(`${this.base_url}`, id , data);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      console.log(error)
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`${this.base_url}`,id);
      return response || {};
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
};
