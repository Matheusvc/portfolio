import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SHOWCASE } from '@/content';
import { ProjectsShowcase } from './ProjectsShowcase';

const button = (name: string) => screen.getByRole('button', { name: new RegExp(name) });
const videos = (container: HTMLElement) => Array.from(container.querySelectorAll('video'));

describe('ProjectsShowcase', () => {
  it('shows one button per project and highlights the first', () => {
    render(<ProjectsShowcase />);
    const [first, ...rest] = SHOWCASE.map((p) => button(p.name));
    expect(first).toHaveAttribute('aria-pressed', 'true');
    for (const b of rest) expect(b).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders every video of the selected project and swaps them on click', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProjectsShowcase />);

    for (const project of SHOWCASE) {
      await user.click(button(project.name));
      expect(button(project.name)).toHaveAttribute('aria-pressed', 'true');
      const shown = videos(container);
      expect(shown).toHaveLength(Math.min(project.videos.length, 3));
      expect(shown.map((v) => v.getAttribute('aria-label'))).toEqual(project.videos.slice(0, 3).map((v) => v.label));
    }
  });

  it('plays videos muted, looping and with a poster', () => {
    const { container } = render(<ProjectsShowcase />);
    for (const video of videos(container)) {
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video).toHaveAttribute('poster');
    }
  });
});
