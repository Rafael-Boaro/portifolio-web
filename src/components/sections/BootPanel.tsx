import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../../hooks/useTypewriter";
import { bootLines } from "../../data/portfolioData";

export const BootPanel: React.FC = () => {
  const { lineIndex, charIndex, reduced } = useTypewriter(bootLines, 16, 260);
  const finished = lineIndex >= bootLines.length;

  return (
    <div className="relative w-full max-w-md">
      <div
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-xl"
        aria-hidden="true"
      />
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_0_40px_-10px_rgba(15,23,42,0.8)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs text-slate-400">bash • pipeline.py</span>
          <span className="font-mono text-[10px] text-emerald-400">ativo</span>
        </div>

        <div
          className="mt-4 min-h-[160px] space-y-1.5 font-mono text-xs"
          role="region"
          aria-label="Console interativo de inicialização"
        >
          {bootLines.map((line, idx) => {
            if (idx > lineIndex) return null;

            const isCurrent = idx === lineIndex;
            const textToRender = isCurrent
              ? line.text.slice(0, charIndex)
              : line.text;

            return (
              <p key={line.text} className={`flex items-start ${line.className}`}>
                {line.prompt ? (
                  <span className="mr-2 text-sky-400 select-none">{line.prompt}</span>
                ) : (
                  <span className="mr-2 select-none text-slate-600">›</span>
                )}
                <span className="break-all">{textToRender}</span>
                {isCurrent && !reduced && (
                  <span className="ml-1 inline-block h-3.5 w-1.5 bg-sky-400 cursor-blink" />
                )}
              </p>
            );
          })}

          {finished && (
            <p className="flex items-center text-fuchsia-300">
              <span className="mr-2 select-none">$</span>
              <span
                className={`inline-block h-3.5 w-1.5 bg-gradient-to-b from-sky-400 to-fuchsia-400 ${
                  reduced ? "" : "cursor-blink"
                }`}
              />
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
