import avatar from '@/assets/images/sobre-matheus.webp';
import logo from '@/assets/images/logo.png';
import { CONTACT, SITE } from '@/config/site';
import { FOOTER_COLUMNS } from '@/content';

export function Footer() {
  return (
    <footer className="bg-white pb-16 pt-14 text-navy sm:pb-[90px] sm:pt-20">
      <div className="wrap">
        <a href={CONTACT.email} className="mb-[30px] inline-flex items-center gap-3">
          <span className="ring-avatar">
            <img
              src={avatar}
              alt=""
              loading="lazy"
              className="h-full w-full rounded-full bg-blue object-cover object-[50%_12%]"
            />
          </span>
          <span className="hand text-[1.3rem] !text-blue sm:text-[1.6rem]">Agende uma reunião</span>
          <svg width="44" height="30" viewBox="0 0 44 30" fill="none" aria-hidden="true">
            <path d="M2 26C14 24 28 18 38 4" stroke="#0F0FFF" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d="M30 5L39 3L40 12"
              stroke="#0F0FFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className="grid grid-cols-1 gap-x-4 gap-y-7 rounded-card border border-navy/[.06] bg-soft px-5 pb-7 pt-6 xs:grid-cols-2 sm:px-[26px] sm:pb-10 sm:pt-[30px] lg:grid-cols-[1.6fr_.7fr_1.2fr_.8fr] lg:gap-6">
          <div className="xs:col-span-2 lg:col-span-1">
            <img
              src={logo}
              alt={SITE.name}
              loading="lazy"
              className="mb-3.5 mt-2.5 h-10 w-auto [filter:brightness(0)_saturate(100%)_invert(9%)_sepia(54%)_saturate(5000%)_hue-rotate(243deg)_brightness(70%)]"
            />
            <strong className="block text-[0.72rem] font-medium uppercase tracking-[0.02em]">{SITE.name}</strong>
            <span className="text-[0.72rem] text-muted">{SITE.role}</span>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
              <h2 className="mb-1 font-mono text-[0.62rem] font-normal uppercase tracking-[0.1em] text-muted">
                {column.title}
              </h2>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-[0.78rem] text-navy transition-colors hover:text-blue"
                >
                  {link.label}
                  {link.external && <span aria-hidden="true"> ↗</span>}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <p className="mt-[18px] text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
