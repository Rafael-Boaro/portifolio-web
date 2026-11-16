import React, { useState, useEffect } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { SECTION_IDS } from "../../data/portfolioData";

const NAV_LINKS = [
  { id: "competencias", label: "Competências" },
  { id: "experiencia", label: "Experiência" },
  { id: "destaques", label: "Destaques" },
  { id: "repositorios", label: "Repositórios" },
  { id: "formacao", label: "Formação" },
];

export const Nav: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = (): void => {
      const h = document.documentElement;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (h.scrollTop / height) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5"
      >
        <a
          href="#topo"
          className="flex items-center gap-2 font-mono text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 shadow-[0_0_10px_2px_rgba(56,189,248,0.55)]" />
          <span className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
            rafael@boaro:~$
          </span>
        </a>

        <ul className="hidden gap-6 text-sm md:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative pb-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  active === id
                    ? "text-sky-300"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400 shadow-[0_0_10px_1px_rgba(56,189,248,0.6)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-lg p-2 text-slate-400 hover:text-slate-100 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-1 ${
                    active === id ? "text-sky-300" : "text-slate-400"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="h-0.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 shadow-[0_0_12px_1px_rgba(129,140,248,0.7)] transition-all duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </header>
  );
};
