import React from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";

export const Experience: React.FC = () => {
  return (
    <Section id="experiencia" title="Experiência profissional">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-2xl"
      >
        <span
          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 via-indigo-400 to-fuchsia-500"
          aria-hidden="true"
        />
        <div className="p-6 pl-8 sm:p-8 sm:pl-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-sky-300">
              julho de 2026 – atual
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
              remoto
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-slate-50 sm:text-2xl">
            Estagiário em Data Annotation (Qualidade de Dados para IA)
          </h3>
          <p className="mt-1 text-slate-400">Stringhini Varejo Inteligente</p>
          <p className="mt-4 max-w-[64ch] leading-relaxed text-slate-400">
            Atuação direta no processo de Data Quality e QA em ambiente produtivo.
            Auditoria, correção e refinamento de anotações (ground truth) de datasets
            massivos para o treino e avaliação de algoritmos de Visão Computacional.
          </p>
        </div>
      </motion.article>
    </Section>
  );
};
