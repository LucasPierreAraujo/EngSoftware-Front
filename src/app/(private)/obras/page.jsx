import { LinhaObra } from "@/components/ui/linha-obra";
import HeaderObras from "./header-obras";

export default function TabelaObras() {
  const obras = [
    {
      id: 1,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 0,
    },
    {
      id: 2,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 10,
    },
    {
      id: 3,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 80,
    },
    {
      id: 4,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 10,
    },
    {
      id: 5,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 40,
    },
    {
      id: 6,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 10,
    },
    {
      id: 7,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 40,
    },
    {
      id: 8,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 10,
    },
    {
      id: 9,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 30,
    },
    {
      id: 10,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 20,
    },
    {
      id: 11,
      nome: "Praça FAP",
      responsavel: "José da Silva",
      dataInicio: "23/05/2025",
      andamento: 53,
    },
  ];

  return (
    <>
      <h1 className="text-4xl text-azul-forte my-4">Todas as Obras</h1>
      <HeaderObras />
      <div className="m-auto">
        <div className="grid text-cinza">
          <div className="flex justify-between items-center gap-4 w-full font-bold uppercase text-[12px] p-4">
            <div className="w-full">Nome da Obra</div>
            <div className="w-full">Responsável</div>
            <div className="w-full">Data de Início</div>
            <div className="w-full">Andamento</div>
            <div className="w-full">Ações</div>
          </div>
          <div className="w-full">
            {obras.map((obra) => (
              <LinhaObra
                nome={obra.nome}
                responsavel={obra.responsavel}
                andamento={obra.andamento}
                dataInicio={obra.dataInicio}
                key={obra.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
