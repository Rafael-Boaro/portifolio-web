import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/portfolioData";
import { Section } from "../ui/Section";
import { Badge } from "../ui/Badge";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const tightStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

export const Skills: React.FC = () => {
  return (
    <Section id="competencias" title="Competências">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-3"
      >
        {skills.map((skillGroup) => (
          <motion.div key={skillGroup.group} variants={fadeUpVariant}>
            <h3 className="mb-4 font-display text-base font-medium text-slate-100">
              {skillGroup.group}
            </h3>
            <motion.div variants={tightStagger} className="flex flex-wrap gap-2">
              {skillGroup.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
