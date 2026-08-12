import React from "react";

export default function Logo({
  size = "default",
  showText = true,
  className = "",
}) {
  // Ultra-large image sizes with original text scale
  const sizes = {
    sm: { icon: "w-20 h-20", text: "text-base" },
    default: { icon: "w-36 h-36", text: "text-xl" }, // <-- Huge 144px Logo Picture!
    lg: { icon: "w-48 h-48", text: "text-2xl" }, // <-- Giant 192px Logo Picture!
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Huge Image Logo Container */}
      <div
        className={`${s.icon} relative flex items-center justify-center shrink-0`}
      >
        <img
          src="/ksreilogo.png"
          alt="KSREI Logo"
          className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Standard Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${s.text} font-heading font-bold tracking-wide`}>
            <span className="text-white">Dept</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Verse
            </span>
          </span>
          <span className="text-white/50 text-[10px] font-semibold tracking-widest uppercase">
            CSE Department
          </span>
        </div>
      )}
    </div>
  );
}
