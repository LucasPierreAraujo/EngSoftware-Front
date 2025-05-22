'use client';

export const esqueceuSenhaService = {
  // Simula o envio do e-mail com o link de redefinição
  async solicitarReset(email) {
    console.log(`Mock: Enviando link de redefinição para ${email}`);
    
    // Simula um pequeno atraso
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: "Link de redefinição enviado com sucesso (simulado)",
    };
  },

  // Simula a redefinição da senha
  async redefinirSenha(email, novaSenha, repetirSenha, token) {
    console.log(`Mock: Redefinindo senha para ${email} com token ${token}`);
    
    if (novaSenha !== repetirSenha) {
      throw new Error("As senhas não coincidem");
    }

    // Simula um pequeno atraso
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Senha redefinida com sucesso (simulado)",
    };
  },

  // Simula a verificação do token (opcional)
  async verificarToken(token) {
    console.log(`Mock: Verificando token ${token}`);

    // Simula um pequeno atraso
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simula sucesso sempre
    return {
      success: true,
      message: "Token válido (simulado)",
    };
  }
};
