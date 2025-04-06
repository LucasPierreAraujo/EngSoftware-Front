"use client";
import { obras } from "./(components)/data";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import {
  TabelaObrasAndamento,
  TabelaObrasConcluidas,
  TabelaObrasArquivadas,
} from "./(components)/tabelas-especificas";

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentStatus = searchParams.get("status") || "todas";
  // Filtragem das obras por status
  const obrasEmAndamento = obras.filter((obra) => !obra.dataConclusao);
  const obrasConcluidas = obras.filter(
    (obra) => obra.dataConclusao && !obra.dataArquivo
  );
  const obrasArquivadas = obras.filter((obra) => obra.dataArquivo);

  // Lógica de paginação
  const OBRAS_POR_PAGINA = 15;
  const indiceInicial = (currentPage - 1) * OBRAS_POR_PAGINA;
  const indiceFinal = indiceInicial + OBRAS_POR_PAGINA;

  // Seleciona a lista correta com base no status
  let listaAtual = obras;
  console.log(currentStatus);
  if (currentStatus === "Concluida") listaAtual = obrasConcluidas;
  if (currentStatus === "Arquivada") listaAtual = obrasArquivadas;
  if (currentStatus === "Em Andamento") listaAtual = obrasEmAndamento;

  const obrasPaginadas = listaAtual.slice(indiceInicial, indiceFinal);
  const totalPages = Math.ceil(listaAtual.length / OBRAS_POR_PAGINA);

  return (
    <div className="m-auto">
      {(currentStatus === "todas" || currentStatus == "Em Andamento") && (
        <TabelaObrasAndamento obras={obrasPaginadas} />
      )}
      {currentStatus === "Concluida" && (
        <TabelaObrasConcluidas obras={obrasPaginadas} />
      )}
      {currentStatus === "Arquivada" && (
        <TabelaObrasArquivadas obras={obrasPaginadas} />
      )}
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
