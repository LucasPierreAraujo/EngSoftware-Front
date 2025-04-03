"use client"

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useState } from "react";


    export default function ModalNovaSenha({ isOpen, onClose }) {
      if (!isOpen) return null;

      if (typeof window == "undefined") {
        return;
      }
    
      const [novaSenha, setNovaSenha] = useState("");
      const [confirmeNovaSenha, setConfirmeNovaSenha] = useState("");
      
    
      function handleSubmit() {
        if (novaSenha === confirmeNovaSenha) {
          window.alert("Nova senha registrada com sucesso");
          onClose();
        } else {
          window.alert("As senhas não conferem");
        }
      
      }
    
      return (
        <div>
          <h2 className="text-3xl font-bold text-[#2A2567]">
            Esqueceu sua senha?
          </h2>
          <p className="text-sm text-[#141414]">Recupere sua conta</p>
          <div className="flex flex-col items-center justify-center w-full">
            <InputField
              label="Nova Senha"
              type="password" 
              name="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e)}
              placeholder="Digite uma nova senha"
            />
            <InputField
              label="Confirme Nova Senha"
              type="password" 
              name="Confirme Nova Senha"
              value={confirmeNovaSenha}
              onChange={(e) => setConfirmeNovaSenha(e)}
              placeholder="Confirme sua senha"
            />
            
            
            <div className="flex flex-col items-center justify-center">
              <Button
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
    