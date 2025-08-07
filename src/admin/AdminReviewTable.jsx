import { useEffect, useState, useCallback } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/AdminReviewTable.css";

const AdminReviewTable = () => {
  const [reviewList, setReviewList] = useState([]);

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get("/products/admin/reviews");

      console.log("Fetched Reviews:", data);

      setReviewList((data || []).reverse());
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reviews");
    }
  }, []);

  const deleteReview = async (productId, reviewId) => {
    try {
      await axios.delete(`/products/delete/reviews/${productId}/${reviewId}`);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="admin-review-table-container">
      <h2>All Product Reviews</h2>

      <table className="admin-review-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reviewList.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No reviews available
              </td>
            </tr>
          ) : (
            reviewList.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.productName}</td>
                <td>
                  <img
                    src={review.profileImage || "/default-user.png"}
                    alt={review.name}
                    className="profile-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-user.png";
                    }}
                  />
                </td>
                <td>{review.name}</td>
                <td>{"⭐".repeat(review.rating)}</td>
                <td>{review.comment}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteReview(review.productId, review.reviewId)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;
