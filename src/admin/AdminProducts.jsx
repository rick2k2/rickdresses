import { Link } from "react-router-dom";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  return (
    <div className="admin-products">
      <h2>Admin Product Panel</h2>
      <div className="admin-buttons">
        <Link to="/admin/products/create" className="btn">
          Create Product
        </Link>
        <Link to="/admin/products/update" className="btn">
          Update Product
        </Link>
        <Link to="/admin/products/delete" className="btn">
          Delete Product
        </Link>
        <Link to="/admin/allproducts" className="btn">
          Show All Products
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
