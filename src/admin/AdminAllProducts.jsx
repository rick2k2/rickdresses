import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminAllProducts.css";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("❌ Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("✅ Product deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("❌ Failed to delete product");
    }
  };

  return (
    <div className="admin-products-table">
      <h2 className="admin_All_products">All Products</h2>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="all_produt_table_heading">Image</th>
              <th className="all_produt_table_heading">Name</th>
              <th className="all_produt_table_heading">Brand</th>
              <th className="all_produt_table_heading">Category</th>
              <th className="all_produt_table_heading">Price</th>
              <th className="all_produt_table_heading">Stock</th>
              <th className="all_produt_table_heading">Description</th>
              <th className="all_produt_table_heading">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-product-img"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=No+Image")
                    }
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.countInStock}</td>
                <td className="admin_product_description">
                  {product.description}
                </td>
                <td>
                  <div className="admin_all_products_btn_container">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="product_delete_btn"
                    >
                      Delete
                    </button>
                    <Link
                      to="/admin/products/update"
                      className="product_modify_btn"
                    >
                      Modify
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAllProducts;
