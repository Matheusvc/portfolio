import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders a single page heading and every section landmark', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has no dead in-page links', () => {
    const { container } = render(<App />);
    const anchors = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(anchors.length).toBeGreaterThan(0);
    for (const a of anchors) {
      const id = (a.getAttribute('href') ?? '').slice(1);
      expect(document.getElementById(id), `missing target for #${id}`).not.toBeNull();
    }
  });

  it('opens external links safely in a new tab', () => {
    const { container } = render(<App />);
    const external = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a.rel).toContain('noopener');
    }
  });

  it('gives every image an alt attribute', () => {
    const { container } = render(<App />);
    for (const img of container.querySelectorAll('img')) {
      expect(img).toHaveAttribute('alt');
    }
  });
});
