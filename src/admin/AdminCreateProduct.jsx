import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateProduct.css";
import { toast } from "react-toastify";

const AdminCreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPercent: "",
    offerPrice: 0,
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // Auto-calculate offerPrice when price or discountPercent changes
  useEffect(() => {
    if (product.price && product.discountPercent) {
      const offer =
        product.price - (product.price * product.discountPercent) / 100;
      setProduct((prev) => ({
        ...prev,
        offerPrice: Math.round(offer),
      }));
    }
  }, [product.price, product.discountPercent]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image file.");
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("image", imageFile);

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("🎉 Product created successfully!");

      setProduct({
        name: "",
        price: "",
        discountPercent: "",
        offerPrice: 0,
        brand: "",
        category: "",
        countInStock: "",
        description: "",
      });
      setImageFile(null);
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
        placeholder="Original Price"
        onChange={handleChange}
        required
      />

      <input
        name="discountPercent"
        type="number"
        value={product.discountPercent}
        placeholder="Discount %"
        onChange={handleChange}
        required
      />

      <input
        name="offerPrice"
        type="number"
        value={product.offerPrice}
        placeholder="Offer Price (auto)"
        readOnly
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
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

export default AdminCreateProduct;
