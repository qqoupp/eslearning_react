import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizPage from './index';

test('Renders Home Page', () => {
  render(<QuizPage />);
  const linkElement = screen.getByText(`Start Quizz`);
  expect(linkElement).toBeInTheDocument();
});
