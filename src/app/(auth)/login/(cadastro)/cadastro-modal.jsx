"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { SelectOne } from "@/components/ui/select-one";
import { authService } from "@/services/authService";
import { toast } from "sonner";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      updateErrorMessage({
        title: "email",
        message: "Formato de e-mail inválido.",
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
    try{
      const response = await authService.register(data);
    }catch(error){
      const details = error.details || {};
      let errorMessage = ""
      for (const [key, value] of Object.entries(details)) {
        errorMessage += `${key}: ${value.join(", ")}\n`;
      }
      toast.error(`Erro ao cadastrar usuário. Verifique os campos: ${errorMessage}`);
      console.error("Erro ao formatar os dados:", error);
      return updateErrorMessage({
        title: "formato",
        message: "Erro ao formatar os dados. Verifique os campos."
      });
      // if(response.status == 422){
      //   const data = await response.json();
      //   if(data.errors?.email){
          
      //     return updateErrorMessage({
      //       title: "email",
      //       message: "Este email já está cadastrado"
      //     });
      //   }
  
      //   if(data.errors?.phone){
          
      //     return updateErrorMessage({
      //       title: "telefone", 
      //       message: "Este telefone já está cadastrado"
      //     });
      //   }
      // }
    }
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
        label="Telefone"
        type="text"
        value={telefone}
        onChange={(e) => setTelefone(e)}
        placeholder="Digite seu telefone"
        error={errorMessage?.title === "telefone" ? errorMessage.message : null}
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
        onChange={(e) =>
          setCargo(
            capitalizeFirstLetter(e)
          )
        }
        placeholder="Digite seu cargo"
        // error={errorMessage?.title === "cargo" ? errorMessage.message : null}
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
