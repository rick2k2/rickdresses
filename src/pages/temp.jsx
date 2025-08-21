// cartcontext.jsx

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "../utils/axiosConfig";
// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const stored = localStorage.getItem("rick-cart");
//     return stored ? JSON.parse(stored) : [];
//   });

//   const [checkoutData, setCheckoutData] = useState(null); // ✅ form info save korar jonno

//   // set item in local storage
//   useEffect(() => {
//     localStorage.setItem("rick-cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       if (exists) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         const id = product.id || `${product.name}-${Date.now()}`;
//         const finalPrice =
//           product.offerPrice && product.offerPrice > 0
//             ? product.offerPrice
//             : product.price;

//         return [...prev, { ...product, id, quantity: 1, finalPrice }];
//       }
//     });
//   };

//   // remove from cart
//   const removeFromCart = async (id) => {
//     try {
//       await axios.patch(`/products/increase-stock/${id}`);
//       setCartItems((prev) => prev.filter((item) => item.id !== id));
//       toast.success("🧺 Product removed and stock restored!");
//     } catch (error) {
//       toast.success("⚠️ Could not restore stock. Try again.");
//     }
//   };

//   // update quantity
//   const updateQuantity = (id, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.min(quantity, item.countInStock) }
//           : item
//       )
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   const saveCheckoutData = (data) => {
//     setCheckoutData(data); // ✅ store checkout form info
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         checkoutData,
//         saveCheckoutData,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// Cart.js
// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "../styles/cart.css";

// const Cart = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.finalPrice * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-page">
//       <h2>Your Cart 🛒</h2>

//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <p>Your cart is empty. Now start your Shopping.</p>
//           <Link to="/shop">
//             <button className="visit-shop-btn">Visit Shop</button>
//           </Link>
//         </div>
//       ) : (
//         <div className="cart-container">
//           {cartItems.map((item) => (
//             <div className="cart-item" key={item._id || item.id}>
//               <img
//                 src={item.image || "/images/no-image.png"}
//                 alt={item.name || "Product"}
//               />
//               <div className="item-details">
//                 <h3>{item.name}</h3>
//                 <p>
//                   {" "}
//                   Price:
//                   {item.offerPrice ? (
//                     <>
//                       <span className="cart-offer-price">
//                         ₹{Number(item.finalPrice).toFixed(2)}
//                       </span>{" "}
//                       <span className="cart-original-price">
//                         ₹{Number(item.price).toFixed(2)}
//                       </span>
//                     </>
//                   ) : (
//                     <span>₹{Number(item.price).toFixed(2)}</span>
//                   )}
//                 </p>
//                 <label>
//                   Quantity:{" "}
//                   <select
//                     value={item.quantity}
//                     onChange={(e) =>
//                       updateQuantity(
//                         item._id || item.id,
//                         Number(e.target.value)
//                       )
//                     }
//                     className="quantity-select"
//                   >
//                     {Array.from(
//                       { length: item.countInStock }, // stock er moto limit
//                       (_, i) => i + 1
//                     ).map((q) => (
//                       <option key={q} value={q}>
//                         {q}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//               <button
//                 className="cart_remove_btn"
//                 onClick={() => removeFromCart(item._id || item.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <div className="cart-summary">
//             <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
//             <Link to="/shop" className="cart_btn_link">
//               <button className="buymore-btn">Buy More</button>
//             </Link>
//             <Link to="/checkout" className="cart_btn_link">
//               <button className="checkout-btn">Proceed to Checkout</button>
//             </Link>
//             <button
//               className="clear_cart_btn"
//               onClick={() => {
//                 const confirmClear = window.confirm(
//                   "Are you sure you want to remove all items?"
//                 );
//                 if (confirmClear) clearCart();
//               }}
//             >
//               Clear All Items
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
