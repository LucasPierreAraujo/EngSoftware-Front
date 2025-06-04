import { useState, useRef, useEffect } from 'react';
import { ProgressBar } from '@/components/ui/progress-bar';
import Link from 'next/link';

export function LinhaObraAndamento({
  nome,
  responsavel,
  data_inicio,
  andamento,
  id,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleEditar = () => {
    alert(`Editar obra: ${nome}`);
    setOpen(false);
  };

  const handleArquivar = () => {
    alert(`Arquivar obra: ${nome}`);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela hover:bg-gray-200/30 px-4 text-[14px]">
      <Link href={`/obras/${id}`} className="w-full hover:cursor-pointer hover:underline">{nome}</Link>
      <div className="w-full">{responsavel.nome_completo}</div>
      <div className="w-full">{data_inicio ? new Date(data_inicio).toLocaleDateString(): ''}</div>
      <div className="w-full">
        <ProgressBar progress={andamento} transparent={true} />
      </div>
      <div className="w-full p-2 px-4 ">
        <div className='w-fit relative flex justify-start items-center gap-2' ref={menuRef}>
          <button
            className='cursor-pointer text-blue-700 hover:bg-white/80 px-2 py-1 rounded-full text-sm font-bold'
            onClick={() => setOpen((prev) => !prev)}
          >
            ...
          </button>
          {open && (
            <div className='absolute top-8 right-0 z-30 items-start justify-start flex flex-col gap-1 bg-gray-100 border p-2 rounded-2xl shadow'>
              <button
                className='px-2 hover:bg-gray-50 rounded-1xl cursor-pointer'
                onClick={handleEditar}
              >
                Editar
              </button>
              <button
                className='px-2 hover:bg-gray-50 rounded-1xl cursor-pointer'
                onClick={handleArquivar}
              >
                Arquivar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LinhaObraConcluida({
  nome,
  responsavel,
  data_inicio,
  data_fim,
  id
}) {
  return (
    <Link href={`/obras/${id}`}  className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela hover:bg-gray-200/30 px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
      <div className="w-full py-2">{responsavel.nome_completo}</div>
      <div className="w-full py-2">
        {data_inicio ? new Date(data_inicio).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">
        {data_fim ? new Date(data_fim).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">...</div>
    </Link>
  );
}

export function LinhaObraArquivada({
  nome,
  responsavel,
  data_inicio,
  data_arquivamento,
  id
}) {
  return (
    <div  className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela hover:bg-gray-200/30 px-4 text-[14px]">
      <Link href={`/obras/${id}`}  className="w-full py-2 ">{nome}</Link>
      <div className="w-full py-2">{responsavel.nome_completo}</div>
      <div className="w-full py-2">
        {data_inicio ? new Date(data_inicio).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">
        {data_arquivamento ? new Date(data_arquivamento).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">...</div>
    </div>
  );
}