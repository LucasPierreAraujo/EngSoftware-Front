"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { obrasService } from "@/services/obrasService";
import { clienteService } from "@/services/clienteService";
import validators from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { colaboradorService } from "@/services/colaboradorService";
import { SelectOne } from "@/components/ui/select-one";

export default function Page() {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [colaboradores, setColaboradores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState(false);
  const [idCliente, setIdCliente] = useState(undefined);
  const router = useRouter();

  ///Verifica se há erros no formulário e atualiza o status de válido
  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    setValid(!hasErrors);
  }, [errors]);

  //Rodar no início para buscar clientes e colaboradores
  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await colaboradorService.listar();
        setColaboradores(response);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      }
    };
    const fetchClientes = async () => {
      try {
        const response = await clienteService.list();
        setClientes(response);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchColaboradores();
    fetchClientes();
  }, []);

  // Validação do formulário de obra antes de enviar os dados da obra para o backend
  const validateFormObra = (data) => {
    const erros = [];
    if (data.data_inicio && data.data_fim_previsto) {
      if (new Date(data.data_inicio) > new Date(data.data_fim_previsto)) {
        erros.push(
          "Data de início não pode ser maior que a previsão de término"
        );
      }
    }
    return erros.length > 0 ? erros : null;
  };

  // Validação de campo do formulário, a ser executado no onChange do input. Colocar no input o {error=errors.nome_do_campo} para mostrar mensagem no campo
  const validateField = (name, value) => {
    let error = null;

    // Mapeamento de campos para validadores
    const validations = {
      cliente_cpf: ["required", "cpf"],
      cliente_nome: ["required"],
      cliente_telefone: ["telefone"],
      cliente_data_nascimento: ["data", "dataPassada"],
      nome: ["required"],
      responsavel_id: ["required"],
      data_inicio: ["data"],
      data_fim_previsto: ["data", "dataFutura"],
      orcamento: ["required", "dinheiro"],
    };

    if (validations[name]) {
      for (const validator of validations[name]) {
        error = validators[validator]?.(value);
        if (error) break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Função para chamar validação no onChange de cada campo
  const handleChange = (name, value) => {
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawdata = Object.fromEntries(formData);
    let hasErrors = false;
    //Valida novamente cada um dos campos antes de realizar o submit
    Object.entries(rawdata).forEach(([name, value]) => {
      validateField(name, value);
      if (errors[name]) hasErrors = true;
    });

    // Se tem erros, retorna, não submete formulário
    if (hasErrors) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    //Se não tem idCliente setado e usuário não selecionou novo cliente, retorna e mostra mensagem ao usuário para selecionar um cliente ou novo
    if (!idCliente && !novoCliente) {
      toast.error("Por favor, selecione um cliente ou a opção de Novo Cliente");
      return;
    }

    //Pega os dados básicos do formulário de obras, excluindo os dados do cliente
    const obraData = Object.keys(rawdata)
      .filter((key) => !key.includes("cliente") || key.includes("_id"))
      .reduce((obj, key) => {
        obj[key] = rawdata[key];
        return obj;
      }, {});
    
    //Valida o formulário de Obra, se tiver problemas, retorna e mostra mensagem ao usuário antes de verificar cliente
    const error = validateFormObra(obraData);
    if (error) {
      toast.error(
        "Por favor, corrija os erros no formulário: " + error.join(", "),
        {
          description: "Erro no formulário de Obra",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        }
      );
      return;
    }

    //Se não tem idCliente, é porque o usuário selecionou novo cliente, tenta criar o cliente com os dados do formulário de cliente
    if (!idCliente) {
      const clientData = Object.keys(rawdata)
        .filter(
          (key) =>
            key.includes("cliente") && rawdata[key] != "" && !key.includes("id")
        )
        .reduce((obj, key) => {
          obj[key.replace("cliente_", "")] = rawdata[key];
          return obj;
        }, {});
      try {
        const createClient = await clienteService.store(
          clientData.nome,
          clientData
        );
        //Se conseguiu criar cliente, seta o id do cliente nos dados da obra. Usando setIdCliente como função para execução síncrona.
        setIdCliente((idCliente) => {
          obraData.cliente_id = createClient.id;
          return idCliente ? idCliente : createClient.id;
        });
      } catch (error) {
        console.log(error);
        toast.error("Erro ao criar cliente: " + error.message);
        return;
      }
    }

    //Ao final, tenta criar a obra
    try {
      const createObra = await obrasService.store(obraData);
      router.push("/obras");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar obra: " + error.message);
    }
  };

  //Reset do formulário
  const handleReset = (event) => {
    event.preventDefault();
    const form = event.currentTarget.form;
    form.reset();
    setErrors({});
    setValid(true);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex gap-8 h-full flex-col md:flex-row">
        <div
          id="cardObra"
          className="shadow-lg shadow-gray-400 border border-gray-200 p-4 rounded-xl h-[80%] w-[40%] justify-center items-center"
        >
          <h2 className="text-3xl">Nova Obra</h2>
          <InputField
            name="nome"
            label="Identificação da Obra"
            type="text"
            required={true}
            inputStyle="form"
          />
          <SelectOne
            name="responsavel_id"
            label="Responsável Técnico"
            options={colaboradores.map((colaborador) => {
              return {
                name: colaborador.nome_completo,
                value: colaborador.id,
              };
            })}
          />
          <InputField
            name="orcamento"
            label="Orçamento"
            type="number"
            required={true}
            inputStyle="form"
            error={errors.orcamento}
            onChange={(value) => handleChange("orcamento", value)}
          />
          <div className="flex gap-4 justify-center items-center">
            <InputField
              name="data_inicio"
              label="Data de Início"
              type="date"
              error={errors.data_inicio}
              required={false}
              inputStyle="form"
              onChange={(value) => handleChange("data_inicio", value)}
            />
            <InputField
              name="data_fim_previsto"
              label="Previsão de Término"
              type="date"
              required={false}
              error={errors.data_fim_previsto}
              inputStyle="form"
              onChange={(value) => handleChange("data_fim_previsto", value)}
            />
          </div>
          <SelectOne
            label="Cliente"
            name="cliente_id"
            required={true}
            options={[{ value: "novo", name: "Novo Cliente" }].concat(
              clientes.map((cliente) => {
                return {
                  name: cliente.nome,
                  value: cliente.id,
                };
              })
            )}
            onChange={(value) => {
              if (value === "novo") {
                setNovoCliente(true);
                setIdCliente(undefined);
              } else {
                setNovoCliente(false);
                setIdCliente(value);
              }
            }}
          />
          <div className="flex justify-around items-center">
            <Button
              rounded="w-[150px] h-[40px]"
              type="button"
              background={"var(--color-vermelho)"}
              onClick={handleReset}
            >
              Limpar
            </Button>
            <Button
              rounded="w-[150px] h-[40px]"
              type="button"
              alternative={true}
              onClick={() => {
                router.push("/obras");
              }}
            >
              Voltar
            </Button>
            <Button rounded="w-[150px] h-[40px]" disabled={!valid}>
              Concluir
            </Button>
          </div>
        </div>
        {novoCliente && (
          <div
            id="cardCliente"
            className="shadow-lg shadow-gray-400 border border-gray-200 p-4 rounded-xl h-full w-[40%] justify-center items-center"
          >
            <h2 className="text-3xl">Dados do Cliente</h2>
            <InputField
              name="cliente_nome"
              label="Nome do Cliente"
              type="text"
              required={true}
              inputStyle="form"
            />
            <div className="flex gap-4 justify-center items-center">
              <InputField
                name="cliente_cpf_cnpj"
                label="CPF"
                type="text"
                required={true}
                inputStyle="form"
                error={errors.cliente_cpf}
                onChange={(value) => handleChange("cliente_cpf", value)}
              />
              <InputField
                name="cliente_telefone"
                label="Telefone"
                type="test"
                required={false}
                inputStyle="form"
                error={errors.cliente_telefone}
                onChange={(value) => handleChange("cliente_telefone", value)}
              />
            </div>
            <InputField
              name="cliente_endereco"
              label="Endereço"
              type="text"
              required={false}
              inputStyle="form"
            />
            <div className="flex gap-4 justify-center items-center">
              <InputField
                name="cliente_municipio"
                label="Município"
                type="text"
                required={false}
                inputStyle="form"
              />
              <InputField
                name="cliente_data_nascimento"
                label="Data de Nascimento"
                type="date"
                required={false}
                inputStyle="form"
                error={errors.cliente_data_nascimento}
                onChange={(value) =>
                  handleChange("cliente_data_nascimento", value)
                }
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
