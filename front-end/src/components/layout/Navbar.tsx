import { useEffect, useRef, useState } from 'react';
import avatar from '@/assets/images/sobre-matheus.webp';
import logo from '@/assets/images/logo.png';
import { CONTACT, NAV_LINKS, SECTION_IDS, SITE } from '@/config/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const SPY_IDS = Object.values(SECTION_IDS);
const DESKTOP_MIN = 1101;

export function Navbar() {
  const { active, scrolled } = useScrollSpy(SPY_IDS);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) setOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-blue/90 py-2.5 shadow-[0_6px_24px_rgba(0,0,60,.2)] backdrop-blur-md' : 'py-3 sm:py-[18px]'
      }`}
    >
      <nav aria-label="Principal" className="wrap relative flex items-center justify-between gap-6">
        <a href={`#${SECTION_IDS.home}`} className="flex min-h-[44px] items-center">
          <img src={logo} alt={SITE.name} className="h-[34px] w-auto" />
        </a>

        <ul
          id="nav-menu"
          ref={menuRef}
          className={
            open
              ? 'absolute left-3 right-3 top-[calc(100%+6px)] flex max-h-[calc(100vh-110px)] flex-col gap-0.5 overflow-y-auto rounded-card bg-white p-2.5 shadow-[0_24px_50px_rgba(0,0,40,.3)] sm:left-6 sm:right-6'
              : 'hidden gap-1 rounded-full border-2 border-white/60 bg-white/85 p-[5px] backdrop-blur-md lg:flex'
          }
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-full px-[18px] py-3.5 text-base font-medium transition-colors lg:py-2 lg:text-[0.88rem] ${
                    isActive ? 'bg-blue text-white' : 'text-navy hover:bg-blue/[.08]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="mt-1.5 sm:hidden">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-blue px-[18px] py-3.5 text-center text-base font-medium text-white"
            >
              Fale comigo no WhatsApp ↗
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-3.5 rounded-full bg-white py-1.5 pl-1.5 pr-[30px] text-[0.9rem] font-medium text-navy sm:flex"
          >
            <span className="status-dot relative h-10 w-10 shrink-0">
              <img src={avatar} alt="" className="h-full w-full rounded-full bg-blue object-cover object-[50%_15%]" />
            </span>
            Fale comigo
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="burger flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="nav-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
