import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyForm from './form';

test('renders MyForm component', () => {
  render(<MyForm />);

  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();

  expect(screen.getByText(/No data available/i)).toBeInTheDocument();
});
