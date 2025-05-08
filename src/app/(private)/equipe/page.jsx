// private/equipe/page.jsx

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import AdicionarColaborador from "./(components)/AdicionarColaborador.jsx";
import { colaboradorService } from "@/services/colaboradorService";

export default function EquipePage() {
  const [menuAberto, setMenuAberto] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);

  // Buscar colaboradores do backend
  useEffect(() => {
    async function fetchColaboradores() {
      try {
        let response = await colaboradorService.listar();
        setColaboradores(response);
      } catch (error) {
        console.error("Erro ao carregar colaboradores", error);
      }
    }

    fetchColaboradores();
  }, []);

  const toggleMenu = (index) => {
    setMenuAberto(menuAberto === index ? null : index);
  };

  const alterarStatus = async (id, novoStatus) => {
    try {
      await colaboradorService.atualizar(id, { status: novoStatus });
      setColaboradores((prev) =>
        prev.map((colab) =>
          colab.id === id ? { ...colab, status: novoStatus } : colab
        )
      );
      setMenuAberto(null);
    } catch (error) {
      console.error("Erro ao alterar status", error);
    }
  };

  const excluirColaborador = async (id) => {
    try {
      await colaboradorService.deletar(id);
      setColaboradores((prev) => prev.filter((colab) => colab.id !== id));
      setMenuAberto(null);
    } catch (error) {
      console.error("Erro ao excluir colaborador", error);
    }
  };

  return (
    <div className="p-6">
      <AdicionarColaborador
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
      />

      <h1 className="text-2xl font-bold mb-4">Equipe</h1>

      <div className="flex justify-between items-center mb-6">
        <Button rounded="rounded-3xl" onClick={() => setModalAberto(true)}>
          Adicionar Colaborador
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">Páginas:</span>
          <Pagination totalPages={10} />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2">
        <div>COLABORADOR</div>
        <div>CARGO</div>
        <div>SETOR</div>
        <div>STATUS</div>
        <div>AÇÕES</div>
      </div>

      <div className="divide-y mt-2">
        {colaboradores.map((colab, idx) => (
          <div key={colab.id} className="grid grid-cols-5 py-3 items-center relative">
            <div>{colab.apelido}</div>
            <div>{colab.cargo}</div>
            <div>{colab.setor}</div>
            <div>{colab.cpf}</div>
            {/* <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  colab.status === "Ativo"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {colab.status}
              </span>
            </div> */}
            <div className="relative flex justify-end">
              <button
                onClick={() => toggleMenu(colab.id)}
                className="p-2 hover:bg-gray-200 rounded-full text-xl font-bold"
              >
                ...
              </button>

              {menuAberto === colab.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => excluirColaborador(colab.id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
