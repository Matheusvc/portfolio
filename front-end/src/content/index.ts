import dashboard from '@/assets/images/acao-dashboard.webp';
import brunaMakes from '@/assets/images/bruna-makes.webp';
import eventoHackathon from '@/assets/images/evento-hackathon.webp';
import eventoPhpeste from '@/assets/images/evento-phpeste.webp';
import eventoSebrae from '@/assets/images/evento-sebrae.webp';
import portal from '@/assets/images/portal-transparencia.webp';
import svcApis from '@/assets/images/svc-apis.webp';
import svcAutomacao from '@/assets/images/svc-automacao.webp';
import svcDashboards from '@/assets/images/svc-dashboards.webp';
import svcFullstack from '@/assets/images/svc-fullstack.webp';
import { CONTACT, NAV_LINKS, SECTION_IDS } from '@/config/site';
import type {
  EventItem,
  FaqItem,
  FooterColumn,
  ProcessStep,
  Service,
  ShowcaseProject,
  Stat,
  Testimonial,
  Tool,
} from '@/types/content';

const simpleIcon = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/${slug}.svg`;

export const TOOLS: Tool[] = [
  { name: 'Java', icon: simpleIcon('openjdk') },
  { name: 'Spring Boot', icon: simpleIcon('springboot') },
  { name: 'React', icon: simpleIcon('react') },
  { name: 'TypeScript', icon: simpleIcon('typescript') },
  { name: 'PostgreSQL', icon: simpleIcon('postgresql') },
  { name: 'Python', icon: simpleIcon('python') },
  { name: 'Tailwind CSS', icon: simpleIcon('tailwindcss') },
  { name: 'Vite', icon: simpleIcon('vite') },
  { name: 'Git', icon: simpleIcon('git') },
  { name: 'Docker', icon: simpleIcon('docker') },
  { name: 'Arduino / IoT', icon: simpleIcon('arduino') },
  { name: 'JWT', icon: simpleIcon('jsonwebtokens') },
];

export const CHALLENGES: string[] = [
  'Sistemas lentos, instáveis ou difíceis de manter.',
  'Dados espalhados entre planilhas, arquivos e conversas.',
  'Processos repetitivos que geram retrabalho.',
  'Falta de visibilidade sobre clientes, serviços e pendências.',
  'Rotinas manuais sem integração entre áreas.',
  'Dados desestruturados que dificultam decisões.',
];

export const SHOWCASE: ShowcaseProject[] = [
  { name: 'Gestão de Barbearia', image: dashboard, alt: 'Dashboard de gestão de barbearia', accent: '#E3A51C' },
  { name: 'Bruna Makes', image: brunaMakes, alt: 'Loja virtual Bruna Makes', accent: '#C2405E' },
  { name: 'Portal da Transparência', image: portal, alt: 'Portal da Transparência', accent: '#3B82FF' },
];

export const SERVICES: Service[] = [
  {
    title: 'Desenvolvimento Full-Stack',
    description: 'Construção de plataformas web, do front-end às regras de negócio e ao banco de dados.',
    image: svcFullstack,
  },
  {
    title: 'APIs & Integrações',
    description: 'Desenvolvimento de APIs e conexões entre sistemas para organizar o fluxo de dados e processos.',
    image: svcApis,
  },
  {
    title: 'Dashboards & Painéis',
    description: 'Painéis para acompanhar clientes, serviços, indicadores e pendências de forma clara.',
    image: svcDashboards,
  },
  {
    title: 'Automação com IA',
    description: 'Automação de tarefas e fluxos com IA, reduzindo atividades repetitivas e retrabalho.',
    image: svcAutomacao,
  },
];

export const NEEDS: string[] = [
  'E-commerce',
  'Custom code',
  'Front-end',
  'Back-end',
  'APIs REST',
  'Banco de dados',
  'Dashboards',
  'Automação com IA',
  'Integrações',
  'Autenticação',
  'Deploy',
  'Documentação',
  'Java + Spring',
  'React',
  'PostgreSQL',
  'Análise de requisitos',
];

export const ABOUT_PARAGRAPHS: string[] = [
  'Atuo como Analista de Sistemas e Desenvolvedor Full-Stack, com foco na criação de soluções digitais que organizam processos, integram dados e apoiam decisões de negócio.',
  'Como Desenvolvedor Full-Stack, desenvolvo soluções digitais completas, conectando interfaces, dados e automações para tornar operações mais eficientes. Meu trabalho inclui plataformas internas, dashboards e chatbots voltados à organização da informação, à redução de tarefas manuais e à evolução contínua dos processos.',
];

export const STATS: Stat[] = [
  { value: '10+', label: 'Projetos entregues' },
  { value: '5+', label: 'Empresas atendidas' },
  { value: '2+', label: 'Anos de experiência' },
];

export const TESTIMONIAL: Testimonial = {
  quote:
    'Matheus entendeu exatamente o que precisávamos e entregou um sistema completo, com login seguro e relatórios claros. Comunicação direta, prazos cumpridos — recomendo de olhos fechados.',
  author: 'Castro Advocacia',
  place: 'São Luís, MA',
};

export const PROCESS: ProcessStep[] = [
  {
    title: 'Descoberta',
    icon: 'discovery',
    description: 'Analiso o objetivo, o processo atual e as necessidades que a solução precisa atender.',
  },
  {
    title: 'Desenvolvimento',
    icon: 'build',
    description: 'Organizo requisitos, dados e funcionalidades para construir uma solução clara e consistente.',
  },
  {
    title: 'Entrega',
    icon: 'launch',
    description: 'Valido a solução, documento os pontos necessários e preparo o projeto para evoluções futuras.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quais são suas principais áreas de atuação?',
    answer: [
      'Desenvolvimento full-stack, análise de sistemas, criação de APIs e integrações, dashboards de gestão e automação de processos com IA.',
    ],
  },
  {
    question: 'Quais tecnologias fazem parte da sua stack?',
    answer: [
      'Java + Spring Boot no back-end, React + TypeScript e Tailwind CSS no front-end, PostgreSQL como banco, além de Python para IA/automação e Arduino para projetos IoT.',
    ],
  },
  {
    question: 'Quais projetos você já desenvolveu?',
    answer: [
      'Sistema de gestão para barbearia, a loja virtual Bruna Makes, o Portal da Transparência e o projeto apresentado na Feira do Empreendedor do SEBRAE.',
    ],
  },
  {
    question: 'Em quais experiências profissionais você atuou?',
    answer: [
      'Atuo como Analista de Sistemas e Desenvolvedor Full-Stack em empresas de São Luís, MA, entregando soluções do levantamento de requisitos ao deploy.',
    ],
  },
  {
    question: 'Você participa de eventos e hackathons?',
    answer: [
      'Sim. Participei da Feira do Empreendedor (SEBRAE), do PHPeste e do Hackathon Transparência — Maratona de Inovação Maranhense.',
    ],
  },
  {
    question: 'Onde posso acompanhar seu trabalho?',
    answer: [
      'No ',
      { label: 'GitHub', href: CONTACT.github, external: true },
      ' e no ',
      { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
      '.',
    ],
  },
];

export const EVENTS: EventItem[] = [
  {
    title: 'Feira do Empreendedor - Multi Center SEBRAE',
    tag: '3º lugar · TXM Challenge',
    image: eventoSebrae,
    alt: 'Matheus com o prêmio de 3º lugar no SEBRAE',
  },
  {
    title: 'PHPeste - Um dos maiores eventos de PHP do Brasil',
    tag: 'Conferência',
    image: eventoPhpeste,
    alt: 'Matheus com o crachá do PHPeste',
  },
  {
    title: 'Hackathon Transparência - Maratona de Inovação Maranhense',
    tag: 'Hackathon',
    image: eventoHackathon,
    alt: 'Matheus e equipe no Hackathon Transparência',
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: 'Página', links: NAV_LINKS },
  {
    title: 'Serviço',
    links: [
      'Desenvolvimento Full-Stack',
      'Análise de Sistemas',
      'APIs e Integrações',
      'Automação de Processos',
      'Dashboards e Dados',
      'Sistemas Internos',
    ].map((label) => ({ label, href: `#${SECTION_IDS.services}` })),
  },
  {
    title: 'Conecte-se',
    links: [
      { label: 'WhatsApp', href: CONTACT.whatsapp, external: true },
      { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
      { label: 'GitHub', href: CONTACT.github, external: true },
      { label: 'E-mail', href: CONTACT.email },
    ],
  },
];
