"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useErrorsHooks } from "@/hooks/error-message-hook";

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

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
      updateErrorMessage({
        title: "nome",
        message: "O nome deve conter apenas letras.",
      });
      return false;
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(cargo)) {
      updateErrorMessage({
        title: "cargo",
        message: "O cargo deve conter apenas letras.",
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

    if (senha.length < 6) {
      updateErrorMessage({
        title: "senha",
        message: "A senha deve ter no mínimo 6 caracteres.",
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

  function handleSubmit() {
    if (!validateForm()) return;
    window.alert("Cadastro concluído com sucesso!");
    onClose();
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
        onChange={(e) => setCpfCnpj(formatCpfCnpj(e))}
        placeholder="Digite seu CPF ou CNPJ"
        error={errorMessage?.title === "cpfCnpj" ? errorMessage.message : null}
      />

      <InputField
        label="Nome"
        type="text"
        value={nome}
        onChange={(e) =>
          setNome(capitalizeFirstLetter(e.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "")))
        }
        placeholder="Digite seu nome completo"
        error={errorMessage?.title === "nome" ? errorMessage.message : null}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e)}
        placeholder="usuario@email.com"
        error={errorMessage?.title === "email" ? errorMessage.message : null}
      />

      <InputField
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e)}
        placeholder="Digite sua senha"
        error={errorMessage?.title === "senha" ? errorMessage.message : null}
      />

      <InputField
        label="Confirme sua senha"
        type="password"
        value={confirmeSenha}
        onChange={(e) => setConfirmeSenha(e)}
        placeholder="Confirme sua senha"
        error={
          errorMessage?.title === "confirmeSenha" ? errorMessage.message : null
        }
      />

      <InputField
        label="Cargo"
        type="text"
        value={cargo}
        onChange={(e) =>
          setCargo(
            capitalizeFirstLetter(e.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""))
          )
        }
        placeholder="Digite seu cargo"
        error={errorMessage?.title === "cargo" ? errorMessage.message : null}
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
