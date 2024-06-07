import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../Cart';

test('renders cart correctly', () => {
  const cart = [
    {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test-image.jpg',
      quantity: 2,
    },
  ];

  render(<Cart cart={cart} />);

  expect(screen.getByText('Carrinho')).toBeInTheDocument();
  expect(screen.getByText('Test Product - R$20.00')).toBeInTheDocument(); // Verifica se o produto no carrinho é exibido corretamente
});
