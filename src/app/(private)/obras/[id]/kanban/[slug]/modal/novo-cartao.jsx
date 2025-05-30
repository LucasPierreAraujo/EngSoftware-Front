"use client";
import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import { useState } from "react";

export default function NovoCartao({ columnId, onClose, data = null}) {
  const [titulo, setTitulo] = useState("");
  const [equipe, setEquipe] = useState("");
  const [previsto, setPrevisto] = useState("");
  const [cor, setCor] = useState("");
  const [status, setStatus] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");
  const [descricao, setDescricao] = useState("");


  console.log({data: data})

  return (
    <Modal onClose={onClose}>
      <section>
        <div>
          <h2 className="w-full font-bold text-[#2D3748] text-3xl mb-5">
            + Novo Cartão {columnId}
          </h2>
        </div>
        <div>
          <InputField
            label="Titulo"
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="xxxxxxxxxx"
          />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Equipe"
            type="text"
            name="equipe"
            value={equipe}
            onChange={(e) => setEquipe(e.target.value)}
            placeholder="xxxxxxxxxx"
          />
          <InputField
            label="Valor Previsto"
            type="text"
            name="previsto"
            value={previsto}
            onChange={(e) => setPrevisto(e.target.value)}
            placeholder="R$ x.xxx,xx"
          />
        </div>
        <div className="flex gap-3">
          <SelectOne label={"Cor"} value={cor} onChange={setCor} />
          <SelectOne label={"Status"} value={status} onChange={setStatus} />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Data de Início"
            type="date"
            name="inicio"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
          <InputField
            label="Previsão de Término"
            type="date"
            name="termino"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
          />
        </div>
        <div>
          <TextArea
            label={"Descrição"}
            value={descricao}
            onChange={setDescricao}
          />
        </div>
        <div className="flex items-center justify-end w-full gap-3">
          <button
            className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <Button>
            <span>Enviar</span>
          </Button>
        </div>
      </section>
    </Modal>
  );
}
