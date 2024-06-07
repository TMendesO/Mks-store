import React from "react";
import styles from "../styles/components/ProductItem.module.scss";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  photo: string;
}

interface ProductItemProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, addToCart }) => {
  const price = parseFloat(product.price);

  return (
    <div className={styles["product-item"]}>
      <img src={product.photo} alt={product.name} />
      <div className={styles["product-info"]}>
        <div className={styles["product-name"]}>{product.name}</div>
        <div className={styles["product-description"]}>
          {product.description}
        </div>
        <div className={styles["product-price"]}>
          {isNaN(price)
            ? "Preço indisponível"
            : `R$${price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </div>
        <button
          className={styles["buy-button"]}
          onClick={() => addToCart(product)}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
