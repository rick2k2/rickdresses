import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/HeroBanner.css";

const HeroBanner = () => {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/posts");
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (posts.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % posts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return null;

  return (
    <div className="hero_banner">
      <h2>{posts[current]?.title}</h2>
      <p>{posts[current]?.content}</p>
      <Link to="/shop">
        <button className="herobanner_button">Shop Now</button>
      </Link>
    </div>
  );
};

export default HeroBanner;
