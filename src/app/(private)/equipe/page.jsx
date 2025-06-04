// private/equipe/page.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import AdicionarColaborador from "./(components)/AdicionarColaborador.jsx";
import { colaboradorService } from "@/services/colaboradorService";
import Image from "next/image.js";
import { toast } from "sonner";

export default function EquipePage() {
  const [menuAberto, setMenuAberto] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const [alertDelet, setAlertDelet] = useState({
    open: false,
    id: null,
  });
  const menuRef = useRef(null);

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

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalAberto]);

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

      if(error.statusCode == 409){
        toast.error("Erro ao excluir colaborador", {
          description: "Existem tarefas associadas a este colaborador.",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        });
      } else {
        toast.error("Erro ao excluir colaborador", {
          description: "Erro interno no sistema",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        });
      }
      console.error("Erro ao excluir colaborador", error);
    }
  };
  return (
    <div className="p-6">
      {alertDelet.open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/20 backdrop-blur-xs z-50 flex items-center justify-center">
          <div className="bg-white p-2  gap-2 rounded-2xl border shadow-sm flex items-center justify-center flex-col">
            <figure>
              <Image
                alt="alert"
                src={"/icons/alert.svg"}
                width={100}
                height={100}
              />
            </figure>
            <p className="font-semibold">
              Realmente deseja deletar esse registro ?
            </p>
            <div className="flex gap-2 items-center w-full">
              <button
                onClick={() => {
                  setAlertDelet({
                    open: false,
                    id: null,
                  });
                }}
                className="w-full m-auto py-1 rounded-lg cursor-pointer hover:bg-blue-400/80 bg-blue-400"
              >
                Estou arrependido
              </button>
              <button
                onClick={() => {
                  excluirColaborador(alertDelet.id);
                  setAlertDelet({
                    open: false,
                    id: null,
                  });
                }}
                className="w-full m-auto py-1 rounded-lg cursor-pointer hover:bg-red-400/80 bg-red-400"
              >
                Pode arrocha!
              </button>
            </div>
          </div>
        </div>
      )}

      <AdicionarColaborador
        aberto={modalAberto}
        dados={colaboradorSelecionado}
        aoFechar={() => {
          setModalAberto(false);
          setColaboradorSelecionado(null); // Reseta o colaborador selecionado
        }}
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
          <div
            key={colab.id}
            className={`grid grid-cols-5 py-3 items-center relative ${
              idx % 2 === 0 ? "bg-white" : "bg-blue-50"
            }`}
          >
            <button
              onClick={() => {
                setColaboradorSelecionado(colab);
                setModalAberto(true);
              }}
            >
              {colab.apelido}
            </button>
            <div>{colab.cargo}</div>
            <div>{colab.setor}</div>
            <div className="">{colab.cpf}</div>
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
            <div className="relative flex px-5 w-fit justify-start">
              <button
                onClick={() => toggleMenu(colab.id)}
                className="p-2 hover:bg-gray-200 rounded-full text-xl font-bold"
              >
                ...
              </button>

              {menuAberto === colab.id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10"
                >
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setColaboradorSelecionado(colab);
                      setModalAberto(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => setAlertDelet({ open: true, id: colab.id })}
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
