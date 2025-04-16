"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { obrasService } from "@/services/obrasService";
import { clienteService } from '@/services/clienteService';
import validators from "@/lib/validators";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function Page() {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    setValid(!hasErrors);
  }, [errors]);

  const validateField = (name, value) => {
    let error = null;

    // Mapeamento de campos para validadores
    const validations = {
      cliente_cpf: ["required", "cpf"],
      cliente_telefone: ["telefone"],
      nome: ["required"],
      responsavel_id: ["required"],
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

  const handleChange = (name, value) => {
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawdata = Object.fromEntries(formData);
    let hasErrors = false;
    Object.entries(rawdata).forEach(([name, value]) => {
      validateField(name, value);
      if (errors[name]) hasErrors = true;
    });

    if (hasErrors) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    const clientData = Object.keys(rawdata)
      .filter((key) => key.includes("cliente"))
      .reduce((obj, key) => {
        obj[key.replace('cliente_', '')] = rawdata[key];
        return obj;
      }, {});
    const obraData = Object.keys(rawdata)
      .filter((key) => !key.includes("cliente"))
      .reduce((obj, key) => {
        obj[key] = rawdata[key];
        return obj;
      }, {});
    try {
      const createClient = await clienteService.store(clientData.nome, clientData);
      const idCliente = createClient.id;
      obraData.cliente_id = idCliente;
      const createObra = await obrasService.store(obraData);
      router.push("/obras");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar obra: " + error.message);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    const form = event.currentTarget.form;
    form.reset();
    setErrors({});
    setValid(true);

  }

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
          <InputField
            name="responsavel_id"
            label="Responsável Técnico"
            type="text"
            required={true}
            inputStyle="form"
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
              required={false}
              inputStyle="form"
            />
            <InputField
              name="data_fim_previsto"
              label="Previsão de Término"
              type="date"
              required={false}
              inputStyle="form"
            />
          </div>
        </div>
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
            />
          </div>
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
            <Button rounded="w-[150px] h-[40px]" disabled={!valid}>Concluir</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
