import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contacts, allProjects } from "../../data/portfolioData";
import { Stat } from "../ui/Stat";
import { SocialIcon } from "../ui/SocialIcon";
import { BootPanel } from "./BootPanel";

export const Hero: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="topo"
      className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl">
          Rafael Paolielo Boaro
        </h1>
        <p className="mt-3 bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text font-display text-lg text-transparent sm:text-xl">
          Desenvolvedor, Engenheiro de Dados e Especialista em IA / Automação
        </p>
        <p className="mt-6 max-w-[58ch] leading-relaxed text-slate-400">
          Estudante de Análise e Desenvolvimento de Sistemas (FATEC). Transformo
          dados brutos em inteligência corporativa, construo pipelines resilientes e
          arquiteturas de IA aplicadas a desafios reais de negócios.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
          <Stat
            value={allProjects.length}
            label="Repositórios documentados"
          />
          <Stat
            value={95.57}
            decimals={2}
            suffix="%"
            label="Acurácia classificação MNIST (PyTorch)"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500" />
              </span>
              <p className="font-display text-sm font-medium text-slate-100">
                Estágio ativo
              </p>
            </div>
            <p className="mt-1 max-w-[20ch] text-xs leading-snug text-slate-400">
              Data Quality para IA na Stringhini Varejo Inteligente
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {contacts.map((contact) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.id === "email" ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={contact.label}
              title={contact.label}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-colors hover:border-sky-400/60 hover:text-sky-300 hover:shadow-[0_0_18px_-2px_rgba(56,189,248,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              <SocialIcon name={contact.id} />
            </motion.a>
          ))}
          <motion.a
            href="#destaques"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className="ml-1 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-6px_rgba(99,102,241,0.75)] transition-shadow hover:shadow-[0_0_34px_-4px_rgba(99,102,241,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Ver projetos
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="flex md:justify-end"
      >
        <BootPanel />
      </motion.div>
    </section>
  );
};
