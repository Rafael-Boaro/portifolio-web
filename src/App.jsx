import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ================= Dados ================= */
const GH = "https://github.com/Rafael-Boaro";
const repo = (slug) => `${GH}/${slug}`;
const SECTION_IDS = ["competencias", "experiencia", "projetos", "formacao"];

const contacts = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/rafael-paolielo-boaro-1414b135a" },
  { id: "github", label: "GitHub", href: GH },
  { id: "email", label: "Email", href: "mailto:rafaelboaro7@gmail.com" },
];

const skills = [
  { group: "IA & Machine Learning", items: ["Arquitetura RAG", "Prompt Engineering", "Scikit-Learn", "Agentforce"] },
  { group: "Engenharia de Dados", items: ["Python (Pandas, NumPy)", "SQL (consultas, joins, troubleshooting)", "Pipelines ETL/ELT", "Data Quality (QA)"] },
  { group: "Automação & Ferramentas", items: ["n8n", "Integração de APIs (Webhooks)", "Docker", "Git/GitHub", "Dashboards Analíticos"] },
];

const projects = [
  {
    title: "Competição Global AI4SDGs",
    tag: "STAR.VISION e OSE",
    text: "Liderança técnica (“Código R”) na estruturação de um pipeline de dados inovador com imagens hiperespectrais de satélite para o monitoramento agrícola.",
    stack: ["R", "Imagens hiperespectrais", "Pipeline de dados"],
    href: GH,
  },
  {
    title: "Pipeline de Dados & Agente de IA",
    tag: "Engenharia de Dados + IA Generativa",
    text: "Evolução de scripts simples a uma arquitetura robusta: exploração de dados em SQLite, pipeline ETL com regras de negócio, deteção de fraudes com Random Forest e SMOTE, e um agente de IA (Gemini) com base de conhecimento privada.",
    stack: ["Python", "Pandas", "Scikit-Learn", "Gemini API"],
    href: repo("bootcamp-analise-dados-python"),
  },
  {
    title: "Classificação de Dígitos com Deep Learning",
    tag: "Rede neural em PyTorch",
    text: "Rede neural construída do zero em PyTorch: um MLP totalmente conectado que reconhece dígitos manuscritos do MNIST com 95,57% de acurácia em 10 mil imagens nunca vistas no treino.",
    stack: ["PyTorch", "Deep Learning", "NumPy"],
    href: repo("classificacao-digitos-mnist-pytorch"),
  },
];

const categories = ["Todos", "Dados & IA", "IA & Automação", "Dados & Dashboards", "Front-end", "Segurança"];

