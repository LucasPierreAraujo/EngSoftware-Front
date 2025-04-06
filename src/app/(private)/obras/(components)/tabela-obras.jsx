export function TabelaObras({ obras, colunas, LinhaComponente }) {
  return (
    <div className="grid text-cinza">
      <div className="flex justify-between items-center gap-4 w-full font-bold uppercase text-[12px] p-4">
        {colunas.map((coluna, index) => (
          <div key={index} className="w-full">
            {coluna}
          </div>
        ))}
      </div>
      <div className="w-full">
        {obras.map((obra) => (
          <LinhaComponente key={obra.id} {...obra} />
        ))}
      </div>
    </div>
  );
}
