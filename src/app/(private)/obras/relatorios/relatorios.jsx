"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import Image from "next/image";
import { useState } from "react";

export default function RelatoriosModal() {
  const [local, setLocal] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [descreva, setDescreva] = useState("");
  return (
    <Modal>
      <div>
        <h2 className=" w-full font-bold text-[#2D3748] text-3xl">
          Relatar Problema
        </h2>
        <div className="flex gap-3">
          <InputField
            label="Local"
            type="text"
            name="local"
            value={local}
            onChange={(e) => setLocal(e)}
            placeholder="xxxxxxxxxx"
          />
          <InputField
            label="Responsável"
            type="text"
            name="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e)}
            placeholder="xxxxxxxxxx"
          />
        </div>
        <div>
          <InputField
            label="Descreva"
            type="text"
            name="descreva"
            value={descreva}
            onChange={(e) => setDescreva(e)}
            placeholder="xxxxxxxxxx"
          />
        </div>
        <div className="flex flex-col">
          <span>Anexar Documentos</span>
          <button className="flex items-center w-fit bg-[#2D3748] text-[#F5F5F5] px-7 py-2 rounded-sm transition-all duration-300 gap-2">
            Anexar
            <Image
              src="/icons/anexar.png"
              alt="Anexar"
              width={14}
              height={14}
            />
          </button>
        </div>
        <div className="flex items-center justify-end w-full gap-2">
          <Button>
            <span>Enviar</span>
          </Button>
          <button className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300">
            Limpar
          </button>
        </div>
      </div>
    </Modal>
  );
}
