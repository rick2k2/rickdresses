import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axiosConfig";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

const Shop = ({ initialSearch = "" }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { cartItems, addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const PRODUCTS_PER_PAGE = isHome ? 8 : 20;

  // Listen for theme changes from Navbar
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    };

    handleThemeChange();
    window.addEventListener("storage", handleThemeChange);

    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
        extractCategories(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync shop stock with cart
  useEffect(() => {
    if (cartItems.length > 0) {
      setProducts((prev) =>
        prev.map((p) => {
          const cartItem = cartItems.find((c) => c.id === p._id);
          if (cartItem) {
            return {
              ...p,
              countInStock: Math.max(p.countInStock - cartItem.quantity, 0),
            };
          }
          return p;
        })
      );
    }
  }, [cartItems]);

  // Sort, filter, search, pagination
  useEffect(() => {
    let filtered = [...products];
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== "All")
      filtered = filtered.filter((p) => p.category === category);
    if (sortOrder === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === "highToLow")
      filtered.sort((a, b) => b.price - a.price);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, category, sortOrder, products]);

  const extractCategories = (data) => {
    const uniqueCategories = [
      "All",
      ...new Set(data.map((p) => p.category || "Uncategorized")),
    ];
    setCategories(uniqueCategories);
  };

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + PRODUCTS_PER_PAGE
  );

  // Add to cart (fixed)
  const handleAddToCart = async (product) => {
    if (product.countInStock === 0) {
      toast.error("❌ This item is out of stock!");
      return;
    }

    try {
      const finalPrice = product.discountPercent
        ? (
            product.price -
            (product.price * product.discountPercent) / 100
          ).toFixed(2)
        : product.price;

      await addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        offerPrice: product.discountPercent ? finalPrice : null,
        finalPrice: finalPrice,
        image: product.image.url,
        countInStock: product.countInStock,
      });

      // Update local shop stock immediately
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, countInStock: Math.max(p.countInStock - 1, 0) }
            : p
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Could not add to cart");
    }
  };

  return (
    <div className={`shop-section ${theme}`}>
      <h2>{isHome ? "Featured Products" : "Rick Dresses Shop"}</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>
      </div>

      <div className="product-area">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="product-grid">
            {paginatedProducts.map((p) => {
              const lowStock = p.countInStock > 0 && p.countInStock <= 3;
              const offerPrice = (
                p.price -
                (p.price * p.discountPercent) / 100
              ).toFixed(2);

              return (
                <div className="product-card" key={p._id}>
                  <img src={p.image.url} alt={p.name} />
                  <h3>{p.name}</h3>
                  <div className="price-section">
                    {p.discountPercent ? (
                      <>
                        <p className="offer-price">₹{offerPrice}</p>
                        <p className="original-price">₹{p.price.toFixed(2)}</p>
                        <p className="discount-badge">
                          Save {p.discountPercent}%
                        </p>
                      </>
                    ) : (
                      <p className="normal-price">₹{p.price.toFixed(2)}</p>
                    )}
                  </div>

                  <p
                    className={
                      p.countInStock > 0
                        ? "stock-status in-stock"
                        : "stock-status out-of-stock"
                    }
                  >
                    {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </p>

                  {lowStock && (
                    <p className="low-stock-badge">
                      🔥 Only {p.countInStock} left!
                    </p>
                  )}

                  <div className="product-buttons">
                    <Link to={`/product/${p._id}`}>
                      <button>View Details</button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={p.countInStock === 0}
                      className={p.countInStock === 0 ? "disabled-btn" : ""}
                    >
                      {p.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isHome && totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
