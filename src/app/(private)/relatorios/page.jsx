"use client";

import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import RelatorioObraModal from "./modal/relatorio-obra-modal";
import { useEffect, useRef, useState } from "react";
import RelatoriosModal from "./modal/relatorios";
import { reportService } from "@/services/reportService";
import { useSearchParams } from "next/navigation";

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const [showOneReportModal, setShowOneReportModal] = useState(null);
  const [draftData, setDraftData] = useState(null);
  const [data, setData] = useState(null);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabTools, setTabTools] = useState(0);
  const [alertDelet, setAlertDelet] = useState({
    open: false,
    id: null,
  });

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  console.log(page);

  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await reportService.list({ page: Number(page) - 1, limit: 10, orderBy:'created_at' });
        setData(data);
        setLoading(false);
        console.log(data.data);
      } catch (error) {
        console.error("Erro ao buscar relatórios:", error);
      }
    }
    fetchData();

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setTabTools(0);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal,showOneReportModal,alertDelet, page]);

  async function deleteReport() {
    
    if (!alertDelet.id) return;
    await reportService.delete(alertDelet.id);
    setAlertDelet({
      open: false,
      id: null,
    });
  }

  return (
    <div className="p-5 space-y-8">
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
                onClick={deleteReport}
                className="w-full m-auto py-1 rounded-lg cursor-pointer hover:bg-red-400/80 bg-red-400"
              >
                Pode arrocha!
              </button>
            </div>
          </div>
        </div>
      )}

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

      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Image src="/gif/loading.png" alt="Loading" width={50} height={50} />
        </div>
      ) : (
        <>
          <div className="h-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-1 font-bold text-sm ">
                    REGISTRO DO RELATÓRIO
                  </th>
                  <th className="p-1 font-bold text-sm">RESPONSÁVEL</th>
                  <th className="p-1 font-bold text-sm">DATA DE ENVIO</th>
                  <th className="p-1 font-bold text-sm">OBRA</th>
                  <th className="p-1 font-bold text-sm">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="">
                {data.data.map((item) => {
                  return (
                    <tr key={item.id} className=" odd:bg-white hover:odd:bg-gray-100 even:bg-[#E2E8F0] hover:bg-[#E2E8F0]/80">
                      <td className="p-1 text-sm">{item.data_do_registro}</td>
                      <td className="p-1 text-sm">{item.colaborador.name}</td>
                      <td className="p-1 text-sm">
                        {new Date(item.created_at).getDate() < 10 ? '0' + new Date(item.created_at).getDate(): new Date(item.created_at).getDate()}/
                        {new Date(item.created_at).getMonth() < 10 ? '0' + new Date(item.created_at).getMonth(): new Date(item.created_at).getMonth()}/
                        {new Date(item.created_at).getFullYear()}
                        </td>
                      <td className="p-1 text-sm">{item.obra.nome}</td>
                      <td className="p-1 text-sm ">
                        <div className="relative">
                          <button
                            onClick={() => {
                              setTabTools(tabTools != 0 ? 0 : item.id);
                            }}
                            className="text-xl px-2 py-1 z-0 cursor-pointer"
                          >
                            ...
                          </button>
                          {tabTools == item.id && (
                            <div
                              ref={menuRef}
                              className="absolute top-0 right-0 z-30 items-start justify-start flex flex-col gap-1 bg-gray-100 border- p-2 rounded-2xl "
                            >
                              <button
                                onClick={() => {
                                  setShowOneReportModal(item);
                                  setTabTools(false);
                                  setShowModal(true);
                                }}
                                className="p-1 hover:bg-gray-50 rounded-1xl cursor-pointer"
                              >
                                Visualizar
                              </button>
                              <button
                                onClick={() => {
                                  setTabTools(false);
                                  setAlertDelet({
                                    open: true,
                                    id: item.id,
                                  });
                                }}
                                className="p-1 hover:bg-gray-50 rounded-1xl cursor-pointer"
                              >
                                Apagar
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center pt-4">
            <Pagination totalPages={data.page.pages} />
          </div>
        </>
      )}

      {showModal && (
        <RelatorioObraModal
          onClose={() => {
            setShowOneReportModal(null)
            setShowModal(false);
          }}
          draft={draftData}
          report={showOneReportModal}
        />
      )}
      {showProblemModal && (
        <RelatoriosModal onClose={() => setShowProblemModal(false)} />
      )}
    </div>
  );
}

