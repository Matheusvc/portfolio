import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SHOWCASE } from '@/content';
import { ProjectsShowcase } from './ProjectsShowcase';

const button = (name: string) => screen.getByRole('button', { name: new RegExp(name) });
const screens = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLImageElement>('img.screen'));

describe('ProjectsShowcase', () => {
  it('shows one button per project and highlights the first', () => {
    render(<ProjectsShowcase />);
    const [first, ...rest] = SHOWCASE.map((p) => button(p.name));
    expect(first).toHaveAttribute('aria-pressed', 'true');
    for (const b of rest) expect(b).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders every screen of the selected project and swaps them on click', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProjectsShowcase />);

    for (const project of SHOWCASE) {
      await user.click(button(project.name));
      expect(button(project.name)).toHaveAttribute('aria-pressed', 'true');
      const shown = screens(container);
      expect(shown).toHaveLength(Math.min(project.screens.length, 3));
      expect(shown.map((img) => img.alt)).toEqual(project.screens.slice(0, 3).map((s) => s.alt));
    }
  });
});
