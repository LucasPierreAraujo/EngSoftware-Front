"use client";

import ProjetoInfo from "@/components/ui/projeto-info";
import { ProgressBar } from "@/components/ui/progress-bar";
import Pagination from "@/components/ui/pagination";
import NovaFase from "./modal/nova-fase";
import { useState } from "react";
import { Play, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };

  const fases = [
    {
      id: 1,
      nome: "Fundação",
      responsavel: "João da Silva",
      estimativa: "31/03/2025",
      valor: 50000,
      status: "Em Andamento",
    },
    {
      id: 2,
      nome: "Estrutura",
      responsavel: "Maria Oliveira",
      estimativa: "15/05/2025",
      valor: 100000,
      status: "Em Aberto",
    },
    {
      id: 3,
      nome: "Alvenaria",
      responsavel: "Pedro Santos",
      estimativa: "30/06/2025",
      valor: 75000,
      status: "Concluída",
    },
    {
      id: 4,
      nome: "Instalações Elétricas",
      responsavel: "Ana Rodrigues",
      estimativa: "10/07/2025",
      valor: 30000,
      status: "Atrasada",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Em Andamento":
        return <Play className="text-blue-500" />;
      case "Em Aberto":
        return <Clock className="text-yellow-500" />;
      case "Concluída":
        return <CheckCircle className="text-green-500" />;
      case "Atrasada":
        return <AlertTriangle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Em Andamento":
        return "text-blue-500";
      case "Em Aberto":
        return "text-yellow-500";
      case "Concluída":
        return "text-green-500";
      case "Atrasada":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-5 space-y-8">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Nome do projeto</h1>
        <ProjetoInfo />
      </div>
      <div className="flex items-center gap-10">
        <h2 className="text-2xl font-bold">Todas as fases</h2>
        <button onClick={() => setShowModal(true)} className="border border-blue-700 cursor-pointer hover:bg-zinc-200 transition-all duration-300 px-4 py-2 text-center rounded-3xl text-blue-700">
          + Nova Fase
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 font-bold text-sm">FASE</th>
              <th className="p-4 font-bold text-sm">RESPONSÁVEL</th>
              <th className="p-4 font-bold text-sm">ESTIMATIVA</th>
              <th className="p-4 font-bold text-sm">VALOR</th>
              <th className="p-4 font-bold text-sm">STATUS</th>
              <th className="p-4 font-bold text-sm">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {fases.map((fase) => (
              <tr onClick={() => window.location.href = "/kanban"} key={fase.id} className="border-t cursor-pointer hover:bg-zinc-200 transition-all duration-300">
                <td className="p-4 text-sm">{fase.nome}</td>
                <td className="p-4 text-sm">{fase.responsavel}</td>
                <td className="p-4 text-sm">{fase.estimativa}</td>
                <td className="p-4 text-sm">
                  R$ {fase.valor.toLocaleString()}
                </td>
                <td className="p-4 text-sm">
                  <div
                    className={`flex items-center ${getStatusColor(
                      fase.status
                    )}`}
                  >
                    {getStatusIcon(fase.status)}
                    <span className="ml-2">{fase.status}</span>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <button className="text-xl px-2 py-1">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center pt-6">
        <Pagination totalPages={10} />
      </div>

      {showModal && <NovaFase onClose={handleModalClose} />}
    </div>
  );
}
