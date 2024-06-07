import React, { useState, useEffect } from "react";
import styles from "../styles/components/Cart.module.scss";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  removeProduct: (productId: number) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({
  cart,
  setCart,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (purchaseCompleted) {
      timer = setTimeout(() => {
        setPurchaseCompleted(false);
      }, 3500); // 3.5 segundos
    }
    return () => clearTimeout(timer);
  }, [purchaseCompleted]);

  const calculateTotal = () => {
    let sum = 0;
    cart.forEach((product) => {
      sum += product.price * product.quantity;
    });
    return sum;
  };

  const toggleCheckout = () => {
    setShowCheckout((prev) => !prev);
  };

  const finalizePurchase = () => {
    setCart([]);
    setPurchaseCompleted(true);
    setShowCheckout(false);
  };

  return (
    <div>
      <div className={styles.cartIcon} onClick={toggleCheckout}>
        <FaShoppingCart />
        {cart.length > 0 && (
          <span className={styles.itemCount}>{cart.length}</span>
        )}
      </div>
      <div className={`${styles.checkout} ${showCheckout ? styles.show : ""}`}>
        <div className={styles.closeIcon} onClick={toggleCheckout}>
          <FaTimes />
        </div>
        {cart.map((product) => (
          <div key={product.id} className={styles.productContainer}>
            <p>
              {product.name} - R$
              {(product.price * product.quantity).toFixed(2)}
            </p>
            <div className={styles.buttons}>
              <button
                className={styles.actionButton}
                onClick={() => increaseQuantity(product)}
              >
                +
              </button>
              <span>{product.quantity}</span>
              <button
                className={styles.actionButton}
                onClick={() => decreaseQuantity(product)}
              >
                -
              </button>
              <button
                className={styles.actionButton}
                onClick={() => removeProduct(product.id)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
        <div className={styles.total}>
          <span>Total:</span>
          <span>R${calculateTotal().toFixed(2)}</span>
        </div>
        <button className={styles.finalizeButton} onClick={finalizePurchase}>
          Finalizar Compra
        </button>
        {purchaseCompleted && <p>Compra Finalizada</p>}
      </div>
    </div>
  );
};

export default Cart;
