'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Notification from "./notification";
import LogOut from "../../app/(auth)/log-out";

export default function HeaderBase() {
  const pathname = usePathname();
  
  return (
    <header className="hidden justify-between items-center w-full px-4 py-2  md:flex">
      <div className="flex items-center gap-2">
        <figure  className="flex items-center justify-center p-5 w-11 h-11 rounded-full bg-azul-forte">
      
        </figure>
        <ul className="flex gap-2 items-center">
          <li>
            <Link
              className={`px-3 py-2 hover:bg-azul-mortinho hover:text-white rounded-full border min-w-20 flex items-center justify-center ${
                pathname === "/dashboard" ? "bg-azul-mortinho text-white" : ""
              }`}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 hover:bg-azul-mortinho hover:text-white rounded-full border min-w-20 flex items-center justify-center ${
                pathname === "/equipe" ? "bg-azul-mortinho text-white" : ""
              }`}
              href={"/equipe"}
            >
              Equipe
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 hover:bg-azul-mortinho hover:text-white rounded-full border min-w-20 flex items-center justify-center ${
                pathname === "/relatorios" ? "bg-azul-mortinho text-white" : ""
              }`}
              href={"/relatorios"}
            >
              Relatórios
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 hover:bg-azul-mortinho hover:text-white rounded-full border min-w-20 flex items-center justify-center ${
                pathname === "/obras" ? "bg-azul-mortinho text-white" : ""
              }`}
              href={"/obras"}
            >
              Obras
            </Link>
          </li>
          <li>
            <Link
              className={`px-3 py-2 hover:bg-azul-mortinho hover:text-white rounded-full border min-w-20 flex items-center justify-center ${
                pathname === "/clientes" ? "bg-azul-mortinho text-white" : ""
              }`}
              href={"/clientes"}
            >
              Clientes
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 relative">
        <LogOut/>

        <Notification/>
      </div>
    </header>
  );
}
