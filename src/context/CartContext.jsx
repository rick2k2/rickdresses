import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosConfig";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("rick-cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [checkoutData, setCheckoutData] = useState(null); // ✅ form info save korar jonno

  // set item in local storage
  useEffect(() => {
    localStorage.setItem("rick-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // add to cart
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

  // remove from cart
  const removeFromCart = async (id) => {
    try {
      await axios.patch(`/products/increase-stock/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("🧺 Product removed and stock restored!");
    } catch (error) {
      toast.success("⚠️ Could not restore stock. Try again.");
    }
  };

  // update quantity
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
