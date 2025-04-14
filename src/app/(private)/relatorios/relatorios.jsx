import Modal from "@/components/layout/modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import Image from "next/image";
import { useRef, useState } from "react";

export default function RelatoriosModal({ onClose }) {
  const [local, setLocal] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [descreva, setDescreva] = useState("");
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({
    local: "",
    responsavel: "",
    descreva: "",
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setErrors({ ...errors, file: "" }); 
    } else {
      alert("Por favor, selecione um arquivo PDF.");
      e.target.value = null;
    }
  };

  const handleClear = () => {
    setLocal("");
    setResponsavel("");
    setDescreva("");
    setFile(null);
    setErrors({
      local: "",
      responsavel: "",
      descreva: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSend = () => {
    let valid = true;
    const newErrors = { local: "", responsavel: "", descreva: "" };

    
    if (!local) {
      newErrors.local = "Campo 'Local' é obrigatório.";
      valid = false;
    }

    if (!responsavel) {
      newErrors.responsavel = "Campo 'Responsável' é obrigatório.";
      valid = false;
    }

    if (!descreva) {
      newErrors.descreva = "Campo 'Descreva' é obrigatório.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors); 
      return;
    }

    const data = {
      local,
      responsavel,
      descreva,
      file,
    };


    onClose(); 
  };

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2 className="font-bold text-[#2D3748] text-3xl">Relatar Problema</h2>

        <div className="flex gap-3">
          <div className="flex-1">
            <InputField
              label="Local"
              type="text"
              name="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="xxxxxxxxxx"
            />
            {errors.local && (
              <span className="text-red-500 text-sm">{errors.local}</span>
            )}
          </div>
          <div className="flex-1">
            <InputField
              label="Responsável"
              type="text"
              name="responsavel"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="xxxxxxxxxx"
            />
            {errors.responsavel && (
              <span className="text-red-500 text-sm">{errors.responsavel}</span>
            )}
          </div>
        </div>

        <div>
          <InputField
            label="Descreva"
            type="text"
            name="descreva"
            value={descreva}
            onChange={(e) => setDescreva(e.target.value)}
            placeholder="xxxxxxxxxx"
          />
          {errors.descreva && (
            <span className="text-red-500 text-sm">{errors.descreva}</span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-medium">Anexar Documentos (PDF)</span>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex items-center w-fit bg-[#2D3748] text-[#F5F5F5] px-7 py-2 rounded-sm transition-all duration-300 gap-2"
          >
            Anexar
            <Image
              src="/icons/anexar.png"
              alt="Anexar"
              width={14}
              height={14}
            />
          </button>

          {file && (
            <span className="text-sm text-[#2D3748]">
              Arquivo anexado: {file.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end w-full gap-2 pt-4">
          <Button onClick={handleSend}>
            <span>Enviar</span>
          </Button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-[#E43C3C] text-[#F5F5F5] px-3 py-2 rounded-3xl transition-all duration-300"
          >
            Limpar
          </button>
        </div>
      </div>
    </Modal>
  );
}
