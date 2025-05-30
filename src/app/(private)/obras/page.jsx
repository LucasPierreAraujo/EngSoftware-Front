"use client";
import { obras } from "./(components)/data";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import {
  TabelaObrasAndamento,
  TabelaObrasConcluidas,
  TabelaObrasArquivadas,
} from "./(components)/tabelas-especificas";
import { useEffect, useState } from "react";
import { obrasService } from "@/services/obrasService";
import { toast } from "sonner";
import HeaderObras from "./(components)/header-obras";

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentStatus = searchParams.get("status") || "todas";
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    lastPage: 1,
  });

  useEffect(() => {
    const fetchObras = async () => {
      try {
        setLoading(true);
        const response = await obrasService.list(currentStatus, currentPage);
        console.log(response);
        setObras(response.data);
        setPaginationInfo({
          total: response.total,
          lastPage: response.last_page,
        });
      } catch (error) {
        console.error("Erro ao carregar obras: ", error);
        toast.error(error.message, {
          description: "Erro ao carregar obras",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchObras();
  }, [currentStatus, currentPage]);

  if (loading) {
    return <div className="text-center p-4">Carregando...</div>;
  }

  return (
    <div className="m-auto p-6">
      <HeaderObras />

      {(currentStatus === "todas" || currentStatus == "Em Andamento") && (
        <TabelaObrasAndamento obras={obras} />
      )}
      {currentStatus === "Concluida" && (
        <TabelaObrasConcluidas obras={obras} />
      )}
      {currentStatus === "Arquivada" && (
        <TabelaObrasArquivadas obras={obras} />
      )}
      <div className="flex justify-center mt-4">
        <Pagination totalPages={paginationInfo.lastPage} />
      </div>
    </div>
  );
}
