import React from "react";
import { SectionHeader } from "./SectionHeader";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl px-6 py-16 scroll-mt-20 ${className}`}
    >
      <SectionHeader title={title} />
      {children}
    </section>
  );
};
