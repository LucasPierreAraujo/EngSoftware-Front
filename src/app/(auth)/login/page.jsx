import Image from "next/image";
import Link from "next/link";
import LoginForm from "./form";

export default function Page() {
  return (
    <section className="w-screen h-screen overflow-hidden flex items-center justify-center bg-[#CDDBFF] ">
      <div className="w-3/4  h-[90%] flex flex-col md:flex-row rounded-2xl overflow-hidden border bg-white">
        <div className="flex flex-col items-center justify-center w-full h-full px-10 py-5 md:px-10 gap-4 text-black">
          <div className="w-full ">
            <h1 className="font-bold text-6xl  text-[#2A2567]">Bem-Vindo</h1>
            <p className="text-[#141414]">
              Entre na sua conta para acessar o sistema
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="w-full h-full bg-[#2a2567] flex flex-col items-center justify-center gap-5">
          <figure  >
            <Image  src={"/images/logoBlue.jpeg"} alt="" width={300} height={300} />
          </figure>
        </div>
      </div>
    </section>
  );
}