const allProjects = [
  { slug: "bootcamp-analise-dados-python", title: "Portefólio de Engenharia de Dados & IA", category: "Dados & IA", text: "ETL com regras de negócio, deteção de fraudes com Random Forest + SMOTE e um agente de IA (Gemini) com base de conhecimento privada.", stack: ["Python", "SQLite", "Scikit-Learn", "Gemini"] },
  { slug: "classificacao-digitos-mnist-pytorch", title: "Classificação de Dígitos (MNIST)", category: "Dados & IA", text: "MLP em PyTorch treinado do zero para reconhecer dígitos manuscritos, com 95,57% de acurácia em dados nunca vistos.", stack: ["PyTorch", "Deep Learning"] },
  { slug: "Fundamentos-de-IA-Generativa-RAG-e-Engenharia-de-Prompts", title: "Fundamentos de RAG e Prompt Engineering", category: "IA & Automação", text: "Estudo aplicado da arquitetura RAG com NotebookLM, mapeando limitações e técnicas de mitigação de alucinações em LLMs.", stack: ["RAG", "NotebookLM", "Prompt Engineering"] },
  { slug: "landing-pages-ia-experimento", title: "Landing Pages Geradas por IA", category: "IA & Automação", text: "Um único prompt fixo gerou 17 landing pages completas a partir de fichas reais do Google Maps, sem retoques manuais.", stack: ["Prompt Engineering", "GEO/SEO", "HTML/CSS/JS"] },
  { slug: "Extraindo-Insights-do-Feedback-de-Clientes-Banc-rios", title: "Insights de Feedback de Clientes Bancários", category: "IA & Automação", text: "Prompt que classifica feedbacks por tema, sentimento e urgência, entregando um resumo executivo com ações priorizadas.", stack: ["Prompt Engineering", "Análise de CX"] },
  { slug: "dio-educador-financeiro-ia-Santander-bootcamp", title: "Educador Financeiro Inteligente", category: "IA & Automação", text: "Proposta de assistente para universitários: rateio de despesas, simulador de metas de poupança e painel visual de gastos.", stack: ["Prompt Engineering", "Educação financeira"] },
  { slug: "Ia-generativa-video", title: "Avatar CGI com IA Generativa", category: "IA & Automação", text: "Vídeo curto com avatar hiper-realista gerado por IA, unindo geração de imagem, roteiro e sincronia labial.", stack: ["IA Generativa de Imagem", "Lip-sync"] },
  { slug: "ERP-Sistema-Gestao-BlogRichard", title: "Sistema de Gestão ERP", category: "Dados & Dashboards", text: "Dashboard de KPIs em tempo real, controlo de acessos por perfil (RBAC) e pipeline de validação que sanitiza dados antes de persistir.", stack: ["RBAC", "APIs RESTful", "Dashboard"] },
  { slug: "finance-ai-dashboard", title: "Finance.AI Dashboard", category: "Dados & Dashboards", text: "Protótipo de painel financeiro com arquitetura assíncrona simulada, validando loading states e contratos de dados prontos para IA.", stack: ["Next.js", "React", "Recharts"] },
  { slug: "harvard-cs50-sql", title: "CS50 SQL — Harvard", category: "Dados & Dashboards", text: "Modelagem ER, normalização, views, triggers e otimização de consultas com índices, do curso de bancos de dados de Harvard.", stack: ["SQL", "Modelagem ER", "Índices"] },
  { slug: "planej-ai", title: "Planej.ai", category: "Front-end", text: "Educador financeiro com insights via IA generativa. Arquitetura React com HOCs para estados de loading/erro e componentes puros.", stack: ["React", "TypeScript", "Tailwind v4"] },
  { slug: "Vitrine-atelie", title: "Ateliê da Paula — Vitrine", category: "Front-end", text: "Vitrine virtual com foco em conversão via WhatsApp, tipagem estrita, imagens lazy-load e estado global com Zustand.", stack: ["React", "TypeScript", "Zustand"] },
  { slug: "projetofinal-DIO-ransonware", title: "Ransomware Educacional", category: "Segurança", text: "Simulação controlada de criptografia e resgate de arquivos com AES, para demonstrar riscos que a defesa de dados precisa mitigar.", stack: ["Python", "Criptografia AES"] },
  { slug: "Phishing-Kali-senhs", title: "Simulação de Engenharia Social", category: "Segurança", text: "Exercício de conscientização sobre phishing com Kali Linux, reforçando a importância da autenticação segura.", stack: ["Kali Linux", "Pentest"] },
];

/* Formação académica (completa) */
const education = [
  { period: "previsão de conclusão: dezembro de 2028", title: "Tecnólogo em Análise e Desenvolvimento de Sistemas", school: "FATEC" },
  { period: "concluído em 2025", title: "Técnico em Informática para a Internet", school: "Etec Prof. Rodolpho José Del Guerra" },
];

/* Certificações (lista completa) */
const certs = [
  "CS50’s Introduction to Databases with SQL (Harvard University)",
  "Bootcamp Accenture: Python para Análise e Automação de Dados (DIO)",
  "Bootcamp Afya: Automação de Dados com IA (DIO)",
  "Bootcamp Bradesco: GenAI, Dados & Cyber (DIO)",
  "N8N: Do Zero ao Projeto com IA (UNIP)",
  "Formação Fundamentos de Inteligência Artificial (DIO)",
  "Introdução à Cibersegurança (Cisco Networking Academy)",
];

