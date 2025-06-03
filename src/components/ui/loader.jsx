"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animations/loading.json";

export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
}
