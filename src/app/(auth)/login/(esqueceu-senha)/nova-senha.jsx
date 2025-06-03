"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import Loader from '@/components/ui/loader';

export default function ModalNovaSenha({ isOpen, onClose }) {
  const router = useRouter();
  if (!isOpen) return null;
  if (typeof window === "undefined") return;

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmeNovaSenha, setConfirmeNovaSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { errorMessage, updateErrorMessage, disableErrorMessage } =
    useErrorsHooks();

  function validatePasswords(novaSenha, confirmeNovaSenha) {
    if (novaSenha.length < 6) {
      updateErrorMessage({
        title: "novaSenha",
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
      return false;
    }

    if (novaSenha !== confirmeNovaSenha) {
      updateErrorMessage({
        title: "confirmeNovaSenha",
        message: "As senhas não conferem.",
      });
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    disableErrorMessage();

    if (!validatePasswords(novaSenha, confirmeNovaSenha)) return;

    setIsLoading(true)
    try {
      const response = await authService.resetPassword(
        sessionStorage.getItem("email_reset"),
        novaSenha,
        confirmeNovaSenha,
        sessionStorage.getItem("token_reset")
      );
      toast.info("Senha resetada com sucesso.")
      onClose()
      router.push("/login");
    } catch (error) {
      toast.error(error.message, {
        description: "Erro ao resetar de senha",
        style: {
          backgroundColor: "var(--color-vermelho)",
        },
      });
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) {
    return <Loader/>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#2A2567]">Esqueceu sua senha?</h2>
      <p className="text-sm text-[#141414]">Recupere sua conta</p>

      <div className="flex flex-col items-center justify-center w-full">
        <InputField
          label="Nova Senha"
          type="password"
          name="novaSenha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e)}
          placeholder="Digite uma nova senha"
          error={
            errorMessage?.title === "novaSenha" ? errorMessage.message : null
          }
        />

        <InputField
          label="Confirme Nova Senha"
          type="password"
          name="confirmeNovaSenha"
          value={confirmeNovaSenha}
          onChange={(e) => setConfirmeNovaSenha(e)}
          placeholder="Confirme sua senha"
          error={
            errorMessage?.title === "confirmeNovaSenha"
              ? errorMessage.message
              : null
          }
        />

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
