"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import Image from "next/image";
import { useState } from "react";

export default function RelatorioObraModal() {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [tmax, setTmax] = useState("");
  const [tmin, setTmin] = useState("");
  const [observacao, setObservacao] = useState("");
  const [servico, setServico] = useState("");
  const [etapa, setEtapa] = useState("");
  const [atrasos, setAtrasos] = useState("");
  const [visitas, setVisitas] = useState("");
  const [acidente, setAcidente] = useState("");
  const [problemas, setProblemas] = useState("");

  return (
    <Modal>
      <div>
        <div>
          <h2 className=" w-full font-bold text-[#2D3748] text-3xl">
            Relatório de obra
          </h2>
          <div className="flex gap-3 w-full">
            <InputField
              label="Data"
              type="date"
              name="data"
              value={data}
              onChange={(e) => setData(e)}
              placeholder="xx/xx/xxxx"
            />

            <SelectOne label={"Obra"} />

            <InputField
              label="Resposável"
              type="text"
              name="responsavel"
              value={responsavel}
              onChange={(e) => setResponsavel(e)}
              placeholder="xxxxxxxxxx"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold">1. Condições climáticas</h2>
          <div className="flex gap-3">
            <SelectOne label={"Tempo"} />

            <InputField
              label="T° (Max)"
              type="text"
              name="tmax"
              value={tmax}
              onChange={(e) => setTmax(e)}
              placeholder="00°"
            />
            <InputField
              label="T° (Min)"
              type="text"
              name="tmin"
              value={tmin}
              onChange={(e) => setTmin(e)}
              placeholder="00°"
            />
            <InputField
              label="Observação"
              type="text"
              name="obeservacao"
              value={observacao}
              onChange={(e) => setObservacao(e)}
              placeholder="xxxxxxxxxx"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold">2. Atividades realizadas</h2>
          <div className="flex gap-3">
            <InputField
              label="Serviço executado"
              type="text"
              name="servico"
              value={servico}
              onChange={(e) => setServico(e)}
              placeholder="xxxxxxxxxx"
            />
            <InputField
              label="Etapa/Frente"
              type="text"
              name="etapa"
              value={etapa}
              onChange={(e) => setEtapa(e)}
              placeholder="xxxxxxxxxx"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold">3. Incidentes e Ocorrências</h2>
          <div className="flex gap-3">
            <InputField
              label="Atrasos"
              type="text"
              name="atrasos"
              value={atrasos}
              onChange={(e) => setAtrasos(e)}
              placeholder="xxxxxxxxxx"
            />
            <InputField
              label="Visitas Técnicas"
              type="text"
              name="visitas"
              value={visitas}
              onChange={(e) => setVisitas(e)}
              placeholder="xxxxxxxxxx"
            />
          </div>
          <div className="flex gap-3">
            <InputField
              label="Acidente de Trabalho"
              type="text"
              name="acidente"
              value={acidente}
              onChange={(e) => setAcidente(e)}
              placeholder="xxxxxxxxxx"
            />
            <InputField
              label="Problemas Operacionais"
              type="text"
              name="problemas"
              value={problemas}
              onChange={(e) => setProblemas(e)}
              placeholder="xxxxxxxxxx"
            />
          </div>
          <div>
            <TextArea label={"Observações"}/>
          </div>
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
        <div className="flex items-center justify-end w-full gap-2">
          <Button>
            <span>Enviar</span>
          </Button>
          <Button alternative={true}>
            <span>Salvar Rascunho</span>
          </Button>
          <button className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300">
            Limpar
          </button>
        </div>
      </div>
    </Modal>
  );
}
