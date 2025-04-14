"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RelatorioObraModal({ onClose, draft }) {
  const [data, setData] = useState("");
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
  const [arquivo, setArquivo] = useState(null);
  const [tempo, setTempo] = useState("");
  const [obra, setObra] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (draft) {
      setData(draft.data || "");
      setResponsavel(draft.responsavel || "");
      setTmax(draft.tmax || "");
      setTmin(draft.tmin || "");
      setObservacao(draft.observacao || "");
      setServico(draft.servico || "");
      setEtapa(draft.etapa || "");
      setAtrasos(draft.atrasos || "");
      setVisitas(draft.visitas || "");
      setAcidente(draft.acidente || "");
      setProblemas(draft.problemas || "");
      setArquivo(draft.arquivo || null);
      setTempo(draft.tempo || "");
      setObra(draft.obra || "");
    }
  }, [draft]);

  const validateFields = () => {
    const newErrors = {};
    if (!data) newErrors.data = "Data é obrigatória";
    if (!responsavel) newErrors.responsavel = "Responsável é obrigatório";
    if (!tmax) newErrors.tmax = "Temperatura máxima é obrigatória";
    if (!tmin) newErrors.tmin = "Temperatura mínima é obrigatória";
    if (!observacao) newErrors.observacao = "Observação é obrigatória";
    if (!servico) newErrors.servico = "Serviço executado é obrigatório";
    if (!etapa) newErrors.etapa = "Etapa/Frente é obrigatória";
    if (!atrasos) newErrors.atrasos = "Atrasos é obrigatório";
    if (!visitas) newErrors.visitas = "Visitas técnicas é obrigatório";
    if (!acidente) newErrors.acidente = "Acidente de trabalho é obrigatório";
    if (!problemas) newErrors.problemas = "Problemas operacionais é obrigatório";
    if (!tempo) newErrors.tempo = "Tempo é obrigatório"; 
    if (!obra) newErrors.obra = "Obra é obrigatória"; 
    return newErrors;
  };

  const handleSalvarRascunho = () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const dados = {
      data,
      responsavel,
      tmax,
      tmin,
      observacao,
      servico,
      etapa,
      atrasos,
      visitas,
      acidente,
      problemas,
      arquivo,
      tempo,
      obra,
    };
    localStorage.setItem("relatorioRascunho", JSON.stringify(dados));
    alert("Rascunho salvo!");
    onClose();
  };

  const handleEnviar = () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    localStorage.removeItem("relatorioRascunho");
    alert("Relatório enviado com sucesso!");
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setArquivo(file.name);
    } else {
      alert("Apenas arquivos PDF são permitidos.");
    }
  };

  const handleLimpar = () => {
    setData("");
    setResponsavel("");
    setTmax("");
    setTmin("");
    setObservacao("");
    setServico("");
    setEtapa("");
    setAtrasos("");
    setVisitas("");
    setAcidente("");
    setProblemas("");
    setArquivo(null);
    setTempo("");
    setObra("");
    setObservacao("");
    setErrors({});
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h2 className="w-full font-bold text-[#2D3748] text-3xl">
          Relatório de obra
        </h2>

        <div className="flex gap-3 w-full">
          <InputField
            label="Data"
            type="date"
            name="data"
            value={data}
            onChange={setData}
            error={errors.data}
          />
          <SelectOne
            label={"Obra"}
            value={obra}
            onChange={setObra}
            error={errors.obra}
          />
          <InputField
            label="Responsável"
            type="text"
            name="responsavel"
            value={responsavel}
            onChange={setResponsavel}
            error={errors.responsavel}
          />
        </div>

        <h2 className="font-bold">1. Condições climáticas</h2>
        <div className="flex gap-3">
          <SelectOne
            label={"Tempo"}
            value={tempo}
            onChange={setTempo}
            error={errors.tempo}
          />
          <InputField
            label="T° (Max)"
            type="text"
            value={tmax}
            onChange={setTmax}
            error={errors.tmax}
          />
          <InputField
            label="T° (Min)"
            type="text"
            value={tmin}
            onChange={setTmin}
            error={errors.tmin}
          />
          <InputField
            label="Observação"
            type="text"
            value={observacao}
            onChange={setObservacao}
            error={errors.observacao}
          />
        </div>

        <h2 className="font-bold">2. Atividades realizadas</h2>
        <div className="flex gap-3">
          <InputField
            label="Serviço executado"
            type="text"
            value={servico}
            onChange={setServico}
            error={errors.servico}
          />
          <InputField
            label="Etapa/Frente"
            type="text"
            value={etapa}
            onChange={setEtapa}
            error={errors.etapa}
          />
        </div>

        <h2 className="font-bold">3. Incidentes e Ocorrências</h2>
        <div className="flex gap-3">
          <InputField
            label="Atrasos"
            type="text"
            value={atrasos}
            onChange={setAtrasos}
            error={errors.atrasos}
          />
          <InputField
            label="Visitas Técnicas"
            type="text"
            value={visitas}
            onChange={setVisitas}
            error={errors.visitas}
          />
        </div>
        <div className="flex gap-3">
          <InputField
            label="Acidente de Trabalho"
            type="text"
            value={acidente}
            onChange={setAcidente}
            error={errors.acidente}
          />
          <InputField
            label="Problemas Operacionais"
            type="text"
            value={problemas}
            onChange={setProblemas}
            error={errors.problemas}
          />
        </div>
        <TextArea
          label={"Observações"}
          value={observacao}
          onChange={setObservacao}
          error={errors.observacao}
        />

        <div className="flex flex-col mt-3">
          <span>Anexar Documentos (PDF)</span>
          <label className="flex items-center w-fit bg-[#2D3748] text-[#F5F5F5] px-7 py-2 rounded-sm cursor-pointer gap-2">
            Anexar
            <Image
              src="/icons/anexar.png"
              alt="Anexar"
              width={14}
              height={14}
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              hidden
            />
          </label>
          {arquivo && (
            <span className="text-sm mt-1 text-gray-600">{arquivo}</span>
          )}
        </div>

        <div className="flex items-center justify-end w-full gap-2 mt-4">
          <Button onClick={handleEnviar}>
            <span>Enviar</span>
          </Button>
          <Button alternative={true} onClick={handleSalvarRascunho}>
            <span>Salvar Rascunho</span>
          </Button>
          <button
            onClick={handleLimpar}
            className="bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl"
          >
            Limpar
          </button>
        </div>
      </div>
    </Modal>
  );
}
