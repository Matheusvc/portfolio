import type { Link } from '@/types/content';

const WHATSAPP_NUMBER = '5598987577739';
const WHATSAPP_MESSAGE = 'Olá, Matheus! Vim pelo seu portfólio e gostaria de conversar.';

export const SITE = {
  name: 'Matheus Lira',
  role: 'Analista de Sistemas e Desenvolvedor Full-Stack',
  location: 'São Luís, MA',
} as const;

export const CONTACT = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  linkedin: 'https://www.linkedin.com/in/matheusslira/',
  linkedinHandle: 'linkedin.com/in/matheusslira',
  github: 'https://github.com/Matheusvc',
  email: 'mailto:matheusvitorcl1@gmail.com',
} as const;

export const SECTION_IDS = {
  home: 'inicio',
  projects: 'projetos',
  services: 'atuacao',
  about: 'sobre',
  process: 'processo',
  journey: 'trajetoria',
  contact: 'contato',
} as const;

export const NAV_LINKS: Link[] = [
  { label: 'Início', href: `#${SECTION_IDS.home}` },
  { label: 'Sobre mim', href: `#${SECTION_IDS.about}` },
  { label: 'Atuação', href: `#${SECTION_IDS.services}` },
  { label: 'Projetos', href: `#${SECTION_IDS.projects}` },
  { label: 'Trajetória', href: `#${SECTION_IDS.journey}` },
  { label: 'Contato', href: `#${SECTION_IDS.contact}` },
];
