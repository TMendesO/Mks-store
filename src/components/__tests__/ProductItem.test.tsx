import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from '../ProductItem';

test('renders product item correctly', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 10,
    image: 'test-image.jpg',
  };

  render(<ProductItem product={product} addToCart={() => {}} />);

  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('R$10.00')).toBeInTheDocument(); // Verifica se o preço é exibido corretamente
});
