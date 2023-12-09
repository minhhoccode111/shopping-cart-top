import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from './../routes/root';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe('First test heading', () => {
  it('renders correct heading', () => {
    render(<Root />);

    expect(screen.getByRole('heading').textContent).toMatch('Hello, World');
  });
});
