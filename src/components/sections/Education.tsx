import React from "react";
import { motion } from "framer-motion";
import { education, certs } from "../../data/portfolioData";
import { Section } from "../ui/Section";

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const Education: React.FC = () => {
  return (
    <Section id="formacao" title="Formação e certificações">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-display text-base font-medium text-slate-100">
            Formação acadêmica
          </h3>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariant}
            className="space-y-4"
          >
            {education.map((item) => (
              <motion.article
                key={item.title}
                variants={itemVariant}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-sky-400/50"
              >
                <p className="font-mono text-xs text-sky-300">{item.period}</p>
                <h4 className="mt-1 font-display text-base font-semibold text-slate-50">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-slate-400">{item.school}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-base font-medium text-slate-100">
            Certificações técnicas
          </h3>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariant}
            className="space-y-2.5"
          >
            {certs.map((cert) => (
              <motion.li
                key={cert}
                variants={itemVariant}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:bg-white/[0.08]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400" />
                <span className="text-sm leading-relaxed text-slate-300">{cert}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
};
