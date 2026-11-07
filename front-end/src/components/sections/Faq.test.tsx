import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FAQ } from '@/content';
import { Faq } from './Faq';

describe('Faq', () => {
  it('keeps at most one answer open at a time', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    const [first, second] = FAQ.map((item) => screen.getByRole('button', { name: item.question }));

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'false');
  });

  it('links each question to its answer region', () => {
    render(<Faq />);
    for (const button of screen.getAllByRole('button')) {
      const region = document.getElementById(button.getAttribute('aria-controls') ?? '');
      expect(region).toHaveAttribute('role', 'region');
    }
  });
});
