const queryParams = {
    page: null,
    limit: null,
}

const configFetchParams = {
    findAll: false,
    findById: false,
}

export function useReposts({query = queryParams, configFetch = configFetchParams} ) {
  const [reportFindAll, setReportFindAll] = useState({
    data: [
      {
        id: null,
        data_do_registro: null,
        id_obra: null,
        id_responsavel: null,
        tempo_climatico: null,
        tempo_climatico_t_max: null,
        tempo_climatico_t_min: null,
        tempo_climatico_observacao: null,
        servico_executado: null,
        etapa_frente: null,
        atrasos: null,
        visitas_tecnicas: null,
        acidente: null,
        problemas_operacionais: null,
        descricao: null,
        created_at: null,
        updated_at: null,
      },
    ],
    page: {
      current: null,
      limit: null,
      total: null,
      pages: null,
    },
  });

  const [reportShowOne, setReportShowOne] = useState(false);

  function updateReportShowOne(data){
    setReportShowOne(data);
  }

  return {
    reportFindAll,
    reportShowOne,
    updateReportShowOne,
  }
}
