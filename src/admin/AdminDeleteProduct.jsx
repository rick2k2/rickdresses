import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminDeleteProducts.css";
import { toast } from "react-toastify";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts(); // refresh list
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dadmin-page">
      <h2>Delete Product</h2>
      <div className="dproduct-list">
        {products.map((prod) => (
          <div key={prod._id} className="dproduct-card">
            <img src={prod.image.url} alt={prod.name} />
            <div>
              <h4>{prod.name}</h4>
              <p>₹{prod.price}</p>
              <button
                onClick={() => handleDelete(prod._id)}
                className="delete_btn_admin_product_delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
