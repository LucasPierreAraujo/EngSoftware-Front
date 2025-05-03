"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMobile() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="relative bg-white p-3 md:hidden flex items-center justify-between w-full h-full">
      <Image
        alt="hamburgue bom!"
        src={"/images/LOGOCONSTRUTECH.png"}
        width={70}
        height={70}
      />
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="p-1 hover:bg-zinc-200 rounded-xl cursor-pointer"
      >
        <Image
          alt="hamburgue bom!"
          src={"/icons/hamburgue.svg"}
          width={30}
          height={30}
        />
      </button>

      <div
        className={`fixed ${
          openMenu ? "top-0" : "-top-[900px]"
        } p-2 bg-white w-screen left-0 h-screen transition-all duration-1000 z-50`}
      >
        <div className="w-full flex justify-between items-start">
          <Image
            alt="hamburgue bom!"
            src={"/images/LOGOCONSTRUTECH.png"}
            width={70}
            height={70}
          />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 hover:bg-zinc-200 rounded-xl cursor-pointer"
          >
            <Image
              alt="hamburgue bom!"
              src={"/icons/x.svg"}
              width={30}
              height={30}
            />
          </button>
        </div>
        <ul className="flex flex-col gap-2 items-start">
          <li className="w-full">
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border w-full flex items-center justify-center"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border w-full flex items-center justify-center"
              href={"/equipe"}
            >
              Equipe
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border w-full flex items-center justify-center"
              href={"/relatorios"}
            >
              Relatórios
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border w-full flex items-center justify-center"
              href={"/obras"}
            >
              Obras
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border w-full flex items-center justify-center"
              href={"/usuarios"}
            >
              Usuários
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
