'use client'

const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (e) {
    return false;
  }
};

export const tokenService = {
  getToken() {
    if (!isLocalStorageAvailable()) return null;
    return localStorage.getItem("token");
  },

  setToken(token) {
    if (!isLocalStorageAvailable()) return;
    localStorage.setItem("token", token);
  },

  removeToken() {
    if (!isLocalStorageAvailable()) return;
    localStorage.removeItem("token");
  },

  decodeToken(token) {
    try {
      const base64Payload = token.split(".")[1];
      //const payload = JSON.parse(atob(base64Payload));
      const payload = JSON.parse(Buffer.from(base64Payload, 'base64'));
      return payload;
    } catch (error) {
      return null;
    }
  },
  
  isTokenExpiring(minutes = 5) {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token)
    if (!decoded || !decoded.exp) return true;
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeRemaining = expirationTime - currentTime;
    const minutesLeft = timeRemaining / (60 * 1000);
    return minutesLeft <= minutes;
  }


};