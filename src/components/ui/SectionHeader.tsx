import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={headerVariants}
      className="mb-10 flex items-center gap-3"
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 shadow-[0_0_10px_2px_rgba(129,140,248,0.5)]" />
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-[1.75rem]">
        {title}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </motion.div>
  );
};
