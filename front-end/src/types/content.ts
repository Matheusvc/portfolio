export type Link = { label: string; href: string; external?: boolean };

export type Tool = { name: string; icon: string };

export type ShowcaseScreen = { image: string; alt: string };
export type ShowcaseProject = { name: string; accent: string; screens: ShowcaseScreen[] };

export type Service = { title: string; description: string; image: string };

export type Stat = { value: string; label: string };

export type Testimonial = { quote: string; author: string; place: string };

export type ProcessIcon = 'discovery' | 'build' | 'launch';
export type ProcessStep = { title: string; description: string; icon: ProcessIcon };

export type FaqItem = { question: string; answer: (string | Link)[] };

export type EventItem = { title: string; tag: string; image: string; alt: string };

export type FooterColumn = { title: string; links: Link[] };
