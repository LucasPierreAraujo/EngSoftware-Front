import { TabelaObras } from "./tabela-obras";
import {
  LinhaObraAndamento,
  LinhaObraConcluida,
  LinhaObraArquivada,
} from "./linhas-obra";

export function TabelaObrasAndamento({ obras }) {
  const colunasAndamento = [
    "Nome da Obra",
    "Responsável",
    "Data de Início",
    "Andamento",
    "Ações",
  ];
  return (
    <TabelaObras
      obras={obras}
      colunas={colunasAndamento}
      LinhaComponente={LinhaObraAndamento}
    />
  );
}

export function TabelaObrasConcluidas({ obras }) {
  const colunasConcluidas = [
    "Nome da Obra",
    "Responsável",
    "Data de Início",
    "Data da Conclusão",
    "Ações",
  ];
  return (
    <TabelaObras
      obras={obras}
      colunas={colunasConcluidas}
      LinhaComponente={LinhaObraConcluida}
    />
  );
}

export function TabelaObrasArquivadas({ obras }) {
  const colunasArquivadas = [
    "Nome da Obra",
    "Responsável",
    "Data de Início",
    "Data do Arquivo",
    "Ações",
  ];
  return (
    <TabelaObras
      obras={obras}
      colunas={colunasArquivadas}
      LinhaComponente={LinhaObraArquivada}
    />
  );
}
