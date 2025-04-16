import { ProgressBar } from '@/components/ui/progress-bar';

export function LinhaObraAndamento({
  nome,
  responsavel,
  data_inicio,
  andamento,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full">{nome}</div>
      <div className="w-full">{responsavel.nome_completo}</div>
      <div className="w-full">{data_inicio ? new Date(data_inicio).toLocaleDateString(): ''}</div>
      <div className="w-full">
        <ProgressBar progress={andamento} transparent={true} />
      </div>
      <div className="w-full">...</div>
    </div>
  );
}

export function LinhaObraConcluida({
  nome,
  responsavel,
  data_inicio,
  data_fim,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
      <div className="w-full py-2">{responsavel.nome_completo}</div>
      <div className="w-full py-2">
        {data_inicio ? new Date(data_inicio).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">
        {data_fim ? new Date(data_fim).toLocaleDateString() : ""}
      </div>
      <div className="w-full py-2">...</div>
    </div>
  );
}

export function LinhaObraArquivada({
  nome,
  responsavel,
  data_inicio,
  data_arquivamento,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
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
