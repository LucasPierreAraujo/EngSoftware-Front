"use client";
import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectOne } from "@/components/ui/select-one";
import SelectMultiGrouped from "@/components/ui/slect-multi";
import { TextArea } from "@/components/ui/text-area";
import { colaboradorService } from "@/services/colaboradorService";
import { tarefasService } from "@/services/tarefasService";
import { useEffect, useState } from "react";

export default function NovoCartao({ columnId, onClose, data = null }) {
  const [titulo, setTitulo] = useState("");
  const [equipe, setEquipe] = useState([]);
  const [orcamento, setOrcamento] = useState("");
  const [cor, setCor] = useState("#000000");
  const [status, setStatus] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");
  const [descricao, setDescricao] = useState("");
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await colaboradorService.listar();
        const usersList = response.map((colaborador) => ({
          value: colaborador.user_id.toString(),
          label: colaborador.nome_completo,
        }));
        setColaboradores(usersList);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      }
    }
    getUsers();
  }, []);

  async function handleSubmit() {
    const payload = {
      titulo,
      descricao,
      etapa_id: columnId,
      status_id: status,
      data_inicio: inicio,
      data_fim: termino,
      data_fim_previsto: termino, // ou outro campo, se necessário
      orcamento: parseInt(orcamento || "0"),
      andamento: 1,
      cor,
      colaboradores: equipe.map((user) => user.value),
    };

    try {
      await tarefasService.store(payload);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  }

  const statusOptions = [
    { name: "Pendente", value: 1 },
    { name: "Em Andamento", value: 2 },
    { name: "Concluído", value: 3 },
    { name: "Arquivadas", value: 4 },
  ];

  return (
    <Modal onClose={onClose}>
      <section>
        <h2 className="w-full font-bold text-[#2D3748] text-3xl mb-5">
          + Novo Cartão {columnId}
        </h2>

        <InputField
          label="Título"
          type="text"
          name="titulo"
          value={titulo}
          onChange={setTitulo}
          placeholder="Insira o título da tarefa"
        />

        <SelectMultiGrouped
          label="Colaboradores"
          value={equipe}
          onChange={setEquipe}
          options={colaboradores}
        />

        <InputField
          label="Valor Previsto"
          type="number"
          name="orcamento"
          value={orcamento}
          onChange={setOrcamento}
          placeholder="R$ 0,00"
        />

        <div className="flex gap-3">
          <div className="flex flex-col w-full gap-1">
            <label>Cor do Cartão</label>
            <input
              className="w-full rounded-lg border h-10"
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>
          <SelectOne
            label="Status"
            value={status}
            options={statusOptions}
            onChange={setStatus}
          />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Data de Início"
            type="date"
            name="inicio"
            value={inicio}
            onChange={setInicio}
          />
          <InputField
            label="Previsão de Término"
            type="date"
            name="termino"
            value={termino}
            onChange={setTermino}
          />
        </div>

        <TextArea
          label="Descrição"
          value={descricao}
          onChange={setDescricao}
        />

        <div className="flex items-center justify-end w-full gap-3 mt-4">
          <button
            className="bg-[#E43C3C] text-white px-4 py-2 rounded-3xl hover:opacity-80"
            onClick={onClose}
          >
            Cancelar
          </button>
          <Button onClick={handleSubmit}>
            <span>Enviar</span>
          </Button>
        </div>
      </section>
    </Modal>
  );
}
