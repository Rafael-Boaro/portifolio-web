# Portfólio Profissional — Rafael Paolielo Boaro

Interface web moderna e responsiva desenvolvida para centralizar a apresentação de projetos, competências e métricas técnicas nas áreas de Engenharia de Dados, Inteligência Artificial Aplicada e Desenvolvimento de Software.

## Visão Geral

Esta aplicação front-end foi construída sob os mais rigorosos padrões da engenharia de software contemporânea, combinando tipagem estrita com TypeScript, arquitetura atômica de componentes, animações performáticas via Framer Motion e estilização utilitária com Tailwind CSS.

O portfólio serve como vitrine técnica demonstrando resultados tangíveis em pipelines analíticos, modelagem relacional avançada, previsão de demanda e sistemas multiagentes.

## Projetos Principais em Destaque

1. **Cofre Estoque Inteligente:**
   - Solução desenvolvida para o Hackathon Connect 7.0 integrando hardware de cofre refrigerado de medicamentos de alto custo com modelos de previsão estatística de consumo (suavização exponencial e média móvel por menor MAPE), ponto de pedido com 95% de nível de serviço, reposição FEFO e assistente conversacional de IA.
   - Aplicação em produção: [cofre-estoque-inteligente-7uvxcnxc5dhfyr29ifx9vg.streamlit.app](https://cofre-estoque-inteligente-7uvxcnxc5dhfyr29ifx9vg.streamlit.app/)

2. **Vendas + IA (FinAgent):**
   - Aplicação analítica construída no Santander Bootcamp 2026 (DIO), combinando pipeline de ETL tolerante a falhas e variações de encodings/moedas com dashboard interativo de vendas e um agente financeiro autônomo com function calling determinística e streaming em tempo real.
   - Aplicação em produção: [vendas-ai-bjr7gzhrrkdjsbd6ve6qth.streamlit.app](https://vendas-ai-bjr7gzhrrkdjsbd6ve6qth.streamlit.app/)

3. **CS50 SQL (Harvard University):**
   - Resoluções completas de desafios avançados e projeto final de banco de dados do curso da Universidade de Harvard. Foco em modelagem relacional ER, normalização (1NF a 3NF), views virtuais, triggers de integridade e otimização de performance via índices B-Tree e analise de custo com `EXPLAIN QUERY PLAN`.
   - Demonstração em vídeo: [Assista no YouTube](https://youtu.be/h5ZNNmf-OzM)

4. **Agentes Inteligentes de Suporte & Performance:**
   - Ecossistema declarativo de agentes autônomos de IA voltados a governança estrita de repositórios Git, engenharia de software front-end, arquitetura de sistemas e mentoria técnica de alta performance.

## Tecnologias e Ferramentas

| Domínio | Ferramenta / Biblioteca | Finalidade |
|---|---|---|
| Biblioteca Base | React 19 | Interface declarativa baseada em hooks |
| Linguagem | TypeScript 7 (Strict Mode) | Tipagem estrita de props, dados e retornos |
| Bundler & Servidor | Vite 8 | Build rápido e HMR instantâneo |
| Estilização | Tailwind CSS v4 | Estilização utilitária e responsividade mobile-first |
| Animações | Framer Motion 14 | Transições e microinterações com suporte a `prefers-reduced-motion` |
| Iconografia | Lucide React | Iconografia consistente e acessível |
| Linter | Oxlint | Auditoria estática de código e conformidade com React Compiler |

## Arquitetura de Componentes

O código-fonte segue arquitetura modular e atômica, garantindo que nenhum arquivo exceda 150 linhas de código:

```
src/
|-- components/
|   |-- sections/
|   |   |-- AllProjects.tsx     Grade com filtros e catálogo completo de repositórios
|   |   |-- BootPanel.tsx       Console interativo com simulação de telemetria
|   |   |-- Education.tsx       Histórico acadêmico e certificações técnicas
|   |   |-- Experience.tsx      Trajetória profissional em Data Quality para IA
|   |   |-- Featured.tsx        Cards dos quatro projetos principais
|   |   |-- Footer.tsx          Rodapé com links de contato e ano dinâmico estável
|   |   |-- Hero.tsx            Apresentação principal, métricas e chamadas de ação
|   |   |-- Nav.tsx             Barra de navegação com scrollspy e progresso de leitura
|   |   `-- Skills.tsx          Mapeamento categorizado de competências
|   `-- ui/
|       |-- AmbientGlow.tsx     Efeitos de iluminação ambiente em gradiente
|       |-- BackToTop.tsx       Botão flutuante de retorno ao topo com animação
|       |-- Badge.tsx           Pílula visual reutilizável para tags de tecnologia
|       |-- CopyEmailButton.tsx Ação de cópia rápida com feedback visual
|       |-- Section.tsx         Contêiner semântico padronizado com SectionHeader
|       |-- SectionHeader.tsx   Cabeçalho de seção com detalhe geométrico
|       |-- SocialIcon.tsx      Renderizador de ícones de redes sociais e contato
|       `-- Stat.tsx            Exibição de métrica com contagem animada
|-- data/
|   `-- portfolioData.ts        Isolamento integral de dados, links e textos
|-- hooks/
|   |-- useCountUp.ts           Contagem animada de números com suporte a acessibilidade
|   |-- useScrollSpy.ts         Detecção da seção ativa na tela via IntersectionObserver
|   `-- useTypewriter.ts        Efeito de digitação com controle por linha e caractere
|-- types/
|   `-- index.ts                Declarações de interfaces e tipos TypeScript
|-- App.tsx                     Ponto de montagem e orquestração do layout
|-- index.css                   Configuração global de estilos e fontes
`-- main.tsx                    Inicialização do React com StrictMode
```

## Como Executar Localmente

### Pré-requisitos

- Node.js 20+ ou 22+
- Gerenciador de pacotes npm (ou pnpm)

### Instalação

```bash
git clone https://github.com/Rafael-Boaro/portifolio-web.git
cd portifolio-web
npm install
```

### Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Executar verificação de linter
npm run lint

# Compilar para produção
npm run build

# Visualizar build localmente
npm run preview
```

## Autor

Rafael Paolielo Boaro  
- GitHub: [Rafael-Boaro](https://github.com/Rafael-Boaro)  
- LinkedIn: [rafael-paolielo-boaro](https://www.linkedin.com/in/rafael-paolielo-boaro-1414b135a)  
- Email: [rafaelboaro7@gmail.com](mailto:rafaelboaro7@gmail.com)

## Licença

Distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
