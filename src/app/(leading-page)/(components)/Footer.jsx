import Link from "next/link";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#2A2567] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">constrTech</h3>
            <p className="text-white/80">
              Transformando a gestão de obras com tecnologia e inovação.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-white/80 hover:text-white">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="text-white/80 hover:text-white">
                  Benefícios
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/80 hover:text-white">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-white/80 hover:text-white">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/80 hover:text-white">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span className="text-white/80">constrTech Ltda.</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span className="text-white/80">contato@constrtech.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="text-white/80">(88) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-white/80">Juazeiro do Norte, CE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} constrTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 