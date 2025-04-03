"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalEsqueceuSenha from "./(esqueceu-senha)/esqueceu-senha-modal";
import Modal from "@/components/layout/modal";
import ModalCadastro from "./cadastro-modal";

export default function LoginForm() {
  const router = useRouter();

  const { disableErrorMessage, errorMessage, updateErrorMessage } =
    useErrorsHooks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [email, setEmail] = useState("");

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

  function handleRegister(event){
    setIsModalRegister(true);
  }

  function handlePasswordReset() {
    console.log("Email para recuperação:", email);
    setIsModalOpen(false);
  }

  function validatePassword(password) {
    if (password.length < 1) {
      updateErrorMessage({
        title: "password",
        message: "a senha deve conter pelo menos 8 caracteres",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (!validateEmail(email) || !validatePassword(password)) return;
    console.log ("cheguei aqui")
    disableErrorMessage();
  }
  

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <InputField
        label={"Email"}
        type="email"
        name={"email"}
        required={true}
        placeholder={"usuario@email.com"}
        error={errorMessage?.title == "email" ? errorMessage.message : null}
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
        <Button rounded="w-[400px] h-[50px]">
          <span>ENTRAR</span>
        </Button>
        <button className=" border-b w-fit" onClick={handleForgotPassword}>Esqueceu a senha? </button >
        <div className="flex w-full gap-2 items-center">
          <hr className="w-full border-[#858585]" />
          <span className="text-[#141414]">ou</span>
          <hr className="w-full border-[#858585]" />
        </div>
        <Button rounded="w-[400px] h-[50px]" alternative={true}>
          <span onClick={handleRegister}>Criar Conta</span>
        </Button>
      </div>
      {isModalOpen && (
        <ModalEsqueceuSenha
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
     {isModalRegister &&(
       <ModalCadastro
       isOpen={isModalRegister}
       onClose={() => setIsModalRegister(false)}
       /> 
      )}
    </form>
  );
}
