import React from "react";
import ProductItem from "./ProductItem";
import styles from "../styles/components/ProductList.module.scss";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  photo: string;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  console.log("ProductList products:", products);
  return (
    <div className={styles["product-list"]}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
