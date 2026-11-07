import { describe, expect, it } from 'vitest';
import { CONTACT, NAV_LINKS, SECTION_IDS } from './site';

describe('site config', () => {
  it('builds a WhatsApp link with the number and a pre-filled message', () => {
    const url = new URL(CONTACT.whatsapp);
    expect(url.host).toBe('wa.me');
    expect(url.pathname).toBe('/5598987577739');
    expect(url.searchParams.get('text')).toMatch(/portfólio/);
  });

  it('points every menu entry at a known section', () => {
    const ids = Object.values(SECTION_IDS) as string[];
    for (const link of NAV_LINKS) expect(ids).toContain(link.href.slice(1));
  });
});
