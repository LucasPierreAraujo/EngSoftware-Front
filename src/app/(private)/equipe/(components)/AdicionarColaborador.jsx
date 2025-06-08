"use client";

import { useEffect, useState } from "react";
import { colaboradorService } from "@/services/colaboradorService";
import { toast } from "sonner";

export default function AdicionarColaborador({
  aberto,
  aoFechar,
  dados = null,
}) {
  const [formData, setFormData] = useState({
    nome_completo: "",
    apelido: "",
    cpf: "",
    cargo: "",
    setor: "construção",
    vinculo: "1",
    matricula: "",
    data_admissao: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    complemento: "",
    municipio: "",
    uf: "",
  });

  useEffect(() => {
    if (dados != null) {
      setFormData({
        nome_completo: dados.nome_completo || "",
        apelido: dados.apelido || "",
        cpf: dados.cpf || "",
        cargo: dados.cargo || "",
        setor: dados.setor || "",
        vinculo: dados.vinculo || "",
        matricula: dados.matricula || "",
        data_admissao: dados.data_admissao || "",
        email: dados.email || "",
        telefone: dados.telefone || "",
        cep: dados.cep || "",
        endereco: dados.endereco || "",
        complemento: dados.complemento || "",
        municipio: dados.municipio || "",
        uf: dados.uf || "",
      });
    }
  }, [dados]);

  function maskCep(value) {
    value = value.replace(/\D/g, "").slice(0, 8);
    if (value.length > 5) {
      return value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
    }
    return value;
  }

  function validateCep(value) {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length === 8;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cep") {
      const masked = maskCep(value);
      setFormData((prev) => ({ ...prev, cep: masked }));
      // Não precisa mais do setCepError aqui, pois a cor será controlada pelo estado do input
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!validateCep(formData.cep)) {
      toast.error("CEP inválido. Deve conter 8 dígitos.");
      return;
    }
    try {
      let response = await colaboradorService.adicionar(formData);
      toast.success("Colaborador cadastrado com sucesso!");
      aoFechar();
      setFormData({
        nome_completo: "",
        apelido: "",
        cpf: "",
        cargo: "",
        setor: "construção",
        vinculo: "1",
        matricula: "",
        data_admissao: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        complemento: "",
        municipio: "",
        uf: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar colaborador:", error);
      toast.error(error.message, {
        description: "Erro ao cadsatrar colaborador",
        style: {
          backgroundColor: "var(--color-vermelho)",
        },
      });
    }
  };

  function updateClient() {
    const { id } = dados;
    if (!validateCep(formData.cep)) {
      toast.error("CEP inválido. Deve conter 8 dígitos.");
      return;
    }
    colaboradorService
      .atualizar(id, formData)
      .then(() => {
        toast.success("Colaborador atualizado com sucesso!");
        aoFechar();
        setFormData({
          nome_completo: "",
          apelido: "",
          cpf: "",
          cargo: "",
          setor: "construção",
          vinculo: "1",
          matricula: "",
          data_admissao: "",
          email: "",
          telefone: "",
          cep: "",
          endereco: "",
          complemento: "",
          municipio: "",
          uf: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao atualizar colaborador:", error);
        toast.error(error.message, {
          description: "Erro ao atualizar colaborador",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        });
      });
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/5 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white border border-gray-200 p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Adicionar Colaborador</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="nome_completo"
            placeholder="Nome Completo"
            value={formData.nome_completo}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="apelido"
            placeholder="Apelido"
            value={formData.apelido}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="data_admissao"
            type="date"
            value={formData.data_admissao}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="col-span-2">
            <input
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
              className={`border p-2 rounded w-full
                ${
                  formData.cep.length > 0 && !validateCep(formData.cep)
                    ? "border-red-500"
                    : ""
                }
                ${validateCep(formData.cep) ? "border-green-500" : ""}
              `}
              maxLength={9}
            />
            {formData.cep.length > 0 && !validateCep(formData.cep) && (
              <span className="text-red-500 text-xs">
                CEP inválido. Deve conter 8 dígitos.
              </span>
            )}
          </div>
          <input
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="complemento"
            placeholder="Complemento"
            value={formData.complemento}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="municipio"
            placeholder="Município"
            value={formData.municipio}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="uf"
            placeholder="UF"
            value={formData.uf}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => {
              setFormData({
                nome_completo: "",
                apelido: "",
                cpf: "",
                cargo: "",
                setor: "construção",
                vinculo: "1",
                matricula: "",
                data_admissao: "",
                email: "",
                telefone: "",
                cep: "",
                endereco: "",
                complemento: "",
                municipio: "",
                uf: "",
              });
              aoFechar();
            }}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          {dados ? (
            <button
              onClick={updateClient}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Atualizar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Cadastrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
