import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ user, setUser, cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const renderProfileIcon = () => {
    if (!user) return null;

    if (user.profileImage) {
      return (
        <Link to="/profile" onClick={closeMenu} className="profile-image-link">
          <img
            src={user.profileImage}
            alt="Profile_Image"
            className="profile-image"
          />
        </Link>
      );
    } else {
      const initials = user.name?.slice(0, 1).toUpperCase() || "U";
      return (
        <Link
          to="/profile"
          onClick={closeMenu}
          className="profile-image-link initials"
        >
          {initials}
        </Link>
      );
    }
  };

  const menuLinks = (
    <>
      <li>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/shop" onClick={closeMenu}>
          Shop
        </Link>
      </li>
      <li className="cart-link-with-badge">
        <Link to="/cart" onClick={closeMenu} className="cart-link">
          Cart
          {cartItems && cartItems.length > 0 && (
            <span className="cart_badge">{cartItems.length}</span>
          )}
        </Link>
      </li>

      {!user ? (
        <>
          <li>
            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/order-history" onClick={closeMenu}>
              Order
            </Link>
          </li>
          <li className="logout-btn-container">
            <button className="logout_btn_navbar" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="navbar">
        {!isMobile && (
          <Link to="/" className="logo">
            Rick Dresses
          </Link>
        )}

        {isMobile ? (
          <div className="mobile-navbar">
            <span className="shop_logo">RICK DRESSES</span>
            <div className="hamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        ) : (
          <ul className="nav-links">
            {menuLinks}

            {/* Light/Dark Mode Toggle After Logout */}
            <li className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </li>

            {/* Profile Icon Always Last */}
            {user && <li>{renderProfileIcon()}</li>}
          </ul>
        )}
      </nav>

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      {isMobile && (
        <ul className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
          {menuLinks}

          {/* Theme toggle for mobile */}
          <li className="theme-toggle-mobile" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </li>

          {/* Profile Image at Last in Mobile */}
          {user && (
            <li className="mobile-profile-icon">{renderProfileIcon()}</li>
          )}
        </ul>
      )}
    </>
  );
};

export default Navbar;
