import { TOOLS } from '@/content';

function ToolList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
      aria-label={duplicate ? undefined : 'Ferramentas que utilizo'}
      aria-hidden={duplicate || undefined}
    >
      {TOOLS.map((tool) => (
        <li
          key={tool.name}
          className="flex items-center gap-[9px] whitespace-nowrap font-display text-[1.05rem] font-extrabold text-navy sm:gap-3 sm:text-[1.35rem]"
        >
          <img
            src={tool.icon}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="h-[22px] w-[22px] opacity-[.85] sm:h-7 sm:w-7"
          />
          {tool.name}
        </li>
      ))}
    </ul>
  );
}

export function ToolsMarquee() {
  return (
    <div className="bg-white px-1.5 pt-1.5">
      <div className="marquee-mask flex h-20 items-center overflow-hidden rounded-[18px] bg-yellow sm:h-28">
        <div className="flex w-max animate-marquee">
          <ToolList />
          <ToolList duplicate />
        </div>
      </div>
    </div>
  );
}
