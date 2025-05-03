'use client'

import { ApiError } from './errorService';
import { tokenService } from "./tokenService";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";

async function handleResponse(response) {
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiError(
          error.message || "Erro na requisição",
          response.status,
          error.details
        );
      }
      return response.json();
}

function getHeaders(json = true) {
  const headers = new Headers();
  if (json) {
    headers.set("Content-Type", "application/json");
  }
  if (tokenService.getToken()) {
    headers.set("Authorization", `Bearer ${tokenService.getToken()}`);
  }
  return headers;
}

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
    },
  
  async patch(endpoint, id, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
    },
  
  async delete(endpoint, id) {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  async update(endpoint, id, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`,{
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
    },
  
  
};
