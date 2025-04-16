const validators = {
  cpf(value) {
    const clean = value.replace(/\D/g, "");
    if (clean.length !== 11) return "CPF deve conter 11 dígitos";
    return null;
  },
  telefone(value) {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 11 || clean.length < 10)
      return "Informe o telefone com DDD no formado (XX)XXXXX-XXXX";
    return null;
  },
  cnpj(value) {
    const clean = value.replace(/\D/g, "");
    if (clean.length !== 14) return "CNPJ deve conter 14 dígitos";
    return null;
  },
  required(value) {
    if (!value) {
      return "Campo obrigatório";
    }
    return null;
  },
  dinheiro(value) {
    if (isNaN(value)) return "Valor deve ser numérico";
    if (value <= 0) return "Valor não pode ser negativo";
    return null;
  },
};

export default validators;
