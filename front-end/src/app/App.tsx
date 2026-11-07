import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Challenges } from '@/components/sections/Challenges';
import { Contact } from '@/components/sections/Contact';
import { Events } from '@/components/sections/Events';
import { FallingTags } from '@/components/sections/FallingTags';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase';
import { Services } from '@/components/sections/Services';
import { Testimonial } from '@/components/sections/Testimonial';
import { ToolsMarquee } from '@/components/sections/ToolsMarquee';

export function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-navy"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <ToolsMarquee />
        <Challenges />
        <ProjectsShowcase />
        <Services />
        <FallingTags />
        <About />
        <Testimonial />
        <Process />
        <Faq />
        <Events />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
