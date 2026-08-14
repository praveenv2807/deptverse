import React from "react";

export default function Logo({
  size = "default",
  showText = true,
  className = "",
}) {
  // Doubled (2x) image size presets
  const sizes = {
    sm: { icon: "w-16 h-16", text: "text-sm", sub: "text-[9px]" },
    default: { icon: "w-24 h-24", text: "text-lg", sub: "text-[10px]" }, // Doubled to 96px!
    lg: { icon: "w-32 h-32", text: "text-2xl", sub: "text-xs" }, // Doubled to 128px!
    xl: { icon: "w-48 h-48", text: "text-4xl", sub: "text-sm" }, // Doubled to 192px!
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* 2x Scaled Transparent Logo Container */}
      <div
        className={`${s.icon} relative flex items-center justify-center shrink-0`}
      >
        <img
          src="/ksrcecselogo.png"
          alt="KSRCE CSE Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Brand & Department Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${s.text} font-heading font-bold tracking-wide`}>
            <span className="text-white">Dept</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Verse
            </span>
          </span>
          <span
            className={`text-white/50 ${s.sub} font-semibold tracking-widest uppercase`}
          >
            CSE Department
          </span>
        </div>
      )}
    </div>
  );
}
