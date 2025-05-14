import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="flex items-center justify-center pb-20">
      <div className="w-fit py-10 px-20 rounded-2xl bg-[#2A2567]">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Comece a transformar a gestão das suas obras hoje
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Experimente gratuitamente por 14 dias e descubra como o constrTech pode
            revolucionar a forma como você gerencia suas obras.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/register"
              className="group px-8 py-4 bg-white text-[#2A2567] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 font-medium"
            >
              Começar Gratuitamente
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-all"
            >
              Ver Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 