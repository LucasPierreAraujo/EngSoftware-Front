import { Building2, Calendar, Trello, FileText, Users, BarChart3 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Gestão de Obras",
      description: "Controle completo de todas as suas obras em um só lugar, com acompanhamento em tempo real do progresso.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Cronograma",
      description: "Planejamento e acompanhamento de cronogramas, com alertas de atrasos e gestão de dependências.",
    },
    {
      icon: <Trello className="w-6 h-6" />,
      title: "Kanban por Etapas",
      description: "Visualize e gerencie as etapas da obra com um quadro Kanban intuitivo, melhorando o fluxo de trabalho e a produtividade.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Gestão de Clientes",
      description: "Centralize todas as informações dos clientes, contratos, projetos e relatórios em um único lugar seguro.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Gestão de Colaboradores",
      description: "Controle de colaboradores, escalas de trabalho e produtividade dos profissionais em campo.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Relatórios",
      description: "Relatórios detalhados e dashboards personalizados para acompanhamento do progresso das obras.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#2A2567]">
            Recursos Poderosos para sua Obra
          </h2>
          <p className="text-lg text-[#534F86]">
            Tudo que você precisa para gerenciar suas obras com eficiência e precisão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#2A2567]/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#2A2567]">
                {feature.title}
              </h3>
              <p className="text-[#534F86]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 