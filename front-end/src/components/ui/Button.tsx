import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'white' | 'ghost' | 'blue' | 'outline';

const VARIANTS: Record<Variant, string> = {
  white: 'btn-white',
  ghost: 'btn-ghost',
  blue: 'btn-blue',
  outline: 'btn-pill-outline',
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  children: ReactNode;
};

export function Button({
  variant = 'white',
  arrow = true,
  external = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`btn ${VARIANTS[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {arrow && <span aria-hidden="true">↗</span>}
    </a>
  );
}
