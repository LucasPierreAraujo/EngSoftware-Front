'use client'

export const tokenService = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
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