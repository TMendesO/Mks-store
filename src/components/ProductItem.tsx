import React from 'react';
import styles from '../styles/components/ProductItem.module.scss';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductItemProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, addToCart }) => {
  return (
    <div className={styles['product-item']}>
      <img src={product.image} alt={product.name} />
      <div className={styles['product-info']}>
        <div className={styles['product-name']}>{product.name}</div>
        <div className={styles['product-description']}>{product.description}</div>
        <div className={styles['product-price']}>R${typeof product.price === 'number' ? `R$${product.price.toFixed(2)}` : 'Preço indisponível'}</div> 
        <button className={styles['buy-button']} onClick={() => addToCart(product)}>Comprar</button>
      </div>
    </div>
  );
};

export default ProductItem;
