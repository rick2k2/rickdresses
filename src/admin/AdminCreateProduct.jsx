import { useState } from "react";
import axios from "axios";
import "../styles/CreateProduct.css";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", product);
      toast.success("🎉 Product created successfully!");

      // Clear all fields
      setProduct({
        name: "",
        price: "",
        image: "",
        brand: "",
        category: "",
        countInStock: "",
        description: "",
      });

      console.log("Sent product:", product);
    } catch (err) {
      toast.error("❌ Failed to create product.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h2>Create New Product</h2>
      <input
        name="name"
        value={product.name}
        placeholder="Product Name"
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        value={product.price}
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <input
        name="image"
        value={product.image}
        placeholder="Image URL"
        onChange={handleChange}
        required
      />
      <input
        name="brand"
        value={product.brand}
        placeholder="Brand"
        onChange={handleChange}
        required
      />
      <input
        name="category"
        value={product.category}
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <input
        name="countInStock"
        type="number"
        value={product.countInStock}
        placeholder="Stock Count"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={product.description}
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
