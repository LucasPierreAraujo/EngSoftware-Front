import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#2A2567]">ConstruTech</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
          <Link href="#inicio" className="text-[#534F86] hover:text-[#2A2567]">
              Início
            </Link>
            <Link href="#features" className="text-[#534F86] hover:text-[#2A2567]">
              Recursos
            </Link>
            <Link href="#video" className="text-[#534F86] hover:text-[#2A2567]">
              Vídeo
            </Link>
            <Link href="#benefits" className="text-[#534F86] hover:text-[#2A2567]">
              Benefícios
            </Link>
            <Link href="#contact" className="text-[#534F86] hover:text-[#2A2567]">
              Contato
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[#534F86] hover:text-[#2A2567]"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="bg-[#2A2567] text-white px-6 py-2 rounded-full hover:bg-[#534F86] transition-colors"
            >
              Começar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 