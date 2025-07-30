import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("rick-cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [checkoutData, setCheckoutData] = useState(null); // ✅ form info save korar jonno

  useEffect(() => {
    localStorage.setItem("rick-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const id = product.id || `${product.name}-${Date.now()}`;
        return [...prev, { ...product, id, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const saveCheckoutData = (data) => {
    setCheckoutData(data); // ✅ store checkout form info
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkoutData,
        saveCheckoutData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
