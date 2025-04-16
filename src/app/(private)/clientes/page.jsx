"use client";

import Pagination from "@/components/ui/pagination";
import Image from "next/image";

export default function page() {
    const reports = [
        {
          id: 1,
          cliente: "José da Silva",
          obra: "Praça da FAP",
          cidade: "Juazeiro do Norte / CE",
          telefone: "(88)99999-9999",
        },
        {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
          {
            id: 1,
            cliente: "José da Silva",
            obra: "Praça da FAP",
            cidade: "Juazeiro do Norte / CE",
            telefone: "(88)99999-9999",
          },
    ]
  return (
    <section className="p-5 space-y-8">
      <div className="w-full flex  items-center justify-between ">
        <h2 className="font-bold text-[#2A2567] text-3xl">Clientes</h2>
        <button className="flex items-center justify-center border border-black px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-100 gap-3">
          Voltar
          <Image alt="voltar" src={"/icons/back.png"} width={19} height={13} />
        </button>
      </div>
      <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 font-bold text-sm">CLIENTE</th>
                    <th className="p-4 font-bold text-sm">OBRA ATIVA</th>
                    <th className="p-4 font-bold text-sm">CIDADE / UF</th>
                    <th className="p-4 font-bold text-sm">TELEFONE</th>
                    <th className="p-4 font-bold text-sm">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-t">
                      <td className="p-4 text-sm">{report.cliente}</td>
                      <td className="p-4 text-sm">{report.obra}</td>
                      <td className="p-4 text-sm">{report.cidade}</td>
                      <td className="p-4 text-sm">{report.telefone}</td>
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
    </section>
  );
}
