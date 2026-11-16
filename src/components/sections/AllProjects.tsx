import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { categories, allProjects, repoUrl } from "../../data/portfolioData";
import { ProjectCategory } from "../../types";
import { Section } from "../ui/Section";

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const rowFade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const AllProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Todos");

  const visibleProjects =
    activeCategory === "Todos"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <Section id="repositorios" title="Repositórios de código">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <p className="font-mono text-xs text-slate-400">
          Exibindo {visibleProjects.length} de {allProjects.length} projetos
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`relative pb-2 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                activeCategory === category
                  ? "text-sky-300 font-medium"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.span
                  layoutId="category-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeCategory}
        initial="hidden"
        animate="show"
        variants={listStagger}
        className="mt-6 divide-y divide-white/10 border-y border-white/10"
      >
        {visibleProjects.map((project) => (
          <motion.a
            key={project.slug}
            href={project.href ?? repoUrl(project.slug)}
            target="_blank"
            rel="noreferrer"
            variants={rowFade}
            whileHover={{ x: 4 }}
            className="group relative grid gap-2 rounded-xl px-2 py-4 pr-8 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[-2px] md:grid-cols-[1.3fr_0.9fr_1.5fr] md:items-start md:gap-6"
          >
            <div>
              <p className="font-medium text-slate-100 group-hover:text-sky-300 transition-colors">
                {project.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {project.text}
              </p>
            </div>

            <p className="font-mono text-xs text-slate-500">
              {project.category}
            </p>

            <div className="flex flex-wrap content-start gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <ExternalLink
              className="absolute right-1 top-4 h-4 w-4 text-slate-600 opacity-0 transition-opacity group-hover:text-sky-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:right-2"
              aria-hidden="true"
            />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
};
