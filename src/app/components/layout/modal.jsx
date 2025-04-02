"use client";

export default function Modal({onClose, children }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-xs">
      <div className="flex flex-col bg-white p-6 rounded-2xl shadow-xl w-fit max-h-[90%] overflow-auto relative gap-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
