import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminUpdateProductsListing.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="uadmin-page">
      <h2>Update Products</h2>
      <div className="uproduct-list">
        {products.map((prod) => (
          <div key={prod._id} className="uproduct-card">
            <img
              src={prod.image.url || "/assets/no-image.png"}
              alt={prod.name}
              className="uproduct-image"
            />
            <div className="uproduct-info">
              <h3>{prod.name}</h3>
              <p>Price: ₹{prod.price}</p>
              <button
                onClick={() => navigate(`/admin/update-product/${prod._id}`)}
                className="update_btn_admin_product_Listing"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateProduct;
