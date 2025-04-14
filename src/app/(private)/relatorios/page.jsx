"use client";

import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";

export default function page() {
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
    <div className="mx-5">
      <div className="w-full flex justify-between h-full items-center py-2">
        <h2 className="w-full flex-1  font-bold text-[#2A2567] text-3xl">
          Relatórios
        </h2>

        <button className="w-fit flex gap-2 items-center bg-azul-forte text-white px-4 py-1 rounded-3xl">
          <span>Extrair Relatório</span>
          <Image src="/icons/Download.png" alt="Download" width={17} height={17} />
        </button>
      </div>

      <div className="flex w-full gap-2 mt-4">
        <Button>
          <span>Adicionar Relatório</span>
        </Button>

        <Button alternative={true}>
          <span>Rascunhos</span>
        </Button>

        <button className="bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300">
          Relatar Problema
        </button>

      </div>
      <div className="w-full">
        <table className="w-full text-left border-collapse ">
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
              <tr key={report.id}>
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
      <div className="w-full flex justify-center items-center p-2">
          <Pagination totalPages={10} />
     </div>
    </div>
  );
}
