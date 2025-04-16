import { useEffect } from 'react';
import { tokenService } from '@/services/tokenService';
import { authService } from '@/services/authService';

export function useTokenRefresh() {
  useEffect(() => {
    let intervalId;

    const checkAndRefreshToken = async () => {
      if (tokenService.getToken() && tokenService.isTokenExpiring()) {
        try {
          console.log("atualizando token");
          await authService.refresh();
        } catch (error) {
          // Se o refresh falhar, redireciona para login
          window.location.href = '/login';
        }
      }
    };

    // Verifica a cada minuto
    intervalId = setInterval(checkAndRefreshToken, 60000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);
}