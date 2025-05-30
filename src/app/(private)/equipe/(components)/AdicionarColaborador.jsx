"use client";

import { useState } from "react";
import { colaboradorService } from "@/services/colaboradorService";
import { toast } from "sonner";

export default function AdicionarColaborador({ aberto, aoFechar }) {
  const [formData, setFormData] = useState({
    nome_completo: "",
    apelido: "",
    cpf: "",
    cargo: "",
    setor: "",
    vinculo: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let response = await colaboradorService.adicionar(formData);
      // response = await response.json();
      // if(response.data?.error){
      //   response.data.error.cpf ? alert("CPF inválido") : null;
      //   response.data.error.nome_completo ? alert("Nome inválido") : null;
      //   response.data.error.telefone ? alert("Telefone inválido") : null;
      //   response.data.error.endereco ? alert("Endereço inválido") : null;
      //   return alert("Reveja suas atidudes");
      // } 
      toast.success("Colaborador cadastrado com sucesso!");
      aoFechar(); // Fecha o modal
      setFormData({  // Limpa o formulário
        nome_completo: "",
        apelido: "",
        cpf: "",
        cargo: "",
        setor: "",
        vinculo: "",
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

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/5 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white border border-gray-200 p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Adicionar Colaborador</h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="nome_completo" placeholder="Nome Completo" value={formData.nome_completo} onChange={handleChange} className="border p-2 rounded" />
          <input name="apelido" placeholder="Apelido" value={formData.apelido} onChange={handleChange} className="border p-2 rounded" />
          <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} className="border p-2 rounded" />
          <input name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} className="border p-2 rounded" />
          <input name="setor" placeholder="Setor" value={formData.setor} onChange={handleChange} className="border p-2 rounded" />
          <input name="vinculo" placeholder="Vínculo" value={formData.vinculo} onChange={handleChange} className="border p-2 rounded" />
          <input name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} className="border p-2 rounded" />
          <input name="data_admissao" type="date" value={formData.data_admissao} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
          <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} className="border p-2 rounded" />
          <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} className="border p-2 rounded" />
          <input name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} className="border p-2 rounded" />
          <input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} className="border p-2 rounded" />
          <input name="municipio" placeholder="Município" value={formData.municipio} onChange={handleChange} className="border p-2 rounded" />
          <input name="uf" placeholder="UF" value={formData.uf} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={aoFechar}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
