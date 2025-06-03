"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import Loader from '@/components/ui/loader';
import { SelectOne } from "@/components/ui/select-one";
import { colaboradorService } from '@/services/colaboradorService';
import { etapasService } from "@/services/etapasService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NovaFase({ onClose }) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [valor, setValor] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [colaboradores, setColaboradores] = useState([]);
  const { id } = useParams();

  const fetchColaboradores = async () => {
    setIsLoading(true);
    try {
      const response = await colaboradorService.listar();
      setColaboradores(response);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchColaboradores()
  }, [])

  const [errors, setErrors] = useState({
    nome: "",
    responsavel: "",
    valor: "",
    inicio: "",
    termino: "",
  });

  function formatCurrency(value) {
    const number = Number(value.replace(/\D/g, "")) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = "Nome da fase é obrigatório";
    if (!responsavel)
      newErrors.responsavel = "Responsável técnico é obrigatório";
    if (!valor) newErrors.valor = "Valor da fase é obrigatório";
    if (!inicio) newErrors.inicio = "Data de início é obrigatória";
    if (!termino) newErrors.termino = "Previsão de término é obrigatória";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!id) {
      console.log("Não foi registrado o id da obra!");
      toast.error("Erro ao identificar a obra", {
        description: "Erro ao identificar colaborador",
        style: {
          backgroundColor: "var(--color-vermelho)",
        },
      });
      return;
    }
    if (validateForm()) {
      const form = {
        nome: nome,
        data_inicio: inicio,
        data_fim_previsto: termino,
        orcamento: valor.replace(/\D/g, ""),
        obra_id: id,
        responsavel_id: responsavel,
      };
      setIsLoading(true);
      try {
        const response = await etapasService.store(form);
        toast.info("Fase cadastrada com sucesso!");
        router.push(`/obras/${id}`);
        onClose();
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          description: "Erro ao identificar colaborador",
          style: {
            backgroundColor: "var(--color-vermelho)",
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Modal onClose={onClose}>
      <div>
        <h2 className="w-full font-bold text-[#2D3748] text-3xl mb-5">
          Nova Fase
        </h2>

        <div>
          <InputField
            label="Nome da fase"
            type="text"
            name="fase"
            value={nome}
            onChange={(e) => setNome(e)}
            placeholder="xxxxxxxxxx"
            error={errors.fase}
          />
        </div>

        <div className="flex gap-3">
          <SelectOne label="Responsável pela Fase" options={colaboradores.map((col) => {
            return {
              name: col.nome_completo,
              value: col.id
            }
          }) } onChange={(e) => setResponsavel(e)} error={errors.responsavel} />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Orçamento da fase"
            type="text"
            name="valor"
            value={valor}
            onChange={(e) => setValor(formatCurrency(e))}
            placeholder="R$ xx.xxx,xx"
            error={errors.valor}
          />
        </div>

        <div className="flex gap-3">
          <InputField
            label="Data de início"
            type="date"
            name="inicio"
            value={inicio}
            onChange={(e) => setInicio(e)}
            error={errors.inicio}
          />
          <InputField
            label="Previsão de término"
            type="date"
            name="termino"
            value={termino}
            onChange={(e) => setTermino(e)}
            error={errors.termino}
          />
        </div>

        <div>
          <div className="flex flex-col">
            <span>Anexar Documentos</span>
            <button className="flex items-center w-fit bg-[#2D3748] text-[#F5F5F5] px-7 py-2 rounded-sm transition-all duration-300 gap-2">
              Anexar
              <Image
                src="/icons/anexar.png"
                alt="Anexar"
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3">
          <button
            className=" bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <Button onClick={handleSubmit}>
            <span>Enviar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
