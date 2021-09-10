import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const handleAdd = newCart => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };
  const handleClear = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart && cart.length && setCart(cart);
  }, []);
  return [cart, handleAdd, handleClear];
};

export default useCart;
