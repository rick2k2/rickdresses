import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminUpdateProducts.css";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price });
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.price) {
      toast.error("Name and Price are required");
      return;
    }
    try {
      await axios.put(`/products/${editingId}`, {
        ...formData,
        price: Number(formData.price),
      });
      toast.success("Product updated");
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", price: "" });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="uadmin-page">
      <h2>Update Product</h2>
      <div className="uproduct-list">
        {products.map((prod) => (
          <div key={prod._id} className="uproduct-card">
            <img
              src={prod.image || "/assests/no-image.png"}
              alt={prod.name}
              className="uproduct-image"
            />
            {editingId === prod._id ? (
              <div className="uedit-section">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Product Name"
                />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Price"
                />
                <div className="ubuttons">
                  <button onClick={handleUpdate} className="update-btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="uinfo-section">
                <h4>{prod.name}</h4>
                <p>₹{prod.price}</p>
                <button onClick={() => handleEdit(prod)} className="edit-btn">
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProduct;
