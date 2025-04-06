import { ProgressBar } from '@/components/ui/progress-bar';

export function LinhaObraAndamento({
  nome,
  responsavel,
  dataInicio,
  andamento,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full">{nome}</div>
      <div className="w-full">{responsavel}</div>
      <div className="w-full">{dataInicio}</div>
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
  dataInicio,
  dataConclusao,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
      <div className="w-full py-2">{responsavel}</div>
      <div className="w-full py-2">{dataInicio}</div>
      <div className="w-full py-2">{dataConclusao}</div>
      <div className="w-full py-2">...</div>
    </div>
  );
}

export function LinhaObraArquivada({
  nome,
  responsavel,
  dataInicio,
  dataArquivo,
}) {
  return (
    <div className="flex justify-between items-center gap-4 w-full odd:bg-fundo-tabela px-4 text-[14px]">
      <div className="w-full py-2">{nome}</div>
      <div className="w-full py-2">{responsavel}</div>
      <div className="w-full py-2">{dataInicio}</div>
      <div className="w-full py-2">{dataArquivo}</div>
      <div className="w-full py-2">...</div>
    </div>
  );
}
