import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 added loading state

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // 👈 stop loading after fetch attempt
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="shop-section">
      <h2>Rick Dresses Shop</h2>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <Link to={`/product/${p._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
