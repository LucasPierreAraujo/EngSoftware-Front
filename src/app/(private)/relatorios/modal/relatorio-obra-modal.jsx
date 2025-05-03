"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import { obrasService } from "@/services/obrasService";
import { reportService } from "@/services/reportService";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RelatorioObraModal({ onClose, draft, report = null }) {
  console.log(report);
  const [data, setData] = useState("");
  const [id, setId] = useState(null);
  const [responsavel, setResponsavel] = useState("");
  const [tmax, setTmax] = useState("");
  const [tmin, setTmin] = useState("");
  const [observacaoTempo, setObservacaoTempo] = useState("");
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

  const [listObra, setListObra] = useState([]);
  const [listResponsavel, setListResponsavel] = useState([
    { value: 1, name: "Usuário padrão" },
  ]);

  const climaOptions = [
    { value: 1, name: "frio" },
    { value: 2, name: "quente" },
  ];

  async function fecthObra() {
    let response = await obrasService.list();
    const option = response.data.map((item) => {
      return {
        value: item.id,
        name: item.nome,
      };
    });
    setListObra(option);
  }

  useEffect(() => {
    fecthObra();

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
      setTempo(draft.tempo || "");
      setObra(draft.obra || "");
    }
    if (report) {
      setData(report.data_do_registro || "");
      setResponsavel(report.colaborador.id || "");
      setTmax(report.tempo_climatico_t_max || "");
      setTmin(report.tempo_climatico_t_min || "");
      setObservacao(report.tempo_climatico_observacao || "");
      setServico(report.servico_executado || "");
      setEtapa(report.etapa_frente || "");
      setAtrasos(report.atrasos || "");
      setVisitas(report.visitas_tecnicas || "");
      setAcidente(report.acidente || "");
      setProblemas(report.problemas_operacionais || "");
      setTempo(report.tempo_climatico || "");
      setObra(report.obra.id);
    }
  }, []);

  console.log({idObra: obra})

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
    if (!problemas)
      newErrors.problemas = "Problemas operacionais é obrigatório";
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

  async function handleEnviar(){

    const store = await reportService.store({
      data_do_registro: data,
      id_obra: obra,
      id_responsavel: responsavel,
      descricao: observacao,
      tempo_climatico: tempo,
      tempo_climatico_t_max: tmax,
      tempo_climatico_t_min: tmin,
      tempo_climatico_observacao: observacaoTempo,
      servico_executado: servico,
      etapa_frente: etapa,
      atrasos: atrasos,
      visitas_tecnicas: visitas,
      acidente: acidente,
      problemas_operacionais: problemas
    })

    if(!store){
      console.error("Deu ruim major! volta para casa!")
    }

    onClose();
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

  async function handleUpdate(){
    console.log(report.id)

    const response = await reportService.update(report.id, {
      data_do_registro: data,
      id_obra: obra,
      id_responsavel: responsavel,
      descricao: observacao,
      tempo_climatico: tempo,
      tempo_climatico_t_max: tmax,
      tempo_climatico_t_min: tmin,
      tempo_climatico_observacao: observacaoTempo,
      servico_executado: servico,
      etapa_frente: etapa,
      atrasos: atrasos,
      visitas_tecnicas: visitas,
      acidente: acidente,
      problemas_operacionais: problemas
    })

    if(response.message == "Registro atualizado com sucesso."){
      onClose();
      return
    }

    window.alert('Manobra cega!')
  }

  const IncidentesOcorrencias = [
    {value: 'não', name: 'não'},
    {value: 'sim', name: 'sim'},
  ]

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
            onChange={(e) => setObra(e)}
            options={listObra}
            error={errors.obra}
          />
          <SelectOne
            label={"Responsável"}
            value={responsavel}
            onChange={(e) => setResponsavel(e)}
            options={listResponsavel}
            error={errors.responsavel}
          />
        </div>

        <h2 className="font-bold">1. Condições climáticas</h2>
        <div className="flex gap-3">
          <SelectOne
            label={"Tempo"}
            value={tempo}
            onChange={setTempo}
            options={climaOptions}
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
            value={observacaoTempo}
            onChange={setObservacaoTempo}
            error={null}
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
        {report ? (
          <div className="flex items-center justify-end w-full gap-2 mt-4">
            <button
              onClick={onClose}
              className="bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl"
            >
              Cancelar e sair
            </button>

            <button
              onClick={handleUpdate}
              className="bg-[#2A2567] text-[#F5F5F5] px-3 py-2 rounded-3xl"
            >
              Salvar alterações
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end w-full gap-2 mt-4">
            <button
              onClick={handleLimpar}
              className="bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl"
            >
              Limpar
            </button>

            <Button alternative={true} onClick={handleSalvarRascunho}>
              <span>Salvar Rascunho</span>
            </Button>
            <Button onClick={handleEnviar}>
              <span>Enviar</span>
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
