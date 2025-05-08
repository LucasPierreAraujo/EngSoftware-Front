"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import Image from "next/image";
import { useState } from "react";

export default function NovaFase({ onClose }) {
  const [fase, setFase] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cargo, setCargo] = useState("");
  const [valor, setValor] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");

  const [errors, setErrors] = useState({
    fase: "",
    responsavel: "",
    cargo: "",
    valor: "",
    inicio: "",
    termino: "",
  });

  function formatCurrency(value) {
    const number = Number(value.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!fase) newErrors.fase = "Nome da fase é obrigatório";
    if (!responsavel)
      newErrors.responsavel = "Responsável técnico é obrigatório";
    if (!cargo) newErrors.cargo = "Cargo é obrigatório";
    if (!valor) newErrors.valor = "Valor da fase é obrigatório";
    if (!inicio) newErrors.inicio = "Data de início é obrigatória";
    if (!termino) newErrors.termino = "Previsão de término é obrigatória";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
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
            onChange={(e) => setFase(e.target.value)}
            placeholder="xxxxxxxxxx"
            error={errors.fase}
          />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Responsável Técnico"
            type="text"
            name="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="xxxxxxxxxx"
            error={errors.responsavel}
          />

          <InputField
            label="Cargo"
            type="text"
            name="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="xxxxxxxxxx"
            error={errors.cargo}
          />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Valor da fase"
            type="text"
            name="valor"
            value={valor}
            onChange={(e) => setValor(formatCurrency(e.target.value))}
            placeholder="R$ xx.xxx,xx"
            error={errors.valor}
          />
          <SelectOne label={"Status"} />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Data de início"
            type="date"
            name="inicio"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            error={errors.inicio}
          />
          <InputField
            label="Previsão de término"
            type="date"
            name="termino"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            error={errors.termino}
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
          <button
            className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <Button onClick={handleSubmit}>
            <span>Enviar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
