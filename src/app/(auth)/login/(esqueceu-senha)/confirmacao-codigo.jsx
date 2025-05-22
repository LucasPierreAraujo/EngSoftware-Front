"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useErrorsHooks } from "@/hooks/error-message-hook";

export default function ModalConfirmeCodigo({ isOpen, onCodeVerified }) {
  if (!isOpen) return null;

  if (typeof window === "undefined") return;

  const [codigo, setCodigo] = useState("");
  const codigoCorreto = sessionStorage.getItem('token_reset');

  const { errorMessage, updateErrorMessage, disableErrorMessage } =
    useErrorsHooks();

  function validateCodigo(codigo) {
    const codigoRegex = /^\d{4}$/;
    if (!codigoRegex.test(codigo)) {
      updateErrorMessage({
        title: "codigo",
        message: "O código deve conter exatamente 4 números.",
      });
      return false;
    }

    if (codigo !== codigoCorreto) {
      updateErrorMessage({
        title: "codigo",
        message: "Código incorreto. Tente novamente.",
      });
      return false;
    }

    return true;
  }

  function handleSubmit() {
    disableErrorMessage();

    if (!validateCodigo(codigo)) return;

    window.alert("Código verificado com sucesso!");
    onCodeVerified();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#2A2567]">Esqueceu sua senha?</h2>
      <p className="text-sm text-[#141414]">Recupere sua conta</p>
      <div className="flex flex-col items-center justify-center w-full">
        <InputField
          label="Código"
          type="password"
          name="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e)}
          placeholder="****"
          error={errorMessage?.title === "codigo" ? errorMessage.message : null}
        />

        <p className="text-[#141414]">
          Digite o código de quatro dígitos enviado para seu email.
        </p>
        <p className="text-[#141414]">Fique atento!</p>

        <div className="flex flex-col items-center justify-center">
          <Button
            type="button"
            rounded="w-[400px]"
            className="bg-[#2D3748] text-white h-full"
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
