"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import Image from "next/image";
import { useState } from "react";

export default function NovaFase() {
  const [fase, setFase] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cargo, setCargo] = useState("");
  const [valor, setValor] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");

  function formatCurrency(value) {
    const number = Number(value.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <Modal>
      <div>
        <h2 className="w-full font-bold text-[#2D3748] text-3xl mb-5">
          Nova Fase
        </h2>
        <div>
          <InputField
            label="Nome da fase"
            type="text"
            name="fase"
            value={fase}
            onChange={(e) => setFase(e)}
            placeholder="xxxxxxxxxx"
          />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Responsável Técnico"
            type="text"
            name="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e)}
            placeholder="xxxxxxxxxx"
          />

          <InputField
            label="Cargo"
            type="text"
            name="cargo"
            value={cargo}
            onChange={(e) => setCargo(e)}
            placeholder="xxxxxxxxxx"
          />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Valor da fase"
            type="text"
            name="valor"
            value={valor}
            onChange={(e) => setValor(formatCurrency(e))}
            placeholder="R$ xx.xxx,xx"
          />
          <SelectOne label={"Status"} />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Data de início"
            type="date"
            name="inicio"
            value={inicio}
            onChange={(e) => setInicio(e)}
          />
          <InputField
            label="Previsão de término"
            type="date"
            name="termino"
            value={termino}
            onChange={(e) => setTermino(e)}
          />
        </div>
        <div>
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
        </div>
        <div className="flex items-center justify-end w-full gap-3">
          <Button>
            <span>Enviar</span>
          </Button>
         
          <button className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
