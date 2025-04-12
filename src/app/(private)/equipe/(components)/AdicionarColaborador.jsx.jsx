export default function AdicionarColaborador({ aberto, aoFechar }) {
    if (!aberto) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center">


        <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
          <h2 className="text-xl font-bold mb-4">Adicionar Colaborador</h2>
  
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Nome Completo" className="border p-2 rounded" />
            <input placeholder="Apelido" className="border p-2 rounded" />
            <input placeholder="CPF" className="border p-2 rounded" />
            <input placeholder="Cargo" className="border p-2 rounded" />
            <input placeholder="Setor" className="border p-2 rounded" />
            <input placeholder="Vínculo" className="border p-2 rounded" />
            <input placeholder="Matrícula" className="border p-2 rounded" />
            <input placeholder="Data de Admissão/Cadastro" type="date" className="border p-2 rounded" />
            <input placeholder="Email" className="border p-2 rounded" />
            <input placeholder="Telefone" className="border p-2 rounded" />
            <input placeholder="CEP" className="border p-2 rounded" />
            <input placeholder="Endereço" className="border p-2 rounded" />
            <input placeholder="Complemento" className="border p-2 rounded" />
            <input placeholder="Município" className="border p-2 rounded" />
            <input placeholder="UF" className="border p-2 rounded" />
          </div>
  
          <div className="flex justify-end mt-6 gap-2">
            <button
              onClick={aoFechar}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                // Aqui você pode salvar os dados futuramente
                aoFechar();
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    );
  }
  