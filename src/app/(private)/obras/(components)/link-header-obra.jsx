'use client'
import Link from "next/link";
import clsx from "clsx";
export default function LinkHeaderObra({ href, currentStatus, text }) {
    const isActive = () => {
        if (href == '' && currentStatus == 'todas') {
            return true;
        }
        return href.includes(currentStatus);
    }
    
    const className = clsx(
        "px-3 py-2 hover:bg-azul-mortinho hover:text-white  rounded-full border border-[#858585] min-w-20 flex items-center justify-center",
        {
          "bg-amarelo text-white border-0" : isActive()
        }
    );
  
    return (
    <Link
      className={className}
      href={"/obras" + href}
    >
      {text}
    </Link>
  );
}
