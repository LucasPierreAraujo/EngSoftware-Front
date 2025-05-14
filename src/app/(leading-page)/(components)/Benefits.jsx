import { Clock, TrendingUp, Shield, Zap } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Economia de Tempo",
      description: "Reduza o tempo gasto com processos manuais e burocráticos, automatizando tarefas repetitivas e centralizando informações.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Aumento da Produtividade",
      description: "Acompanhe o progresso das obras em tempo real, identifique gargalos e otimize a produtividade da sua equipe.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Maior Controle",
      description: "Tenha controle total sobre custos, cronogramas e recursos, reduzindo riscos e garantindo a qualidade das obras.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Tomada de Decisão",
      description: "Baseie suas decisões em dados reais e relatórios precisos, aumentando a assertividade na gestão das obras.",
    },
  ];

  return (
    <section id="benefits" className="py-20 sticky">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#2A2567]">
            Por que escolher o constrTech?
          </h2>
          <p className="text-lg text-[#534F86]">
            Uma plataforma completa que transforma a forma como você gerencia suas obras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#2A2567]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#2A2567]">
                  {benefit.title}
                </h3>
                <p className="text-[#534F86]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 