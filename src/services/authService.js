"use client";

import { api } from "./apiService";
import { errorHandler } from "./errorService";
import { tokenService } from "./tokenService";

export const authService = {
  async login(email, password) {
    try {
      const loginResponse = await api.post("auth/login", { email, password });
      tokenService.setToken(loginResponse.access_token);

      const userResponse = await api.get("auth/me");
      localStorage.setItem("loggedUser", JSON.stringify(userResponse));
      return { success: true, message: "Usuário logado com sucesso" };
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
  async logout() {
    try {
      await api.post("auth/logout");
      tokenService.removeToken();
      localStorage.removeItem("loggedUser");
    } catch (error) {
      errorHandler.handle(error);
    } finally {
      window.location.href = "/login";
    }
  },
  async refresh() {
    try {
        const refresh = await api.post("auth/refresh", {});
        tokenService.setToken(refresh.access_token);
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },
};
