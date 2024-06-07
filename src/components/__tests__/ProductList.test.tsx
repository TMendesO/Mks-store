import { render, screen } from '@testing-library/react';
import ProductList from '../ProductList';

test('renders loading state', () => {
  render(<ProductList products={[]} isLoading={true} addToCart={() => {}} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders products', () => {
  const products = [{ id: 1, name: 'Product 1', description: 'Description 1' }];
  render(<ProductList products={products} isLoading={false} addToCart={() => {}} />);
  expect(screen.getByText('Product 1')).toBeInTheDocument();
});
