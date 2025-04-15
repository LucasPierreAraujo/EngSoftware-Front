"use client";

import KanbanBoard from "@/components/ui/kanban-board";
import ProjetoInfo from "@/components/ui/projeto-info";
import Image from "next/image";

export default function page() {
  return (
    <section>
      
      <div className="flex items-center justify-between p-5 space-x-4">
        <button className="flex items-center justify-center border border-black px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-100 gap-3">
          Voltar
          <Image alt="voltar" src={"/icons/back.png"} width={19} height={13} />
        </button>
        <ProjetoInfo />
      </div>

      
      <div className=" flex items-center justify-center font-bold text-3xl max-w-screen-lg mx-auto mb-6">
        Praça FAP | Fundação
      </div>

      
      <KanbanBoard />
    </section>
  );
}
