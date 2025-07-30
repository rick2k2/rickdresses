// /pages/AdminBilling.jsx
import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminBilling.css";
import { toast } from "react-toastify";

const AdminBilling = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([
    { productName: "", quantity: 1, price: 0 },
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "quantity" || field === "price" ? parseInt(value) : value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/bills/create", {
        customerName,
        phone,
        items,
        totalAmount,
      });
      toast.success("✅ Bill Generated!");
      setCustomerName("");
      setPhone("");
      setItems([{ productName: "", quantity: 1, price: 0 }]);
    } catch (err) {
      toast.error("❌ Failed to generate bill.");
    }
  };

  return (
    <div className="admin-billing">
      <h2>🧾 Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="billing-items">
          {items.map((item, index) => (
            <div key={index} className="billing-item">
              <input
                type="text"
                placeholder="Product Name"
                value={item.productName}
                onChange={(e) =>
                  handleItemChange(index, "productName", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Qty"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                min="0"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="remove-btn"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddItem}>
          ➕ Add Item
        </button>

        <h3>Total: ₹{totalAmount}</h3>
        <button type="submit" className="generate-btn">
          Generate Bill
        </button>
      </form>
    </div>
  );
};

export default AdminBilling;
