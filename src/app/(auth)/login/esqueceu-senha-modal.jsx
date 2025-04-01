"use client";

import { Button } from "@/app/components/ui/button";
import { InputField } from "@/app/components/ui/input-field";

export default function Modal({ isOpen, onClose, onSubmit, email, setEmail }) {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 flex flex-col items-center justify-center backdrop-blur-xs">
      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-xl w-fit relative gap-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div>
          <h2 className="text-3xl font-bold text-[#2A2567] ">
            Esqueceu sua senha?
          </h2>
          <p className="text-sm text-[#141414] ">Recupere sua conta</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@email.com"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <p className="text-[#141414]">
            Um código de acesso será enviado para o seu email.
          </p>
          <p className="text-[#141414]">Fique atento!</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Button
            rounded="w-[400px]"
            onClick={onSubmit}
            className="bg-[#2D3748] text-white h-full"
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
