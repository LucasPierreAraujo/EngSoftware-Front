import Image from "next/image";
import Link from "next/link";
import Notification from "./notification";

export default function HeaderBase() {
    
  return (
    <header className="hidden justify-between items-center w-full px-4 py-2  md:flex">
      <div className="flex items-center gap-2">
        <figure  className="flex items-center justify-center p-5 w-11 h-11 rounded-full bg-azul-forte">
      
        </figure>
        <ul className="flex gap-2 items-center">
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border min-w-20 flex items-center justify-center"
              href={"/"}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border min-w-20 flex items-center justify-center"
              href={"/equipe"}
            >
              Equipe
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border min-w-20 flex items-center justify-center"
              href={"/relatorio"}
            >
              Relatórios
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border min-w-20 flex items-center justify-center"
              href={"/obras"}
            >
              Obras
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border min-w-20 flex items-center justify-center"
              href={"/usuarios"}
            >
              Usuários
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 relative">
        <button className="p-2 border rounded-full relative hover:bg-zinc-200 cursor-pointer">
          <Image alt="" src={"/icons/gear.png"} width={20} height={20} />
        </button>
        <Notification/>
      </div>
    </header>
  );
}
