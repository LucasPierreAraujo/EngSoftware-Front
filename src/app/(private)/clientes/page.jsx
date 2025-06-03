"use client";

import Loader from '@/components/ui/loader';
import Pagination from "@/components/ui/pagination";
import { clienteService } from '@/services/clienteService';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function page() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    lastPage: 1
  })
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await clienteService.list();
        setClientes(response.data)
        setPaginationInfo({
          total: response.total,
          lastPage: response.last_page,
        });
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();

  }, [currentPage])

  if (isLoading) {
    return <Loader/>
  }
  return (
    <section className="p-5 space-y-8">
      <div className="w-full flex  items-center justify-between ">
        <h2 className="font-bold text-[#2A2567] text-3xl">Clientes</h2>
        <button className="flex items-center justify-center border border-black px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-100 gap-3">
          Voltar
          <Image alt="voltar" src={"/icons/back.png"} width={19} height={13} />
        </button>
      </div>
      <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 font-bold text-sm">CLIENTE</th>
                    <th className="p-4 font-bold text-sm">TELEFONE</th>
                    <th className="p-4 font-bold text-sm">ENDEREÇO</th>
                    <th className="p-4 font-bold text-sm">CIDADE</th>
                    <th className="p-4 font-bold text-sm">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="border-t">
                      <td className="p-4 text-sm">{cliente.nome}</td>
                      <td className="p-4 text-sm">{cliente.telefone}</td>
                      <td className="p-4 text-sm">{cliente.endereco}</td>
                      <td className="p-4 text-sm">{cliente.cidade}</td>
                      <td className="p-4 text-sm">
                        <button className="text-xl px-2 py-1">...</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      
            <div className="flex justify-center pt-4">
              <Pagination totalPages={paginationInfo.lastPage} />
            </div>
    </section>
  );
}
