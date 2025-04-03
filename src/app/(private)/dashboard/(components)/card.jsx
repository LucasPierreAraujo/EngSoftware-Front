import Image from "next/image";

export default function CardDashboard({title, icon, children}) {
    const iconSelect = {
        loader: '/icons/tabler_loader.png',
        enviados: '/icons/Enviados.png',
        alert: '/icons/tabler_alert-triangle.png',
    }
  return (
    <div className={`md:max-h-[520px] max-h-[450px]  w-full p-10 rounded-3xl flex flex-col 
      ${icon == 'loader' ? 'bg-azul-forte' : icon == 'enviados' ? 'bg-yellow-300' : 'bg-red-500'}
      `}>
      <div className="flex items-center gap-2 text-white pb-5">
        <Image
          className="p-1 border rounded-full border-white"
          src={iconSelect[icon]}
          alt=""
          width={30}
          height={30}
        />
        <h1 className={`font-semibold text-2xl ${icon == 'loader' ? 'text-white' : 'text-black'}`}>{title}</h1>
      </div>
      {children}
    </div>
  );
}
