import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProductReviewForm.css";

const ProductReviewForm = ({ onReviewAdded }) => {
  const { id: productId } = useParams();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // ✅ Fetch product using id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        console.log(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        toast.error("Failed to load product details");
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Handle review submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        `/products/${productId}/review`,
        {
          rating,
          comment,
        },
        config
      );
      toast.success("Review submitted successfully!");
      setRating("");
      setComment("");
      onReviewAdded?.();
    } catch (error) {
      console.error("Review error:", error);
      const message =
        error?.response?.data?.message || "Error submitting review";
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <div className="review_from_container">
      <form onSubmit={handleReviewSubmit} className="review-form">
        <h3>Write a Review</h3>

        {product && (
          <div className="product-summary">
            <img src={product.image.url} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        )}

        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="1">1 - Very Bad</option>
          <option value="2">2 - Bad</option>
          <option value="3">3 - Okay</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your review here..."
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        <Link to={`/product/${productId}`} className="back_to_details_page">
          <button>Back to Product Details</button>
        </Link>
      </form>
    </div>
  );
};

export default ProductReviewForm;
