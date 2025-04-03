"use client";

import dynamic from "next/dynamic";
import CardDashboard from "./(components)/card";
import WeekDashboard from "./(components)/week-dashboard";
import { ProgressBar  } from "@/components/ui/progress-bar";

const DonutChart = dynamic(() => import("@/components/ui/donut-chart"), {
  ssr: false,
});

export default function page() {
  
  return (
    <main className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2 py-5 md:px-24 lg:px-15">
        <CardDashboard icon={"loader"} title={"Progresso Por fase"}>
          <DonutChart
            series={[28, 23, 19, 14, 9, 5, 2]}
            colors={[
              "#1BA7E5",
              "#D42626",
              "#FFFF00",
              "#1E1E1E",
              "#83FF91",
              "#905E48",
              "#FF8800",
            ]}
            labels={[
              "23% Fundação - Obra 1",
              "23% Alvenaria - Obra 11",
              "19% Parte Elétrica - Obra 1",
              "14% Acabamento - Obra 2",
              "9% Pintura - Obra 2",
              "5% Piso - Obra 3",
              "2% Laje - Obra 4",
            ]}
          />
        </CardDashboard>
        <CardDashboard icon={"enviados"} title={"Progresso Por fase"}>
          <div className="flex-1 flex items-center justify-center md:pb-0 pb-2">
            <div className=" flex gap-1 items-center">
              <h2 className="text-7xl font-semibold">07</h2>
              <p className="w-full text-wrap text-3xl">
                Relatórios enviados essa semana
              </p>
            </div>
          </div>
          <div>
            <WeekDashboard />
          </div>
        </CardDashboard>
        <CardDashboard icon={"alert"} title={"Problemas"}>
          <div className="flex-1 flex items-center justify-center md:pb-0 pb-2">
            <div className=" flex gap-1 items-center ">
              <h2 className="text-7xl font-semibold">07</h2>
              <p className="w-full text-wrap text-3xl">
                Relatórios enviados essa semana
              </p>
            </div>
          </div>
          <div>
            <WeekDashboard />
          </div>
        </CardDashboard>
      </section>
      <section className="px-2 py-5 md:px-24 lg:px-15 w-full">
        <h1 className="text-azul-forte text-3xl font-semibold py-2">
          Progresso por Obra
        </h1>
        <div className="bg-fundo-tabela p-3 rounded-2xl overflow-hidden w-full">
          <div className="flex flex-col gap-1">
            <h3 className="pl-1">Praça FAP</h3>
            <div className="p-1 rounded-xl bg-white">
              <ProgressBar progress={75} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="pl-1">Praça FAP</h3>
            <div className="p-1 rounded-xl bg-white">
              <ProgressBar progress={75} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="pl-1">Praça FAP</h3>
            <div className="p-1 rounded-xl bg-white">
              <ProgressBar progress={75} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="pl-1">Praça FAP</h3>
            <div className="p-1 rounded-xl bg-white">
              <ProgressBar progress={75} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="pl-1">Praça FAP</h3>
            <div className="p-1 rounded-xl bg-white">
              <ProgressBar progress={75} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
