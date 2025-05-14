import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <div id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <Image
        src="/images/background-leadingpage-2.jpeg"
        alt="Fundo de construção"
        layout="fill"
        objectFit="cover"
        className="opacity-10"
      />
      <div className="container mx-auto px-4 py-32 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            Versão Beta
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-[#2A2567]">constrTech</span>
            <br />
            <span className="text-[#534F86]">Gestão de Obras</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Revolucione a gestão das suas obras com nossa plataforma
            inteligente. Controle projetos, gerencie equipes e otimize
            processos para uma construção mais eficiente.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/login"
              className="group px-8 py-4 bg-[#2A2567] text-white rounded-full hover:bg-[#534F86] transition-all transform hover:scale-105 flex items-center gap-2 font-medium"
            >
              Começar Gratuitamente
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-[#534F86] text-[#534F86] rounded-full hover:bg-[#534F86] hover:text-white transition-all"
            >
              Ver Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 