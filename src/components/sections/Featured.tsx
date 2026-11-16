import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { featuredProjects } from "../../data/portfolioData";
import { Section } from "../ui/Section";
import { SocialIcon } from "../ui/SocialIcon";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Featured: React.FC = () => {
  return (
    <Section id="destaques" title="Projetos em destaque">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2"
      >
        {featuredProjects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardVariant}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/35 p-6 backdrop-blur-2xl transition-[box-shadow,border-color] duration-300 hover:border-sky-400/60 hover:shadow-[0_0_55px_-10px_rgba(129,140,248,0.65)]"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div>
              <p className="font-mono text-xs font-medium text-sky-300">
                {project.tag}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-slate-50">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {project.text}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
                >
                  <SocialIcon name="github" className="h-4 w-4" />
                  <span>Código no GitHub</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 transition-colors hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span>Ver demonstração</span>
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
};
