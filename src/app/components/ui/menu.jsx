"use client";

import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import Menu from "@/app/components/ui/menu";
import MenuItem from "@/app/components/ui/menuitem";
import { ChevronRight, ChevronLeft, Circle } from "lucide-react";

const teamMembers = Array(10).fill({
  name: "Nome do Colaborador",
  role: "Servente",
  sector: "Construção",
  status: "Ativo",
});
teamMembers[3].status = "Desativado";
teamMembers[5].status = "Desativado";
teamMembers[7].status = "Desativado";
teamMembers[9].status = "Desativado";
teamMembers[0].role = "Pedreiro";

export default function TeamTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-7xl mx-auto w-full lg:max-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Equipe</h2>

      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => console.log("Adicionar Colaborador clicado!")}>
          Adicionar Colaborador
        </Button>
        <div className="flex space-x-2 items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-full bg-white text-gray-800"
          >
            <ChevronLeft size={20} />
          </button>
          {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center border border-gray-800 rounded-full font-semibold ${
                currentPage === page
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-white text-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-full bg-white text-gray-800"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-left text-gray-700 uppercase text-sm">
            <th className="p-4 font-bold">Colaborador</th>
            <th className="p-4 font-bold">Cargo</th>
            <th className="p-4 font-bold">Setor</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="p-4 text-gray-900">{member.name}</td>
              <td className="p-4 text-gray-900">{member.role}</td>
              <td className="p-4 text-gray-900">{member.sector}</td>
              <td className="p-4 font-semibold flex items-center gap-2">
                <Circle
                  size={12}
                  className={
                    member.status === "Ativo" ? "text-blue-600" : "text-red-600"
                  }
                />
                <span
                  className={
                    member.status === "Ativo" ? "text-blue-600" : "text-red-600"
                  }
                >
                  {member.status}
                </span>
              </td>
              <td className="p-4 relative">
                <Menu
                  options={[
                    { label: "Editar", onClick: () => alert("Editar") },
                    { label: "Excluir", onClick: () => alert("Excluir") },
                  ]}
                  menuClassName="bg-white text-black border border-gray-300 rounded-md shadow-lg"
                  itemClassName="px-4 py-2 hover:bg-gray-400 text-black cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
