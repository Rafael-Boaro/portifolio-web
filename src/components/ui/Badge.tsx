import React from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
}

const badgeVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <motion.span
      variants={badgeVariants}
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-400/60 hover:text-sky-200 hover:shadow-[0_0_18px_-2px_rgba(56,189,248,0.5)]"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400" />
      {children}
    </motion.span>
  );
};
