"use client"

export default function ProjetoInfo({
  responsavel, estimativa, orcamento, dt_inicio
}){

    const data = ``

    const info = [
        { label: 'RESPONSÁVEL', value: responsavel },
        { label: 'ESTIMATIVA', value: estimativa },
        { label: 'ORÇAMENTO TOTAL', value: orcamento },
        { label: 'DATA DE INÍCIO', value: dt_inicio },
      ];
    return(
        <div className="flex  flex-wrap p-4 rounded-xl justify-center">
      {info.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center px-2"
        >
          <div className="bg-[#E2E8F0] text-xs font-semibold text-[#2D3748] px-4 py-1 rounded-full shadow-sm mb-1">
            {item.label}
          </div>
          <div className="bg-[#2D3748] text-white px-4 py-1 rounded-full shadow-md text-sm">
            {item.value}
          </div>
        </div>
      ))}
    </div>
    )
}