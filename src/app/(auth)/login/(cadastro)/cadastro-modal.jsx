"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { SelectOne } from "@/components/ui/select-one";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

export default function ModalCadastro({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { disableErrorMessage, errorMessage, updateErrorMessage } =
    useErrorsHooks();

  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Estados para validação visual dos campos
  const [validatedFields, setValidatedFields] = useState({
    cpfCnpj: null,
    nome: null,
    email: null,
    telefone: null,
    senha: null,
    confirmeSenha: null,
    cargo: null,
  });

  function capitalizeFirstLetter(text) {
    return text
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
  }

  function formatCpfCnpj(value) {
    value = value.replace(/\D/g, "");
    if (value.length > 14) return cpfCnpj;
    if (value.length <= 11) {
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return value
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  }

  function formatTelefone(value) {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);
    if (value.length > 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      return `(${value}`;
    }
    return "";
  }

  // Validação avançada de nome
  function isNomeValido(nome) {
    const nomeLimpo = nome.trim().replace(/\s+/g, " ");
    const palavras = nomeLimpo.split(" ");

    // Pelo menos 2 palavras
    if (palavras.length < 2) return false;

    // Cada palavra com pelo menos 2 letras e sem repetição de uma letra só
    for (const palavra of palavras) {
      if (palavra.length < 2) return false;
      if (/^([a-zA-ZÀ-ÖØ-öø-ÿ])\1+$/.test(palavra)) return false;
    }

    // Não pode ser só consoantes ou só vogais
    const soLetras = nomeLimpo.replace(/\s/g, "");
    if (/^[bcdfghjklmnpqrstvwxyz]+$/i.test(soLetras)) return false;
    if (/^[aeiou]+$/i.test(soLetras)) return false;

    return true;
  }

  // Handlers com validação visual
  function handleCpfCnpjChange(e) {
    const value = formatCpfCnpj(e);
    setCpfCnpj(value);
    const cleaned = value.replace(/\D/g, "");
    setValidatedFields((prev) => ({
      ...prev,
      cpfCnpj: cleaned.length === 11 || cleaned.length === 14 ? true : false,
    }));
  }

  function handleNomeChange(e) {
    const value = capitalizeFirstLetter(e.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""));
    setNome(value);
    setValidatedFields((prev) => ({
      ...prev,
      nome: isNomeValido(value),
    }));
  }

  function handleEmailChange(e) {
    setEmail(e);
    setValidatedFields((prev) => ({
      ...prev,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
    }));
  }

  function handleTelefoneChange(e) {
    const formatted = formatTelefone(e);
    setTelefone(formatted);
    const cleaned = formatted.replace(/\D/g, "");
    setValidatedFields((prev) => ({
      ...prev,
      telefone: cleaned.length === 11,
    }));
  }

  function handleSenhaChange(e) {
    setSenha(e);
    setValidatedFields((prev) => ({
      ...prev,
      senha: e.length >= 8,
    }));
  }

  function handleConfirmeSenhaChange(e) {
    setConfirmeSenha(e);
    setValidatedFields((prev) => ({
      ...prev,
      confirmeSenha: e === senha && e.length >= 8,
    }));
  }

  function handleCargoChange(e) {
    const value = capitalizeFirstLetter(e);
    setCargo(value);
    setValidatedFields((prev) => ({
      ...prev,
      cargo: !!value,
    }));
  }

  function validateForm() {
    disableErrorMessage();

    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, "");
    if (cleanedCpfCnpj.length !== 11 && cleanedCpfCnpj.length !== 14) {
      updateErrorMessage({
        title: "cpfCnpj",
        message: "CPF deve ter 11 dígitos e CNPJ 14 dígitos.",
      });
      return false;
    }

    if (!isNomeValido(nome)) {
      updateErrorMessage({
        title: "nome",
        message: "Digite seu nome completo e válido.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      updateErrorMessage({
        title: "email",
        message: "Formato de e-mail inválido.",
      });
      return false;
    }

    // Validação do telefone
    const cleanedTelefone = telefone.replace(/\D/g, "");
    if (cleanedTelefone.length !== 11) {
      updateErrorMessage({
        title: "telefone",
        message: "O telefone deve ter 11 dígitos (incluindo DDD).",
      });
      return false;
    }

    if (senha.length < 8) {
      updateErrorMessage({
        title: "senha",
        message: "A senha deve ter no mínimo 8 caracteres.",
      });
      return false;
    }

    if (senha !== confirmeSenha) {
      updateErrorMessage({
        title: "confirmeSenha",
        message: "As senhas não coincidem.",
      });
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    const data = {
      name: nome,
      cpf: cpfCnpj,
      email: email,
      phone: telefone,
      password: senha,
      type: cargo,
    };
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      toast.info("Usuário cadastrado com sucesso!");
    } catch (error) {
      const details = error.details || {};
      let errorMessage = "";
      for (const [key, value] of Object.entries(details)) {
        errorMessage += `${key}: ${value.join(", ")}\n`;
      }
      toast.error(
        `Erro ao cadastrar usuário. Verifique os campos: ${errorMessage}`
      );
      console.error("Erro ao formatar os dados:", error);
      return updateErrorMessage({
        title: "formato",
        message: "Erro ao formatar os dados. Verifique os campos.",
      });
    } finally {
      setIsLoading(false);
    }
    onClose();
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-3xl font-bold text-[#2A2567]">Crie sua conta</h2>
      <p className="text-sm text-[#141414]">
        Crie sua conta para acessar o sistema
      </p>

      <InputField
        label="CPF ou CNPJ"
        type="text"
        value={cpfCnpj}
        onChange={handleCpfCnpjChange}
        placeholder="Digite seu CPF ou CNPJ"
        error={errorMessage?.title === "cpfCnpj" ? errorMessage.message : null}
        success={validatedFields.cpfCnpj === true}
        errorBorder={validatedFields.cpfCnpj === false}
      />

      <InputField
        label="Nome"
        type="text"
        value={nome}
        onChange={handleNomeChange}
        placeholder="Digite seu nome completo"
        error={errorMessage?.title === "nome" ? errorMessage.message : null}
        success={validatedFields.nome === true}
        errorBorder={validatedFields.nome === false}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="usuario@email.com"
        error={errorMessage?.title === "email" ? errorMessage.message : null}
        success={validatedFields.email === true}
        errorBorder={validatedFields.email === false}
      />

      <InputField
        label="Telefone"
        type="text"
        value={telefone}
        onChange={handleTelefoneChange}
        placeholder="Digite seu telefone"
        error={errorMessage?.title === "telefone" ? errorMessage.message : null}
        success={validatedFields.telefone === true}
        errorBorder={validatedFields.telefone === false}
      />

      <InputField
        label="Senha"
        type="password"
        value={senha}
        onChange={handleSenhaChange}
        placeholder="Digite sua senha"
        error={errorMessage?.title === "senha" ? errorMessage.message : null}
        success={validatedFields.senha === true}
        errorBorder={validatedFields.senha === false}
      />

      <InputField
        label="Confirme sua senha"
        type="password"
        value={confirmeSenha}
        onChange={handleConfirmeSenhaChange}
        placeholder="Confirme sua senha"
        error={
          errorMessage?.title === "confirmeSenha" ? errorMessage.message : null
        }
        success={validatedFields.confirmeSenha === true}
        errorBorder={validatedFields.confirmeSenha === false}
      />

      <SelectOne
        label="Cargo"
        options={[
          {
            value: "1",
            name: "Engenheiro",
          },
          {
            value: "2",
            name: "Arquiteto",
          },
        ]}
        value={cargo}
        onChange={handleCargoChange}
        placeholder="Digite seu cargo"
        success={validatedFields.cargo === true}
        errorBorder={validatedFields.cargo === false}
      />

      <Button
        type="button"
        rounded="w-[400px]"
        className="bg-[#2D3748] text-white"
        onClick={handleSubmit}
      >
        Concluir
      </Button>
    </Modal>
  );
}
