import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "../styles/ProductDetails.css";

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
        console.log(res.data);
      } catch (err) {
        setError("Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // handel add to cart function
  const handleAddToCart = () => {
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product?.image?.url || "",
    };
    addToCart(item);
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
    <div className="product_details_container">
      <div className="product-details">
        <img src={product.image.url} alt={product.name} />
        <div className="details">
          <h2>{product.name}</h2>

          <motion.div
            className="pricing-line"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.discountPercent > 0 ? (
              <>
                <motion.p className="original-price">₹{product.price}</motion.p>
                <motion.p className="offer-price">
                  ₹{product.offerPrice || product.price}
                </motion.p>
                <motion.p className="discount">
                  ({product.discountPercent}% OFF)
                </motion.p>
              </>
            ) : (
              <motion.p className="offer-price">₹{product.price}</motion.p>
            )}
          </motion.div>

          <motion.p
            className={`stock ${
              product.countInStock > 0 ? "in-stock" : "out-stock"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {product.countInStock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
          </motion.p>

          {product.countInStock > 0 && product.countInStock <= 3 && (
            <motion.p
              className="low-stock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              🔥 Only {product.countInStock} left!
            </motion.p>
          )}

          <motion.p
            className="desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {product.description}
          </motion.p>

          <div className="buttons">
            <button
              onClick={() => {
                if (product.countInStock > 0) {
                  handleAddToCart();
                } else {
                  toast.success("Product is out of stock!");
                }
              }}
              // disabled={product.countInStock === 0}
              className={`cart-btn ${
                product.countInStock === 0 ? "disabled" : ""
              }`}
            >
              Add to Cart
            </button>

            <Link to="/shop" className="back-btn">
              <button className="cart-btn">Back to Shop</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className="product_review_card">
              <div className="review_header">
                <img
                  src={review.profileimage || ""}
                  alt={`${review.name}'s profile`}
                  className="review-profile-pic"
                />
                <strong>{review.name}</strong>
              </div>
              <div className="reeview_content">
                <p>Comment: {review.comment}</p>
                <p>Rating: {review.rating}⭐</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet for this product.</p>
        )}

        <div>
          <Link to={`/product/${product._id}/review`}>
            <button className="review-btn">Add a review</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
