import Pagination from "@/components/ui/pagination";
import Link from "next/link";

export default function HeaderObras() {
  return (
    <header className="w-full my-4">
      <div className="flex items-center gap-6 justify-between w-full">
        <ul className="flex gap-2 items-center text-preto">
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center"
              href={"/obras/new"}
            >
              + Nova Obra
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center bg-amarelo"
              href={"/obras"}
            >
              Todas as Obras
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center"
              href={"/obras?status=Em+Andamento"}
            >
              Em Andamento
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center"
              href={"/obras?status=Concluida"}
            >
              Concluídas
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center"
              href={"/obras?status=Arquivada"}
            >
              Arquivadas
            </Link>
          </li>
        </ul>
        <Pagination totalPages={2} currentPage={1} />
      </div>
    </header>
  );
}
