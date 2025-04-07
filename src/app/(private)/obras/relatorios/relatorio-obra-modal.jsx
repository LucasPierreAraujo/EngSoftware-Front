"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";

export default function RelatorioObraModal() {
  return (
    <Modal>
      <div>
        <div>
          <h2>Relatório de obra</h2>
          <div>
            <InputField
              label="Data"
              type="date"
              name="data"
              value={data}
              onChange={(e) => setData(e)}
              placeholder="xx/xx/xxxx"
            />
            <Image
              src="/icons/calendario.png"
              alt="Calendario"
              width={18.46}
              height={20}
            />
            <div>

            <select
            label="Obra"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              
            >
              <option value="">Selecione</option>
              <option value="opcao1">Opção 1</option>
              <option value="opcao2">Opção 2</option>
            </select>
            <Image
            src="/icons/arrow-down.png"
            alt="Seta"
            width={24}
            height={24}
            />
            </div>
            <InputField 
            label="Resposável"
            type="text"
            name="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e)}
            placeholder="xxxxxxxxxx"
            />
          </div>
        </div>
        <div>
            <h2>
                1. Condições climáticas
            </h2>
            <div>
            <select
            label="Tempo"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              
            >
              <option value="">Selecione</option>
              <option value="opcao1">Opção 1</option>
              <option value="opcao2">Opção 2</option>
            </select>
            <Image
            src="/icons/arrow-down.png"
            alt="Seta"
            width={24}
            height={24}
            />
            </div>
            <InputField 
            label="T° (Max)"
            type="text"
            name="tmax"
            value={tmax}
            onChange={(e) => setTmax(e)}
            placeholder="00°"
            />
            <InputField 
            label="T° (Min)"
            type="text"
            name="tmin"
            value={tmin}
            onChange={(e) => setTmin(e)}
            placeholder="00°"
            />
            <InputField 
            label="Observação"
            type="text"
            name="obeservacao"
            value={observacao}
            onChange={(e) => setObservacao(e)}
            placeholder="xxxxxxxxxx"
            />   
        </div>
        <div>
            <h2>
                2. Atividades realizadas
            </h2>
            <InputField 
            label="Serviço executado"
            type="text"
            name="servico"
            value={servico}
            onChange={(e) => setServico(e)}
            placeholder="xxxxxxxxxx"
            />
            <InputField 
            label="Etapa/Frente"
            type="text"
            name="etapa"
            value={etapa}
            onChange={(e) => setEtapa(e)}
            placeholder="xxxxxxxxxx"
            />
        </div>
        <div>
            <h2>
                3. Incidentes e Ocorrências
            </h2>
            <InputField 
            label="Atrasos"
            type="text"
            name="atrasos"
            value={atrasos}
            onChange={(e) => setAtrasos(e)}
            placeholder="xxxxxxxxxx"
            />
            <InputField 
            label="Visitas Técnicas"
            type="text"
            name="visitas"
            value={visitas}
            onChange={(e) => setVisitas(e)}
            placeholder="xxxxxxxxxx"
            />
            <InputField 
            label="Acidente de Trabalho"
            type="text"
            name="acidente"
            value={acidente}
            onChange={(e) => setAcidente(e)}
            placeholder="xxxxxxxxxx"
            />
            <InputField 
            label="Problemas Operacionais"
            type="text"
            name="problemas"
            value={problemas}
            onChange={(e) => setProblemas(e)}
            placeholder="xxxxxxxxxx"
            />
            <div>

            <InputField 
            label="Observações"
            type="text"
            name="observacao"
            value={observacao}
            onChange={(e) => setObservacao(e)}
            placeholder="xxxxxxxxxx"
            />
            </div>
        </div>
        <div>
            <div>
                <span>
                    Anexar Documentos
                </span>
                <button>
                    Anexar
                    <Image 
                    src="/icons/anexar.png"
                    alt="Anexar"
            width={15}
            height={45}
                    />
                </button>
            </div>
        </div>
        <Button> 
            <span>
                Enviar
            </span>
        </Button>
        <Button alternative={true}>
            <span>
                Salvar Rascunho
            </span>
        </Button>
        <button>
            Limpar
        </button>
      </div>
    </Modal>
  );
}
