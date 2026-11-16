export interface ContactLink {
  id: string;
  label: string;
  href: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface FeaturedProject {
  title: string;
  tag: string;
  text: string;
  stack: string[];
  href: string;
  liveUrl?: string;
}

export type ProjectCategory =
  | "Todos"
  | "Dados & IA"
  | "IA & Automação"
  | "Dados & Dashboards"
  | "Front-end"
  | "Segurança";

export interface ProjectItem {
  slug: string;
  title: string;
  category: ProjectCategory;
  text: string;
  stack: string[];
  href?: string;
  liveUrl?: string;
}

export interface EducationItem {
  period: string;
  title: string;
  school: string;
}

export interface BootLine {
  prompt: string;
  text: string;
  className: string;
}
