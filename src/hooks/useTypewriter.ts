import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { BootLine } from "../types";

export interface TypewriterResult {
  lineIndex: number;
  charIndex: number;
  reduced: boolean | null;
}

export function useTypewriter(
  lines: BootLine[],
  charDelay: number = 16,
  lineDelay: number = 260
): TypewriterResult {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    if (reduced || lineIndex >= lines.length) return;

    const currentText = lines[lineIndex].text;

    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, charDelay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, lineDelay);

    return () => clearTimeout(timer);
  }, [lineIndex, charIndex, reduced, lines, charDelay, lineDelay]);

  return {
    lineIndex: reduced ? lines.length : lineIndex,
    charIndex,
    reduced,
  };
}
