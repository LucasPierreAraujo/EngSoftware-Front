"use client";

import Image from "next/image";
import { useState } from "react";

export default function Notification() {
  const [notification, setNotification] = useState({
    open: false,
    messages: [
      {
        message: "Mensagem N1",
        isHead: false,
      },
      {
        message: "Mensagem N2",
        isHead: false,
      },
    ],
  });

  return (
    <>
      <button onClick={() => setNotification({...notification, open: !notification.open})} className="p-2 border rounded-full relative hover:bg-zinc-200 cursor-pointer">
        <Image alt="" src={"/icons/bell.png"} width={20} height={20} />
        <div className="w-6 h-6 absolute -top-2.5 -right-2.5  bg-red-500 text-white rounded-full">
          <span>2</span>
        </div>
      </button>
      {notification.open && (
        <div className="flex flex-col items-end absolute right-1 top-11 ">
          <span
            className="w-0 h-0 mr-3 border-l-[5px] border-l-transparent
                 border-b-[10px] border-zinc-200
                 border-r-[5px] border-r-transparent"
          ></span>
          <div className="bg-white w-56 shadow-2xl p-3 border border-zinc-200 rounded-2xl">
            <h3 className="w-full text-center font-semibold text-lg border-b border-zinc-300">
              Notificações
            </h3>
            <ul className="w-full py-1">
              {notification.messages.map((item, index) => {
                if (item.isHead) return;
                return (
                  <div className="flex items-center gap-1 py-1" key={index}>
                    <span className="flex-1">
                    {item.message}
                    </span>
                    <button onClick={() => setNotification({...notification, messages})}>
                      <Image
                        alt="trash"
                        src={"/icons/trash-simple.svg"}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
