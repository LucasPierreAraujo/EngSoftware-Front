'use client';

import { authService } from "@/services/authService";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LogOut() {
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenConfig(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpenConfig(!isOpenConfig)} 
        className="p-2 border rounded-full relative hover:bg-zinc-200 cursor-pointer"
      >
        <Image alt="" src={"/icons/gear.png"} width={20} height={20} />
      </button>
      <div className={`absolute top-10 right-0 w-40 bg-white shadow-md rounded-md ${isOpenConfig ? 'block' : 'hidden'}`}>
        <ul>
          <li>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-zinc-100 cursor-pointer"
            >
              Deslogar
            </button>
          </li> 
        </ul>
      </div>
    </div>
  );
} 