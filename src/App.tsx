import React from "react";
import { AmbientGlow } from "./components/ui/AmbientGlow";
import { BackToTop } from "./components/ui/BackToTop";
import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Featured } from "./components/sections/Featured";
import { AllProjects } from "./components/sections/AllProjects";
import { Education } from "./components/sections/Education";
import { Footer } from "./components/sections/Footer";

export const App: React.FC = () => {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-slate-300 antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: blink 1s steps(1, start) infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .cursor-blink { animation: none; opacity: 1; }
        }
      `}</style>
      <AmbientGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Featured />
        <AllProjects />
        <Education />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
