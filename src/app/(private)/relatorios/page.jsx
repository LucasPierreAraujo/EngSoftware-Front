"use client";

import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import RelatorioObraModal from "./modal/relatorio-obra-modal";
import { useEffect, useState } from "react";
import RelatoriosModal from "./modal/relatorios";

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [draftData, setDraftData] = useState(null);
  const [showProblemModal, setShowProblemModal] = useState(false);

  useEffect(() => {
    if (showDraft) {
      const saved = localStorage.getItem("relatorioRascunho");
      if (saved) {
        setDraftData(JSON.parse(saved));
        setShowModal(true);
      }
    }
  }, [showDraft]);

  const reports = [
    {
      id: 1,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 2,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 3,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 4,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 5,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 6,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 7,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 8,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 9,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 10,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 11,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 12,
      registro: "001-2025",
      responsavel: "João da Silva",
      dataEnvio: "31/03/2025",
      obra: "Praça FAP",
    },
  ];
  return (
    <div className="p-5 space-y-8">
      
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[#2A2567] text-3xl">Relatórios</h2>
        <button className="flex gap-2 items-center bg-azul-forte text-white px-4 py-2 rounded-3xl hover:opacity-90 transition-all duration-300">
          <span>Extrair Relatório</span>
          <Image
            src="/icons/Download.png"
            alt="Download"
            width={17}
            height={17}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
      <Button onClick={() => setShowModal(true)}>
          <span>Adicionar Relatório</span>
        </Button>

        <Button alternative={true} onClick={() => setShowDraft(true)}>
          <span>Rascunhos</span>
        </Button>

        <button onClick={() => setShowProblemModal(true)} className="bg-[#E43C3C] text-white px-4 py-2 rounded-3xl hover:opacity-90 transition-all duration-300">
          Relatar Problema
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 font-bold text-sm">REGISTRO DO RELATÓRIO</th>
              <th className="p-4 font-bold text-sm">RESPONSÁVEL</th>
              <th className="p-4 font-bold text-sm">DATA DE ENVIO</th>
              <th className="p-4 font-bold text-sm">OBRA</th>
              <th className="p-4 font-bold text-sm">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-4 text-sm">{report.registro}</td>
                <td className="p-4 text-sm">{report.responsavel}</td>
                <td className="p-4 text-sm">{report.dataEnvio}</td>
                <td className="p-4 text-sm">{report.obra}</td>
                <td className="p-4 text-sm">
                  <button className="text-xl px-2 py-1">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center pt-4">
        <Pagination totalPages={10} />
      </div>
      {showModal && (
        <RelatorioObraModal
          onClose={() => {
            setShowModal(false);
            setShowDraft(false);
          }}
          draft={draftData}
        />
      )}
      {showProblemModal && (
        <RelatoriosModal onClose={() => setShowProblemModal(false)} />
      )}
    </div>
  );
}
