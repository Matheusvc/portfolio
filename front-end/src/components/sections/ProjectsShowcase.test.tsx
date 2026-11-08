import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SHOWCASE } from '@/content';
import { ProjectsShowcase } from './ProjectsShowcase';

describe('ProjectsShowcase', () => {
  it('highlights exactly one project and moves the highlight on click', async () => {
    const user = userEvent.setup();
    render(<ProjectsShowcase />);
    const buttons = SHOWCASE.map((p) => screen.getByRole('button', { name: p.name }));
    const pressed = () => buttons.filter((b) => b.getAttribute('aria-pressed') === 'true');

    expect(pressed()).toHaveLength(1);
    const [target] = buttons.filter((b) => b.getAttribute('aria-pressed') === 'false');

    await user.click(target);
    expect(pressed()).toEqual([target]);
  });
});

describe('ProjectsShowcase videos', () => {
  it('renders one muted, looping video with a poster per project', () => {
    const { container } = render(<ProjectsShowcase />);
    const videos = Array.from(container.querySelectorAll('video'));
    expect(videos).toHaveLength(SHOWCASE.length);
    for (const video of videos) {
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video).toHaveAttribute('poster');
      expect(video).toHaveAttribute('aria-label');
    }
  });
});
