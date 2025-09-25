import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders calculator and performs simple addition via clicks', () => {
  const { getByRole, getByText } = render(<App />);
  expect(getByRole('application', { name: /calculator/i })).toBeInTheDocument();

  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('3'));
  fireEvent.click(getByText('='));

  expect(getByRole('group', { name: /calculator display/i })).toHaveTextContent('5');
});

test('supports keyboard inputs', () => {
  const { getByRole } = render(<App />);
  const app = getByRole('application', { name: /calculator/i });

  fireEvent.keyDown(window, { key: '7' });
  fireEvent.keyDown(window, { key: '+' });
  fireEvent.keyDown(window, { key: '8' });
  fireEvent.keyDown(window, { key: 'Enter' });

  expect(getByRole('group', { name: /calculator display/i })).toHaveTextContent('15');
});
