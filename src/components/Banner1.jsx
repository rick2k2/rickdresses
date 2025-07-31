import { Link } from "react-router-dom";
import "../styles/Banner1.css";

const Banner1 = () => {
  return (
    <div className="hero-banner">
      <div className="hero_content">
        <h1>Welcome to Rick Dresses</h1>
        <p className="slogan1">Discover the style you deserve</p>
        <p>
          Your one-stop destination for the most stylish and affordable
          clothing.
        </p>
        <Link to="/shop">
          <button className="cta-button">Shop Now</button>
        </Link>
      </div>
      <div className="hero_banner_content">
        {/* <img src="/assests/g1.png" alt="Banner" /> */}
        <img src="/assests/gb1.png" alt="Banner" />
      </div>
    </div>
  );
};

export default Banner1;
