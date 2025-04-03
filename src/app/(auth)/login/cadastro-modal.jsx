"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";

export default function ModalCadastro({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  if (typeof window == "undefined") {
    return;
  }

  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [cargo, setCargo] = useState("");

  function capitalizeFirstLetter(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function formatCpfCnpj(value) {
    value = value.replace(/\D/g, "");
    
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

  function handleSubmit() {
    if (!cpfCnpj || !nome || !email || !senha || !confirmeSenha || !cargo) {
      window.alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmeSenha) {
      window.alert("As senhas não coincidem.");
      return;
    }

    window.alert("Cadastro concluído com sucesso!");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-3xl font-bold text-[#2A2567]">Crie sua conta</h2>
        <p className="text-sm text-[#141414]">Crie sua conta para acessar o sistema</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <InputField
          label={"CPF ou CNPJ"}
          type="text"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(formatCpfCnpj(e))}
          placeholder={"Digite seu CPF ou CNPJ"}
          maxLength={18}
        />
        <InputField
          label={"Nome"}
          type="text"
          value={nome}
          onChange={(e) => setNome(capitalizeFirstLetter(e))}
          placeholder={"Digite seu nome completo"}
        />
        <InputField
          label={"Email"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e)}
          placeholder={"usuario@email.com"}
        />
        <InputField
          label={"Senha"}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e)}
          placeholder={"Digite sua senha"}
        />
        <InputField
          label={"Confirme sua senha"}
          type="password"
          value={confirmeSenha}
          onChange={(e) => setConfirmeSenha(e)}
          placeholder={"Confirme sua senha"}
        />
        <InputField
          label={"Cargo"}
          type="text"
          value={cargo}
          onChange={(e) => setCargo(capitalizeFirstLetter(e))}
          placeholder={"Digite seu cargo/função na empresa"}
        />
      </div>
      <Button
        rounded="w-[400px]"
        className="bg-[#2D3748] text-white h-full"
        onClick={handleSubmit}
      >
        Concluir
      </Button>
    </Modal>
  );
}
