"use client";

import KanbanBoard from "@/components/ui/kanban-board";
import ProjetoInfo from "@/components/ui/projeto-info";
import { obrasService } from "@/services/obrasService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const { id, slug } = useParams();
  const route = useRouter()
  const [data, setData] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      const response = await obrasService.view(id);
      console.log({obraService: response})
      setData(response)
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between p-5 space-x-4">
        <button onClick={() => route.back()} className="flex items-center justify-center border border-black px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-100 gap-3">
          Voltar
          <Image alt="voltar" src={"/icons/back.png"} width={19} height={13} />
        </button>
        <ProjetoInfo 
          dt_inicio={data?.data_inicio ? new Date(data?.data_inicio).toLocaleDateString() : ''}
          estimativa={data?.data_fim_previsto ? new Date(data.data_fim_previsto).toLocaleDateString() : ''}
          orcamento={data?.orcamento ? (new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(data.orcamento)) : ''}
          responsavel={data?.responsavel.nome_completo} 
        />
      </div>
 
      <div className=" flex items-center justify-center font-bold text-3xl max-w-screen-lg mx-auto mb-6">
        Praça FAP | Fundação
      </div>
      
      <KanbanBoard etapa_id={Number(slug)} />
    </section>
  );
}
