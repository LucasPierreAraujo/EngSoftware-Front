"use client";

import { api } from "./apiService";
import { errorHandler } from "./errorService";
import { tokenService } from "./tokenService";

const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (e) {
    return false;
  }
};

export const authService = {
  async login(email, password) {
    try {
      const loginResponse = await api.post("auth/login", { email, password });
      tokenService.setToken(loginResponse.access_token);

      const userResponse = await api.get("auth/me");
      if (isLocalStorageAvailable()) {
        localStorage.setItem("loggedUser", JSON.stringify(userResponse));
      }
      return { success: true, message: "Usuário logado com sucesso" };
    } catch (error) {
      errorHandler.handle(error);
      throw error;
    }
  },

  async logout() {
    console.log("Iniciando processo de logout...");
    
    try {
      console.log("Tentando fazer chamada de logout na API...");
      await api.post("auth/logout");
      console.log("Chamada de logout na API bem sucedida");
    } catch (error) {
      console.error("Erro na chamada de logout:", error);
      errorHandler.handle(error);
    } finally {
      console.log("Limpando dados locais...");
      
      // Limpa os dados locais
      tokenService.removeToken();
      console.log("Token removido");
      
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("loggedUser");
        console.log("Usuário removido do localStorage");
      }
      
      // Redireciona para a página de login
      if (typeof window !== 'undefined') {
        console.log("Redirecionando para página de login...");
        window.location.replace("/login");
      }
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

  async register(data) {
    try{
      const response = await api.post("users", data);
      return response;
    } catch(error){
      errorHandler.handle(error);
      throw error;
    }
  },
  async forgotPassword(email) {
    const response = await api.post("auth/password/send-link", { email: email });
    return response;
  },
  async resetPassword(email, password, repeat, token)
  {
    const response = await api.post("auth/password/reset", {
      email: email,
      token: token,
      password: password,
      password_confirmation: repeat
    });
    return response;
  }
};
