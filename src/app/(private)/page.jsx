'use client'
import DonutChart from "@/components/ui/donut-chart";
import WebsiteTrafficChart from "@/components/ui/donut-chart";
import Image from "next/image";

export default function page(){
    return (
        <div>
            <h1>
                Fala pessoa, bom ? 
            </h1>
            <p>
                Para quem não viu sobre o next.js ele usa o app como router page, ou seja cada pasta vai ser uma rota... as pasta que são envolvidas em um parente o app router não entende como uma rota, usamos ela para destinguir rotas privadas, grupo, autenticação e etc....
            </p>

            <p>
                Outra coisa, não precisa importar o header.... o layout que esta na raiz do (private) vai ser puxado para todas as pastas que forem criada em private 
            </p>


        </div>
    )
}