const bootLines = [
  { p: "$", t: "sessão iniciada: rafael boaro", c: "text-slate-200" },
  { p: "", t: "import pandas, sqlite3, sklearn", c: "text-slate-500" },
  { p: "", t: "pipeline etl ................. concluído", c: "text-slate-500" },
  { p: "", t: "qa de anotações .............. validado", c: "text-slate-500" },
  { p: "", t: "treino do modelo .............. 95.57%", c: "text-emerald-300" },
  { p: "$", t: "agente de ia pronto para consultas", c: "text-fuchsia-300" },
];

/* ================= Hooks ================= */
function useCountUp(target, decimals = 0, duration = 1100) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return decimals ? value.toFixed(decimals) : Math.round(value);
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* Efeito de digitação linha a linha, carácter a carácter */
function useTypewriter(lines, charDelay = 16, lineDelay = 260) {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (reduced || lineIndex >= lines.length) return;
    const currentText = lines[lineIndex].t;
    if (charIndex < currentText.length) {
      const id = setTimeout(() => setCharIndex((c) => c + 1), charDelay);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, lineDelay);
    return () => clearTimeout(id);
  }, [lineIndex, charIndex, reduced, lines, charDelay, lineDelay]);

  return { lineIndex: reduced ? lines.length : lineIndex, charIndex, reduced };
}

/* ================= Variantes de animação ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const staggerTight = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

/* ================= Ícones ================= */
const Icon = ({ name, className = "h-5 w-5" }) => {
  if (name === "email")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  const d =
    name === "github"
      ? "M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z"
      : "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z";
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
};

const IconExternal = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
const IconCopy = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M4 16V5a1 1 0 011-1h11" />
  </svg>
);
const IconCheck = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconArrowUp = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* ================= Fundo ambiente (gradiente + glow) ================= */
function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-indigo-500/30 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/25 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-500/20 blur-[130px]" />
    </div>
  );
}

/* ================= Peças reutilizáveis ================= */
const Section = ({ id, title, children }) => (
  <section id={id} className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="mb-10 flex items-center gap-3"
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 shadow-[0_0_10px_2px_rgba(129,140,248,0.5)]" />
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-[1.75rem]">{title}</h2>
      <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </motion.div>
    {children}
  </section>
);

const Badge = ({ children }) => (
  <motion.span
    variants={fadeUp}
    whileHover={{ scale: 1.08, y: -3 }}
    transition={{ type: "spring", stiffness: 380, damping: 16 }}
    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-400/60 hover:text-sky-200 hover:shadow-[0_0_18px_-2px_rgba(56,189,248,0.5)]"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400" />
    {children}
  </motion.span>
);

function Stat({ value, decimals = 0, suffix = "", label }) {
  const display = useCountUp(value, decimals);
  return (
    <div>
      <p className="bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text font-display text-2xl font-semibold text-transparent sm:text-3xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 max-w-[17ch] text-xs leading-snug text-slate-400">{label}</p>
    </div>
  );
}

