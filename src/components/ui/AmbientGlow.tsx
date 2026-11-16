import React from "react";

export const AmbientGlow: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-indigo-500/25 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-500/20 blur-[130px]" />
    </div>
  );
};
