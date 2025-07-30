import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/ProductDetails.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("🛒 Product added to cart!");
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading product...</p>
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p className="desc">{product.description}</p>
        <div className="buttons">
          <Link to="/cart" className="cart-btn">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </Link>
          <Link to="/shop" className="back-btn">
            <button className="cart-btn">Back to Shop</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
