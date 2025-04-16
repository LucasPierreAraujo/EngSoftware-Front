"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LinkHeaderObra from "./link-header-obra";

export default function HeaderObras() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const currentStatus = pathName.includes('new') ? 'new' : searchParams.get("status") || "todas";
  
  const links = [
    { href: "/new", text: "+ Nova Obra" },
    { href: "", text: "Todas as Obras" },
    { href: "?status=Em Andamento", text: "Em Andamento" },
    { href: "?status=Concluida", text: "Concluídas" },
    { href: "?status=Arquivada", text: "Arquivadas" },
  ];

  const title = () => {
    if (currentStatus == "todas") {
      return "Todas as Obras";
    }
    const current = links.find((link) => link.href.includes(currentStatus) || link.text.includes(pathName));
    if (!current) {
      return "Indefinido";
    }
    return current.text;
  };

  return (
    <header className="w-full my-4">
      <h1 className="text-4xl text-azul-forte my-4">{title()}</h1>
      <div className="flex items-center gap-6 justify-between w-full">
        <ul className="flex gap-2 items-center text-preto">
          {links.map((link) => (
            <li key={link.href}>
              <LinkHeaderObra
                href={link.href}
                text={link.text}
                currentStatus={currentStatus}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
