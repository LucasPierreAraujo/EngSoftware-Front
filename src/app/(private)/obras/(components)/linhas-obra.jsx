import { ProgressBar } from '@/components/ui/progress-bar';
import Link from 'next/link';

export function LinhaObraAndamento({
  nome,
  responsavel,
  data_inicio,
  andamento,
  id,
}) {
  return (
    <Link href={`/obras/${id}`} className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela hover:bg-gray-200/30 px-4 text-[14px]">
      <div className="w-full">{nome}</div>
      <div className="w-full">{responsavel.nome_completo}</div>
      <div className="w-full">{data_inicio ? new Date(data_inicio).toLocaleDateString(): ''}</div>
      <div className="w-full">
        <ProgressBar progress={andamento} transparent={true} />
      </div>
      <div className="w-full">...</div>
    </Link>
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
    <Link href={`/obras/${id}`}  className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela hover:bg-gray-200/30 px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
      <div className="w-full py-2">{responsavel.nome_completo}</div>
      <div className="w-full py-2">
        {data_inicio ? new Date(data_inicio).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">
        {data_arquivamento ? new Date(data_arquivamento).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">...</div>
    </Link>
  );
}
