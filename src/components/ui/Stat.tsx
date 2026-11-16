import React from "react";
import { useCountUp } from "../../hooks/useCountUp";

interface StatProps {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export const Stat: React.FC<StatProps> = ({
  value,
  decimals = 0,
  suffix = "",
  label,
}) => {
  const display = useCountUp(value, decimals);

  return (
    <div>
      <p className="bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text font-display text-2xl font-semibold text-transparent sm:text-3xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 max-w-[18ch] text-xs leading-snug text-slate-400">{label}</p>
    </div>
  );
};
