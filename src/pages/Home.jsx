import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import Banner1 from "../components/Banner1";
import Features from "../components/Features";
import Brands from "../components/Brands";
import Shop from "../pages/Shop";
import CustomerReviews from "../pages/CustomerReviews.jsx";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; //
import "../styles/Home.css";

const Home = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="home_page">
      <Banner1 />
      <HeroBanner />
      <Shop />
      <Features />
      <ImageSlider />
      <CustomerReviews />
      <Brands />
      <Footer />
      {showTopBtn && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
