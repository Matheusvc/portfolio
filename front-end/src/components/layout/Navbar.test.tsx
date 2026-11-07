import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Navbar } from './Navbar';

const setup = () => {
  const user = userEvent.setup();
  render(<Navbar />);
  return { user, toggle: () => screen.getByRole('button', { name: /menu/i }) };
};

describe('Navbar mobile menu', () => {
  it('opens and closes with the toggle', async () => {
    const { user, toggle } = setup();
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    expect(toggle()).toHaveAccessibleName('Fechar menu');

    await user.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    const { user, toggle } = setup();
    await user.click(toggle());
    await user.keyboard('{Escape}');
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
    expect(toggle()).toHaveFocus();
  });

  it('closes when a link is chosen or the user taps outside', async () => {
    const { user, toggle } = setup();
    await user.click(toggle());
    await user.click(screen.getByRole('link', { name: 'Sobre mim' }));
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle());
    await user.click(document.body);
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
  });
});
