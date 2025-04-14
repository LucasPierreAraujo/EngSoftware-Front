"use client";

import ProjetoInfo from "@/components/ui/projeto-info";
import { ProgressBar } from "@/components/ui/progress-bar";
import Pagination from "@/components/ui/pagination";

export default function page() {
  const reports = [
    {
      id: 1,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 2,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 3,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 4,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 5,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 6,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 7,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 8,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 9,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
    {
      id: 10,
      nome_da_obra: "Praça FAP",
      responsavel: "João da Silva",
      andamento: "31/03/2025",
      obra: "Praça FAP",
    },
  ];
  return (
    <div className="p-5 space-y-8">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[#2A2567] text-3xl">Praça Fap</h2>
        <ProjetoInfo />
      </div>

      <div className="flex items-center justify-between w-full">
        <h3 className="font-bold text-xl">Todas as Fases</h3>
        <button className="border border-black px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-100">
          + Nova Fase
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 font-bold text-sm">NOME DA OBRA</th>
              <th className="p-4 font-bold text-sm">RESPONSÁVEL</th>
              <th className="p-4 font-bold text-sm">DATA DE INÍCIO</th>
              <th className="p-4 font-bold text-sm">ANDAMENTO</th>
              <th className="p-4 font-bold text-sm">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-4 text-sm">{report.nome_da_obra}</td>
                <td className="p-4 text-sm">{report.responsavel}</td>
                <td className="p-4 text-sm">{report.andamento}</td>
                <td className="p-4 text-sm">
                  <ProgressBar progress={50} />
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
    </div>
  );
}