/* ================= Navegação ================= */
function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (h.scrollTop / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["competencias", "Competências"],
    ["experiencia", "Experiência"],
    ["projetos", "Projetos"],
    ["formacao", "Formação"],
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <a href="#topo" className="flex items-center gap-2 font-mono text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 shadow-[0_0_10px_2px_rgba(56,189,248,0.55)]" />
          <span className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text text-transparent">rafael@boaro:~$</span>
        </a>
        <ul className="hidden gap-6 text-sm md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative pb-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  active === id ? "text-sky-300" : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-sky-400 to-fuchsia-400"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden rounded-b-3xl border-t border-white/10 bg-slate-950/70 px-6 text-sm backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 py-3">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-2 py-2.5 transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                    active === id ? "text-sky-300" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
      <div className="h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}

/* ================= Hero ================= */
function BootPanel() {
  const { lineIndex, charIndex, reduced } = useTypewriter(bootLines);
  const finished = reduced || lineIndex >= bootLines.length;

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-500/35 via-indigo-500/25 to-fuchsia-500/35 blur-2xl" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_0_60px_-10px_rgba(99,102,241,0.55)] backdrop-blur-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[11px] text-slate-500">pipeline.log</span>
        </div>
        <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
          {bootLines.map((l, i) => {
            if (reduced || i < lineIndex) {
              return (
                <p key={i} className={l.c}>
                  {l.p && <span className="mr-2 text-sky-400">{l.p}</span>}
                  {l.t}
                </p>
              );
            }
            if (i === lineIndex) {
              return (
                <p key={i} className={l.c}>
                  {l.p && <span className="mr-2 text-sky-400">{l.p}</span>}
                  {l.t.slice(0, charIndex)}
                  <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-current align-middle" />
                </p>
              );
            }
            return null;
          })}
          {finished && (
            <p className="flex items-center text-fuchsia-300">
              <span className="mr-2">$</span>
              <span className={`inline-block h-4 w-2 bg-gradient-to-b from-sky-400 to-fuchsia-400 ${reduced ? "" : "cursor-blink"}`} />
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="topo" className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl">
          Rafael Paolielo Boaro
        </h1>
        <p className="mt-3 bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text font-display text-lg text-transparent sm:text-xl">
          Desenvolvedor, Engenheiro de Dados e Especialista em IA/Automação
        </p>
        <p className="mt-6 max-w-[58ch] leading-relaxed text-slate-400">
          Estudante de Análise e Desenvolvimento de Sistemas (FATEC). Transformo dados brutos em inteligência corporativa e construo modelos de IA (RAG/LLMs) que resolvem problemas reais.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
          <Stat value={allProjects.length} label="repositórios documentados" />
          <Stat value={95.57} decimals={2} suffix="%" label="acurácia em classificação de imagens (MNIST)" />
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {!reduced && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500" />
              </span>
              <p className="font-display text-sm font-medium text-slate-100">Estágio ativo</p>
            </div>
            <p className="mt-1 max-w-[20ch] text-xs leading-snug text-slate-400">Data Quality para IA na Stringhini Varejo Inteligente</p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {contacts.map((c) => (
            <motion.a
              key={c.id}
              href={c.href}
              target={c.id === "email" ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={c.label}
              title={c.label}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-colors hover:border-sky-400/60 hover:text-sky-300 hover:shadow-[0_0_18px_-2px_rgba(56,189,248,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              <Icon name={c.id} />
            </motion.a>
          ))}
          <motion.a
            href="#projetos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className="ml-1 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-6px_rgba(99,102,241,0.75)] transition-shadow hover:shadow-[0_0_34px_-4px_rgba(99,102,241,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Ver projetos
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="flex md:justify-end"
      >
        <BootPanel />
      </motion.div>
    </section>
  );
}

/* ================= Competências ================= */
function Skills() {
  return (
    <Section id="competencias" title="Competências">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="grid gap-8 md:grid-cols-3"
      >
        {skills.map((s) => (
          <motion.div key={s.group} variants={fadeUp}>
            <h3 className="mb-4 font-display text-base font-medium text-slate-100">{s.group}</h3>
            <motion.div variants={staggerTight} className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <Badge key={i}>{i}</Badge>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ================= Experiência ================= */
function Experience() {
  return (
    <Section id="experiencia" title="Experiência profissional">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-2xl"
      >
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 via-indigo-400 to-fuchsia-500" />
        <div className="p-6 pl-8 sm:p-8 sm:pl-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-sky-300">julho de 2026 – atual</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">remoto</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-slate-50 sm:text-2xl">
            Estagiário em Data Annotation (Qualidade de Dados para IA)
          </h3>
          <p className="mt-1 text-slate-400">Stringhini Varejo Inteligente</p>
          <p className="mt-4 max-w-[64ch] leading-relaxed text-slate-400">
            Atuação direta no processo de Data Quality e QA em ambiente produtivo. Auditoria, correção e refinamento de anotações (ground truth) de datasets massivos para o treino de algoritmos de Visão Computacional.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

/* ================= Projetos ================= */
function Projects() {
  const [active, setActive] = useState("Todos");
  const visible = active === "Todos" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <Section id="projetos" title="Projetos em destaque">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="grid gap-5 md:grid-cols-3"
      >
        {projects.map((p) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 p-6 backdrop-blur-2xl transition-[box-shadow,border-color] duration-300 hover:border-sky-400/60 hover:shadow-[0_0_55px_-10px_rgba(129,140,248,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="font-mono text-xs text-sky-300">{p.tag}</p>
            <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-slate-50">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-slate-300">
                  {s}
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors group-hover:text-sky-300">
              <Icon name="github" className="h-4 w-4" /> Ver no GitHub
            </span>
          </motion.a>
        ))}
      </motion.div>

      <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
        <h3 className="font-display text-lg font-medium text-slate-100">Todos os repositórios</h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-white/10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`relative pb-3 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                active === c ? "text-sky-300" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {c}
              {active === c && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={active}
        initial="hidden"
        animate="show"
        variants={staggerTight}
        className="mt-6 divide-y divide-white/10 border-y border-white/10"
      >
        {visible.map((p) => (
          <motion.a
            key={p.slug}
            href={repo(p.slug)}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className="group relative grid gap-2 rounded-xl px-2 py-4 pr-8 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-[-2px] md:grid-cols-[1.3fr_0.9fr_1.5fr] md:items-start md:gap-6"
          >
            <div>
              <p className="font-medium text-slate-100">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
            </div>
            <p className="font-mono text-xs text-slate-500">{p.category}</p>
            <div className="flex flex-wrap content-start gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-300">
                  {s}
                </span>
              ))}
            </div>
            <IconExternal className="absolute right-1 top-4 h-4 w-4 text-slate-600 opacity-0 transition-opacity group-hover:text-sky-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:right-2" />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

/* ================= Formação ================= */
function Education() {
  return (
    <Section id="formacao" title="Formação e certificações">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="grid gap-6 sm:grid-cols-2"
      >
        {education.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 p-6 backdrop-blur-2xl sm:p-7"
          >
            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 via-indigo-400 to-fuchsia-500" />
            <p className="font-mono text-xs text-sky-300">{e.period}</p>
            <h3 className="mt-3 font-display text-lg font-semibold text-slate-50">{e.title}</h3>
            <p className="mt-1 text-slate-400">{e.school}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12">
        <h3 className="mb-5 font-display text-lg font-medium text-slate-100">Certificações</h3>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerTight}
          className="grid gap-3 sm:grid-cols-2"
        >
          {certs.map((c) => (
            <motion.li
              key={c}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:bg-white/[0.07]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400" />
              <span className="text-sm leading-relaxed text-slate-300">{c}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

/* ================= Rodapé ================= */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "rafaelboaro7@gmail.com";
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard indisponível: a pessoa ainda pode selecionar o texto manualmente */
    }
  };
  return (
    <motion.button
      onClick={onCopy}
      whileTap={{ scale: 0.9 }}
      aria-label="Copiar email"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
    >
      {copied ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />}
    </motion.button>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-center">
      <p className="text-slate-400">Vamos conversar sobre dados, IA ou automação?</p>
      <div className="mt-2 inline-flex items-center gap-2">
        <a
          href="mailto:rafaelboaro7@gmail.com"
          className="bg-gradient-to-r from-sky-300 to-fuchsia-300 bg-clip-text font-mono text-transparent underline-offset-4 hover:underline"
        >
          rafaelboaro7@gmail.com
        </a>
        <CopyEmailButton />
      </div>
      <p className="mt-6 text-xs text-slate-600">© {new Date().getFullYear()} Rafael Paolielo Boaro</p>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 shadow-[0_0_30px_-8px_rgba(99,102,241,0.65)] backdrop-blur-2xl transition-colors hover:border-sky-400/50 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <IconArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ================= App ================= */
export default function App() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-slate-300 antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: blink 1s steps(1, start) infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .cursor-blink { animation: none; opacity: 1; }
        }
      `}</style>
      <AmbientGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}