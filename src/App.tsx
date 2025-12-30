import React, { useState, useEffect } from "react";
import Navbar from "./components/organisms/navbar";
import Hero from "./components/organisms/hero";
import About from "./components/organisms/about";
import Timeline from "./components/organisms/timeline";
import Contact from "./components/organisms/contact";
import { Zap } from "lucide-react"; 

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-slate-50 p-4 rounded-full border border-slate-100 shadow-lg animate-bounce">
          <Zap className="w-8 h-8 text-blue-600 fill-current" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
        Kazeetama
      </h2>
      <p className="text-sm text-slate-400 animate-pulse">
        Memuat Portfolio...
      </p>

      <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full w-full animate-loading-bar"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-20%); }
          100% { transform: translateX(0%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// --- APP UTAMA ---
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <main
        className={`transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}

export default App;