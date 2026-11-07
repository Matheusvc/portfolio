import type { ReactNode } from 'react';

export function TagHand({
  children,
  tilted = false,
  className = '',
}: {
  children: ReactNode;
  tilted?: boolean;
  className?: string;
}) {
  return <span className={`tag-hand ${tilted ? 'tag-hand-tilted' : ''} ${className}`}>{children}</span>;
}
