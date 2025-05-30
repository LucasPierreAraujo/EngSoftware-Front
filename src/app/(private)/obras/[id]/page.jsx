"use client";

import ProjetoInfo from "@/components/ui/projeto-info";
import { ProgressBar } from "@/components/ui/progress-bar";
import Pagination from "@/components/ui/pagination";
import NovaFase from "./modal/nova-fase";
import { useState, useEffect } from "react";
import { Play, Clock, CheckCircle, AlertTriangle, Archive } from "lucide-react";
import { useParams } from "next/navigation";
import { obrasService } from "@/services/obrasService";
import { etapasService } from "@/services/etapasService";
import Image from "next/image";
import { DropdownContent, DropdownItem, DropdownMenu, DropdownTrigger } from "@/components/ui/DropdownMenu";

export default function Page() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [obra, setObra] = useState(null);
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados da obra
        const obraData = await obrasService.view(id);
        setObra(obraData);

        // Buscar etapas da obra
        const etapasData = await etapasService.listByObra(id, 1);
        setEtapas(etapasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Em Andamento":
        return <Play className="text-blue-500" />;
      case "Pendente":
        return <Clock className="text-yellow-500" />;
      case "Concluída":
        return <CheckCircle className="text-green-500" />;
      case "Arquivada":
        return <Archive className="text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Em Andamento":
        return "text-blue-500";
      case "Pendente":
        return "text-yellow-500";
      case "Concluída":
        return "text-green-500";
      case "Arquivada":
        return "text-orange-500";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Image
          alt="loading gif"
          src={"/gif/loading.png"}
          width={100}
          height={100}
        />
      </div>
    );
  }

  console.log(obra);

  return (
    <div className="p-5 space-y-8">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">{obra?.nome || "Carregando..."}</h1>
        <ProjetoInfo
          dt_inicio={obra.data_inicio}
          estimativa={obra.data_fim_previsto}
          orcamento={obra.orcamento}
          responsavel={obra.responsavel.nome_completo}
        />
      </div>
      <div className="flex items-center gap-10">
        <h2 className="text-2xl font-bold">Todas as fases</h2>
        <button
          onClick={() => setShowModal(true)}
          className="border border-blue-700 cursor-pointer hover:bg-zinc-200 transition-all duration-300 px-4 py-2 text-center rounded-3xl text-blue-700"
        >
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
  {etapas.map((etapa) => (
    <tr
      key={etapa.id}
      className="border-t hover:bg-zinc-200 transition-all duration-300"
    >
      <td
        onClick={() =>
          (window.location.href = `/obras/${id}/kanban/${etapa.id}`)
        }
        className="p-4 text-sm cursor-pointer hover:underline"
      >
        {etapa.nome}
      </td>
      <td className="p-4 text-sm">{etapa.responsavel.nome_completo}</td>
      <td className="p-4 text-sm">
        {new Date(etapa.data_fim_previsto).toLocaleDateString()}
      </td>
      <td className="p-4 text-sm">
        R$ {etapa.orcamento?.toLocaleString() || "0"}
      </td>
      <td className="p-4 text-sm">
        <span className={`flex gap-2 ${getStatusColor(etapa.status.nome)}`}>
          {getStatusIcon(etapa.status.nome)}
          {etapa.status.nome}
        </span>
      </td>
      <td className="p-4 text-sm ">
        <DropdownMenu>
          {({ open, setOpen }) => (
            <>
              <DropdownTrigger
                setOpen={(open) => {
                  setOpen(open);
                }}
                onClick={(e) => e.stopPropagation()} 
              >
                ⋮
              </DropdownTrigger>
              <DropdownContent open={open}>
                <DropdownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Excluir ${etapa.nome}`);
                  }}
                >
                  Arquivar
                </DropdownItem>
                
                <DropdownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Editar ${etapa.nome}`);
                  }}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Excluir ${etapa.nome}`);
                  }}
                >
                  Excluir
                </DropdownItem>
              </DropdownContent>
            </>
          )}
        </DropdownMenu>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <div className="flex items-center justify-center pt-6">
        <Pagination totalPages={10} />
      </div>

      {showModal && <NovaFase onClose={handleModalClose} obraId={id} />}
    </div>
  );
}
