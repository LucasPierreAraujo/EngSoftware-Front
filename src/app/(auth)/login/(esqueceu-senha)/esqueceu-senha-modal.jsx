"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { toast } from "sonner";
import ModalConfirmeCodigo from "./confirmacao-codigo";
import ModalNovaSenha from "./nova-senha";
import { authService } from '@/services/authService';

export default function ModalEsqueceuSenha({ isOpen, onClose }) {
  if (!isOpen) return null;

  if (typeof window == "undefined") {
    return;
  }

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function handleSubmit() {
    if (!email) {
      setError("O e-mail é obrigatório.");
      return;
    }

    if (!validateEmail(email)) {
      setError({
        field: "email",
        message: "Insira um e-mail válido.",
      });
      return;
    }
    try {
      const request = await authService.forgotPassword(email);
      setError(null);
      window.alert(`Email enviado para: ${email}`);
      console.log(request.token);
      sessionStorage.setItem('token_reset', request.token)
      sessionStorage.setItem('email_reset', email)
      setShowVerifyCode(true);
    } catch(error) {
      setError(error.message)
      toast.error(error.message, {
        description: "Erro ao solicitar reset de senha",
        style: {
          backgroundColor: "var(--color-vermelho)",
        },
      });
    }

  }

  function handleCodeVerified() {
    console.log("Código confirmado, abrindo modal de nova senha...");
    setShowVerifyCode(false);
    setShowNewPasswordModal(true);
  }

  function closeVerifyCodeModal() {
    setShowVerifyCode(false);
  }

  function closeNewPasswordModal() {
    setShowNewPasswordModal(false);
    setShowVerifyCode(false);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      {showNewPasswordModal ? (
        <ModalNovaSenha
          isOpen={showNewPasswordModal}
          onClose={closeNewPasswordModal}
        />
      ) : showVerifyCode ? (
        <ModalConfirmeCodigo
          isOpen={showVerifyCode}
          onClose={closeVerifyCodeModal}
          onCodeVerified={handleCodeVerified}
        />
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-[#2A2567]">
            Esqueceu sua senha?
          </h2>
          <p className="text-sm text-[#141414]">Recupere sua conta</p>
          <div className="flex flex-col items-center justify-center w-full">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e)}
              placeholder="usuario@email.com"
              error={error && error.field == "email" ? error.message : null}
            />

            <p className="text-[#141414]">
              Um código de acesso será enviado para o seu email.
            </p>
            <p className="text-[#141414]">Fique atento!</p>
            <div className="flex flex-col items-center justify-center">
              <Button
                type="button"
                rounded="w-[400px]"
                className="bg-[#2D3748] text-white h-full"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
