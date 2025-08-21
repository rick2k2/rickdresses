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

  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    localStorage.setItem("rick-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = async (product) => {
    if (product.countInStock === 0) {
      toast.error("❌ Out of stock!");
      return;
    }

    try {
      const res = await axios.patch(
        `/products/reduce-stock/${product.id || product._id}`,
        {
          quantity: 1, // Always reduce 1 for single add
        }
      );

      setCartItems((prev) => {
        const exists = prev.find(
          (item) => item.id === (product.id || product._id)
        );
        const finalPrice =
          product.offerPrice && product.offerPrice > 0
            ? product.offerPrice
            : product.price;

        if (exists) {
          return prev.map((item) =>
            item.id === (product.id || product._id)
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  countInStock: res.data.countInStock,
                }
              : item
          );
        } else {
          const id =
            product.id || product._id || `${product.name}-${Date.now()}`;
          return [
            ...prev,
            {
              ...product,
              id,
              quantity: 1,
              finalPrice,
              countInStock: res.data.countInStock,
            },
          ];
        }
      });

      toast.success("🛒 Product added to cart!");
    } catch (error) {
      toast.error("⚠️ Could not add to cart");
    }
  };

  // Remove from cart
  const removeFromCart = async (id) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        await axios.patch(`/products/increase-stock/${id}`, {
          quantity: item.quantity,
        });
      }
      setCartItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("🧺 Product removed and stock restored!");
    } catch (error) {
      toast.error("⚠️ Could not restore stock");
    }
  };

  // Update quantity in cart
  const updateQuantity = async (id, newQty) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const diff = newQty - item.quantity;
    if (diff === 0) return;

    try {
      if (diff > 0) {
        // Increase cart quantity → reduce stock
        const res = await axios.patch(`/products/reduce-stock/${id}`, {
          quantity: diff,
        });
        setCartItems((prev) =>
          prev.map((i) =>
            i.id === id
              ? { ...i, quantity: newQty, countInStock: res.data.countInStock }
              : i
          )
        );
      } else {
        // Decrease cart quantity → increase stock
        await axios.patch(`/products/increase-stock/${id}`, {
          quantity: -diff,
        });
        setCartItems((prev) =>
          prev.map((i) =>
            i.id === id
              ? { ...i, quantity: newQty, countInStock: i.countInStock - diff }
              : i
          )
        );
      }
    } catch (error) {
      toast.error("⚠️ Could not update quantity");
    }
  };

  const clearCart = async () => {
    try {
      // Restore all stock before clearing
      for (let item of cartItems) {
        await axios.patch(`/products/increase-stock/${item.id}`, {
          quantity: item.quantity,
        });
      }
      setCartItems([]);
      toast.success("🧺 Cart cleared and stock restored!");
    } catch (error) {
      toast.error("⚠️ Could not clear cart properly");
    }
  };

  const saveCheckoutData = (data) => setCheckoutData(data);

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
