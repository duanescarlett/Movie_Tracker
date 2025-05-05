import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; // Adjust path if necessary

jest.mock('@/buslogic/getAllFilms', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ movies: [] })),
}));

describe('Home Page', () => {
  it('renders the main heading', async () => {
    render(<Home />);
    const heading = await screen.findByRole('heading', {
      name: /welcome to movie tracker/i,
    });
    expect(heading).toBeInTheDocument();
  });
});