import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RequestProvider } from "./context/RequestContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { AuthProvider } from "./context/AuthContext";
import { GraduationCap } from "lucide-react";

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.3)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.3)_0%,_transparent_50%)]" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Logo Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-accent-blue to-accent-violet rounded-2xl blur-xl opacity-50 animate-pulse" />
          
          {/* Main Logo with Bounce */}
          <div className="w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-violet rounded-2xl flex items-center justify-center shadow-glow animate-bounce" style={{ animationDuration: '0.6s' }}>
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-white animate-pulse">
            <span className="bg-gradient-to-r from-accent-blue via-cyan-400 to-accent-violet bg-clip-text text-transparent">DeptVerse</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <AuthProvider>
          <RequestProvider>
            <AnnouncementProvider>
              <App />
            </AnnouncementProvider>
          </RequestProvider>
        </AuthProvider>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
