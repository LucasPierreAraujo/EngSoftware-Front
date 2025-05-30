"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/authService";
import {toast} from "sonner"
import ModalEsqueceuSenha from "./(esqueceu-senha)/esqueceu-senha-modal";
import Modal from "@/components/layout/modal";
import ModalCadastro from "./(cadastro)/cadastro-modal";

export default function LoginForm() {
  const router = useRouter();

  const { disableErrorMessage, errorMessage, updateErrorMessage } =
    useErrorsHooks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      updateErrorMessage({
        title: "email",
        message:
          "Formato de e-mail inválido. Por favor, insira um e-mail válido!",
      });
      return false;
    }
    return true;
  }

  function handleForgotPassword(event) {
    setIsModalOpen(true);
  }

  function handleRegister(event) {
    setIsModalRegister(true);
  }

  function handlePasswordReset() {
    console.log("Email para recuperação:", email);
    setIsModalOpen(false);
  }

  function validatePassword(password) {
    if (password.length < 6) {
      updateErrorMessage({
        title: "password",
        message: "a senha deve conter pelo menos 6 caracteres",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoadingSubmit(true);

    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (!validateEmail(email) || !validatePassword(password)) return;

    try {
      await authService.login(email, password);
      router.push('/dashboard'); // ou para onde desejar redirecionar após login
    } catch (error) {
      console.error("Erro ao logar: " + error.message);
      toast.error("Email ou senha incorretos. Por favor tente novamente.", {
        description: "Erro ao logar",
        style: {
          backgroundColor: "var(--color-vermelho)",
        },
      });
      setErrorSubmit({
        title: "email",
        message:
          "Email ou senha incorretos. Por favor tente novamente.",
      });
      setLoadingSubmit(false);
    }
    disableErrorMessage();
    setLoadingSubmit(false);
  }
  console.log(errorSubmit)

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <InputField
        label={"Email"}
        type="email"
        name={"email"}
        required={true}
        placeholder={"usuario@email.com"}
        error={errorMessage?.title == "email" ? errorMessage.message : null || errorSubmit?.title == "email" ? errorSubmit.message : null}
      />

      <InputField
        label={"Senha"}
        type="password"
        name={"password"}
        required={true}
        placeholder={"Digite sua senha"}
        error={errorMessage?.title == "password" ? errorMessage.message : null}
      />

      <div className="flex flex-col items-center justify-center gap-3">
        <Button disabled={loadingSubmit} rounded={`w-[400px] h-[50px] ${loadingSubmit ? "opacity-50" : ""}`}>
          <span>ENTRAR</span>
        </Button>
        <button
          type="button"
          className=" border-b w-fit"
          onClick={handleForgotPassword}
        >
          Esqueceu a senha?{" "}
        </button>
        <div className="flex w-full gap-2 items-center">
          <hr className="w-full border-[#858585]" />
          <span className="text-[#141414]">ou</span>
          <hr className="w-full border-[#858585]" />
        </div>
        <Button type="button" rounded="w-[400px] h-[50px]" alternative={true}>
          <span onClick={handleRegister}>Criar Conta</span>
        </Button>
      </div>
      {isModalOpen && (
        <ModalEsqueceuSenha
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalRegister && (
        <ModalCadastro
          isOpen={isModalRegister}
          onClose={() => setIsModalRegister(false)}
        />
      )}
    </form>
  );
}
