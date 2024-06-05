import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './index';

test('Renders Home Page', () => {
  render(<LandingPage />);
  const linkElement = screen.getByText(`Start Quizz`);
  expect(linkElement).toBeInTheDocument();
});
