import React from "react";
import { CopyEmailButton } from "../ui/CopyEmailButton";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-center">
      <p className="text-slate-400">
        Vamos conversar sobre dados, IA ou automação?
      </p>
      <div className="mt-2 inline-flex items-center gap-2">
        <a
          href="mailto:rafaelboaro7@gmail.com"
          className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text font-mono text-transparent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          rafaelboaro7@gmail.com
        </a>
        <CopyEmailButton email="rafaelboaro7@gmail.com" />
      </div>
      <p className="mt-6 text-xs text-slate-600">
        © {CURRENT_YEAR} Rafael Paolielo Boaro
      </p>
    </footer>
  );
};
