import React, { useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const fetchProducts = async () => {
  const res = await fetch(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
  );
  if (!res.ok) {
    const errorDetail = await res.json();
    throw new Error(
      `Network response was not ok: ${res.status} ${res.statusText} - ${errorDetail.message}`
    );
  }
  const data = await res.json();
  return data.products;
};

const HomePage: React.FC = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery("products", fetchProducts);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeProduct = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <Header />
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {(error as Error).message}</div>}
        <ProductList products={products} addToCart={addToCart} />
        <Cart
          cart={cart}
          setCart={setCart}
          setShowCheckout={setShowCheckout}
          removeProduct={removeProduct}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
      <footer className="footer">
        MKS sistemas © Todos os direitos reservados
      </footer>
    </div>
  );
};

export default HomePage;
